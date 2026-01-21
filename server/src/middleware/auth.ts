import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
// We use a stateless check here by trusting the token signature if we had the secret,
// OR we can use getUser() which calls Supabase to verify.
// For performance, verification of signature is better, but requires the JWT secret (SUPABASE_JWT_SECRET).
// Since the prompt initially asked specifically for verification logic:
// We will use Supabase's `getUser(token)` which ensures the token is not revoked.
// Note: This adds latency. Ideally we use jsonwebtoken.verify with the Supabase JWT Secret.

const supabase = createClient(supabaseUrl, supabaseKey);

// Extend Express Request
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Debug Log
        // console.log('Verifying token:', token.substring(0, 10) + '...');

        // Strategy: Verify with Supabase Auth Server (most secure as it checks revocation)
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Auth Middleware Verification Failed:', error ? error.message : 'No user found');
            console.error('Debug Config:', {
                url: supabaseUrl ? (supabaseUrl.substring(0, 15) + '...') : 'MISSING',
                hasKey: !!supabaseKey
            });
            throw new Error('Invalid token');
        }

        req.user = user;
        next();
    } catch (error: any) {
        console.error('Auth Middleware Error:', error);
        return res.status(403).json({
            message: 'Forbidden: Invalid or expired token',
            details: error.message || error
        });
    }
};
