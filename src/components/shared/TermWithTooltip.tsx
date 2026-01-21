import { findInsuranceTerm, getTermDefinition } from '@/utils/insuranceTerms';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface TermWithTooltipProps {
    text: string;
    className?: string;
}

/**
 * Component that automatically detects insurance terms in text and adds tooltips with definitions
 */
export function TermWithTooltip({ text, className }: TermWithTooltipProps) {
    const term = findInsuranceTerm(text);
    const definition = term ? getTermDefinition(term) : null;

    // If no term found, return plain text
    if (!term || !definition) {
        return <span className={className}>{text}</span>;
    }

    // Find the term in the original text (case-insensitive) to preserve original casing
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    const match = text.match(regex);

    if (!match) {
        return <span className={className}>{text}</span>;
    }

    const matchedTerm = match[0];
    const startIndex = match.index!;
    const endIndex = startIndex + matchedTerm.length;

    // Split text into before, term, and after
    const before = text.substring(0, startIndex);
    const after = text.substring(endIndex);

    return (
        <span className={className}>
            {before}
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <span className="border-b border-dotted border-muted-foreground/40 cursor-help">
                        {matchedTerm}
                    </span>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    className="max-w-xs text-xs"
                    sideOffset={5}
                >
                    {definition}
                </TooltipContent>
            </Tooltip>
            {after}
        </span>
    );
}
