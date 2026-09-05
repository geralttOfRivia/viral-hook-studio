# 🍭 Viral Hook Studio (15-Second Intro Analyzer)

[![Live Demo](https://img.shields.io/badge/Live%20App-viral--hook--studio.vercel.app-pink?style=for-the-badge&logo=vercel)](https://viral-hook-studio.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Gemini%203.6-blue?style=for-the-badge)](https://ai.google.dev)

> 🌐 **Live Web Application**: **[https://viral-hook-studio.vercel.app](https://viral-hook-studio.vercel.app)**

**Viral Hook Studio** is a gamified, Notion-style web application for YouTube creators to test, diagnose, and score their 15-second video intros before filming.

Long-form video retention is won or lost in the first 3 to 10 seconds. Viral Hook Studio evaluates your opening script against the **PVSS Framework** (Promise, Validation, Structure, Stakes) and renders live feedback via **The Hype Meter** — a 3D animated circular score gauge with dynamic color shifts and digital confetti.

---

## ✨ Features

- **✍️ Distraction-Free Script Editor**: Notion-inspired writing area with keyboard shortcuts (`⌘/Ctrl + Enter`) and instant preset hook loaders.
- **⏱️ 15-Second Pacing Visualizer**: Real-time word count and speaking duration calculation (~150 WPM) with visual sweet-spot indicators (optimal 30–45 words).
- **🍭 The Hype Meter (3D Circular Gauge)**:
  - `0 – 50`: **Sunshine Yellow** (Flat intro / High drop-off risk)
  - `51 – 84`: **Mint Green** (Solid hook / Good viewer retention)
  - `85 – 100`: **Glowing Bubblegum Pink** (Viral Ready + multi-cannon digital confetti explosion 🎉)
- **📊 PVSS Framework Breakdown**:
  - **P - Promise** (0–25): Curiosity gap, transformation, and viewer payoff.
  - **V - Validation** (0–25): Credibility, empirical numbers, proof tokens, why believe in 3s.
  - **S - Structure** (0–25): Zero throat-clearing, immediate velocity, no fluff.
  - **S - Stakes** (0–25): Urgency, consequences of clicking away, curiosity tension.
- **💡 Director's Notes**: Actionable bulleted diagnostics dividing feedback into *Retention Multipliers* and *Actionable Polish*.
- **🔮 Roadmap Teasers**: Interactive previews for Phase 2 features:
  - 🍬 *The Gumball Drop* (A/B Hook Generator)
  - 🎵 *The Rhythm Track* (TTS Pacing Coach & Waveform Visualizer)
- **🔌 Multi-Provider LLM Engine**:
  - Automatically uses **Google Gemini** if `GEMINI_API_KEY` is provided in `.env.local`.
  - Automatically uses **OpenAI** (`gpt-4o-mini`) if `OPENAI_API_KEY` is provided in `.env.local`.
  - Seamlessly falls back to an intelligent, offline PVSS heuristic engine when running without API keys so it is 100% testable out of the box.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
If you want to use live LLM APIs, copy `.env.example` to `.env.local` and provide your key:
```bash
cp .env.example .env.local
```

```env
# Optional: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Or OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here
```

*(Note: If left blank, the app will automatically run the built-in PVSS heuristic simulator).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🧪 API Reference

### `POST /api/evaluate-hook`
Evaluates a video intro script against the PVSS framework.

#### Request:
```json
{
  "script": "Apple just quietly killed the iPhone charging port, but nobody noticed because they hid the announcement inside a 900-page patent filing..."
}
```

#### Response:
```json
{
  "overallScore": 96,
  "grade": "Viral Ready 🔥",
  "verdict": "Elite YouTube hook! Exceptional curiosity, instant proof, and zero wasted seconds.",
  "summary": "Your script scored 96/100 on the PVSS scale.",
  "pillars": {
    "promise": { "name": "Promise", "score": 24, "weightMax": 25, "critique": "...", "tip": "..." },
    "validation": { "name": "Validation", "score": 25, "weightMax": 25, "critique": "...", "tip": "..." },
    "structure": { "name": "Structure", "score": 22, "weightMax": 25, "critique": "...", "tip": "..." },
    "stakes": { "name": "Stakes", "score": 25, "weightMax": 25, "critique": "...", "tip": "..." }
  },
  "critique": {
    "strengths": ["Compelling premise with immediate curiosity gap.", "..."],
    "improvements": ["Test an alternative visual match-cut in your video editor."]
  },
  "pacing": {
    "wordCount": 48,
    "estimatedSeconds": 19,
    "targetSeconds": 15,
    "status": "sweet_spot",
    "statusMessage": "Optimal pacing for a 15-second intro (~30–45 words)."
  },
  "providerUsed": "simulator"
}
```
