import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">PRIVACY POLICY</h1>
                    <p className="text-xl text-gray-600">wearepratik – Insurance Intelligent Platform</p>
                    <p className="text-sm text-gray-500 mt-2">Effective Date: January 31, 2026</p>
                </div>

                {/* Privacy Policy Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                        <div className="text-gray-700 space-y-3">
                            <p>
                                wearepratik ("we," "us," "our") is an insurance intelligent platform designed to help users, professionals, and vendors clarify, summarize, and organize insurance information. Protecting privacy and personal information is fundamental to our operations.
                            </p>
                            <p>
                                This Privacy Policy explains how we collect, use, store, disclose, and safeguard information when you access or use our website, application, or services (collectively, the "Platform").
                            </p>
                            <p>
                                wearepratik complies with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA), and follows industry best practices.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">A. Information You Provide Directly</h3>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Account Information</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number (optional)</li>
                            <li>Profile photo (optional)</li>
                            <li>Account type (User, Professional, Vendor)</li>
                        </ul>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Professional or Vendor Information</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Business or company name</li>
                            <li>Business description</li>
                            <li>Website or public contact links</li>
                            <li>Service category</li>
                            <li>Proof of insurance documents (where applicable)</li>
                        </ul>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Insurance Documents</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Insurance policy documents (auto, home, health, life, business, etc.)</li>
                            <li>Declarations pages</li>
                            <li>Endorsements, renewals, or related insurance records</li>
                        </ul>
                        <p className="text-gray-700 mt-3 italic">
                            Why this information is collected: To enable accurate policy clarification, summarization, verification context, and AI-assisted guidance tied directly to the user's uploaded policies.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">B. Automatically Collected Information</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>IP address</li>
                            <li>Device and browser type</li>
                            <li>Usage activity and session logs</li>
                            <li>Time and date of access</li>
                        </ul>
                        <p className="text-gray-700 mt-3 italic">
                            Why this information is collected: To secure the Platform, prevent misuse, improve performance, and maintain system reliability.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-700 mb-3">We use information strictly to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Create and manage user accounts</li>
                            <li>Analyze and simplify uploaded insurance documents</li>
                            <li>Provide AI-assisted explanations and summaries</li>
                            <li>Maintain platform security and integrity</li>
                            <li>Improve user experience and platform functionality</li>
                            <li>Communicate important service-related notices</li>
                        </ul>
                        <p className="text-gray-700 mt-4 font-semibold">
                            wearepratik does not sell personal data. Uploaded insurance documents are not used for advertising or public AI training.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. AI and Document Processing</h2>
                        <p className="text-gray-700 mb-3">
                            Uploaded insurance documents are processed using automated systems to extract and structure information for the user's benefit.
                        </p>
                        <p className="text-gray-700 mb-2 font-semibold">Key principles:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Documents remain tied to the user's account</li>
                            <li>AI outputs are generated only from uploaded materials</li>
                            <li>No document is shared publicly without user action</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Storage and Security</h2>
                        <p className="text-gray-700 mb-3">wearepratik uses industry-standard security measures, including:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Encrypted data storage</li>
                            <li>Secure infrastructure</li>
                            <li>Access controls and monitoring</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            While no system can guarantee absolute security, reasonable safeguards are applied to protect data against unauthorized access, loss, or misuse.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sharing of Information</h2>
                        <p className="text-gray-700 mb-3">Information may be shared only:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>When required by law or regulatory authorities</li>
                            <li>To protect legal rights or platform integrity</li>
                            <li>When explicitly authorized by the user</li>
                        </ul>
                        <p className="text-gray-700 mt-4 font-semibold">
                            Insurance documents are never shared without consent.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
                        <p className="text-gray-700 mb-3">Information is retained only as long as necessary to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Provide services</li>
                            <li>Meet legal obligations</li>
                            <li>Resolve disputes</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Users may request account and document deletion at any time.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
                        <p className="text-gray-700 mb-3">You have the right to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                            <li>Access your personal information</li>
                            <li>Correct inaccuracies</li>
                            <li>Request deletion</li>
                            <li>Withdraw consent</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Requests can be submitted to: <a href="mailto:Info@wearepratik.com" className="text-blue-600 hover:underline font-semibold">Info@wearepratik.com</a>
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
                        <p className="text-gray-700">
                            This Privacy Policy may be updated periodically. Continued use of the Platform constitutes acceptance of any updates.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
                        <p className="text-gray-700">
                            For privacy-related inquiries: <a href="mailto:Info@wearepratik.com" className="text-blue-600 hover:underline font-semibold">Info@wearepratik.com</a>
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

export default PrivacyPolicy;
