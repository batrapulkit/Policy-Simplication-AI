import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase: any = null;

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Supabase URL or Key missing in server environment variables.');
    // Do not crash, just log. Routes will fail gracefully.
} else {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
    } catch (error) {
        console.error('Failed to initialize Supabase client:', error);
    }
}

// Login Route
router.post('/login', authLimiter, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!supabase) {
        return res.status(500).json({ message: 'Server configuration error: Supabase not initialized.' });
    }

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ message: error.message });
        }

        if (!data.session || !data.user) {
            return res.status(500).json({ message: 'Authentication successful but no session returned' });
        }

        // Return the session/token to the client
        // We reuse Supabase's access token.
        res.json({
            message: 'Login successful',
            token: data.session.access_token,
            refreshToken: data.session.refresh_token,
            user: {
                id: data.user.id,
                email: data.user.email,
                ...data.user.user_metadata
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Signup Route
router.post('/signup', authLimiter, async (req: Request, res: Response) => {
    const { email, password, fullName } = req.body;

    if (!supabase) {
        return res.status(500).json({ message: 'Server configuration error: Supabase not initialized.' });
    }

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Register with Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        if (data.session) {
            // Manual Insert into user_profiles to store details (and password as requested)
            const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
            // Create a client with service role to bypass RLS for this system operation
            const adminClient = createClient(supabaseUrl!, serviceKey!, {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            });

            const { error: profileError } = await adminClient
                .from('user_profiles')
                .insert({
                    id: data.user!.id,
                    email: email,
                    full_name: fullName,
                    password: password // Storing as requested by user
                });

            if (profileError) {
                console.error('Failed to create user profile:', profileError);
                // Continue anyway, don't block signup
            }

            res.json({
                message: 'Signup successful',
                token: data.session.access_token,
                refreshToken: data.session.refresh_token,
                user: {
                    id: data.user!.id,
                    email: data.user!.email
                }
            });
        } else {
            // Email confirmation required
            res.json({
                message: 'Signup successful. Please check your email for confirmation.',
                user: data.user ? {
                    id: data.user.id,
                    email: data.user.email
                } : null
            });
        }

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
