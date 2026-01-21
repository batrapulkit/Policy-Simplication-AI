import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ExtractionResultGrid } from '@/components/policies/ExtractionResultGrid';
import { ExtractionsList } from '@/components/policies/ExtractionsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Upload,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PolicySummary } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { extractTextFromPdf } from '@/lib/pdf-extractor';

// Define the steps for the wizard flow
type Step = 'upload' | 'acknowledge' | 'review';
type ProcessingState = 'idle' | 'uploading' | 'extracting' | 'generating' | 'complete';

export default function Extractions() {
  const { toast } = useToast();
  const { token, user } = useAuth();

  // Wizard State
  const [currentStep, setCurrentStep] = useState<Step>('upload');

  // Upload/Processing State
  const [isDragging, setIsDragging] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [generatedSummary, setGeneratedSummary] = useState<PolicySummary | null>(null);
  const [extractedRawText, setExtractedRawText] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [extractionId, setExtractionId] = useState<string>('');

  // Acknowledge State
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  // History State
  const [history, setHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoadingHistory(true);
      const res = await fetch('/api/ai/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setHistory(data.extractions);
        }
      }
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [token]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // --- handlers for Drag & Drop (Step 1) ---
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
      // Store locally just in case
      setExtractedRawText(pdfText);

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

      console.log('Extraction API returned Data:', data);
      setGeneratedSummary(data.extraction.summary);

      // Extract ID from server response
      let uniqueId = data.extraction.id || data.extraction.policy_id;

      // If server didn't provide an ID, generate a guaranteed unique one
      if (!uniqueId) {
        console.warn('Server did not return an ID. Generating client-side UUID...');
        uniqueId = crypto.randomUUID();
      }

      console.log('Final Extraction ID:', uniqueId);
      setExtractionId(uniqueId);
      setProcessingState('complete');

      // Refresh history to show the new item
      fetchHistory();

      // Auto-advance to Step 2
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
      } else if (error.message?.includes('credits')) {
        message = 'AI credits exhausted. Please contact support.';
      }

      toast({
        title: 'Processing failed',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const handleHistorySelect = (extraction: any) => {
    setGeneratedSummary(extraction.summary);
    setExtractionId(extraction.id);
    setCurrentFileName(extraction.file_name);
    setExtractedRawText(extraction.raw_text || '');
    setCurrentStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleStartOver = () => {
    setCurrentStep('upload');
    setProcessingState('idle');
    setGeneratedSummary(null);
    setExtractedRawText('');
    setCurrentFileName('');
    setIsAcknowledged(false);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Policy Extraction"
        description="Upload, Verify, and Review your policy details."
      />

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
        <div className="max-w-2xl mx-auto space-y-12 animate-slide-up">

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
                'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer',
                isDragging
                  ? 'border-primary bg-primary/5 scale-[1.01]'
                  : 'border-border/60 hover:border-primary/50 hover:bg-muted/30'
              )}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Upload Policy Document
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md text-sm">
                Drag and drop your PDF here, or click to browse. We will define the key details for you.
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
                  "inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  processingState !== 'idle' && "opacity-50 cursor-not-allowed"
                )}>
                  Select PDF
                </span>
              </label>
            </div>
          )}

          {/* Recent Extractions List */}
          <div className="pt-8 border-t">
            <ExtractionsList extractions={history} onSelect={handleHistorySelect} />
          </div>

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

          <ExtractionResultGrid summary={generatedSummary} id={extractionId} />

          {/* Debug: Raw Text View */}
          <div className="mt-8 border rounded-lg p-4 bg-muted/20">
            <details>
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                Debug: View Raw Extracted Text
              </summary>
              <div className="mt-4 p-4 bg-muted/50 rounded-md border border-border text-xs font-mono whitespace-pre-wrap max-h-96 overflow-auto text-foreground break-all">
                {extractedRawText || "No raw text available in state."}
              </div>
            </details>
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

// --- Helper Components ---

function StepIndicator({ step, label, currentStep }: { step: number; label: string; currentStep: Step }) {
  let status: 'inactive' | 'active' | 'completed' = 'inactive';

  // Map string steps to numbers for comparison
  const stepMap: Record<Step, number> = {
    'upload': 1,
    'acknowledge': 2,
    'review': 3
  };
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
