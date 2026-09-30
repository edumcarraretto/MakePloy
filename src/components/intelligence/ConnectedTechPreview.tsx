/* =========================================================
   MCP Online Card
   Traços de circuito + chips de integração + logo central MAKEPLOY
   ========================================================= */

import { useId } from 'react';
import { SiClaude, SiDeepseek, SiGooglegemini } from 'react-icons/si';
import { ChatGPTLogo } from './AILogos';
import './RefinedConnectedTechPreview.css';

/* Coordenadas em viewBox 400x250.
   A caixa do núcleo vai de x=142 a x=258, e as linhas verticais
   dos colchetes ficam em x=146 e x=254. Os traços terminam
   exatamente nesses valores — encostam no núcleo em vez de
   pararem no vazio.
   Os que atravessam um chip passam pela coordenada exata dele. */
const CORE_LEFT = 146;
const CORE_RIGHT = 254;

/* alturas em que os traços encostam no núcleo */
const JUNCTION_Y = [60, 78, 96, 114, 132];

const TRACES_LEFT = [
  "M -100 18 C 50 18, 100 34, 146 60",
  "M -100 46 C 28 46, 58 60, 80 60 S 120 70, 146 78",
  "M -100 96 C 40 96, 100 96, 146 96",
  "M -100 170 C 18 170, 36 132, 52 132 S 116 120, 146 114",
  "M -100 222 C 60 222, 108 168, 146 132",
];

const TRACES_RIGHT = [
  "M 500 18 C 350 18, 300 34, 254 60",
  "M 500 40 C 380 40, 358 75, 340 75 S 280 78, 254 78",
  "M 500 96 C 360 96, 300 96, 254 96",
  "M 500 170 C 380 170, 312 127, 296 127 S 272 118, 254 114",
  "M 500 222 C 340 222, 292 168, 254 132",
];

function Traces() {
  const sides = [
    { paths: TRACES_LEFT, id: "mcp-pulse-blue", x: CORE_LEFT, dot: "var(--color-brand-blue)" },
    { paths: TRACES_RIGHT, id: "mcp-pulse-purple", x: CORE_RIGHT, dot: "var(--color-brand-magenta)" },
  ];

  return (
    <svg
      className="mcp__traces"
      viewBox="0 0 400 250"
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="mcp-pulse-blue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-brand-blue)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="mcp-pulse-purple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-magenta)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-brand-magenta)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-brand-magenta)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {sides.map((side, s) =>
        side.paths.map((d, i) => (
          <g key={d}>
            <path
              d={d}
              stroke="#1C1C22"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              className="mcp__pulse"
              d={d}
              stroke={`url(#${side.id})`}
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{
                animationDelay: `${(i * 0.85 + s * 0.42).toFixed(2)}s`,
              }}
            />
          </g>
        ))
      )}

      {/* pontos de conexão na borda do núcleo */}
      {sides.map((side) =>
        JUNCTION_Y.map((y) => (
          <circle
            key={`${side.x}-${y}`}
            cx={side.x}
            cy={y}
            r="1.6"
            fill={side.dot}
            opacity="0.55"
          />
        ))
      )}

      {/* brackets */}
      <g transform="translate(142, 38)">
        <path
          d="M26 4 H16 A12 12 0 0 0 4 16 V100 A12 12 0 0 0 16 112 H26"
          stroke="var(--color-brand-blue)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M90 4 H100 A12 12 0 0 1 112 16 V100 A12 12 0 0 1 100 112 H90"
          stroke="var(--color-brand-magenta)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* --- marcas oficiais (paths extraídos de simple-icons) --- */

const LOGOS = {
  analytics: (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
      <title>Google Analytics</title>
      <path fill="#F9AB00" d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
      <title>GitHub</title>
      <path fill="#F5F5F5" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  reddit: (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
      <title>Reddit</title>
      <path fill="#FF4500" d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z" />
    </svg>
  ),
  meta: (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
      <title>Meta</title>
      <path fill="#0866FF" d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
    </svg>
  ),
};

/* posições batendo exatamente com o fim dos traços */
const CHIPS = [
  { id: "analytics", label: "Google Analytics", x: "20%", y: "24%" },
  { id: "github", label: "GitHub", x: "13%", y: "52.8%" },
  { id: "reddit", label: "Reddit", x: "85%", y: "30%" },
  { id: "meta", label: "Meta", x: "74%", y: "50.8%" },
] as const;

/* --------------------------------------------------------- */

export function ConnectedTechPreview({ variant = 'default' }: { variant?: 'default' | 'refined' }) {
  if (variant === 'refined') return <RefinedConnectedTechPreview />;

  return (
    <div className="mcp__stage flex-1 flex w-full justify-center items-end pb-0 sm:pb-2">
      <style>{`
        .mcp__stage {
          font-family: var(--font-family-brand);
        }

        .mcp {
          position: relative;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 400 / 250;
          border-radius: 18px;
          background: transparent;
        }

        .mcp__traces {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .mcp__pulse {
          stroke-dasharray: 22 460;
          stroke-dashoffset: 482;
          animation: mcp-travel 5s linear infinite;
        }

        @keyframes mcp-travel {
          to { stroke-dashoffset: 0; }
        }

        /* ---- chips ---- */
        .mcp__chip {
          position: absolute;
          width: 40px;
          height: 40px;
          margin: -20px 0 0 -20px;
          display: grid;
          place-items: center;
          border-radius: 9999px;
          background: #0B0B0F;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 6px 18px -6px rgba(0, 0, 0, 0.95),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        /* ---- núcleo ---- */
        .mcp__core {
          position: absolute;
          left: 50%;
          top: 38.4%;
          transform: translate(-50%, -50%);
          width: 116px;
          height: 116px;
          display: grid;
          place-items: center;
        }

        .mcp__brackets {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .mcp__logo {
          position: relative;
          width: 54px;
          height: 54px;
          object-fit: contain;
          transform-origin: center;
          animation: mcp-breathe 5s ease-in-out infinite;
        }

        @keyframes mcp-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50%      { transform: scale(1.05) rotate(3deg); }
        }

        /* ---- badge ---- */
        .mcp__badge {
          position: absolute;
          left: 50%;
          bottom: 11%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 20px;
          border-radius: 9999px;
          background: rgba(16, 16, 20, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.95);
          white-space: nowrap;
        }

        .mcp__badge span {
          font-family: var(--font-family-brand);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.92);
        }

        .mcp__dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: #4ADE80;
          box-shadow: 0 0 8px 2px rgba(74, 222, 128, 0.6);
          animation: mcp-blink 2s ease-in-out infinite;
        }

        @keyframes mcp-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mcp__pulse, .mcp__logo, .mcp__dot {
            animation: none;
          }
        }
      `}</style>

      <div className="mcp">
        <Traces />

        {CHIPS.map((chip) => (
          <div
            key={chip.id}
            className="mcp__chip"
            style={{ left: chip.x, top: chip.y }}
            title={chip.label}
          >
            {LOGOS[chip.id as keyof typeof LOGOS]}
          </div>
        ))}

        <div className="mcp__core">
          <img
            src="/nova-logo-128.webp"
            alt="MAKEPLOY"
            width={512}
            height={512}
            className="mcp__logo"
          />
        </div>

        <div className="mcp__badge">
          <div className="mcp__dot" />
          <span>MCP ONLINE</span>
        </div>
      </div>
    </div>
  );
}

const AI_CHIPS = [
  { id: 'chatgpt', label: 'ChatGPT', color: '#f0f4f3', icon: <ChatGPTLogo size={26} /> },
  { id: 'claude', label: 'Claude', color: '#d99a7e', icon: <SiClaude size={26} /> },
  { id: 'gemini', label: 'Gemini', color: '#8aafff', icon: <SiGooglegemini size={26} /> },
  { id: 'deepseek', label: 'DeepSeek', color: '#6f98ff', icon: <SiDeepseek size={26} /> },
];

function RefinedConnectedTechPreview() {
  const id = useId();
  return (
    <div className="mcp-refined">
      <svg viewBox="0 0 400 200" className="mcp-refined__scene" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>ChatGPT, Claude, Gemini e DeepSeek colaboram por meio do MAKEPLOY</title>
        {[TRACES_LEFT, TRACES_RIGHT].map((paths, side) =>
          paths.filter((_, i) => i % 2 === 0).map((path, i) => (
            <g key={path} fill="none" stroke="#9ca3af" strokeLinecap="round">
              <path d={path} strokeWidth=".8" opacity=".2" />
              <path className="mcp-refined__pulse mcp-refined__pulse--outer" d={path} pathLength="100" strokeWidth="1.2" style={{ animationDelay: `${-16 + ((i + side) % 4) * 4}s` }} />
            </g>
          ))
        )}

        {AI_CHIPS.map((chip, i) => {
          const left = i < 2;
          const upper = i % 2 === 0;
          const x = left ? 72 : 328;
          const y = upper ? 52 : 140;
          const endX = left ? CORE_LEFT : CORE_RIGHT;
          const endY = upper ? 78 : 114;
          const controlX = left ? 112 : 288;
          const path = `M ${x} ${y} C ${controlX} ${y}, ${controlX} ${endY}, ${endX} ${endY}`;
          // Each four-second exchange sends from this model and receives at the next.
          const sendDelay = `${-16 + i * 4}s`;
          const receiveDelay = `${-16 + ((i + 3) % 4) * 4}s`;
          const color = chip.color;
          return (
            <g key={chip.id}>
              <path d={path} fill="none" stroke={color} strokeOpacity=".2" strokeWidth=".8" />
              <path
                className="mcp-refined__signal mcp-refined__signal--send"
                d={path}
                pathLength="100"
                fill="none"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                style={{ animationDelay: sendDelay }}
              />
              <path className="mcp-refined__signal mcp-refined__signal--receive" d={path} pathLength="100" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={{ animationDelay: receiveDelay }} />
              <circle cx={endX} cy={endY} r="1.3" fill={color} opacity=".55" />
              <g transform={`translate(${x} ${y})`}>
                <title>{chip.label}</title>
                <circle r="23" fill="#000" fillOpacity=".3" />
                <circle r="20" fill="#09090d" stroke={chip.color} strokeOpacity=".55" strokeWidth=".8" />
                <circle r="19.5" fill={chip.color} fillOpacity=".08" />
                <circle className="mcp-refined__chip-glow" r="20" fill="none" stroke={chip.color} strokeWidth="1.3" style={{ animationDelay: sendDelay }} />
                <g transform="translate(-13 -13)" color={chip.color}>{chip.icon}</g>
              </g>
            </g>
          );
        })}

        <g transform="translate(142 38)" fill="none" strokeWidth="2.6" strokeLinecap="round" opacity=".75">
          <path d="M26 4 H16 A12 12 0 0 0 4 16 V100 A12 12 0 0 0 16 112 H26" stroke="#9ca3af" />
          <path d="M90 4 H100 A12 12 0 0 1 112 16 V100 A12 12 0 0 1 100 112 H90" stroke="#9ca3af" />
        </g>
        <g className="mcp-refined__logo">
          {Array.from({ length: 8 }, (_, step) => (
            <rect
              key={step}
              className="mcp-refined__growth-marker"
              x="172"
              y="68"
              width="56"
              height="56"
              rx="11"
              fill="none"
              stroke="#cbd0d8"
              strokeWidth="1.2"
              style={{ animationDelay: `${1.24 + step * 4}s` }}
            />
          ))}
          <image href="/nova-logo-384.webp" x="166" y="62" width="68" height="68" />
        </g>
      </svg>
    </div>
  );
}
