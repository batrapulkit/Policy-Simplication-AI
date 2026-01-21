import { format } from 'date-fns';
import { FileText, Calendar, Building2, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Extraction {
    id: string;
    file_name: string;
    created_at: string;
    summary: any;
}

interface ExtractionsListProps {
    extractions: Extraction[];
    onSelect: (extraction: Extraction) => void;
}

export function ExtractionsList({ extractions, onSelect }: ExtractionsListProps) {
    if (extractions.length === 0) {
        return (
            <div className="text-center p-8 border-2 border-dashed rounded-xl border-muted bg-muted/20">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium text-foreground">No extractions found</h3>
                <p className="text-sm text-muted-foreground">Upload a policy to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Extractions
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {extractions.map((extraction) => (
                    <Card
                        key={extraction.id}
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
                        onClick={() => onSelect(extraction)}
                    >
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <Badge variant="outline" className="text-xs font-normal bg-background">
                                    {format(new Date(extraction.created_at), 'MMM d, yyyy')}
                                </Badge>
                            </div>

                            <h4 className="font-semibold text-base mb-1 line-clamp-1" title={extraction.file_name}>
                                {extraction.file_name}
                            </h4>

                            <div className="space-y-2 mt-4">
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Building2 className="h-3.5 w-3.5" />
                                    <span className="line-clamp-1">
                                        {extraction.summary?.carrier || 'Unknown Carrier'}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                        {extraction.summary?.policy_type || 'Policy'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <Button size="sm" variant="ghost" className="h-8 text-xs group-hover:translate-x-1 transition-transform">
                                    View Details <ChevronRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
