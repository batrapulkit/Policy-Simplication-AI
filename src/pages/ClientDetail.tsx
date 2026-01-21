import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, FileText, Trash2, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
}

interface Policy {
  id: string;
  policy_number: string;
  carrier: string;
  effective_date: string;
  expiry_date: string;
  extraction_id: string | null;
  created_at: string;
}

interface Extraction {
  id: string;
  file_name: string;
}

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [extractions, setExtractions] = useState<Extraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [formData, setFormData] = useState({
    policy_number: '',
    carrier: '',
    effective_date: '',
    expiry_date: '',
    extraction_id: '',
  });

  useEffect(() => {
    if (user && id) {
      fetchData();
    }
  }, [user, id]);

  const fetchData = async () => {
    try {
      const [clientRes, policiesRes, extractionsRes] = await Promise.all([
        supabase.from('clients').select('*').eq('id', id).maybeSingle(),
        supabase.from('policies').select('*').eq('client_id', id).order('created_at', { ascending: false }),
        supabase.from('policy_extractions').select('id, file_name'),
      ]);

      if (clientRes.error) throw clientRes.error;
      if (policiesRes.error) throw policiesRes.error;

      setClient(clientRes.data);
      setPolicies(policiesRes.data || []);
      setExtractions(extractionsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load client data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) return;

    try {
      if (editingPolicy) {
        const { error } = await supabase
          .from('policies')
          .update({
            policy_number: formData.policy_number,
            carrier: formData.carrier,
            effective_date: formData.effective_date,
            expiry_date: formData.expiry_date,
            extraction_id: formData.extraction_id || null,
          })
          .eq('id', editingPolicy.id);

        if (error) throw error;
        toast.success('Policy updated successfully');
      } else {
        const { error } = await supabase.from('policies').insert({
          user_id: user.id,
          client_id: id,
          policy_number: formData.policy_number,
          carrier: formData.carrier,
          effective_date: formData.effective_date,
          expiry_date: formData.expiry_date,
          extraction_id: formData.extraction_id || null,
        });

        if (error) throw error;
        toast.success('Policy created successfully');
      }

      setIsDialogOpen(false);
      setEditingPolicy(null);
      setFormData({
        policy_number: '',
        carrier: '',
        effective_date: '',
        expiry_date: '',
        extraction_id: '',
      });
      fetchData();
    } catch (error) {
      console.error('Error saving policy:', error);
      toast.error('Failed to save policy');
    }
  };

  const handleDeletePolicy = async (policyId: string) => {
    if (!confirm('Are you sure you want to delete this policy?')) return;

    try {
      const { error } = await supabase.from('policies').delete().eq('id', policyId);
      if (error) throw error;
      toast.success('Policy deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting policy:', error);
      toast.error('Failed to delete policy');
    }
  };

  const openEditDialog = (policy: Policy) => {
    setEditingPolicy(policy);
    setFormData({
      policy_number: policy.policy_number,
      carrier: policy.carrier,
      effective_date: policy.effective_date,
      expiry_date: policy.expiry_date,
      extraction_id: policy.extraction_id || '',
    });
    setIsDialogOpen(true);
  };

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-32 bg-muted rounded" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Client not found</p>
        <Button variant="link" onClick={() => navigate('/clients')}>
          Back to Clients
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/clients')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
          <p className="text-muted-foreground">
            {client.email && <span>{client.email}</span>}
            {client.email && client.phone && <span> • </span>}
            {client.phone && <span>{client.phone}</span>}
          </p>
        </div>
      </div>

      {client.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{client.notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Policies</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              onClick={() => {
                setEditingPolicy(null);
                setFormData({
                  policy_number: '',
                  carrier: '',
                  effective_date: '',
                  expiry_date: '',
                  extraction_id: '',
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Policy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPolicy ? 'Edit Policy' : 'Add New Policy'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="policy_number">Policy Number *</Label>
                <Input
                  id="policy_number"
                  value={formData.policy_number}
                  onChange={(e) =>
                    setFormData({ ...formData, policy_number: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carrier">Carrier *</Label>
                <Input
                  id="carrier"
                  value={formData.carrier}
                  onChange={(e) =>
                    setFormData({ ...formData, carrier: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="effective_date">Effective Date *</Label>
                  <Input
                    id="effective_date"
                    type="date"
                    value={formData.effective_date}
                    onChange={(e) =>
                      setFormData({ ...formData, effective_date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry_date">Expiry Date *</Label>
                  <Input
                    id="expiry_date"
                    type="date"
                    value={formData.expiry_date}
                    onChange={(e) =>
                      setFormData({ ...formData, expiry_date: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="extraction">Link to Extraction</Label>
                <Select
                  value={formData.extraction_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, extraction_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an extraction (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {extractions.map((ext) => (
                      <SelectItem key={ext.id} value={ext.id}>
                        {ext.file_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editingPolicy ? 'Update Policy' : 'Create Policy'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {policies.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No policies yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {policies.map((policy) => (
            <Card key={policy.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{policy.policy_number}</span>
                    {isExpired(policy.expiry_date) && (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                        Expired
                      </span>
                    )}
                    {isExpiringSoon(policy.expiry_date) && (
                      <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-full">
                        Expiring Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{policy.carrier}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(policy.effective_date), 'MMM d, yyyy')} -{' '}
                      {format(new Date(policy.expiry_date), 'MMM d, yyyy')}
                    </span>
                    {policy.extraction_id && (
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Linked to extraction
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(policy)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
