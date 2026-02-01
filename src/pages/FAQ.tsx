import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const navigate = useNavigate();

    const faqs = [
        {
            question: "What is wearepratik today?",
            answer: "wearepratik currently offers a policy simplification tool designed to help insurance professionals quickly review and understand insurance documents. The tool converts complex policy language into structured, plain explanations to support faster, clearer workflows."
        },
        {
            question: "Who is the current tool built for?",
            answer: "The current version of wearepratik is built primarily for insurance professionals who regularly review policy documents as part of their work. This includes brokers, advisors, and other professionals who need clarity and efficiency when navigating policy details."
        },
        {
            question: "What problem does the policy simplification tool solve?",
            answer: "Insurance policies are lengthy, technical, and time-consuming to interpret. wearepratik reduces the time spent reviewing documents by presenting key information in a clear, structured format, helping professionals focus on decision-making rather than document interpretation."
        },
        {
            question: "Does wearepratik provide insurance advice or replace licensed professionals?",
            answer: "No. wearepratik does not provide insurance advice, make recommendations, or replace licensed professionals. The tool supports understanding and workflow efficiency only. All coverage decisions remain subject to the official policy and the insurer."
        },
        {
            question: "How is this different from using generic AI tools?",
            answer: "Unlike generic AI tools, wearepratik is purpose-built for insurance documents. The tool is designed around insurance structure, terminology, and workflow, ensuring consistent and relevant outputs rather than generalized responses."
        },
        {
            question: "What is next for wearepratik?",
            answer: "wearepratik is actively developing a broader insurance intelligent platform that will connect insureds, professionals, and service vendors in one ecosystem. Future releases will expand beyond simplification to support verification, collaboration, and end-to-end insurance workflows."
        }
    ];

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
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                        <HelpCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about wearepratik and how it works
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-700 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Contact Section */}
                <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
                    <p className="text-gray-700 mb-6">
                        Can't find the answer you're looking for? Please reach out to our team.
                    </p>
                    <Button
                        onClick={() => navigate('/contact')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Contact Us
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
