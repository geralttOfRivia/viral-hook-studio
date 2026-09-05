'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const SeoFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Why are the first 15 seconds of a YouTube video so critical for retention?',
      a: 'YouTube retention curves show that the steepest viewer drop-off occurs between second 0 and second 15. The YouTube recommendation algorithm heavily weights early watch percentage when deciding whether to push your video to a broader browse and suggested audience. If your hook delivers an immediate curiosity gap and proves its value, retention stabilizes.',
    },
    {
      q: 'What does the PVSS Framework stand for?',
      a: 'PVSS is an audience retention framework consisting of Promise (what transformation or answer the viewer receives), Validation (why the viewer should trust you within 3 seconds using numbers, research, or authority), Structure (zero throat-clearing velocity without introductory greetings), and Stakes (what the viewer loses if they click away).',
    },
    {
      q: 'How many words should a 15-second YouTube intro script be?',
      a: 'At a natural conversational YouTube speaking pace of 150 words per minute, 15 seconds is approximately 35 to 45 words. Keeping your script within 30–45 words prevents speaking too quickly while ensuring you do not waste precious seconds before delivering your core topic.',
    },
    {
      q: 'Why should I delete "Hey guys, welcome back to my channel"?',
      a: 'Introductory greetings are known as "throat-clearing fluff." New viewers browsing YouTube do not know you yet and have zero loyalty in the first 5 seconds. Every second spent greeting existing subscribers is a second you risk losing cold traffic. Jump directly into the conflict, experiment, or core premise on word one.',
    },
    {
      q: 'How does Viral Hook Studio calculate the Hype Meter score?',
      a: 'Your script is evaluated across the four PVSS pillars (each scored out of 25). An overall score of 85+ triggers the pink confetti tier, indicating your script contains an immediate curiosity hook, verifiable authority tokens, fast structural velocity, and high stakes.',
    },
  ];

  return (
    <section className="mt-8 pt-8 border-t border-[#F0E6DC] flex flex-col gap-5 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full">
            Retention Guide & FAQ
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
          Frequently Asked Questions About YouTube Hooks
        </h2>
        <p className="text-xs text-slate-600 font-medium">
          Master the psychology of high-retention video intros.
        </p>
      </div>

      {/* Clean Single-Column Accordion (eliminates 2-column grid height stretching glitch) */}
      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white border-pink-300 shadow-candy-sm'
                  : 'bg-white/80 border-[#EFE5DB] hover:border-[#D8C7B5]'
              }`}
            >
              <button
                id={`faq-btn-${idx}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                type="button"
                className="w-full p-4 flex items-center justify-between text-left gap-4 transition-colors"
              >
                <span className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {faq.q}
                </span>
                <span className="p-1 rounded-lg bg-slate-100 text-slate-600 flex-shrink-0" aria-hidden="true">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-pink-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div 
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className="px-4 pb-4 pt-1 text-xs text-slate-700 leading-relaxed font-medium border-t border-slate-100 animate-fade-in"
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
