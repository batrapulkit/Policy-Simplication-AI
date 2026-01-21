export interface User {
  id: string;
  email: string;
}

export interface PolicyExtraction {
  id: string;
  policyId: string;
  rawText: string;
  summaryJson: PolicySummary | null;
  createdAt: string;
  fileName?: string;
}

export interface PolicySummary {
  // Core Policy Identification
  insurer_company: string;
  policy_number: string;
  policy_type: string;

  // Important Dates
  policy_start_date: string;
  policy_end_date: string;
  issue_date?: string;

  // Policyholder Information
  policyholder_name?: string;
  policyholder_address?: string;
  policyholder_email?: string;

  // Insurer Contact Information
  insurer_address?: string;
  insurer_email?: string;
  insurer_website?: string;
  insurer_contacts?: string[];

  // Coverage & Financial Details
  policy_overview: string;
  key_coverages: string[];
  deductibles: string[];
  limits: string[];
  premium_amount?: string;

  // Important Policy Details
  exclusions: string[];
  important_conditions: string[];

  // Client Notes
  notes_for_client: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
  policiesCount?: number;
}

export interface Policy {
  id: string;
  clientId: string;
  policyNumber: string;
  carrier: string;
  effectiveDate: string;
  expiryDate: string;
  pdfUrl?: string;
  client?: Client;
  extraction?: PolicyExtraction;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}