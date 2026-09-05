/**
 * Retention Psychology & Actionable Drilldown Knowledge Base
 * 
 * Maps feedback patterns and PVSS pillars to cognitive viewer drop-off psychology,
 * proven YouTube creator formulas (MrBeast, Veritasium, Cleo Abram), and actionable rewrite templates.
 */

export interface PointDrilldown {
  retentionRisk: string;
  creatorRule: string;
  rewriteFormula: {
    pattern: string;
    example: string;
  };
  retentionStat: string;
}

export interface PillarDrilldown {
  benchmark: string;
  dropOffMechanism: string;
  perfectionChecklist: string[];
  proFormula: string;
}

/**
 * Intelligent drilldown matcher for any improvement feedback point.
 */
export function getDrilldownForPoint(pointText: string, scriptContext?: string): PointDrilldown {
  const lower = pointText.toLowerCase();

  // 1. Structure / Pacing / Greeting / Delay issues
  if (lower.includes('greeting') || lower.includes('throat') || lower.includes('hey guys') || lower.includes('slow') || lower.includes('delay') || lower.includes('intro')) {
    return {
      retentionRisk:
        'Viewers decide to leave within 2.5 seconds. Any generic greeting or slow opening causes an immediate 35–50% drop-off on YouTube analytics.',
      creatorRule: 'The "In-Media-Res" Launch: Start inside the action. Never announce what you are going to do—demonstrate it instantly.',
      rewriteFormula: {
        pattern: 'Cut the first 6 words. Start directly with the conflict or anomaly.',
        example:
          'Instead of: "Hey guys, today we are going to look at..."\nRewrite as: "This single mistake cost creators over $2M this year."',
      },
      retentionStat: 'Cuts initial 3-second drop-off by up to 42%.',
    };
  }

  // 2. Validation / Proof / Credibility issues
  if (lower.includes('validation') || lower.includes('proof') || lower.includes('authority') || lower.includes('evidence') || lower.includes('source') || lower.includes('credib')) {
    return {
      retentionRisk:
        'Viewers on modern YouTube are hyper-skeptical. Without instant proof tokens, they assume clickbait and swipe away before 10 seconds.',
      creatorRule: 'The "Proof Token" Rule: Inject a hard number, empirical source, or tangible proof artifact in sentence one.',
      rewriteFormula: {
        pattern: '[Entity] [Surprising Action] backed by [Specific Data / Artifact].',
        example:
          'Instead of: "A lot of people think this new tech is huge..."\nRewrite as: "Inside this 400-page leaked patent, engineers confirmed the rumors were true."',
      },
      retentionStat: 'Boosts viewer trust and lifts 30-second retention by 28%.',
    };
  }

  // 3. Stakes / Urgency / Consequences issues
  if (lower.includes('stake') || lower.includes('tension') || lower.includes('urgency') || lower.includes('consequence') || lower.includes('risk') || lower.includes('fomo')) {
    return {
      retentionRisk:
        'When viewers feel "I can always watch this later", they click away. High stakes create an irresistible cognitive itch.',
      creatorRule: 'The "Cost of Inaction": Show what happens if the viewer does NOT watch until the end.',
      rewriteFormula: {
        pattern: 'If you do [X], you will lose [Y], unless you know [Z].',
        example:
          'Instead of: "This video will teach you good retention tips..."\nRewrite as: "If you don\'t fix this before your next upload, YouTube will stop recommending your channel entirely."',
      },
      retentionStat: 'Increases end-of-video watch time velocity by 34%.',
    };
  }

  // 4. Promise / Curiosity Gap issues
  if (lower.includes('promise') || lower.includes('curiosity') || lower.includes('transformation') || lower.includes('hook') || lower.includes('vague')) {
    return {
      retentionRisk:
        'A vague promise makes the brain treat the video as background noise. Viewers need a crystal-clear payoff expectation.',
      creatorRule: 'The "Curiosity Gap Escalator": Reveal the destination, conceal the vehicle.',
      rewriteFormula: {
        pattern: 'Make a bold, concrete promise, then tease the unexpected twist.',
        example:
          'Instead of: "I tried this challenge for 30 days..."\nRewrite as: "I spent 30 days doing what 99% of people think is impossible—and day 17 almost ruined everything."',
      },
      retentionStat: 'Creates open-loop curiosity that holds viewers past the 30s cliff.',
    };
  }

  // Default: General Hook Optimization
  return {
    retentionRisk:
      'Lacks high-contrast emotional friction. Viewers scroll when the opening feels predictable or conventional.',
    creatorRule: 'Negative Framing & Counter-Intuitive Truth: The human brain pays 2x more attention to risks and surprising contradictions.',
    rewriteFormula: {
      pattern: 'State a widely held belief, then immediately shatter it with a contrast word (But, However, Except).',
      example:
        'Instead of: "Here is how to grow your channel..."\nRewrite as: "Everything you were told about the algorithm is dead wrong—except for this one secret."',
    },
    retentionStat: 'Lifts first-minute retention by ~25–35% across top YouTube channels.',
  };
}

/**
 * Deep drilldown data for each of the 4 PVSS pillars.
 */
export const PVSS_PILLAR_DRILLDOWNS: Record<string, PillarDrilldown> = {
  Promise: {
    benchmark: 'Top 5% YouTube videos deliver the promise within 4 seconds.',
    dropOffMechanism:
      'If the viewer does not know within 4 seconds what payoff they are investing their time for, they hit "Back".',
    perfectionChecklist: [
      'Is the core topic identifiable in the first sentence?',
      'Does it promise an emotional or tangible transformation?',
      'Is there an open curiosity loop that cannot be solved without watching?',
    ],
    proFormula:
      '"In the next [Time], you will discover how [Subject] [Achieved Outcome], without [Major Obstacle]."',
  },
  Validation: {
    benchmark: 'Proof tokens in seconds 1–5 reduce swipe-away rate by 31%.',
    dropOffMechanism:
      'Viewers think: "Who is this person and why should I believe them?" An unsubstantiated claim triggers instant skepticism.',
    perfectionChecklist: [
      'Did you cite an empirical metric, dollar amount, or specific date?',
      'Is there a visual or tangible proof token (patent, screenshot, test result)?',
      'Does it substantiate the video title immediately?',
    ],
    proFormula:
      '"Backed by [Data/Source/Experience], we analyzed [Number] cases to prove [Fact]."',
  },
  Structure: {
    benchmark: 'Videos with zero throat-clearing average 74% retention at 30 seconds.',
    dropOffMechanism:
      'Every unnecessary word (greetings, channel intros, animation stings) gives the viewer a permission slip to leave.',
    perfectionChecklist: [
      'Did you delete all greetings ("Hey guys", "Welcome back")?',
      'Is spoken pace in the 140–160 WPM sweet spot (~30–45 words total)?',
      'Does each sentence escalate curiosity into the next sentence?',
    ],
    proFormula:
      'Sentence 1: The Inciting Anomaly → Sentence 2: The Proof Token → Sentence 3: The Escalating Stakes.',
  },
  Stakes: {
    benchmark: 'High-stakes intros maintain 18% higher end-screen click-through.',
    dropOffMechanism:
      'Without stakes, viewers feel zero FOMO (fear of missing out) and postpone watching for later.',
    perfectionChecklist: [
      'What does the viewer lose if they click off right now?',
      'Is there a ticking clock, financial risk, or competitive disadvantage?',
      'Does the script make leaving feel like a mistake?',
    ],
    proFormula:
      '"And if you miss this, you risk [Consequence] before [Deadline/Event]."',
  },
};
