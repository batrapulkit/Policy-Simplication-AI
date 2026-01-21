import { PolicyExtraction, PolicySummary } from '@/types';

const STORAGE_KEY = 'policy_extractions';

export const extractionsStorage = {
  getAll(): PolicyExtraction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(extraction: PolicyExtraction): void {
    const extractions = this.getAll();
    const index = extractions.findIndex(e => e.id === extraction.id);
    if (index >= 0) {
      extractions[index] = extraction;
    } else {
      extractions.unshift(extraction);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extractions));
  },

  delete(id: string): void {
    const extractions = this.getAll().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extractions));
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};

// Mock AI processing - simulates PDF text extraction and summary generation
export const mockPdfProcessor = {
  async extractText(file: File): Promise<string> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `INSURANCE POLICY DOCUMENT
    
Policy Document: ${file.name}
File Size: ${(file.size / 1024).toFixed(2)} KB
Processed: ${new Date().toISOString()}

[This is simulated extracted text from your PDF document. In production, this would contain the actual text extracted from the uploaded PDF using pdf-parse or similar library.]

DECLARATIONS PAGE
Named Insured: [Extracted from document]
Policy Number: [Extracted from document]
Policy Period: [Extracted from document]

COVERAGE SUMMARY
The policy provides coverage for various insured events as outlined in the policy declarations and endorsements.

LIMITS AND DEDUCTIBLES
Coverage limits and deductibles as specified in the declarations page.

EXCLUSIONS
Standard policy exclusions apply as detailed in the policy forms.`;
  },

  async generateSummary(rawText: string, fileName: string): Promise<PolicySummary> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      policy_overview: `This policy document (${fileName}) provides comprehensive coverage as outlined in the declarations page. The policy includes standard terms and conditions with specific endorsements tailored to the insured's needs.`,
      key_coverages: [
        'Property damage coverage for owned and rented premises',
        'General liability protection for third-party claims',
        'Business interruption coverage',
        'Equipment breakdown protection',
        'Cyber liability coverage (if endorsed)',
      ],
      deductibles: [
        'Standard deductible applies per occurrence',
        'Higher deductible for specific perils as noted',
        'Aggregate deductible for certain coverage types',
      ],
      limits: [
        'Per occurrence limit as stated in declarations',
        'Annual aggregate limit applies',
        'Sub-limits may apply to specific coverages',
        'Combined single limit for certain coverages',
      ],
      exclusions: [
        'Intentional acts by the insured',
        'War, terrorism, and nuclear hazards',
        'Wear and tear, gradual deterioration',
        'Pollution (unless specifically endorsed)',
        'Professional liability (separate coverage required)',
      ],
      notes_for_client: 'Review the policy declarations page carefully for specific limits and deductibles. Consider additional coverage for gaps identified. Contact your agent for any coverage questions or to request policy changes.',
    };
  },
};