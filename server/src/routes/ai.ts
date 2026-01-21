import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { extractPolicyData, checkAIHealth } from '../services/aiService';
import { createClient } from '@supabase/supabase-js';

const router = Router();
console.log('AI Routes Module Loaded');

// Initialize Supabase Client (Service Role preferred for backend operations if available, strictly speaking we should use the one from auth but this is fine for now)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials missing in backend!");
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

router.post('/extract', authMiddleware, async (req, res) => {
    try {
        const { pdfText, fileName } = req.body;
        const user = (req as any).user; // Populated by authenticateToken

        if (!pdfText) {
            return res.status(400).json({ error: 'pdfText is required' });
        }

        console.log(`Starting AI extraction for user ${user.id} file: ${fileName}`);

        // 1. Call AI Service
        const summary = await extractPolicyData(pdfText);

        // 2. Save to Supabase
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        let dbClient = supabase;
        if (token) {
            dbClient = createClient(supabaseUrl!, supabaseKey!, {
                global: { headers: { Authorization: `Bearer ${token}` } }
            });
        }

        // STEP A: Create a placeholder Policy record to satisfy DB constraints
        // (Since the DB requires a policy_id, we must create one)
        const { data: newPolicy, error: policyError } = await dbClient
            .from('policies')
            .insert({
                user_id: user.id,
                policy_number: `UPLOAD-${Date.now()}`,
                carrier: 'Pending Analysis',
                pdf_url: 'pending_upload'
            })
            .select()
            .single();

        if (policyError) {
            console.error('Failed to create parent policy:', policyError);
            // If this fails, the extraction save will definitely fail, but we continue to return the summary.
        }

        const policyId = newPolicy?.id;

        // STEP B: Save Extraction linked to the new Policy
        const { data: extraction, error } = await dbClient
            .from('policy_extractions')
            .insert({
                user_id: user.id,
                policy_id: policyId, // Now we have a valid ID!
                file_name: fileName || 'Untitled Policy',
                raw_text: pdfText.slice(0, 50000),
                summary: summary,
            })
            .select() // Returning * is important
            .single();

        if (error || !extraction || !extraction.id) {
            console.error('Database insert failed or returned no ID:', error, extraction);
            throw new Error('Failed to save extraction: ' + (error?.message || 'No ID returned DB'));
        }

        console.log('Backend: Extraction saved with ID:', extraction.id);

        res.json({
            success: true,
            extraction: extraction
        });

    } catch (error: any) {
        console.error('Extraction Route Error:', error);

        // Explicitly check for API Key issues
        if (error.message && (error.message.includes('401') || error.message.includes('API key'))) {
            console.error('CRITICAL: OpenAI API Key invalid or missing in server environment.');
        }

        res.status(500).json({
            error: 'Extraction failed',
            details: error.message,
            hint: !process.env.OPENAI_API_KEY ? 'OPENAI_API_KEY is missing from server environment.' : 'Check server console for details.'
        });
    }
});

router.get('/history', authMiddleware, async (req, res) => {
    try {
        const user = (req as any).user;
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        let dbClient = supabase;
        if (token) {
            dbClient = createClient(supabaseUrl!, supabaseKey!, {
                global: { headers: { Authorization: `Bearer ${token}` } }
            });
        }

        const { data: extractions, error } = await dbClient
            .from('policy_extractions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Error fetching history:', error);
            return res.status(500).json({ error: 'Failed to fetch history' });
        }

        res.json({ success: true, extractions });

    } catch (error: any) {
        console.error('History Route Error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});



// ... existing imports

router.get('/health', async (req, res) => {
    const aiStatus = await checkAIHealth();
    res.json({
        server: 'online',
        openai: aiStatus,
        supabase_url: !!process.env.SUPABASE_URL,
        supabase_key: !!process.env.SUPABASE_KEY
    });
});

export default router;
