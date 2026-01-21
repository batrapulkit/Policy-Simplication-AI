import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/Logo';
import { Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const { isAuthenticated, isLoading: authLoading, login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isForgotPassword) {
        // Mock Forgot Password
        toast({
          title: 'Not Implemented',
          description: 'This feature is not available in the secure demo.',
          variant: "destructive"
        });
        setIsForgotPassword(false);
      } else if (isLogin) {
        await login(email, password);
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
      } else {
        await signup(email, password, fullName);
        toast({
          title: 'Account created!',
          description: 'Welcome to Policy Pal.',
        });
      }
    } catch (err: any) {
      let message = err.message || 'Authentication failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Logo className="mb-8" />

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              {isForgotPassword ? 'Reset password' : isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {isForgotPassword
                ? 'Enter your work email to receive a reset link'
                : isLogin
                  ? 'Access your enterprise insurance platform'
                  : 'Join your organization on WearePratik'}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && !isForgotPassword && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required={!isLogin && !isForgotPassword}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </div>

            {!isForgotPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setError('');
                      }}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  minLength={6}
                />
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isForgotPassword ? 'Send reset link' : isLogin ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {isForgotPassword ? (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setError('');
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to sign in
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden w-1/2 bg-gradient-to-br from-primary to-accent md:block">
        <div className="flex h-full flex-col items-center justify-center p-12 text-primary-foreground">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold">
              Enterprise-Grade Insurance Intelligence
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Empower your team with AI-driven policy analysis, streamlined client management, and actionable insights at scale.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold">AI</p>
                <p className="text-sm text-primary-foreground/70">Enterprise Analytics</p>
              </div>
              <div>
                <p className="text-3xl font-bold">CRM</p>
                <p className="text-sm text-primary-foreground/70">Client Management</p>
              </div>
              <div>
                <p className="text-3xl font-bold">SOC2</p>
                <p className="text-sm text-primary-foreground/70">Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
