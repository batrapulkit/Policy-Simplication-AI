import { z } from 'zod';

const AISummarySchema = z.object({
    // Core Policy Identification
    insurer_company: z.string().nullish(),
    policy_number: z.string().nullish(),
    policy_type: z.string().nullish(),

    // Important Dates
    policy_start_date: z.string().nullish(),
    policy_end_date: z.string().nullish(),
    issue_date: z.string().nullish(),

    // Policyholder Information
    policyholder_name: z.string().nullish(),
    policyholder_address: z.string().nullish(),
    policyholder_email: z.string().nullish(),

    // Insurer Contact Information
    insurer_address: z.string().nullish(),
    insurer_email: z.string().nullish(),
    insurer_website: z.string().nullish(),
    insurer_contacts: z.array(z.string()).default([]),

    // Coverage & Financial Details
    policy_overview: z.string().nullish(),
    key_coverages: z.array(z.string()).default([]),
    deductibles: z.array(z.string()).default([]),
    limits: z.array(z.string()).default([]),
    premium_amount: z.string().nullish(),

    // Important Policy Details
    exclusions: z.array(z.string()).default([]),
    important_conditions: z.array(z.string()).default([]),

    // Client Notes
    notes_for_client: z.union([z.string(), z.array(z.string())])
        .transform(val => Array.isArray(val) ? val.join('\n\n') : val)
        .nullish(),
}).passthrough();

export type AISummary = z.infer<typeof AISummarySchema>;

const SYSTEM_PROMPT = `You are an expert insurance policy analyst. Your goal is to extract structured data from policy documents with high precision.

**CRITICAL RULES:**
1.  **Extract as much as possible.** If a field is not explicitly labeled but can be confidently inferred (e.g., "Annual Premium" from a total amount), extract it.
2.  **Handle Lists Intelligently.** "Key Coverages", "Exclusions", and "Conditions" are often found in bullet points, tables, or dense paragraphs. Break them down into clear, separate string items.
3.  **No Generic Defaults.** Do NOT return strings like "Not specified", "Valued Client", "Unknown", "TBD", or "Commercial Insurance" unless explicitly written in the document. If a field is not found, return null or an empty string. BE STRICT.
4.  **Policy Type:** Analyze the content to determine if it is: Commercial Property, General Liability, Workers Comp, Cyber, Auto, etc. If the type is not clear, leave it empty.

**OUTPUT JSON FORMAT:**

**Core Policy Identification:**
- insurer_company: The carrier name (e.g., "Chubb", "Travelers", "The Hartford"). Look for headers or logos.
- policy_number: The contract number.
- policy_type: The specific line of business.

**Important Dates:**
- policy_start_date: Effective date.
- policy_end_date: Expiration date.
- issue_date: Date of issuance.

**Policyholder Information:**
- policyholder_name: The "Insured" name.
- policyholder_address: The address of the insured.
- policyholder_email: The email of the insured.

**Insurer Information:**
- insurer_address: The address of the insurance company.
- insurer_email: The email of the insurance company.
- insurer_website: The website of the insurance company.
- insurer_contacts: List of phone numbers or contact names for the insurer.

**Coverage & Financial Details:**
- policy_overview: A 2-3 sentence summary of the risk and coverage scope. "This Commercial Property policy covers..."
- key_coverages: LIST of specific coverages found (e.g., "Building: $500k", "BPP: $100k").
- deductibles: LIST of deductibles (e.g., "$1,000 All Perils").
- limits: LIST of aggregation limits (e.g., "$2M General Aggregate").
- premium_amount: The Total Policy Premium. Explicitly state the frequency, e.g., "$120 Annually" or "$50 Monthly".

**Important Policy Details:**
- exclusions: LIST of specific excluded losses (e.g., "Earthquake", "Flood", "Mold").
- important_conditions: LIST of key clauses (e.g., "Coinsurance: 80%", "Protective Safeguards Endorsement").

**Client Notes:**
- notes_for_client: A professional summary of 3-4 key takeaways or warnings for the broker/client.`;

export async function extractPolicyData(text: string): Promise<AISummary> {
    const apiKey = process.env.OPENAI_API_KEY;
    console.log(`[AI-Service] Using OpenAI key: ${apiKey ? 'Yes (starts with ' + apiKey.substring(0, 3) + '...)' : 'NO'}`);
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not configured in the server environment.');
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minute timeout for o1

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'o1', // Reasoning model
                messages: [
                    { role: 'user', content: `${SYSTEM_PROMPT}\n\nPlease analyze this insurance policy document and extract the key information:\n\n${text.slice(0, 100000)}` }
                ],
                // temperature: 1, // o1 fixed at 1
                response_format: { type: 'json_object' }
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenAI API Error:', response.status, errorText);
            throw new Error(`OpenAI API failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json() as any;
        console.log('[AI-Service] OpenAI Response Data:', JSON.stringify(data, null, 2));
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            console.error('[AI-Service] No content in OpenAI response!');
            throw new Error('OpenAI returned empty content.');
        }

        console.log('[AI-Service] Raw AI Content:', content);
        const parsed = JSON.parse(content);
        console.log('[AI-Service] Parsed JSON:', JSON.stringify(parsed, null, 2));

        // Flatten any nested objects (sections) into the top level
        // The AI often returns logical groupings like "Core Policy Identification": { ... }
        // but our Zod schema expects a flat structure.
        let flattened = { ...parsed };
        Object.keys(parsed).forEach(key => {
            const value = parsed[key];
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // Spread the nested object's keys into the top level
                flattened = { ...flattened, ...value };
            }
        });

        console.log('[AI-Service] Flattened JSON for Validation:', JSON.stringify(flattened, null, 2));

        const result = AISummarySchema.parse(flattened);
        console.log('[AI-Service] Final validated result:', JSON.stringify(result, null, 2));
        return result;

    } catch (error: any) {
        console.error('AI Service Error:', error);
        // Fallback if parsing fails or AI fails
        throw error;

    }
}

export async function checkAIHealth(): Promise<{ status: 'ok' | 'error', message?: string }> {
    if (!process.env.OPENAI_API_KEY) {
        return { status: 'error', message: 'OPENAI_API_KEY missing' };
    }
    try {
        const response = await fetch('https://api.openai.com/v1/models', {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        if (response.ok) return { status: 'ok' };
        return { status: 'error', message: `OpenAI API returned ${response.status}` };
    } catch (e: any) {
        return { status: 'error', message: e.message };
    }
}
