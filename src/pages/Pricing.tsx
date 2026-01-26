import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Check, X, Sparkles } from 'lucide-react';

const Pricing = () => {
    const plans = [
        {
            name: 'Starter',
            price: '29',
            period: 'month',
            description: 'Perfect for individuals and small teams getting started',
            popular: false,
            features: [
                { text: 'Up to 50 policy documents', included: true },
                { text: 'AI extraction and analysis', included: true },
                { text: 'Basic client management', included: true },
                { text: 'Email support', included: true },
                { text: 'Standard security', included: true },
                { text: 'Analytics dashboard', included: false },
                { text: 'API access', included: false },
                { text: 'Priority support', included: false },
                { text: 'Custom integrations', included: false }
            ],
            cta: 'Start Free Trial',
            color: 'from-slate-600 to-slate-700'
        },
        {
            name: 'Professional',
            price: '79',
            period: 'month',
            description: 'For growing businesses that need advanced features',
            popular: true,
            features: [
                { text: 'Up to 500 policy documents', included: true },
                { text: 'AI extraction and analysis', included: true },
                { text: 'Advanced client management', included: true },
                { text: 'Priority email & chat support', included: true },
                { text: 'Enhanced security', included: true },
                { text: 'Analytics dashboard', included: true },
                { text: 'API access', included: true },
                { text: 'Team collaboration (up to 5)', included: true },
                { text: 'Custom integrations', included: false }
            ],
            cta: 'Start Free Trial',
            color: 'from-indigo-600 to-blue-600'
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'For large organizations with custom needs',
            popular: false,
            features: [
                { text: 'Unlimited policy documents', included: true },
                { text: 'AI extraction and analysis', included: true },
                { text: 'Enterprise client management', included: true },
                { text: 'Dedicated account manager', included: true },
                { text: 'Enterprise-grade security', included: true },
                { text: 'Advanced analytics & reporting', included: true },
                { text: 'Full API access', included: true },
                { text: 'Unlimited team members', included: true },
                { text: 'Custom integrations', included: true }
            ],
            cta: 'Contact Sales',
            color: 'from-purple-600 to-indigo-600'
        }
    ];

    const faqs = [
        {
            question: 'Can I change plans anytime?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
        },
        {
            question: 'Is there a free trial?',
            answer: 'Absolutely! All plans come with a 14-day free trial. No credit card required to start.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and wire transfers for enterprise customers.'
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.'
        }
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
                            <Link to="/features" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
                                Features
                            </Link>
                            <Link to="/pricing" className="text-indigo-600 font-medium">
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
                        Simple, Transparent Pricing
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                        Choose the Perfect Plan
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            for Your Business
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        Start with a 14-day free trial. No credit card required. Cancel anytime.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative border-2 transition-all duration-300 ${plan.popular
                                    ? 'border-indigo-400 shadow-2xl scale-105'
                                    : 'border-slate-200 hover:border-indigo-200 hover:shadow-xl'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-1">
                                            <Sparkles className="h-3 w-3 inline mr-1" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}
                                <CardHeader className="text-center pb-8 pt-8">
                                    <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                                        {plan.name}
                                    </CardTitle>
                                    <p className="text-slate-600 mb-6">{plan.description}</p>
                                    <div className="mb-4">
                                        {plan.price === 'Custom' ? (
                                            <div className="text-4xl font-bold text-slate-900">Custom</div>
                                        ) : (
                                            <div className="flex items-baseline justify-center">
                                                <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                                                <span className="text-slate-600 ml-2">/{plan.period}</span>
                                            </div>
                                        )}
                                    </div>
                                    <Link to={plan.cta === 'Contact Sales' ? '/contact' : '/login'} className="block">
                                        <Button
                                            className={`w-full bg-black text-white hover:bg-gray-800 border-2 border-black py-6 text-lg`}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start space-x-3">
                                                {feature.included ? (
                                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <X className="h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5" />
                                                )}
                                                <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-slate-600">
                            Everything you need to know about pricing
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="border-2 border-slate-100">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-slate-900">
                                        {faq.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guarantee Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
                        <CardContent className="p-8 text-center">
                            <div className="h-16 w-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                30-Day Money-Back Guarantee
                            </h3>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Try We are Pratik risk-free. If you're not completely satisfied within the first 30 days,
                                we'll refund your money. No questions asked.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Our team is here to help you find the perfect plan for your needs
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button
                                    size="lg"
                                    className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 shadow-lg"
                                >
                                    Contact Sales
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button
                                    size="lg"
                                    className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
                                >
                                    Start Free Trial
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

export default Pricing;
