import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FileText,
  Upload,
  Zap,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  Users,
  Shield,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { PolicySummary } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ExtractionResultGrid } from '@/components/policies/ExtractionResultGrid';
import { useAuth } from '@/context/AuthContext';
import { extractTextFromPdf } from '@/lib/pdf-extractor';

// Define the steps and processing states
type Step = 'upload' | 'acknowledge' | 'review';
type ProcessingState = 'idle' | 'uploading' | 'extracting' | 'generating' | 'complete';

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();

  // Wizard State
  const [currentStep, setCurrentStep] = useState<Step>('upload');

  // Processing State
  const [isDragging, setIsDragging] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [generatedSummary, setGeneratedSummary] = useState<PolicySummary | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>('');

  // Acknowledge State
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  // --- Handlers ---

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handleUploadAndProcess(file);
    } else {
      toast({
        title: 'Invalid file',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadAndProcess(file);
    }
  };

  const handleUploadAndProcess = async (file: File) => {
    if (!token) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to process documents.',
        variant: 'destructive',
      });
      return;
    }

    setCurrentFileName(file.name);

    try {
      setProcessingState('uploading');
      await new Promise(resolve => setTimeout(resolve, 500));

      setProcessingState('extracting');
      const pdfText = await extractTextFromPdf(file);

      setProcessingState('generating');

      const response = await fetch('/api/ai/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          pdfText,
          fileName: file.name
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.details || errData.error || 'Failed to process document');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Processing failed');
      }

      setGeneratedSummary(data.extraction.summary);
      setProcessingState('complete');

      // Auto-advance to Step 2 (Acknowledge) after delay
      setTimeout(() => {
        setCurrentStep('acknowledge');
      }, 800);

      toast({
        title: 'Analysis complete',
        description: 'Your policy has been processed.',
      });

    } catch (error: any) {
      console.error('Processing error:', error);
      setProcessingState('idle');
      let message = 'Please try again.';
      if (error.message?.includes('Rate limit')) {
        message = 'Rate limit exceeded. Please wait a moment and try again.';
      }
      toast({
        title: 'Processing failed',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const handleStartOver = () => {
    setCurrentStep('upload');
    setProcessingState('idle');
    setGeneratedSummary(null);
    setCurrentFileName('');
    setIsAcknowledged(false);
  };

  const getProgressValue = () => {
    switch (processingState) {
      case 'uploading': return 20;
      case 'extracting': return 55;
      case 'generating': return 85;
      case 'complete': return 100;
      default: return 0;
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight gradient-text mb-2 animate-fade-in">
          Command Center
        </h1>
        <p className="text-muted-foreground text-lg animate-slide-up">
          Monitor your organization's policy portfolio and streamline operations
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <StepIndicator step={1} label="Upload" currentStep={currentStep} />
          <div className="w-12 h-px bg-border hidden sm:block" />
          <StepIndicator step={2} label="Acknowledge" currentStep={currentStep} />
          <div className="w-12 h-px bg-border hidden sm:block" />
          <StepIndicator step={3} label="Review" currentStep={currentStep} />
        </div>
      </div>

      {/* Step 1: Upload */}
      {currentStep === 'upload' && (
        <div className="space-y-6 animate-slide-up">
          {/* Processing Indicator */}
          {processingState !== 'idle' && (
            <div className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="h-6 w-6 text-primary animate-pulse" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {processingState === 'complete' ? 'Extraction Complete' : 'Processing Document...'}
                  </h3>
                  <p className="text-sm text-muted-foreground">{currentFileName}</p>
                </div>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>
          )}

          {/* Upload Area */}
          {processingState !== 'complete' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-16 transition-all duration-300 shadow-md cursor-pointer',
                isDragging
                  ? 'border-primary bg-primary/5 scale-[1.01] shadow-2xl ring-4 ring-primary/10'
                  : 'border-border/60 bg-gradient-to-br from-card/80 to-muted/30 hover:border-primary/50 hover:bg-muted/30 hover:shadow-elevated'
              )}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Upload Policy Document
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Upload commercial policies for automated extraction and AI-powered analysis tailored for enterprise workflows
              </p>
              <label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={processingState !== 'idle'}
                />
                <span className={cn(
                  "inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors",
                  processingState !== 'idle' && "opacity-50 cursor-not-allowed"
                )}>
                  <FileText className="h-5 w-5" />
                  Select PDF File
                </span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Acknowledge */}
      {currentStep === 'acknowledge' && (
        <div className="max-w-xl mx-auto animate-slide-up">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold">Review Notice</h2>
                <p className="text-muted-foreground mt-2">
                  Please acknowledge the following before viewing the results.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border text-sm text-muted-foreground leading-relaxed">
                This summary was generated by an AI model. While we strive for accuracy, AI extractions may contain errors or omissions.
                Users should always verify important details against the original policy document.
                By proceeding, you acknowledge that you will assume responsibility for verifying the data.
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="acknowledge"
                  checked={isAcknowledged}
                  onCheckedChange={(checked) => setIsAcknowledged(checked === true)}
                />
                <label
                  htmlFor="acknowledge"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer"
                >
                  I understand and acknowledge this notice.
                </label>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!isAcknowledged}
                onClick={() => setCurrentStep('review')}
              >
                View Simplified Policy
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Review */}
      {currentStep === 'review' && generatedSummary && (
        <div className="space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {currentFileName}
              </h2>
              <p className="text-sm text-muted-foreground">Extracted Results</p>
            </div>
            <Button variant="outline" onClick={handleStartOver} size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Process Another
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="p-6">
              <ExtractionResultGrid summary={generatedSummary} />
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <Button onClick={handleStartOver} variant="outline" className="min-w-[200px]">
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step, label, currentStep }: { step: number; label: string; currentStep: Step }) {
  let status: 'inactive' | 'active' | 'completed' = 'inactive';
  const stepMap: Record<Step, number> = { 'upload': 1, 'acknowledge': 2, 'review': 3 };
  const currentStepNum = stepMap[currentStep];

  if (step < currentStepNum) status = 'completed';
  else if (step === currentStepNum) status = 'active';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
        status === 'completed' && "bg-primary border-primary text-primary-foreground",
        status === 'active' && "border-primary text-primary bg-background",
        status === 'inactive' && "border-muted-foreground/30 text-muted-foreground bg-muted/10"
      )}>
        {status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : step}
      </div>
      <span className={cn(
        "text-xs font-medium transition-colors duration-300",
        status === 'active' ? "text-primary" : "text-muted-foreground"
      )}>
        {label}
      </span>
    </div>
  );
}
