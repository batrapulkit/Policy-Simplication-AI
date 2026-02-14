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

// Serve static files from the React app
// Debugging: Log directory structure
import fs from 'fs';

// Try to resolve buildPath from multiple common locations
let buildPath = path.join(__dirname, '../../dist');
if (!fs.existsSync(buildPath)) {
    // Try relative to CWD
    buildPath = path.join(process.cwd(), '../dist');
}

console.log('DEBUG: __dirname is:', __dirname);
console.log('DEBUG: CWD is:', process.cwd());
console.log('DEBUG: buildPath resolved to:', buildPath);

try {
    if (fs.existsSync(buildPath)) {
        console.log('DEBUG: buildPath exists. Contents:', fs.readdirSync(buildPath));
        const assetsPath = path.join(buildPath, 'assets');
        if (fs.existsSync(assetsPath)) {
            console.log('DEBUG: assets folder exists. Contents:', fs.readdirSync(assetsPath));
        } else {
            console.log('DEBUG: assets folder NOT found at:', assetsPath);
        }
    } else {
        console.error('DEBUG: buildPath NOT found at:', buildPath);
        // Fallback: try to find dist in other common locations relative to current working directory
        console.error('DEBUG: Root contents:', fs.readdirSync(path.join(process.cwd(), '../')));
    }
} catch (err) {
    console.error('DEBUG: Error checking filesystem:', err);
}

app.get('/debug-filesystem', (req, res) => {
    const debugInfo = {
        cwd: process.cwd(),
        dirname: __dirname,
        buildPath: buildPath,
        buildPathExists: fs.existsSync(buildPath),
        buildPathContents: fs.existsSync(buildPath) ? fs.readdirSync(buildPath) : [],
        parentDirContents: fs.existsSync(path.join(process.cwd(), '../')) ? fs.readdirSync(path.join(process.cwd(), '../')) : 'Parent not accessible',
        serverSrcContents: fs.existsSync(path.join(__dirname, '../')) ? fs.readdirSync(path.join(__dirname, '../')) : 'Server src not accessible'
    };
    res.json(debugInfo);
});

app.use(express.static(buildPath));

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
    const indexPath = path.join(buildPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.error('Frontend build not found at:', indexPath);
        // Return debug info to client
        const debugInfo = {
            error: 'Frontend build not found',
            resolvedPath: buildPath,
            cwd: process.cwd(),
            dirname: __dirname,
            structure_at_cwd: fs.readdirSync(process.cwd()),
            structure_at_parent: fs.existsSync(path.join(process.cwd(), '../')) ? fs.readdirSync(path.join(process.cwd(), '../')) : 'Parent not accessible'
        };
        return res.status(500).json(debugInfo);
    }
    res.sendFile(indexPath);
});

// 404 Handler for API routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
