import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    Sparkles,
    Brain,
    FileSearch,
    Users,
    Shield,
    Database,
    Zap,
    TrendingUp,
    Clock,
    CheckCircle,
    Download,
    BarChart3,
    Lock,
    Cloud,
    RefreshCw
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Extraction',
            description: 'Upload any policy document and watch our AI extract key information instantly.',
            color: 'from-indigo-500 to-blue-500',
            details: [
                'Automatic data extraction from PDFs',
                'Support for all major policy formats',
                'Multi-language document processing',
                '99.9% accuracy rate'
            ]
        },
        {
            icon: Brain,
            title: 'Intelligent Analysis',
            description: 'Get comprehensive insights and summaries from complex policy documents.',
            color: 'from-purple-500 to-indigo-500',
            details: [
                'Natural language summaries',
                'Risk assessment and analysis',
                'Coverage gap identification',
                'Policy comparison tools'
            ]
        },
        {
            icon: FileSearch,
            title: 'Smart Search',
            description: 'Find specific clauses, terms, and conditions across all your policies.',
            color: 'from-blue-500 to-cyan-500',
            details: [
                'Full-text search across all documents',
                'Semantic search capabilities',
                'Advanced filtering options',
                'Instant results'
            ]
        },
        {
            icon: Users,
            title: 'Client Management',
            description: 'Organize clients and their policies in one centralized dashboard.',
            color: 'from-cyan-500 to-teal-500',
            details: [
                'Unlimited client profiles',
                'Policy organization by client',
                'Client activity tracking',
                'Custom tags and categories'
            ]
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Track performance, coverage, and insights with powerful analytics.',
            color: 'from-teal-500 to-green-500',
            details: [
                'Real-time analytics',
                'Custom reports and exports',
                'Performance metrics',
                'Visual data representation'
            ]
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance to keep your data safe.',
            color: 'from-green-500 to-emerald-500',
            details: [
                'End-to-end encryption',
                'SOC 2 Type II compliance',
                'GDPR compliant',
                'Regular security audits'
            ]
        }
    ];

    const additionalFeatures = [
        { icon: Database, text: 'Unlimited document storage' },
        { icon: Zap, text: 'Lightning-fast processing' },
        { icon: TrendingUp, text: 'Continuous AI improvements' },
        { icon: Clock, text: 'Version history and backups' },
        { icon: Download, text: 'Bulk export capabilities' },
        { icon: Lock, text: 'Role-based access control' },
        { icon: Cloud, text: '99.99% uptime SLA' },
        { icon: RefreshCw, text: 'Automatic policy updates' }
    ];

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
                            <Link to="/features" className="text-indigo-600 font-medium">
                                Features
                            </Link>
                            <Link to="/pricing" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
                                Pricing
                            </Link>
                            <Link to="/about" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
                                About
                            </Link>
                            <Link to="/contact" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
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
                    <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                        Comprehensive Feature Set
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                        Everything You Need to
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Master Policy Management
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        Powerful features designed to streamline your workflow and maximize efficiency
                    </p>
                </div>
            </section>

            {/* Main Features */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="border-2 border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 group"
                            >
                                <CardHeader>
                                    <div className={`h-14 w-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-slate-900">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {feature.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start space-x-3">
                                                <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-700">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Features */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            And So Much More
                        </h2>
                        <p className="text-xl text-slate-600">
                            Additional features to supercharge your productivity
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {additionalFeatures.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all"
                            >
                                <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <item.icon className="h-5 w-5 text-indigo-600" />
                                </div>
                                <span className="text-slate-700 font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Seamless Integration
                    </h2>
                    <p className="text-xl text-slate-600 mb-12">
                        Works with the tools you already use
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {['PDF', 'Excel', 'Word', 'Cloud Storage', 'Email', 'CRM', 'API', 'Webhooks'].map((integration, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border-2 border-slate-100 hover:border-indigo-200 transition-all">
                                <p className="font-semibold text-slate-900">{integration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Ready to Experience All These Features?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Start your free trial today and see how We are Pratik transforms your workflow
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
                            <Link to="/pricing">
                                <Button
                                    size="lg"
                                    className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
                                >
                                    View Pricing
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

export default Features;
