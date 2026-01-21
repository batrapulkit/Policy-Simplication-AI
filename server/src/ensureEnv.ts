import dotenv from 'dotenv';
import path from 'path';

// Load env vars
// Try loading from current directory first, then fallback to root
const envResult = dotenv.config();

// Always try to load from root directory as well to pick up shared secrets
const rootEnvPath = path.resolve(__dirname, '../../.env');
const rootEnvLocalPath = path.resolve(__dirname, '../../.env.local');

dotenv.config({ path: rootEnvPath });
dotenv.config({ path: rootEnvLocalPath });

// Map VITE_ variables to server variables if missing
if (!process.env.SUPABASE_URL && process.env.VITE_SUPABASE_URL) {
    process.env.SUPABASE_URL = process.env.VITE_SUPABASE_URL;
}
if (!process.env.SUPABASE_KEY) {
    if (process.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
        process.env.SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    } else if (process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY) {
        process.env.SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
    }
}

// Debug logging to file
import fs from 'fs';
try {
    const debugInfo = `
    Time: ${new Date().toISOString()}
    Root Env Path: ${path.resolve(__dirname, '../../.env')}
    Files found in Root: ${fs.readdirSync(path.resolve(__dirname, '../../')).join(', ')}
    SUPABASE_URL present: ${!!process.env.SUPABASE_URL}
    VITE_SUPABASE_URL present: ${!!process.env.VITE_SUPABASE_URL}
    `;
    fs.writeFileSync(path.resolve(__dirname, '../../server/env_debug.txt'), debugInfo);
} catch (e) {
    console.error("Failed to write debug log", e);
}

console.log('Environment loaded.');
console.log('Supabase URL present:', !!process.env.SUPABASE_URL);
