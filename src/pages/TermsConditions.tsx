import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <img
                        src="/WRP-New LOGO.jpg"
                        alt="wearepratik Logo"
                        className="h-12 object-contain"
                    />
                </div>
            </header>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <img
                        src="/WRP-New LOGO.jpg"
                        alt="wearepratik Logo"
                        className="h-24 mx-auto mb-6 object-contain"
                    />
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">TERMS AND CONDITIONS</h1>
                    <p className="text-xl text-gray-600">wearepratik – Insurance Intelligent Platform</p>
                    <p className="text-sm text-gray-500 mt-2">Effective Date: January 31, 2026</p>
                </div>

                {/* Terms Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700">
                            By accessing or using wearepratik, you agree to these Terms and Conditions. If you do not agree, do not use the Platform.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Platform Purpose</h2>
                        <p className="text-gray-700 mb-3 font-semibold">wearepratik provides:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Insurance document simplification and organization</li>
                            <li>AI-assisted explanations for informational purposes</li>
                            <li>A marketplace framework connecting users, professionals, and vendors</li>
                        </ul>
                        <p className="text-gray-700 mb-3 mt-4 font-semibold">wearepratik does not:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Provide legal, insurance, or financial advice</li>
                            <li>Replace insurers, brokers, or licensed professionals</li>
                            <li>Bind coverage or approve claims</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
                        <p className="text-gray-700 mb-3">Users agree to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Upload only documents they are authorized to use</li>
                            <li>Provide accurate and lawful information</li>
                            <li>Protect login credentials</li>
                            <li>Use the Platform lawfully</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. No Professional Advice</h2>
                        <p className="text-gray-700">
                            All outputs are provided for informational purposes only. Users must consult insurers, brokers, or licensed professionals for official guidance, coverage confirmation, or claims decisions.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. AI Limitations</h2>
                        <p className="text-gray-700 mb-3">AI-generated outputs:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Are based solely on uploaded documents</li>
                            <li>May not capture every policy nuance</li>
                            <li>Do not replace official policy wording</li>
                        </ul>
                        <p className="text-gray-700 mt-4 font-semibold">
                            The insurance policy issued by the insurer always governs.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
                        <p className="text-gray-700">
                            All content, branding, software, and design elements belong to wearepratik. Unauthorized reproduction or use is prohibited.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Account Termination</h2>
                        <p className="text-gray-700 mb-3">wearepratik may suspend or terminate accounts for:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Misuse</li>
                            <li>Fraud</li>
                            <li>Violation of these Terms</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Users may delete their accounts at any time.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
                        <p className="text-gray-700 mb-3">To the fullest extent permitted by law, wearepratik is not liable for:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Decisions made based on platform outputs</li>
                            <li>Coverage disputes or claim outcomes</li>
                            <li>Losses outside reasonable control</li>
                        </ul>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
                        <p className="text-gray-700">
                            These Terms are governed by the laws of Canada, including applicable provincial laws.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
                        <p className="text-gray-700">
                            For legal or platform inquiries: <a href="mailto:Info@wearepratik.com" className="text-blue-600 hover:underline font-semibold">Info@wearepratik.com</a>
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-600">
                    <p>© 2026 wearepratik. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
