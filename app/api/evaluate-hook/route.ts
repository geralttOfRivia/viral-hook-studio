import { NextRequest, NextResponse } from 'next/server';
import { evaluateWithLLM } from '@/lib/evaluator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { script } = body;

    if (typeof script !== 'string') {
      return NextResponse.json(
        { error: 'Invalid payload: "script" string is required.' },
        { status: 400 }
      );
    }

    const trimmed = script.trim();
    if (trimmed.length === 0) {
      return NextResponse.json(
        { error: 'Script cannot be empty. Please enter your 15-second intro hook.' },
        { status: 400 }
      );
    }

    const result = await evaluateWithLLM(trimmed);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('Error in evaluate-hook endpoint:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to evaluate hook with LLM model.' },
      { status: 400 }
    );
  }
}
