import './ensureEnv'; // Must be the first import to load env vars
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

// Import configs and middleware
import { corsOptions } from './config/corsOptions';
import { apiLimiter } from './middleware/rateLimiter';
import { authMiddleware } from './middleware/auth';
import authRoutes from './routes/auth';
import aiRoutes from './routes/ai';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Security Headers (Helmet)
app.use(helmet());

// 2. CORS Configuration
app.use(cors(corsOptions));

// 3. Body & Cookie Parsing
app.use(express.json({ limit: '50mb' })); // Limit body size to 50mb for PDF text
app.use(cookieParser());

// 4. Global Rate Limiting
app.use('/api', apiLimiter);

// 5. Routes

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Protected Route Example
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// 404 Handler for API routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
