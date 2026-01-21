import { PolicySummary } from '@/types';
import {
  FileText,
  Shield,
  DollarSign,
  AlertCircle,
  XCircle,
  MessageSquare,
  Building2,
  Calendar,
  User,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TermWithTooltip } from '@/components/shared/TermWithTooltip';
import { Badge } from '@/components/ui/badge';

interface SummaryViewerProps {
  summary: PolicySummary;
  className?: string;
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning';
}

function Section({ icon, title, children, variant = 'default' }: SectionProps) {
  return (
    <div className={cn(
      'rounded-lg border p-4',
      variant === 'warning'
        ? 'border-warning/30 bg-warning/5'
        : 'border-border bg-card'
    )}>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | undefined }) {
  if (!value || value === "Not specified in document") return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm text-foreground font-medium">{value}</span>
    </div>
  );
}

export function SummaryViewer({ summary, className }: SummaryViewerProps) {
  return (
    <TooltipProvider>
      <div className={cn('space-y-4', className)}>
        {/* Policy Header - Key Information */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">{summary.insurer_company}</h3>
              <Badge variant="outline" className="bg-primary/10">
                {summary.policy_type}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoRow label="Policy Number" value={summary.policy_number} />
            <InfoRow label="Policyholder" value={summary.policyholder_name} />
            <InfoRow label="Premium" value={summary.premium_amount} />
            <InfoRow label="Issue Date" value={summary.issue_date} />
          </div>

          {/* Policy Dates */}
          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Coverage Period</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <InfoRow label="Start Date" value={summary.policy_start_date} />
              <InfoRow label="End Date" value={summary.policy_end_date} />
            </div>
          </div>
        </div>

        {/* Policy Overview */}
        <Section
          icon={<FileText className="h-5 w-5 text-primary" />}
          title="Policy Overview"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary.policy_overview}
          </p>
        </Section>

        {/* Key Coverages */}
        <Section
          icon={<Shield className="h-5 w-5 text-success" />}
          title="Key Coverages"
        >
          <ul className="space-y-2">
            {summary.key_coverages.map((coverage, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                <TermWithTooltip text={coverage} className="text-muted-foreground" />
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Deductibles */}
          <Section
            icon={<DollarSign className="h-5 w-5 text-accent" />}
            title="Deductibles"
          >
            <ul className="space-y-2">
              {summary.deductibles.map((deductible, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <TermWithTooltip text={deductible} className="text-muted-foreground" />
                </li>
              ))}
            </ul>
          </Section>

          {/* Limits */}
          <Section
            icon={<AlertCircle className="h-5 w-5 text-primary" />}
            title="Coverage Limits"
          >
            <ul className="space-y-2">
              {summary.limits.map((limit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <TermWithTooltip text={limit} className="text-muted-foreground" />
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Important Conditions */}
        {summary.important_conditions && summary.important_conditions.length > 0 && (
          <Section
            icon={<Info className="h-5 w-5 text-warning" />}
            title="Important Conditions"
          >
            <ul className="space-y-2">
              {summary.important_conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                  <TermWithTooltip text={condition} className="text-muted-foreground" />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Exclusions */}
        <Section
          icon={<XCircle className="h-5 w-5 text-destructive" />}
          title="Exclusions"
          variant="warning"
        >
          <ul className="space-y-2">
            {summary.exclusions.map((exclusion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                <TermWithTooltip text={exclusion} className="text-muted-foreground" />
              </li>
            ))}
          </ul>
        </Section>

        {/* Notes for Client */}
        <Section
          icon={<MessageSquare className="h-5 w-5 text-accent" />}
          title="Notes for Client"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary.notes_for_client}
          </p>
        </Section>
      </div>
    </TooltipProvider>
  );
}
