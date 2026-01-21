import { cn } from '@/lib/utils';
import { useCompanySettings } from '@/hooks/useCompanySettings';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  const { settings } = useCompanySettings();

  const companyName = settings?.company_name || 'WearePratik';
  const logoUrl = settings?.logo_url;
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className="h-10 w-10 rounded-xl object-contain"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-primary shadow-lg">
          <span className="text-lg font-bold text-primary-foreground tracking-tight">{initial}</span>
        </div>
      )}
      {!iconOnly && (
        <div className="flex flex-col text-inherit">
          <span className="text-xl font-bold leading-tight tracking-tight">
            {companyName}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">
            Policy Manager
          </span>
        </div>
      )}
    </div>
  );
}