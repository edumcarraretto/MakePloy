/* =========================================================
   MCP Online Card
   Traços de circuito + chips de integração + logo central MAKEPLOY
   ========================================================= */

import { useId, useState, useEffect } from 'react';
import { SiClaude, SiDeepseek, SiGooglegemini, SiWebflow, SiFramer, SiSupabase, SiReplit, SiV0, SiCursor } from 'react-icons/si';
import { ChatGPTLogo } from './AILogos';
import './RefinedConnectedTechPreview.css';

/* Coordenadas em viewBox 400x250.
   O círculo central tem cx=200, cy=125, r=50.
   Os traços encostam perfeitamente na borda do círculo. */
const JUNCTIONS_LEFT = [
  { x: 165.3, y: 89 },
  { x: 153.4, y: 107 },
  { x: 150, y: 125 },
  { x: 153.4, y: 143 },
  { x: 165.3, y: 161 },
];

const JUNCTIONS_RIGHT = [
  { x: 234.7, y: 89 },
  { x: 246.6, y: 107 },
  { x: 250, y: 125 },
  { x: 246.6, y: 143 },
  { x: 234.7, y: 161 },
];

const TRACES_LEFT = [
  'M -100 47 C 50 47, 100 63, 165.3 89',
  'M -100 75 C 28 75, 58 89, 80 89 S 120 99, 153.4 107',
  'M -100 125 C 40 125, 100 125, 150 125',
  'M -100 199 C 18 199, 36 161, 52 161 S 116 149, 153.4 143',
  'M -100 251 C 60 251, 108 197, 165.3 161',
];

const TRACES_RIGHT = [
  'M 500 47 C 350 47, 300 63, 234.7 89',
  'M 500 69 C 380 69, 358 104, 340 104 S 280 107, 246.6 107',
  'M 500 125 C 360 125, 300 125, 250 125',
  'M 500 199 C 380 199, 312 156, 296 156 S 272 147, 246.6 143',
  'M 500 251 C 340 251, 292 197, 234.7 161',
];

const LINE_COLORS: Record<string, string> = {
  lovable: 'url(#mcp-lovable-line)',
  replit: '#F26207',
  bolt: '#FFFFFF',
  bubble: '#0D4DFF',
  cursor: '#EDECEC',
  framer: '#0055FF',
};

const DOT_COLORS: Record<string, string> = {
  lovable: '#FF7EB0',
  replit: '#F26207',
  bolt: '#FFFFFF',
  bubble: '#0D4DFF',
  cursor: '#EDECEC',
  framer: '#0055FF',
};

function Traces({ activeLine }: { activeLine: number | null }) {
  const sides = [
    { paths: TRACES_LEFT, junctions: JUNCTIONS_LEFT, platforms: ['lovable', 'lovable', 'replit', 'bolt', 'bolt'] },
    { paths: TRACES_RIGHT, junctions: JUNCTIONS_RIGHT, platforms: ['bubble', 'bubble', 'cursor', 'framer', 'framer'] },
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
        <linearGradient id="mcp-lovable-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF8E63" />
          <stop offset="55%" stopColor="#FF7EB0" />
          <stop offset="100%" stopColor="#4B73FF" />
        </linearGradient>

        <linearGradient id="mcp-ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-blue)" />
          <stop offset="100%" stopColor="var(--color-brand-magenta)" />
        </linearGradient>
      </defs>

      {sides.map((side, sideIndex) =>
        side.paths.map((d, lineIndex) => {
          const platform = side.platforms[lineIndex];
          return <g key={d}>
            <path d={d} stroke={LINE_COLORS[platform]} strokeOpacity="0.22" strokeWidth="1.3" strokeLinecap="round" />
            {activeLine === sideIndex * side.paths.length + lineIndex && (
              <path
                className="mcp__pulse"
                d={d}
                pathLength="100"
                stroke={LINE_COLORS[platform]}
                strokeOpacity="0.65"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            )}
          </g>;
        })
      )}

      {/* pontos de conexão na borda do núcleo */}
      {sides.map((side) =>
        side.junctions.map((pt, lineIndex) => (
          <circle
            key={`${pt.x}-${pt.y}`}
            cx={pt.x}
            cy={pt.y}
            r="1.6"
            fill={DOT_COLORS[side.platforms[lineIndex]]}
            opacity="0.5"
          />
        ))
      )}

      {/* circulo central (substituindo brackets) */}
      <circle
        cx="200"
        cy="125"
        r="50"
        fill="none"
        stroke="url(#mcp-ring-grad)"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/* --- logos oficiais das plataformas no-code --- */

function LovableLogo() {
  const maskId = useId();
  const gradId = useId();
  const fC = useId();
  const fD = useId();
  const fE = useId();
  const fF = useId();

  return (
    <svg viewBox="0 0 121 122" width="19" height="19" fill="none" aria-hidden="true">
      <title>Lovable</title>
      <defs>
        <mask id={maskId} width="121" height="122" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
          <path
            fill={`url(#${gradId})`}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.069 0c19.92 0 36.068 16.155 36.068 36.084v13.713h12.004c19.92 0 36.069 16.156 36.069 36.084 0 19.928-16.149 36.083-36.069 36.083H0v-85.88C0 16.155 16.148 0 36.069 0Z"
          />
        </mask>
        <linearGradient id={gradId} x1="40.453" y1="21.433" x2="76.933" y2="121.971" gradientUnits="userSpaceOnUse">
          <stop offset="0.025" stopColor="#FF8E63" />
          <stop offset="0.56" stopColor="#FF7EB0" />
          <stop offset="0.95" stopColor="#4B73FF" />
        </linearGradient>
        <filter id={fC} width="235.52" height="235.16" x="-65" y="-52" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="18.2" />
        </filter>
        <filter id={fD} width="281.2" height="235.16" x="-79" y="-97" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="18.2" />
        </filter>
        <filter id={fE} width="235.52" height="215.38" x="-39" y="-102" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="18.2" />
        </filter>
        <filter id={fF} width="170.65" height="170.43" x="-22" y="-65" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="18.2" />
        </filter>
      </defs>
      <g mask={`url(#${maskId})`}>
        <g filter={`url(#${fC})`}><ellipse cx="52.738" cy="65.101" fill="#4B73FF" rx="81.373" ry="81.192" /></g>
        <g filter={`url(#${fD})`}><ellipse cx="61.673" cy="20.547" fill="#FF66F4" rx="104.216" ry="81.192" /></g>
        <g filter={`url(#${fE})`}><ellipse cx="78.666" cy="5.268" fill="#FF0105" rx="81.373" ry="71.304" /></g>
        <g filter={`url(#${fF})`}><ellipse cx="63.121" cy="20.527" fill="#FE7B02" rx="48.937" ry="48.829" /></g>
      </g>
    </svg>
  );
}

function BoltLogo() {
  return (
    <svg viewBox="0 45.65 160 68.7" width="22" height="11" fill="none" aria-hidden="true">
      <title>Bolt</title>
      <path
        fill="#FFFFFF"
        d="M75.61 106.195c-14.747 0-21.962-8.468-21.962-19.136s10.04-24.157 24.782-24.157c14.746 0 21.96 8.47 21.96 19.137 0 10.668-10.038 24.156-24.78 24.156Zm.624-13.488c5.02 0 8.473-4.707 8.473-9.727 0-5.02-2.512-6.273-6.902-6.273-4.395 0-8.473 4.703-8.473 9.723 0 5.02 2.512 6.277 6.902 6.277Zm39.844 12.547h-15.371l12.547-57.098h15.375l-12.55 56.785Zm0 0 M30.117 106.195c-4.707 0-9.41-1.566-11.922-5.332l-.941 4.39L0 114.353l1.883-9.098L14.43 48.156h15.375L25.41 68.234c3.453-3.765 6.902-5.332 11.297-5.332 9.41 0 15.371 5.961 15.371 17.254 0 11.293-7.215 26.04-21.96 26.04Zm5.961-22.902c0 5.336-3.766 9.414-8.785 9.414-5.02 0-5.332-.941-6.902-2.824l2.511-10.352c1.883-1.883 3.766-2.824 6.274-2.824 3.765 0 6.902 2.824 6.902 6.902Zm0 0 M144.629 106.195c-8.785 0-15.375-3.136-15.375-10.351 0-7.215 0-2.196.316-3.137l3.45-15.375h-6.903l3.137-13.176h6.902l2.512-11.293 17.254-7.215-1.883 7.215-2.508 11.293H160l-3.137 13.176h-8.472l-2.196 10.04v1.882c0 1.883 1.254 3.453 3.766 3.453 2.508 0 1.883 0 2.195-.316v12.238c-1.566 1.254-4.39 1.566-7.215 1.566Zm0 0"
      />
    </svg>
  );
}

function BubbleLogo() {
  return (
    <svg width="19" height="19" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <title>Bubble</title>
      <path
        d="M8.43939 3.63487C7.18121 3.63487 5.94112 4.17502 4.99437 5.237V0H3.12085V8.81681C3.12085 8.81702 3.12085 8.81722 3.12085 8.81747C3.12085 11.6797 5.44115 14 8.30342 14C11.1657 14 13.486 11.6797 13.486 8.81747C13.486 5.95523 11.3016 3.63487 8.43939 3.63487ZM8.30342 12.0039C6.54358 12.0039 5.11694 10.5772 5.11694 8.81744C5.11694 7.0576 6.54358 5.63096 8.30342 5.63096C10.0632 5.63096 11.4899 7.0576 11.4899 8.81744C11.4899 10.5773 10.0632 12.0039 8.30342 12.0039Z"
        fill="#FFFFFF"
      />
      <path
        d="M1.75886 11.4368C1.05105 11.4368 0.477295 12.0106 0.477295 12.7183C0.477295 13.4261 1.05105 13.9999 1.75886 13.9999C2.46667 13.9999 3.04042 13.4261 3.04042 12.7183C3.04042 12.0106 2.46667 11.4368 1.75886 11.4368Z"
        fill="#0D4DFF"
      />
    </svg>
  );
}

function FlutterFlowLogo() {
  return (
    <svg width="19" height="19" viewBox="0 6 30 30" fill="none" aria-hidden="true">
      <title>FlutterFlow</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5304 7.46631C26.3902 7.46631 27.186 7.92462 27.5892 8.66966C27.9755 9.38331 27.9591 10.2243 27.5464 10.9223L27.5323 10.9458L23.9146 16.9074C23.5055 17.5816 22.767 18.0023 21.9776 18.0113L21.9518 18.0115L17.8207 18.0114L19.5377 21.8838L19.5446 21.8952L19.5551 21.9135C19.9595 22.6335 19.9496 23.4895 19.5303 24.1987L19.5162 24.2223L15.8985 30.184C15.4893 30.8581 14.7508 31.2789 13.9615 31.2879L13.9357 31.288L8.86521 31.288L5.22012 35.0753L5.21322 35.0823C4.87021 35.4258 4.40676 35.6174 3.92356 35.6174C3.80277 35.6174 3.6819 35.6054 3.56233 35.5814C2.97291 35.4629 2.4832 35.0644 2.24747 34.5149L2.24082 34.4992L0.322582 30.1613L0.312492 30.1447L0.302011 30.1268C0.30027 30.1238 0.298499 30.1206 0.29665 30.1173C-0.10772 29.3974 -0.0979261 28.5414 0.321374 27.8321L0.335502 27.8085L3.8443 22.0263L1.25884 16.1955L1.30622 16.1717L1.3055 16.1682C1.19611 15.6318 1.28417 15.0725 1.56512 14.5826L1.58064 14.556L1.59498 14.532L5.2127 8.57029C5.62186 7.89619 6.36044 7.47543 7.14972 7.46631H7.17548H25.5304ZM6.53453 31.2427L2.69069 31.2426L3.81966 33.8153L3.82244 33.8221C3.84115 33.8682 3.87142 33.8934 3.91648 33.9026C3.95667 33.9107 3.98919 33.9023 4.01994 33.8747L4.02532 33.8696L6.53453 31.2427ZM17.5229 22.3978H5.90385C5.89102 22.3978 5.87819 22.3983 5.86538 22.3991L5.86186 22.3994L9.0477 29.5783H13.9351C14.136 29.5783 14.3296 29.4723 14.4396 29.3021L14.4483 29.2882L18.0713 23.3229C18.1794 23.1449 18.1913 22.9385 18.1057 22.7527C18.0069 22.5384 17.7777 22.3978 17.5229 22.3978ZM4.69605 23.872L1.82063 28.6463C1.70621 28.8363 1.69958 29.0588 1.80204 29.2547L1.81291 29.2746L1.8187 29.2844L1.8303 29.3031L1.8533 29.3367L1.87897 29.3696L1.90353 29.3973L1.90779 29.4018L1.9244 29.4183L1.93883 29.4319C2.02928 29.5127 2.14109 29.5621 2.26441 29.5748L2.29212 29.5771L2.30816 29.5779L2.32848 29.5783H7.20721L4.69605 23.872ZM3.93994 18.023L5.20279 20.8761L5.22739 20.8679C5.44548 20.796 5.6735 20.757 5.90401 20.7535L5.93861 20.7532L17.2012 20.7532L15.9928 18.023L3.93994 18.023ZM25.4983 9.13065H13.8378L17.0246 16.3111H21.9103C22.1116 16.3111 22.3053 16.2051 22.4154 16.0348L22.4241 16.0208L26.0473 10.0556C26.1553 9.87773 26.1673 9.67143 26.0817 9.4858C25.985 9.27595 25.7632 9.13667 25.5146 9.13084L25.4983 9.13065ZM12.0528 9.13065H7.19416C6.99436 9.13065 6.80166 9.23641 6.69203 9.40642L6.68333 9.42035L3.06968 15.3857C2.9618 15.5637 2.94987 15.7705 3.03542 15.9565C3.13178 16.1662 3.35237 16.3051 3.59952 16.3109L3.61568 16.3111H15.2312L12.0528 9.13065Z"
        fill="#4B39EF"
      />
    </svg>
  );
}

const PLATFORM_LOGOS: Record<string, React.ReactNode> = {
  lovable: <LovableLogo />,
  bolt: <BoltLogo />,
  v0: <SiV0 size={19} color="#FFFFFF" />,
  bubble: <BubbleLogo />,
  webflow: <SiWebflow size={19} color="#146EF5" />,
  framer: <SiFramer size={19} color="#0055FF" />,
  flutterflow: <FlutterFlowLogo />,
  supabase: <SiSupabase size={19} color="#3ECF8E" />,
  cursor: <SiCursor size={19} color="#EDECEC" />,
  replit: <SiReplit size={19} color="#F26207" />,
};

const PLATFORM_RINGS: Record<string, string> = {
  lovable: 'linear-gradient(135deg, #FF8E63, #FF7EB0 55%, #4B73FF)',
  bolt: 'linear-gradient(#FFFFFF, #FFFFFF)',
  v0: 'linear-gradient(#FFFFFF, #FFFFFF)',
  bubble: 'linear-gradient(#0D4DFF, #0D4DFF)',
  webflow: 'linear-gradient(#146EF5, #146EF5)',
  framer: 'linear-gradient(#0055FF, #0055FF)',
  flutterflow: 'linear-gradient(#4B39EF, #4B39EF)',
  supabase: 'linear-gradient(#3ECF8E, #3ECF8E)',
  cursor: 'linear-gradient(#EDECEC, #EDECEC)',
  replit: 'linear-gradient(#F26207, #F26207)',
};

/* Seis plataformas fixas nas posições atuais. */
const CHIP_SLOTS = [
  { x: '18%', y: '32%', platform: 'lovable' },
  { x: '5%', y: '50%', platform: 'replit' },
  { x: '16%', y: '68%', platform: 'bolt' },
  { x: '82%', y: '32%', platform: 'bubble' },
  { x: '90%', y: '50%', platform: 'cursor' },
  { x: '78%', y: '68%', platform: 'framer' },
];

const TRACE_COUNT = TRACES_LEFT.length + TRACES_RIGHT.length;

/* --------------------------------------------------------- */

export function ConnectedTechPreview({ variant = 'default' }: { variant?: 'default' | 'refined' }) {
  if (variant === 'refined') return <RefinedConnectedTechPreview />;

  return <DefaultConnectedTechPreview />;
}

function DefaultConnectedTechPreview() {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveLine((line) => (line + 1) % TRACE_COUNT);
    }, 1350);
    return () => window.clearInterval(timer);
  }, []);

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
          stroke-dasharray: 12 100;
          stroke-dashoffset: -30;
          animation: mcp-travel 1.15s linear both;
        }

        @keyframes mcp-travel {
          0% { stroke-dashoffset: -30; opacity: 0; }
          10% { opacity: 1; }
          85% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
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
          border: 1.5px solid transparent;
          box-shadow:
            0 6px 18px -6px rgba(0, 0, 0, 0.95),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .mcp__chip-inner {
          display: grid;
          place-items: center;
          width: 21px;
          height: 21px;
        }

        /* ---- núcleo ---- */
        .mcp__core {
          position: absolute;
          left: 50%;
          top: 50%;
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
        <Traces activeLine={activeLine} />

        {CHIP_SLOTS.map((slot) => {
          const platformId = slot.platform;
          return (
            <div
              key={platformId}
              className="mcp__chip"
              style={{
                left: slot.x,
                top: slot.y,
                background: `linear-gradient(#0B0B0F, #0B0B0F) padding-box, ${PLATFORM_RINGS[platformId]} border-box`,
              }}
              title={platformId}
            >
              <div className="mcp__chip-inner">
                {PLATFORM_LOGOS[platformId]}
              </div>
            </div>
          );
        })}

        <div className="mcp__core">
          <img
            src="/nova-logo-128.webp"
            alt="MAKEPLOY"
            width={512}
            height={512}
            className="mcp__logo"
          />
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
          const endX = left ? 146 : 254;
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
