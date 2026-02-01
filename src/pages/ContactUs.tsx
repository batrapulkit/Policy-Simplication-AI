import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const ContactUs = () => {

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
                            <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                                About
                            </Link>
                            <Link to="/contact" className="text-blue-600 font-medium">
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
                        Get in <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Have questions about WearePratik? We'd love to hear from you. Send us a message and
                        we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Contact Info Cards */}
                        <Card className="border-2 border-blue-100 hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                                <p className="text-slate-600 mb-3">
                                    Our team is here to help you
                                </p>
                                <a href="mailto:support@policypal.com" className="text-blue-600 hover:text-blue-700 font-medium">
                                    support@policypal.com
                                </a>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                                    <Phone className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
                                <p className="text-slate-600 mb-3">
                                    Mon-Fri from 8am to 6pm EST
                                </p>
                                <a href="tel:+1-555-123-4567" className="text-blue-600 hover:text-blue-700 font-medium">
                                    +1 (555) 123-4567
                                </a>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-100 hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Us</h3>
                                <p className="text-slate-600 mb-3">
                                    Come say hello at our office
                                </p>
                                <address className="text-slate-700 not-italic">
                                    123 Innovation Drive<br />
                                    San Francisco, CA 94102
                                </address>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Business Hours Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <Card className="border-2 border-blue-100">
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Business Hours</h2>
                                <p className="text-slate-600">We're here to help during these hours</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">Monday - Friday</h4>
                                        <p className="text-slate-600">8:00 AM - 6:00 PM EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">Saturday</h4>
                                        <p className="text-slate-600">10:00 AM - 4:00 PM EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">Sunday</h4>
                                        <p className="text-slate-600">Closed</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">Response Time</h4>
                                        <p className="text-slate-600">Within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Don't wait! Start simplifying your policy management today with WearePratik.
                        </p>
                        <Link to="/login">
                            <Button
                                size="lg"
                                className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 shadow-lg"
                            >
                                Start Free Trial
                            </Button>
                        </Link>
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

export default ContactUs;
