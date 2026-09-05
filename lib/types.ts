export interface PvssPillarScore {
  name: 'Promise' | 'Validation' | 'Structure' | 'Stakes';
  score: number; // 0 to 25
  weightMax: number; // 25
  critique: string;
  tip: string;
}

export interface PacingMetrics {
  wordCount: number;
  estimatedSeconds: number;
  targetSeconds: number; // 15
  status: 'too_short' | 'sweet_spot' | 'too_long';
  statusMessage: string;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  latencyMs: number;
  model: string;
  isSimulated?: boolean;
}

export interface PvssEvaluationResult {
  overallScore: number; // 0 - 100
  grade: string;
  verdict: string;
  summary: string;
  pillars: {
    promise: PvssPillarScore;
    validation: PvssPillarScore;
    structure: PvssPillarScore;
    stakes: PvssPillarScore;
  };
  critique: {
    strengths: string[];
    improvements: string[];
  };
  pacing: PacingMetrics;
  providerUsed: 'gemini' | 'openai' | 'simulator';
  tokenUsage?: TokenUsage;
  isGibberish?: boolean;
}

export interface EvaluateHookRequest {
  script: string;
  apiKey?: string;
  preferredProvider?: 'auto' | 'gemini' | 'openai' | 'simulator';
}

export interface PresetHook {
  id: string;
  title: string;
  genre: string;
  tag: string;
  script: string;
}

export interface KeyTestResult {
  valid: boolean;
  provider: 'gemini' | 'openai';
  model: string;
  latencyMs: number;
  error?: string;
}
