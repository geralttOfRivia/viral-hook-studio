'use client';

import React, { useState } from 'react';
import {
  X,
  MessageSquarePlus,
  Send,
  Mail,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Lightbulb,
  Bug,
  HelpCircle,
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: 'feature', label: 'Feature Idea', icon: Lightbulb },
  { id: 'hook', label: 'Evaluation Feedback', icon: Sparkles },
  { id: 'bug', label: 'Bug / Issue', icon: Bug },
  { id: 'other', label: 'General Thought', icon: HelpCircle },
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<string>('feature');
  const [message, setMessage] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const contactEmail = 'geralttofrivia@zohomail.in';
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/GeraltRiviaCode';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch (_) {}
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCat = CATEGORIES.find((c) => c.id === category)?.label || 'Feedback';
    const subject = encodeURIComponent(`Viral Hook Studio - ${selectedCat}`);
    const body = encodeURIComponent(
      `Category: ${selectedCat}\n\nFeedback / Suggestion:\n${message || '(No message written)'}\n\nSender Info (Optional): ${
        contactInfo || 'Not provided'
      }\n\n---\nSent from Viral Hook Studio`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-[#EFE5DB] shadow-2xl p-6 sm:p-7 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F4ECE4] pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 text-white flex items-center justify-center text-xl shadow-sm"
              aria-hidden="true"
            >
              💡
            </div>
            <div>
              <h2 id="feedback-dialog-title" className="font-black text-slate-800 text-base sm:text-lg tracking-tight">
                Suggest an Improvement
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Have a feature idea or feedback? We read every message!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close feedback modal"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSendFeedback} className="flex flex-col gap-4">
          {/* Category Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">What is your feedback about?</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-pink-50 border-pink-400 text-pink-700 shadow-2xs'
                        : 'bg-[#FAF8F5] border-[#E8DDD0] text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-pink-600' : 'text-slate-500'}`} aria-hidden="true" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="feedback-message" className="text-xs font-bold text-slate-700">
              Your Ideas / Message:
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. It would be awesome to test YouTube Shorts hooks (first 3s) or have an A/B hook generator..."
              className="w-full min-h-[110px] p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5D7C9] focus:border-pink-500 focus:ring-2 focus:ring-pink-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none leading-relaxed transition-all resize-none"
              rows={4}
              required
            />
          </div>

          {/* Optional Contact Handle / Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="feedback-contact" className="text-xs font-bold text-slate-700">
              Your Email or Channel Name <span className="text-slate-400 font-normal">(optional, for replies)</span>:
            </label>
            <input
              id="feedback-contact"
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="e.g. @yourhandle or yourname@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5D7C9] focus:border-pink-500 focus:ring-2 focus:ring-pink-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 shadow-candy-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Send Feedback via Email</span>
          </button>
        </form>

        {/* Direct Channels Divider */}
        <div className="relative flex items-center justify-center border-t border-[#F0E6DC] pt-4">
          <span className="absolute -top-2.5 bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Or Reach Out Directly
          </span>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Copy Email Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label="Copy direct contact email"
            className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 border border-[#E8DDD0] text-slate-800 text-xs font-bold flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span className="text-[11px] truncate">{contactEmail}</span>
            </div>
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
            )}
          </button>

          {/* DM on X Button */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-between transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>DM on 𝕏</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
