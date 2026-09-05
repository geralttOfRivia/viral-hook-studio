import { NextRequest, NextResponse } from 'next/server';
import { evaluateWithLLM } from '@/lib/evaluator';

// In-memory rate limiting store for serverless execution
interface IpRecord {
  count: number;
  lastRequestTime: number;
  windowStartTime: number;
}

const ipStore = new Map<string, IpRecord>();

// Safety limits per IP without database
const MAX_DAILY_REQUESTS_PER_IP = 8; // Client UI limits to 5, small safety cushion
const MIN_SECONDS_BETWEEN_REQUESTS = 3; // Prevent bot rapid-fire spam
const WINDOW_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const record = ipStore.get(ip);

  // Clean old records periodically if map grows
  if (ipStore.size > 5000) {
    ipStore.forEach((data, storedIp) => {
      if (now - data.windowStartTime > WINDOW_DURATION_MS) {
        ipStore.delete(storedIp);
      }
    });
  }

  if (!record) {
    ipStore.set(ip, {
      count: 1,
      lastRequestTime: now,
      windowStartTime: now,
    });
    return { allowed: true };
  }

  // 1. Burst throttle check (minimum seconds between requests)
  if (now - record.lastRequestTime < MIN_SECONDS_BETWEEN_REQUESTS * 1000) {
    return {
      allowed: false,
      message: 'Please wait a few seconds before testing another script.',
    };
  }

  // 2. 24-Hour window rollover
  if (now - record.windowStartTime > WINDOW_DURATION_MS) {
    ipStore.set(ip, {
      count: 1,
      lastRequestTime: now,
      windowStartTime: now,
    });
    return { allowed: true };
  }

  // 3. Daily cap check
  if (record.count >= MAX_DAILY_REQUESTS_PER_IP) {
    return {
      allowed: false,
      message:
        "You have reached the daily limit of 5 free evaluations for this device. Your quota will reset in 24 hours, or you can support us on Buy Me a Coffee to help upgrade servers!",
    };
  }

  // Increment and allow
  record.count += 1;
  record.lastRequestTime = now;
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  try {
    // Extract client IP address from Vercel / proxy headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : req.headers.get('x-real-ip') || '127.0.0.1';

    // Check server rate limit
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: rateCheck.message },
        { status: 429 }
      );
    }

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
