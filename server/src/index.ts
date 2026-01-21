import './ensureEnv'; // Must be the first import to load env vars
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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

// Public Routes
app.get('/', (req, res) => {
    res.send('Secure API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Protected Route Example
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

// Error Handling Middleware
// Handle JSON parsing errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            error: 'Invalid JSON',
            message: 'Request body contains invalid JSON'
        });
    }
    next(err);
});

// Global error handler - ensures all errors return JSON
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: err.name || 'Error',
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
