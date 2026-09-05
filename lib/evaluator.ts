import { PvssEvaluationResult, PacingMetrics, TokenUsage } from './types';

// Helper to compute speech duration & pacing
export function calculatePacing(script: string): PacingMetrics {
  const words = script.trim().split(/\s+/).filter(Boolean);
  const wordCount = script.trim() === '' ? 0 : words.length;
  // Standard YouTube speaking pace: 150 words per minute (2.5 words/second)
  const estimatedSeconds = Math.round((wordCount / 150) * 60);

  let status: PacingMetrics['status'] = 'sweet_spot';
  let statusMessage = 'Optimal pacing for a 15-second intro (~30–45 words).';

  if (wordCount === 0) {
    status = 'too_short';
    statusMessage = 'Add your hook script to analyze.';
  } else if (wordCount < 18) {
    status = 'too_short';
    statusMessage = 'Too brief (<18 words). Unlikely to establish both validation and stakes.';
  } else if (wordCount > 52) {
    status = 'too_long';
    statusMessage = `Hook is ${wordCount} words (~${estimatedSeconds}s). Pushes past the critical 15s retention threshold.`;
  }

  return {
    wordCount,
    estimatedSeconds,
    targetSeconds: 15,
    status,
    statusMessage,
  };
}

// Live LLM Evaluation strictly using Gemini 3.6 Flash (or OpenAI if configured)
export async function evaluateWithLLM(script: string): Promise<PvssEvaluationResult> {
  const startTime = Date.now();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();

  if (!geminiKey && !openAiKey) {
    throw new Error(
      'No API key detected. Please add GEMINI_API_KEY to your .env.local file and restart the server.'
    );
  }

  const pacing = calculatePacing(script);

  const systemPrompt = `You are an elite YouTube retention strategist and viral video producer.
Evaluate the following 15-second intro hook based strictly on the PVSS Framework:
1. Promise (0-25): Curiosity gap, clear viewer transformation, compelling proposition.
2. Validation (0-25): Proof tokens, authority, research, empirical numbers, why believe in 3 seconds.
3. Structure (0-25): Velocity, zero throat-clearing (no greetings, no like/subscribe begging), immediate action.
4. Stakes (0-25): Tension, cost of missing out, why the viewer cannot leave.

CRITICAL RULES:
- GIBBERISH / NONSENSE: If the input is unreadable, keyboard smashing, random letters, or incoherent text, you MUST return overallScore: 0, isGibberish: true, grade: "Incoherent / Gibberish 🚫", verdict: "Script is unreadable gibberish with no discernible video premise.", and all pillar scores as 0.
- WEAK / FLAT HOOKS: If the script is boring, generic, or starts with greetings ("Hey guys"), overall score must be between 5 and 25. Do NOT give undeserved high scores.
- VIRAL HOOKS: Only award 85+ if all 4 PVSS pillars are genuinely present with elite craftsmanship.

Return ONLY a valid JSON object matching this schema:
{
  "overallScore": number (0-100, sum of pillars),
  "grade": string,
  "verdict": string,
  "summary": string,
  "isGibberish": boolean,
  "pillars": {
    "promise": { "name": "Promise", "score": number (0-25), "weightMax": 25, "critique": string, "tip": string },
    "validation": { "name": "Validation", "score": number (0-25), "weightMax": 25, "critique": string, "tip": string },
    "structure": { "name": "Structure", "score": number (0-25), "weightMax": 25, "critique": string, "tip": string },
    "stakes": { "name": "Stakes", "score": number (0-25), "weightMax": 25, "critique": string, "tip": string }
  },
  "critique": {
    "strengths": string[],
    "improvements": string[]
  }
}`;

  // Call Google Gemini 3.6 Flash directly
  if (geminiKey) {
    const model = 'gemini-3.6-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${systemPrompt}\n\nIntro script to evaluate:\n"""${script}"""` },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      let msg = `HTTP ${response.status}`;
      try {
        const j = JSON.parse(errText);
        msg = j.error?.message || msg;
      } catch (_) {}

      if (response.status === 429) {
        throw new Error(
          'Gemini 3.6 Flash rate limit reached (Free tier limit is 15 requests per minute). Please wait 5–10 seconds and try again.'
        );
      }

      throw new Error(`Gemini API (${model}): ${msg}`);
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const textPart = parts.find((p: any) => p.text && !p.thought) || parts[parts.length - 1];
    let rawJson = textPart?.text || '';

    if (!rawJson) {
      throw new Error('Gemini 3.6 Flash returned an empty response. Check script content or safety filters.');
    }

    // Clean any markdown wrapper if returned
    rawJson = rawJson.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
    const parsed = JSON.parse(rawJson);
    const latencyMs = Date.now() - startTime;
    const usage = data.usageMetadata;

    const tokenUsage: TokenUsage = {
      promptTokens: usage?.promptTokenCount ?? 0,
      completionTokens: usage?.candidatesTokenCount ?? 0,
      totalTokens: usage?.totalTokenCount ?? (usage?.promptTokenCount || 0) + (usage?.candidatesTokenCount || 0),
      latencyMs,
      model: 'gemini-3.6-flash',
      isSimulated: false,
    };

    return {
      ...parsed,
      pacing,
      providerUsed: 'gemini',
      tokenUsage,
    };
  }

  // Call OpenAI if OPENAI_API_KEY is configured
  if (openAiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: script },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let msg = `HTTP ${response.status}`;
      try {
        const j = JSON.parse(errText);
        msg = j.error?.message || msg;
      } catch (_) {}
      throw new Error(`OpenAI API: ${msg}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('OpenAI returned an empty response.');
    }

    const parsed = JSON.parse(content);
    const latencyMs = Date.now() - startTime;
    const usage = data.usage;

    const tokenUsage: TokenUsage = {
      promptTokens: usage?.prompt_tokens ?? 0,
      completionTokens: usage?.completion_tokens ?? 0,
      totalTokens: usage?.total_tokens ?? (usage?.prompt_tokens || 0) + (usage?.completion_tokens || 0),
      latencyMs,
      model: 'gpt-4o-mini',
      isSimulated: false,
    };

    return {
      ...parsed,
      pacing,
      providerUsed: 'openai',
      tokenUsage,
    };
  }

  throw new Error('No supported LLM provider configured.');
}
