import cors from 'cors';

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'http://localhost:5173',
        'http://localhost:8080',
        'http://localhost:8081',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:8081',
        'https://wearepratik-7whbc.ondigitalocean.app'
    ]; // All common Vite dev server ports and production URL

export const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // !origin allowed for server-to-server or non-browser tools (like Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error(`CORS blocked request from origin: ${origin}`);
            console.error(`Allowed origins:`, allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies
    optionsSuccessStatus: 200
};
