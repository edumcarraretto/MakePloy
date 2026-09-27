import { SiClaude, SiDeepseek, SiGooglegemini, SiMetaai, SiMistralai } from 'react-icons/si'

// ─── AI Model Logo Components ─────────────────────────────────────────────────

const OpenAIIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="36" height="36" aria-hidden="true" className="text-white">
    <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z" />
  </svg>
)

// ─── SVG Network Traces ────────────────────────────────────────────────────────

function NetworkTraces() {
  return (
    <svg className="aic__traces" viewBox="0 0 320 220" fill="none" style={{ overflow: 'visible' }}>
      
      {/* ── 0. Subtle Background Orbit Rings ─────────────── */}
      <circle cx="160" cy="110" r="54" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="160" cy="110" r="98" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="3 7" />

      {/* ── 1. Top-Left: Claude -> MakePloy ────────────────── */}
      {/* Dashed coral guide arc */}
      <path className="aic__arc" d="M 76 46 Q 110 38 144 76" stroke="rgba(217, 119, 87, 0.35)" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" />
      {/* Base track */}
      <path d="M 82 62 Q 106 72 132.6 91.0" stroke="rgba(217, 119, 87, 0.35)" strokeWidth="1.75" strokeLinecap="round" />
      {/* Animated beam pulse */}
      <path className="aic__beam aic__beam--claude" d="M 82 62 Q 106 72 132.6 91.0" stroke="#D97757" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 125.4 90.8 L 132.6 91.0 L 130.0 84.3" stroke="#D97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── 2. Bottom-Left: OpenAI -> MakePloy ──────────────── */}
      {/* Dashed white guide arc */}
      <path className="aic__arc" d="M 64 182 Q 100 196 138 144" stroke="rgba(255, 255, 255, 0.20)" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" />
      {/* Base track */}
      <path d="M 71 154 Q 100 150 131.0 126.5" stroke="rgba(255, 255, 255, 0.20)" strokeWidth="1.75" strokeLinecap="round" />
      {/* Animated beam pulse */}
      <path className="aic__beam aic__beam--openai" d="M 71 154 Q 100 150 131.0 126.5" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 123.9 127.1 L 131.0 126.5 L 128.5 133.2" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── 3. Top-Right: Gemini -> MakePloy ───────────────── */}
      {/* Dashed cyan guide arc */}
      <path className="aic__arc" d="M 242 42 Q 206 35 175 75" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" />
      {/* Base track */}
      <path d="M 233 68 Q 212 74 188.8 93.2" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.75" strokeLinecap="round" />
      {/* Animated beam pulse */}
      <path className="aic__beam aic__beam--gemini" d="M 233 68 Q 212 74 188.8 93.2" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 190.9 86.3 L 188.8 93.2 L 196.0 92.5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── 4. Bottom-Right: DeepSeek -> MakePloy ──────────── */}
      {/* Dashed indigo guide arc */}
      <path className="aic__arc" d="M 244 180 Q 212 192 176 142" stroke="rgba(129, 140, 248, 0.35)" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" />
      {/* Base track */}
      <path d="M 231 151 Q 210 145 188.8 126.8" stroke="rgba(129, 140, 248, 0.35)" strokeWidth="1.75" strokeLinecap="round" />
      {/* Animated beam pulse */}
      <path className="aic__beam aic__beam--deepseek" d="M 231 151 Q 210 145 188.8 126.8" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 196.0 127.5 L 188.8 126.8 L 190.7 133.7" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── 5. Mid-Left: Meta AI -> MakePloy ───────────────── */}
      {/* Dashed blue guide arc */}
      <path className="aic__arc" d="M 20 90 Q 58 78 110 95" stroke="rgba(25, 119, 243, 0.30)" strokeWidth="1.2" strokeDasharray="3 5" strokeLinecap="round" />
      {/* Base track */}
      <path d="M 42 107.5 Q 84 108.5 126.5 109.5" stroke="rgba(25, 119, 243, 0.30)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Animated beam pulse */}
      <path className="aic__beam aic__beam--meta" d="M 42 107.5 Q 84 108.5 126.5 109.5" stroke="#1977F3" strokeWidth="2" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 120.5 105.7 L 126.5 109.5 L 120.5 113.3" stroke="#1977F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* ── 6. Mid-Right: Mistral -> MakePloy ──────────────── */}
      {/* Dashed orange guide arc */}
      <path className="aic__arc" d="M 298 92 Q 262 80 210 96" stroke="rgba(255, 106, 0, 0.30)" strokeWidth="1.2" strokeDasharray="3 5" strokeLinecap="round" />
      {/* Base track */}
      <path d="M 276 108.5 Q 235 108.5 193.5 109.5" stroke="rgba(255, 106, 0, 0.30)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Animated beam pulse */}
      <path className="aic__beam aic__beam--mistral" d="M 276 108.5 Q 235 108.5 193.5 109.5" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 199.5 105.7 L 193.5 109.5 L 199.5 113.3" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AIConstellationPreview() {
  return (
    <div className="aic__stage flex-1 flex w-full justify-center items-center relative overflow-hidden h-full">
      <style>{`
        .aic__stage {
          font-family: var(--font-family-brand);
        }

        .aic {
          position: relative;
          width: 100%;
          max-width: 320px;
          height: 220px;
        }

        .aic__traces {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* Animated data beam flowing into MAKEPLOY */
        .aic__beam {
          stroke-dasharray: 18 100;
          stroke-dashoffset: 118;
          animation: aic-beam-flow 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .aic__beam--claude   { animation-delay: 0s; }
        .aic__beam--gemini   { animation-delay: -0.6s; }
        .aic__beam--openai   { animation-delay: -1.2s; }
        .aic__beam--deepseek { animation-delay: -1.8s; }
        .aic__beam--meta     { animation-delay: -0.4s; }
        .aic__beam--mistral  { animation-delay: -1.0s; }

        @keyframes aic-beam-flow {
          0% {
            stroke-dashoffset: 118;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -12;
            opacity: 0;
          }
        }

        /* Subtle marching dashed guide arc */
        .aic__arc {
          animation: aic-arc-march 10s linear infinite;
        }

        @keyframes aic-arc-march {
          to { stroke-dashoffset: -40; }
        }

        /* ---- Node Wrapper & Bubbles ---- */
        .aic__node {
          position: absolute;
          transform: translate(-50%, -50%);
          animation: aic-float ease-in-out infinite alternate;
        }

        .aic__bubble {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          border-radius: 9999px;
          background: #0d0d0d;
          border: 1.5px solid transparent;
        }

        /* Per-model colored borders */
        .node-yt .aic__bubble { border-color: rgba(217, 119, 87, 0.55); }  /* Claude — coral */
        .node-fb .aic__bubble { border-color: rgba(255, 255, 255, 0.30); }  /* OpenAI — white */
        .node-ig .aic__bubble { border-color: rgba(56, 189, 248, 0.55); }   /* Gemini — blue */
        .node-ga .aic__bubble { border-color: rgba(129, 140, 248, 0.55); }  /* DeepSeek — indigo */

        /* Node sizes & placements - Spacious layout with ample breathing room */
        /* Center MakePloy with 4-color gradient border matching the 4 AI lines */
        .node-tk {
          left: 160px;
          top: 110px;
          width: 64px;
          height: 64px;
          border: 2px solid transparent;
          background: 
            linear-gradient(#0d0d0d, #0d0d0d) padding-box,
            conic-gradient(
              from 0deg,
              #38bdf8 45deg,
              #818cf8 135deg,
              #10b981 225deg,
              #f97316 315deg,
              #38bdf8 405deg
            ) border-box;
          animation-duration: 5s;
          animation-delay: 0s;
          z-index: 10;
        }
        
        /* Left Top Claude */
        .node-yt { left: 60px; top: 48px; width: 48px; height: 48px; animation-duration: 4.2s; animation-delay: -1s; }
        
        /* Left Bottom GPT */
        .node-fb { left: 52px; top: 166px; width: 54px; height: 54px; animation-duration: 4.8s; animation-delay: -2s; }
        
        /* Center Bottom DeepSeek */
        .node-ga { left: 255px; top: 165px; width: 50px; height: 50px; animation-duration: 3.8s; animation-delay: -0.5s; }
        
        /* Right Top Gemini */
        .node-ig { left: 260px; top: 52px; width: 58px; height: 58px; animation-duration: 4.5s; animation-delay: -1.5s; }

        /* Left Mid Meta AI — accent node near left edge */
        .node-meta { left: 24px; top: 107px; width: 36px; height: 36px; animation-duration: 5.1s; animation-delay: -0.8s; }
        .node-meta .aic__bubble { border-color: rgba(25, 119, 243, 0.50); }

        /* Right Mid Mistral — accent node near right edge */
        .node-mistral { left: 294px; top: 108px; width: 36px; height: 36px; animation-duration: 4.7s; animation-delay: -2.3s; }
        .node-mistral .aic__bubble { border-color: rgba(255, 106, 0, 0.50); }

        @keyframes aic-float {
          0%   { transform: translate(-50%, -50%) translateY(0); }
          100% { transform: translate(-50%, -50%) translateY(-5px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .aic__node, .aic__beam, .aic__arc {
            animation: none !important;
          }
        }
      `}</style>

      <div className="aic">
        <NetworkTraces />

        {/* --- Main Nodes --- */}
        
        {/* Left Bottom (OpenAI / ChatGPT) */}
        <div className="aic__node node-fb">
          <div className="aic__bubble">
            <OpenAIIcon />
          </div>
        </div>

        {/* Left Top (Claude) */}
        <div className="aic__node node-yt">
          <div className="aic__bubble">
            <SiClaude className="w-8 h-8 text-[#D97757]" />
          </div>
        </div>

        {/* Center Bottom (DeepSeek) */}
        <div className="aic__node node-ga">
          <div className="aic__bubble">
            <SiDeepseek className="w-8 h-8 text-[#4D6BFE]" />
          </div>
        </div>

        {/* Right Top (Gemini) */}
        <div className="aic__node node-ig">
          <div className="aic__bubble">
            <SiGooglegemini className="w-10 h-10 text-[#4E88FF]" />
          </div>
        </div>

        {/* Center (MakePloy) */}
        <div className="aic__node aic__bubble node-tk">
          <img src="/nova-logo-128.webp" alt="MAKEPLOY" width={48} height={48} className="object-contain" />
        </div>

        {/* Left Mid accent — Meta AI */}
        <div className="aic__node node-meta">
          <div className="aic__bubble">
            <SiMetaai className="w-4 h-4 text-[#1977F3]" />
          </div>
        </div>

        {/* Right Mid accent — Mistral AI */}
        <div className="aic__node node-mistral">
          <div className="aic__bubble">
            <SiMistralai className="w-4 h-4 text-[#FF6A00]" />
          </div>
        </div>

      </div>
    </div>
  )
}
