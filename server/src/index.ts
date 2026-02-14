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
// DigitalOcean sets PORT, use that to detect production, or NODE_ENV
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.PORT;

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

// Serve static files from the React app (Production Only)
if (isProduction) {
    // Helper to find the frontend build directory
    const findBuildPath = () => {
        const potentialPaths = [
            path.join(__dirname, '../../dist'), // Standard structure (server/dist -> ../../dist)
            path.join(__dirname, '../dist'), // Sibling to src (server/src -> ../dist)
            path.join(process.cwd(), 'dist'), // Root build relative to CWD
            path.join(process.cwd(), '../dist'),
            path.join(__dirname, '../../../dist'), // One level up
        ];

        for (const p of potentialPaths) {
            if (fs.existsSync(path.join(p, 'index.html'))) {
                return p;
            }
        }

        // Recursive search fallback (manual implementation)
        try {
            const root = path.resolve(__dirname, '../../');

            // Manual recursive function to avoid TS/Node version issues
            const findDist = (dir: string, depth: number): string | null => {
                if (depth > 3) return null;
                try {
                    const files = fs.readdirSync(dir, { withFileTypes: true });
                    for (const file of files) {
                        const fullPath = path.join(dir, file.name);
                        if (file.isDirectory()) {
                            // Check if this directory is the 'dist' folder we are looking for
                            if (file.name === 'dist' && fs.existsSync(path.join(fullPath, 'index.html'))) {
                                return fullPath;
                            }
                            // Recurse, but skip node_modules and hidden dotfiles
                            if (file.name !== 'node_modules' && !file.name.startsWith('.')) {
                                const found = findDist(fullPath, depth + 1);
                                if (found) return found;
                            }
                        }
                    }
                } catch (err) {
                    // Ignore access errors
                }
                return null;
            };

            const found = findDist(root, 0);
            if (found) {
                return found;
            }

        } catch (e) {
            console.error('Recursive search failed', e);
        }

        return null;
    };

    const buildPath = findBuildPath();

    if (buildPath) {
        console.log('Production mode: Serving static files from:', buildPath);
        app.use(express.static(buildPath));

        // The "catchall" handler: for any request that doesn't
        // match one above, send back React's index.html file.
        app.get('*', (req, res, next) => {
            if (req.path.startsWith('/api')) {
                return next();
            }

            // Do NOT serve index.html for static assets (js, css, etc.)
            // This prevents MIME type errors when files are missing
            if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json|svg)$/)) {
                return res.status(404).send('Not found');
            }

            res.sendFile(path.join(buildPath, 'index.html'));
        });
    } else {
        console.error('Production mode: Frontend build not found! Static files will not be served.');
        // Debug info endpoint - ALWAYS enabled if buildPath is missing
        app.get('*', (req, res) => {
            const debugInfo = {
                error: 'Frontend build not found',
                cwd: process.cwd(),
                dirname: __dirname,
                attempts: [
                    path.join(__dirname, '../../dist'),
                    path.join(__dirname, '../dist'),
                    path.join(process.cwd(), 'dist'),
                    path.join(process.cwd(), '../dist'),
                ],
                structure_at_cwd: fs.readdirSync(process.cwd()),
                structure_at_parent: fs.existsSync(path.join(process.cwd(), '../')) ? fs.readdirSync(path.join(process.cwd(), '../')) : 'Parent not accessible'
            };
            res.status(500).json(debugInfo);
        });
    }
} else {
    console.log('Development mode: API server only. Frontend served via Vite.');
}

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

// 404 Handler for API routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
