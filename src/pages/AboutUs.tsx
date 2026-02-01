import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Target, Lightbulb, Users, Shield, Zap, CheckCircle } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                src="/WRP-New LOGO.jpg"
                                alt="WearePratik Logo"
                                className="h-10 w-auto object-contain"
                            />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                                WearePratik
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                                Home
                            </Link>
                            <Link to="/features" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                                Features
                            </Link>
                            <Link to="/pricing" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                                Pricing
                            </Link>
                            <Link to="/about" className="text-blue-600 font-medium">
                                About
                            </Link>
                            <Link to="/contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                                Contact
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button className="bg-black text-white hover:bg-gray-800">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <Link to="/login">
                                <Button size="sm">Login</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                        About <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">WearePratik</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We're transforming how insurance professionals work with policy documents through
                        cutting-edge AI technology and intuitive design.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                                <Target className="h-4 w-4" />
                                <span className="text-sm font-semibold">Our Mission</span>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                Simplifying Insurance, One Policy at a Time
                            </h2>
                            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                                Insurance policies are complex, time-consuming, and often overwhelming. We believe
                                that shouldn't be the case. WearePratik was created to bridge the gap between complex
                                insurance documents and the people who need to understand them.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our mission is to empower insurance professionals with AI-powered tools that make
                                policy analysis faster, more accurate, and significantly more efficient.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-3xl opacity-20"></div>
                            <Card className="relative border-2 border-blue-100 shadow-xl">
                                <CardContent className="p-8">
                                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-100 rounded-xl flex items-center justify-center">
                                        <Target className="h-32 w-32 text-blue-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-3xl opacity-20"></div>
                            <Card className="relative border-2 border-purple-100 shadow-xl">
                                <CardContent className="p-8">
                                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                                        <Lightbulb className="h-32 w-32 text-purple-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
                                <Lightbulb className="h-4 w-4" />
                                <span className="text-sm font-semibold">Our Vision</span>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                The Future of Insurance Technology
                            </h2>
                            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                                We envision a world where every insurance professional has access to enterprise-grade
                                AI tools that eliminate tedious manual work and unlock valuable insights from policy data.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                By combining advanced natural language processing with intuitive user experience, we're
                                building the platform that will become the industry standard for policy management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <FileText className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Clarity</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Insurance information should be structured and easy to understand. We focus on turning complex policy documents into clear, readable formats that support accurate understanding and faster decisions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Empowerment</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    When information is accessible, people act with confidence. We equip professionals and users with tools that reduce dependency on back-and-forth explanations and allow them to work efficiently and independently.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <CheckCircle className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Transparency</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Everything we present is grounded in the policy itself. No assumptions. No reinterpretation. Our platform surfaces insurance information exactly as it exists, in a structured and traceable way.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Shield className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Trust</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Trust is earned through consistency and neutrality. wearepratik operates as an independent clarity layer, designed to support the insurance ecosystem without influencing outcomes or decisions.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Powered by Advanced AI
                        </h2>
                        <p className="text-xl text-slate-600">
                            Industry-leading technology stack for maximum accuracy and speed
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-1">Natural Language Processing</h4>
                                <p className="text-slate-600">Advanced NLP models extract meaning from complex policy language</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-1">Machine Learning</h4>
                                <p className="text-slate-600">Continuously improving accuracy through pattern recognition</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-1">Cloud Architecture</h4>
                                <p className="text-slate-600">Scalable, reliable infrastructure for enterprise needs</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-1">End-to-End Encryption</h4>
                                <p className="text-slate-600">Bank-level security protecting your sensitive documents</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Ready to Experience WearePratik?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals transforming their policy management workflow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/login">
                                <Button
                                    size="lg"
                                    className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 shadow-lg"
                                >
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button
                                    size="lg"
                                    className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
                                >
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <img
                                    src="/WRP-New LOGO.jpg"
                                    alt="WearePratik Logo"
                                    className="h-8 w-auto object-contain"
                                />
                                <span className="text-xl font-bold text-white">WearePratik</span>
                            </div>
                            <p className="text-slate-400">
                                Simplifying insurance policies with AI-powered intelligence.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><Link to="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
                        <p>&copy; 2026 WearePratik. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
