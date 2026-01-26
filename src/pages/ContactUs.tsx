import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactUs = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <FileText className="h-8 w-8 text-indigo-600" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                We are Pratik
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
                                Home
                            </Link>
                            <Link to="/features" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
                                Features
                            </Link>
                            <Link to="/pricing" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
                                Pricing
                            </Link>
                            <Link to="/about" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
                                About
                            </Link>
                            <Link to="/contact" className="text-indigo-600 font-medium">
                                Contact
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
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
                        Get in <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Have questions about We are Pratik? We'd love to hear from you. Send us a message and
                        we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="border-2 border-indigo-100 hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                                    <p className="text-slate-600 mb-3">
                                        Our team is here to help you
                                    </p>
                                    <a href="mailto:support@policypal.com" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                        support@policypal.com
                                    </a>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
                                    <p className="text-slate-600 mb-3">
                                        Mon-Fri from 8am to 6pm EST
                                    </p>
                                    <a href="tel:+1-555-123-4567" className="text-indigo-600 hover:text-indigo-700 font-medium">
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

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-2 border-slate-100 shadow-xl">
                                <CardContent className="pt-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="name" className="text-slate-900 font-medium mb-2 block">
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-slate-200 focus:border-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-slate-900 font-medium mb-2 block">
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-slate-200 focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="subject" className="text-slate-900 font-medium mb-2 block">
                                                Subject
                                            </Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                placeholder="How can we help you?"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="border-slate-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="message" className="text-slate-900 font-medium mb-2 block">
                                                Message
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="Tell us more about your inquiry..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="border-slate-200 focus:border-indigo-500 resize-none"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-black text-white hover:bg-gray-800 border-2 border-black text-lg py-6"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center">
                                                    <Send className="h-5 w-5 mr-2" />
                                                    Send Message
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Hours Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <Card className="border-2 border-indigo-100">
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Business Hours</h2>
                                <p className="text-slate-600">We're here to help during these hours</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">Monday - Friday</h4>
                                        <p className="text-slate-600">8:00 AM - 6:00 PM EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">Saturday</h4>
                                        <p className="text-slate-600">10:00 AM - 4:00 PM EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">Sunday</h4>
                                        <p className="text-slate-600">Closed</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
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
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Don't wait! Start simplifying your policy management today with We are Pratik.
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
                                <FileText className="h-6 w-6 text-indigo-400" />
                                <span className="text-xl font-bold text-white">We are Pratik</span>
                            </div>
                            <p className="text-slate-400">
                                Simplifying insurance policies with AI-powered intelligence.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><Link to="/features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                                <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
                        <p>&copy; 2026 We are Pratik. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ContactUs;
