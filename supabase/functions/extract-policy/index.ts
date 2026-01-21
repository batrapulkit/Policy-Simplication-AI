import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pdfText, fileName } = await req.json();
    
    if (!pdfText) {
      return new Response(
        JSON.stringify({ error: 'No PDF text provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const OPENAI_MODEL = Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini';
    const GATEWAY_API_KEY = Deno.env.get('_API_KEY'); // legacy/gateway key

    if (!OPENAI_API_KEY && !GATEWAY_API_KEY) {
      console.error('No AI credentials configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the user token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error('User verification failed:', userError);
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing extraction for user:', user.id, 'file:', fileName);

    // Call AI to generate summary (prefers OpenAI if configured)
    const systemPrompt = `You are an expert insurance policy analyst. Analyze the provided policy text and extract key information in a structured JSON format.

Your response MUST be a valid JSON object with these exact fields:
- policy_overview: A 2-3 sentence summary of what the policy covers
- key_coverages: An array of strings listing the main coverages
- deductibles: An array of strings listing deductible amounts and what they apply to
- limits: An array of strings listing coverage limits
- exclusions: An array of strings listing what is NOT covered
- notes_for_client: A helpful note for the policyholder about important things to remember

Be specific and extract actual values from the text. If information is not found, indicate "Not specified in document".`;

    let response: Response;
    if (OPENAI_API_KEY) {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Please analyze this insurance policy document and extract the key information:\n\n${pdfText.slice(0, 30000)}` }
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        }),
      });
    } else {
      response = await fetch('https://ai.gateway..dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GATEWAY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Please analyze this insurance policy document and extract the key information:\n\n${pdfText.slice(0, 30000)}` }
          ],
          temperature: 0.3,
        }),
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI processing failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await response.json();
    const aiContent = aiData.choices?.[0]?.message?.content;

    if (!aiContent) {
      console.error('No AI content returned');
      return new Response(
        JSON.stringify({ error: 'AI returned no content' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON from AI response
    let summary;
    try {
      // Extract JSON from markdown code blocks if present
      let jsonStr = aiContent;
      const jsonMatch = aiContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
      }
      summary = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Content:', aiContent);
      // Create a fallback summary
      summary = {
        policy_overview: 'Unable to parse policy details. Please review the raw text.',
        key_coverages: ['See raw text for coverage details'],
        deductibles: ['See raw text for deductible information'],
        limits: ['See raw text for limit information'],
        exclusions: ['See raw text for exclusions'],
        notes_for_client: 'The AI was unable to fully parse this document. Please review the raw extracted text for details.',
      };
    }

    // Save to database
    const { data: extraction, error: insertError } = await supabase
      .from('policy_extractions')
      .insert({
        user_id: user.id,
        file_name: fileName,
        raw_text: pdfText.slice(0, 100000), // Limit text size
        summary: summary,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save extraction' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Extraction saved:', extraction.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        extraction: {
          id: extraction.id,
          fileName: extraction.file_name,
          summary: extraction.summary,
          createdAt: extraction.created_at,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Edge function error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
