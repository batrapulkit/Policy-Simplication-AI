import rateLimit from 'express-rate-limit';

// General limiter for most routes
export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Relaxed for debugging
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many requests, please try again later.',
    },
});

// Stricter limiter for login/auth routes
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Limit each IP to 100 login attempts per hour (Relaxed for debugging)
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many login attempts, please try again after an hour.',
    },
});
