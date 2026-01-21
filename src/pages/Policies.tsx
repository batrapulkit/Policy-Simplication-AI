import { useState, useEffect } from 'react';
import { Search, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Policy {
  id: string;
  policy_number: string;
  carrier: string;
  effective_date: string;
  expiry_date: string;
  client_id: string | null;
  client?: {
    id: string;
    name: string;
  };
}

export default function Policies() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPolicies();
  }, [user, token]);

  const fetchPolicies = async () => {
    if (!user && !token) {
      setLoading(false);
      return;
    };

    try {
      const { data: policiesData, error: policiesError } = await supabase
        .from('policies')
        .select('*')
        .order('expiry_date', { ascending: true });

      if (policiesError) throw policiesError;

      // Fetch client names
      const clientIds = [...new Set(policiesData?.map((p) => p.client_id).filter(Boolean))];
      let clientsMap: Record<string, { id: string; name: string }> = {};

      if (clientIds.length > 0) {
        const { data: clientsData } = await supabase
          .from('clients')
          .select('id, name')
          .in('id', clientIds as string[]);

        clientsData?.forEach((c) => {
          clientsMap[c.id] = c;
        });
      }

      const policiesWithClients = (policiesData || []).map((p) => ({
        ...p,
        client: p.client_id ? clientsMap[p.client_id] : undefined,
      }));

      setPolicies(policiesWithClients);
    } catch (error) {
      console.error('Error fetching policies:', error);
      toast.error('Failed to load policies: ' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (expiryDate: string) => {
    const days = differenceInDays(new Date(expiryDate), new Date());
    if (days < 0) return { label: 'Expired', variant: 'destructive' as const, icon: AlertTriangle };
    if (days <= 30) return { label: 'Expiring Soon', variant: 'warning' as const, icon: AlertTriangle };
    return { label: 'Active', variant: 'default' as const, icon: CheckCircle };
  };

  const filteredPolicies = policies.filter(
    (p) =>
      p.policy_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const expiringSoon = policies.filter((p) => {
    const days = differenceInDays(new Date(p.expiry_date), new Date());
    return days >= 0 && days <= 30;
  }).length;

  const expired = policies.filter((p) => new Date(p.expiry_date) < new Date()).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Policies</h1>
        <p className="text-muted-foreground">Overview of all policies across clients</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{policies.length - expired}</p>
                <p className="text-sm text-muted-foreground">Active Policies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-500/10 p-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiringSoon}</p>
                <p className="text-sm text-muted-foreground">Expiring in 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expired}</p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search policies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-20" />
            </Card>
          ))}
        </div>
      ) : filteredPolicies.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No policies found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredPolicies.map((policy) => {
            const status = getStatus(policy.expiry_date);
            const StatusIcon = status.icon;
            return (
              <Card
                key={policy.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => policy.client && navigate(`/clients/${policy.client.id}`)}
              >
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{policy.policy_number}</span>
                      <Badge
                        variant={status.variant === 'warning' ? 'outline' : status.variant}
                        className={status.variant === 'warning' ? 'border-yellow-500 text-yellow-600' : ''}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{policy.carrier}</p>
                    {policy.client && (
                      <p className="text-sm text-primary">{policy.client.name}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {format(new Date(policy.effective_date), 'MMM d, yyyy')} -{' '}
                        {format(new Date(policy.expiry_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
