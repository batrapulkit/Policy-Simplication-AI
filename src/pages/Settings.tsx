import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCompanySettings } from '@/hooks/useCompanySettings';
import { useToast } from '@/hooks/use-toast';
import { Building2, Globe, Upload, Loader2, ImageIcon } from 'lucide-react';

export default function Settings() {
  const { settings, loading, updateSettings, uploadLogo } = useCompanySettings();
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (settings) {
      setCompanyName(settings.company_name || '');
      setWebsite(settings.website || '');
      setLogoPreview(settings.logo_url || null);
    }
  }, [settings]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    const url = await uploadLogo(file);
    setUploading(false);

    if (url) {
      setLogoPreview(url);
      await updateSettings({ logo_url: url });
      toast({
        title: 'Logo uploaded',
        description: 'Your company logo has been updated',
      });
    } else {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload logo. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await updateSettings({
      company_name: companyName || null,
      website: website || null,
    });
    setSaving(false);

    if (success) {
      toast({
        title: 'Settings saved',
        description: 'Your company settings have been updated',
      });
    } else {
      toast({
        title: 'Save failed',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Configure your company branding and details"
      />

      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Company Branding
          </CardTitle>
          <CardDescription>
            These details will be displayed throughout the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 rounded-xl border-2 border-dashed border-border bg-muted/50 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Company logo"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                )}
              </div>
              <div>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <Button variant="outline" asChild disabled={uploading}>
                    <span className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended: 200x200px, PNG or SVG
                </p>
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
                className="pl-10"
              />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourcompany.com"
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
