import React from 'react';
import { PolicySummary } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Shield,
    FileText,
    User,
    Building2,
    DollarSign,
    AlertTriangle,
    Info,
    CheckCircle2,
    AlertCircle,
    FileCheck
} from 'lucide-react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TermWithTooltip } from '@/components/shared/TermWithTooltip';

interface ExtractionResultGridProps {
    summary: PolicySummary;
    id?: string;
}

export function ExtractionResultGrid({ summary, id }: ExtractionResultGridProps) {
    // Ensure we ALWAYS have an ID, even if not provided
    const displayId = React.useMemo(() => {
        return id || crypto.randomUUID();
    }, [id]);

    return (
        <TooltipProvider>
            <div className="space-y-6 animate-fade-in">

                {/* Grid for All Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* 1. Line of Business */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <FileText className="h-4 w-4 text-primary" />
                                        Line of Business
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge variant="outline" className="text-base font-medium px-3 py-1">
                                        {summary.policy_type}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>The specific line of business for this policy.</TooltipContent>
                    </Tooltip>

                    {/* 2. Insured's Information */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <User className="h-4 w-4 text-blue-500" />
                                        Insured's Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-semibold block">{summary.policyholder_name || "N/A"}</span>
                                    </div>
                                    {summary.policyholder_address && (
                                        <div className="text-muted-foreground">{summary.policyholder_address}</div>
                                    )}
                                    {summary.policyholder_email && (
                                        <div className="text-muted-foreground">{summary.policyholder_email}</div>
                                    )}
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Details about the insured entity.</TooltipContent>
                    </Tooltip>

                    {/* 3. Policy Information */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <FileCheck className="h-4 w-4 text-green-500" />
                                        Policy Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Effective Dates</span>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="font-medium">{summary.policy_start_date}</span>
                                            <span className="text-muted-foreground">to</span>
                                            <span className="font-medium">{summary.policy_end_date}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Coverage start and end dates.</TooltipContent>
                    </Tooltip>

                    {/* 4. Insurance Company */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Building2 className="h-4 w-4 text-purple-500" />
                                        Insurance Company
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="font-semibold text-base">{summary.insurer_company}</div>

                                    {summary.insurer_address && (
                                        <div className="text-muted-foreground flex items-start gap-2">
                                            <span className="shrink-0">📍</span>
                                            <span>{summary.insurer_address}</span>
                                        </div>
                                    )}

                                    {summary.insurer_email && (
                                        <div className="text-muted-foreground flex items-center gap-2">
                                            <span className="shrink-0">✉️</span>
                                            <span>{summary.insurer_email}</span>
                                        </div>
                                    )}

                                    {summary.insurer_website && (
                                        <div className="text-muted-foreground flex items-center gap-2">
                                            <span className="shrink-0">🌐</span>
                                            <a href={summary.insurer_website} target="_blank" rel="noreferrer" className="hover:underline text-primary">
                                                {summary.insurer_website}
                                            </a>
                                        </div>
                                    )}

                                    {summary.insurer_contacts && summary.insurer_contacts.length > 0 && (
                                        <div className="text-muted-foreground flex items-start gap-2">
                                            <span className="shrink-0">📞</span>
                                            <div className="flex flex-col">
                                                {summary.insurer_contacts.map((contact, i) => (
                                                    <span key={i}>{contact}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Insurer contact details.</TooltipContent>
                    </Tooltip>

                    {/* 5. Summary Information (ID) */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Info className="h-4 w-4 text-slate-500" />
                                        Summary Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Summary ID</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="font-mono text-sm bg-muted/50 p-1.5 rounded border select-all" title={displayId}>
                                                <span className="font-bold text-primary">{displayId.slice(0, 8)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Keeping Policy Number here as it's summary info */}
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Policy Number</span>
                                        <div className="text-sm font-medium">{summary.policy_number}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Regulatory and compliance identifiers.</TooltipContent>
                    </Tooltip>

                    {/* 6. Policy Snapshot */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {/* Removed 'bg-accent/5' to match other sections as requested */}
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Shield className="h-4 w-4 text-primary" />
                                        Policy Snapshot
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                                            Active
                                        </Badge>
                                        <Badge variant="outline">
                                            Verified
                                        </Badge>
                                    </div>
                                    {/* Removed: "Verified coverage details extracted by AI" note as requested */}
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Quick status verification.</TooltipContent>
                    </Tooltip>

                    {/* 7. Premium Information */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <DollarSign className="h-4 w-4 text-emerald-600" />
                                        Premium Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Premium</span>
                                        <span className="text-xl font-bold text-emerald-600 mt-1">
                                            {summary.premium_amount || "Not specified"}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Total cost breakdown.</TooltipContent>
                    </Tooltip>

                    {/* 8. Deductible Summary */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <DollarSign className="h-4 w-4 text-orange-500" />
                                        Deductible Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {summary.deductibles.length > 0 ? (
                                            summary.deductibles.slice(0, 3).map((d, i) => (
                                                <li key={i} className="text-sm flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                                                    <TermWithTooltip text={d} className="line-clamp-1 text-muted-foreground" />
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-muted-foreground">None found in document.</li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Your out-of-pocket costs.</TooltipContent>
                    </Tooltip>

                    {/* 9. Coverage Summary & Limits */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Shield className="h-4 w-4 text-primary" />
                                        Coverage Summary & Limits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {summary.key_coverages.length > 0 ? (
                                            summary.key_coverages.slice(0, 4).map((c, i) => (
                                                <li key={i} className="text-sm flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                                    <TermWithTooltip text={c} className="line-clamp-1 text-muted-foreground" />
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-muted-foreground">None found in document.</li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>What is covered and for how much.</TooltipContent>
                    </Tooltip>

                    {/* 10. Exclusions */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base text-destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        Exclusions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {summary.exclusions.length > 0 ? (
                                            summary.exclusions.slice(0, 3).map((ex, i) => (
                                                <li key={i} className="text-sm flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                                                    <TermWithTooltip text={ex} className="line-clamp-1 text-muted-foreground" />
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-muted-foreground">No explicit exclusions.</li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>What is explicitly NOT covered.</TooltipContent>
                    </Tooltip>

                    {/* 11. Endorsements */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="cursor-help hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <FileText className="h-4 w-4 text-indigo-500" />
                                        Endorsements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {summary.important_conditions.length > 0 ? (
                                            summary.important_conditions.slice(0, 3).map((cond, i) => (
                                                <li key={i} className="text-sm flex items-start gap-2">
                                                    <Info className="h-3 w-3 text-indigo-500 shrink-0 mt-1" />
                                                    <TermWithTooltip text={cond} className="line-clamp-2 text-muted-foreground" />
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-muted-foreground">None found.</li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Additions or changes to the policy.</TooltipContent>
                    </Tooltip>

                    {/* 12. Key Notes & Important Information */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="bg-amber-50/50 dark:bg-amber-950/10 border-amber-200/50 dark:border-amber-800/50 cursor-help hover:border-amber-300 transition-colors col-span-full md:col-span-2 lg:col-span-3">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base text-amber-700 dark:text-amber-500">
                                        <AlertTriangle className="h-4 w-4" />
                                        Key Notes & Important Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-amber-800 dark:text-amber-400 whitespace-pre-line leading-relaxed">
                                        {summary.notes_for_client}
                                    </p>
                                    {summary.policy_overview && (
                                        <p className="mt-4 text-sm text-amber-800/80 dark:text-amber-400/80 italic border-t border-amber-200/50 pt-2">
                                            <span className="font-semibold">Context:</span> {summary.policy_overview}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Critical warnings and takeaways.</TooltipContent>
                    </Tooltip>

                    {/* 13. Disclaimer */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="col-span-full border-none shadow-none bg-transparent cursor-help opacity-70 hover:opacity-100 transition-opacity">
                                <CardContent className="pt-4 text-center">
                                    <p className="text-xs text-muted-foreground">
                                        <span className="font-semibold">Disclaimer:</span> This summary is generated by AI for informational purposes only. Refer to the full policy for legal details.
                                    </p>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>Legal notice regarding AI accuracy.</TooltipContent>
                    </Tooltip>

                </div>
            </div>
        </TooltipProvider>
    );
}
