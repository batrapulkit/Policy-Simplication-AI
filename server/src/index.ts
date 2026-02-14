import './ensureEnv'; // Must be the first import to load env vars
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// Import configs and middleware
import { corsOptions } from './config/corsOptions';
import { apiLimiter } from './middleware/rateLimiter';
import { authMiddleware } from './middleware/auth';
import authRoutes from './routes/auth';
import aiRoutes from './routes/ai';

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for Digital Ocean
app.set('trust proxy', 1);

// 1. Security Headers (Helmet)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.clarity.ms"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:", "https://www.clarity.ms"],
            connectSrc: ["'self'", "https://www.googletagmanager.com", "https://*.supabase.co", "https://api.openai.com", "https://www.google-analytics.com", "https://*.clarity.ms"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
}));

// 2. CORS Configuration
app.use(cors(corsOptions));

// 3. Body & Cookie Parsing
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// 4. Global Rate Limiting
app.use('/api', apiLimiter);

// 5. Routes
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

// 6. Serve static files from the React app
// The build script copies dist/ into server/dist/public/
// So __dirname (server/dist) + /public always has the frontend build
const buildPath = path.join(__dirname, 'public');

console.log('Static files path:', buildPath);
console.log('Static files exist:', fs.existsSync(buildPath));
if (fs.existsSync(buildPath)) {
    console.log('Static files contents:', fs.readdirSync(buildPath));
}

if (fs.existsSync(buildPath) && fs.existsSync(path.join(buildPath, 'index.html'))) {
    console.log('Serving static files from:', buildPath);
    app.use(express.static(buildPath, {
        setHeaders: (res, filePath) => {
            if (filePath.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            } else if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            } else if (filePath.endsWith('.svg')) {
                res.setHeader('Content-Type', 'image/svg+xml');
            }
        }
    }));

    // SPA catchall: serve index.html for all non-API routes
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
            return next();
        }
        res.sendFile(path.join(buildPath, 'index.html'));
    });
} else {
    console.error('Frontend build not found at:', buildPath);
    app.get('/', (req, res) => {
        res.status(500).json({
            error: 'Frontend build not found',
            expectedPath: buildPath,
            dirname: __dirname,
            cwd: process.cwd(),
            dirContents: fs.existsSync(__dirname) ? fs.readdirSync(__dirname) : 'dirname not found'
        });
    });
}

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            error: 'Invalid JSON',
            message: 'Request body contains invalid JSON'
        });
    }
    next(err);
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        error: err.name || 'Error',
        message: err.message || 'Internal Server Error',
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
