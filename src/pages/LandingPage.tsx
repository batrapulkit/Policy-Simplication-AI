import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Sparkles, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LandingPage = () => {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'waitlist' | 'pilot'>('waitlist');
    const [formData, setFormData] = useState({ name: '', email: '' });
    const { toast } = useToast();

    const openDialog = (type: 'waitlist' | 'pilot') => {
        setDialogType(type);
        setIsWaitlistOpen(true);
    };

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { error } = await (supabase
                .from('waitlist' as any) as any)
                .insert([
                    {
                        full_name: formData.name,
                        email: formData.email,
                        type: dialogType
                    }
                ]);

            if (error) throw error;

            toast({
                title: dialogType === 'pilot' ? "Pilot Application Received!" : "You're on the list!",
                description: dialogType === 'pilot'
                    ? "Thanks for your interest. We'll contact you shortly to set up your trial."
                    : "Thanks for joining. We'll be in touch soon.",
                duration: 5000,
            });

            setIsWaitlistOpen(false);
            setFormData({ name: '', email: '' });

        } catch (error: any) {
            console.error('Error submitting to waitlist:', error);
            toast({
                title: "Something went wrong",
                description: error.message || "Failed to join. Please try again later.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <img
                                src="/WRP-New LOGO.jpg"
                                alt="WearePratik Logo"
                                className="h-10 w-auto object-contain"
                            />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                WearePratik
                            </span>
                        </div>
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
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Link to="/login">
                                <Button size="sm">Login</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 animate-fade-in">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-semibold">AI-Powered Policy Analysis</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                            Simplify Insurance Policies
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                                with AI Intelligence
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Extract, analyze, and manage insurance policies effortlessly. Our AI transforms complex documents
                            into clear, actionable insights in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/login">
                                <Button
                                    size="lg"
                                    className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                                >
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-lg px-8 py-6 border-2 border-blue-200 hover:bg-blue-50"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image/Illustration Placeholder */}
                    <div className="mt-20 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-3xl opacity-20"></div>
                        <div className="relative bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-2xl">
                            <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                                <FileText className="h-24 w-24 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Powerful Features for Modern Insurance Management
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Everything you need to streamline your policy management workflow
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Sparkles className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Extraction</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Upload any policy document and let our AI instantly extract key information, terms, and coverage details.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Analysis</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Get comprehensive summaries and insights from complex policy documents in plain language you can understand.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Client Management</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Organize all your clients and their policies in one centralized, easy-to-navigate dashboard.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 4 */}
                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Shield className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure Storage</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Bank-level encryption ensures your sensitive policy documents are always protected and compliant.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 5 */}
                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Analytics Dashboard</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Track policy performance, coverage gaps, and client insights with powerful analytics and reporting.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 6 */}
                        <Card className="border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="pt-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Zap className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Process hundreds of policies in minutes, not hours. Save time and focus on what matters most.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Professional Pilot Program Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border-2 border-blue-200 rounded-3xl p-12 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                                <Users className="h-4 w-4" />
                                <span className="text-sm font-semibold">Now Open</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                Professional Pilot Program
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                WearePRATIK is launching an open 30-day pilot program for insurance professionals.
                            </p>
                        </div>
                        <div className="space-y-6 text-slate-700 leading-relaxed">
                            <p>
                                During this pilot, professionals can use our policy simplification tool at no cost while we actively gather feedback to improve clarity, accuracy, and workflow efficiency. The goal is simple: build a tool that genuinely supports professionals in explaining policies faster, reducing back-and-forth, and delivering a better experience to their clients.
                            </p>
                            <p>
                                Feedback shared during this pilot will directly shape how the platform evolves, ensuring it aligns with real-world professional needs before full rollout.
                            </p>
                            <p className="font-semibold">
                                At the end of the 30-day pilot, the program will transition out of beta and a pricing model will be introduced based on usage, value delivered, and insights gathered during this phase.
                            </p>
                        </div>
                        <div className="mt-8 text-center">
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
                                onClick={() => openDialog('pilot')}
                            >
                                Join the Pilot Program
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join the Waitlist Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-semibold">Coming Soon</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Join the Waitlist
                    </h2>
                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        We are building the next stage of WearePRATIK — a unified insurance intelligence platform connecting insureds, professionals, and vendors in one place.
                    </p>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        Join the waitlist to receive early access, updates on new features, and the opportunity to shape the platform before public launch.
                    </p>
                    <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
                        onClick={() => openDialog('waitlist')}
                    >
                        Join the Waitlist
                    </Button>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Ready to Transform Your Workflow?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                Join thousands of insurance professionals who trust WearePratik to simplify their policy management.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/login">
                                    <Button
                                        size="lg"
                                        className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 shadow-lg"
                                    >
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button
                                        size="lg"
                                        className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
                                    >
                                        Contact Sales
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Waitlist Dialog */}
            <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <img
                                src="/WRP-New LOGO.jpg"
                                alt="WearePratik Logo"
                                className="h-12 object-contain"
                            />
                        </div>
                        <DialogTitle className="text-center text-2xl font-bold">
                            {dialogType === 'pilot' ? 'Join the Pilot Program' : 'Join the Waitlist'}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {dialogType === 'pilot'
                                ? 'Start your 30-day free trial.'
                                : 'Be the first to know when our unified platform launches.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleWaitlistSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter your full name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <DialogFooter className="mt-6">
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                {dialogType === 'pilot' ? 'Join Pilot' : 'Join Waitlist'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

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

export default LandingPage;
