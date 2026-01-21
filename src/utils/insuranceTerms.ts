/**
 * Insurance term definitions for tooltips
 * Maps insurance terms to their concise, user-friendly definitions
 */
export const insuranceTermDefinitions: Record<string, string> = {
    // Coverage Types
    'Liability Coverage': 'Protection for damages you\'re legally responsible for causing to others',
    'Accident Benefits Coverage': 'Compensation for medical costs and lost income after an accident',
    'Uninsured Automobile Coverage': 'Protection when hit by an uninsured or underinsured driver',
    'Uninsured Motorist Coverage': 'Protection when hit by an uninsured or underinsured driver',
    'Direct Compensation for Property Damage': 'Coverage for damage to your vehicle by another driver at fault',
    'Direct Compensation': 'Coverage for damage to your vehicle by another driver at fault',
    'Collision Coverage': 'Coverage for damage to your vehicle from collisions',
    'Comprehensive Coverage': 'Coverage for vehicle damage from non-collision events like theft or weather',
    'Property Damage Coverage': 'Coverage for damage to other people\'s property',
    'Bodily Injury Coverage': 'Coverage for injuries you cause to other people',
    'Medical Payments Coverage': 'Coverage for medical expenses regardless of who is at fault',
    'Personal Injury Protection': 'Coverage for medical expenses and lost wages regardless of fault',
    'Rental Car Coverage': 'Coverage for rental car costs while your vehicle is being repaired',
    'Towing Coverage': 'Coverage for towing and roadside assistance services',

    // General Terms
    'Deductible': 'Amount you pay out-of-pocket before insurance covers the rest',
    'Deductibles': 'Amount you pay out-of-pocket before insurance covers the rest',
    'Premium': 'The amount you pay for insurance coverage',
    'Premiums': 'The amount you pay for insurance coverage',
    'Coverage Limit': 'Maximum amount the insurance will pay for a covered claim',
    'Coverage Limits': 'Maximum amount the insurance will pay for a covered claim',
    'Policy Limit': 'Maximum amount the insurance will pay for a covered claim',
    'Exclusion': 'Specific conditions or circumstances not covered by the policy',
    'Exclusions': 'Specific conditions or circumstances not covered by the policy',
    'Endorsement': 'Amendment or addition to the insurance policy',
    'Endorsements': 'Amendments or additions to the insurance policy',
    'Policyholder': 'The person who owns the insurance policy',
    'Insured': 'Person or property covered by the insurance policy',
    'Insurer': 'The insurance company providing coverage',
    'Claim': 'Request for payment under the insurance policy',
    'Underwriting': 'Process of evaluating risk to determine coverage terms',

    // Specific Situations
    'Excluded Driver': 'A named person who is not covered to drive the insured vehicle',
    'Excluded Drivers': 'Named persons who are not covered to drive the insured vehicle',
    'Driving Without Permission': 'Operating the vehicle without the owner\'s consent',
    'Rented or Leased Automobile': 'A vehicle obtained through rental or lease agreement',
    'Garage Workers': 'Employees who service or repair vehicles in a garage or shop',
    'War Activities': 'Damages resulting from war, invasion, or military actions',
    'Named Driver': 'A specific person listed on the policy as an authorized driver',
    'Named Insured': 'The primary person or entity covered by the policy',
    'Loss of Use': 'Coverage for expenses when you cannot use your vehicle due to covered damage',
    'Depreciation': 'Reduction in vehicle value over time due to age and wear',
    'Actual Cash Value': 'Current market value of the vehicle minus depreciation',
    'Replacement Cost': 'Cost to replace damaged property with new items of similar quality',
};

/**
 * Detects if a text string contains any known insurance terms
 * @param text The text to search for insurance terms
 * @returns The insurance term if found, null otherwise
 */
export function findInsuranceTerm(text: string): string | null {
    // Sort terms by length (descending) to match longer terms first
    const sortedTerms = Object.keys(insuranceTermDefinitions).sort(
        (a, b) => b.length - a.length
    );

    for (const term of sortedTerms) {
        // Case-insensitive search for the term
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        if (regex.test(text)) {
            return term;
        }
    }

    return null;
}

/**
 * Gets the definition for an insurance term
 * @param term The insurance term to get the definition for
 * @returns The definition if found, null otherwise
 */
export function getTermDefinition(term: string): string | null {
    return insuranceTermDefinitions[term] || null;
}
