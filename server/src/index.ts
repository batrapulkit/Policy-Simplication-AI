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

// ============================================
// STATIC FILES - MUST BE FIRST (before Helmet)
// ============================================
const buildPath = path.join(__dirname, 'public');
console.log('Static files path:', buildPath);
console.log('Static files exist:', fs.existsSync(buildPath));

if (fs.existsSync(buildPath) && fs.existsSync(path.join(buildPath, 'index.html'))) {
    console.log('Serving static files from:', buildPath);

    // Serve static files BEFORE any other middleware
    app.use(express.static(buildPath, {
        maxAge: '1h',
        setHeaders: (res, filePath) => {
            // Explicitly set correct MIME types
            if (filePath.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css; charset=UTF-8');
            } else if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
                res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
            } else if (filePath.endsWith('.svg')) {
                res.setHeader('Content-Type', 'image/svg+xml');
            } else if (filePath.endsWith('.json')) {
                res.setHeader('Content-Type', 'application/json');
            }
        }
    }));
}

// ============================================
// SECURITY & MIDDLEWARE (after static files)
// ============================================
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

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// ============================================
// API ROUTES
// ============================================
app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

// ============================================
// SPA CATCH-ALL (must be after API routes)
// ============================================
if (fs.existsSync(buildPath) && fs.existsSync(path.join(buildPath, 'index.html'))) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

// ============================================
// ERROR HANDLING
// ============================================
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

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
