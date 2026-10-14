import { motion } from 'motion/react'
import { useId } from 'react'

const windowCornerPaths = {
  'top-left': { path: 'M 1 68 V 18 A 17 17 0 0 1 18 1 H 68', x1: 0, y1: 68, x2: 68, y2: 0 },
  'top-right': { path: 'M 0 1 H 50 A 17 17 0 0 1 67 18 V 68', x1: 0, y1: 0, x2: 68, y2: 68 },
  'bottom-right': { path: 'M 67 0 V 50 A 17 17 0 0 1 50 67 H 0', x1: 68, y1: 0, x2: 0, y2: 68 },
  'bottom-left': { path: 'M 68 67 H 18 A 17 17 0 0 1 1 50 V 0', x1: 68, y1: 68, x2: 0, y2: 0 },
} as const

function WindowCorner({ corner }: { corner: keyof typeof windowCornerPaths }) {
  const gradientId = useId()
  const { path, x1, y1, x2, y2 } = windowCornerPaths[corner]

  return (
    <svg
      className={`makeploy-window-corner makeploy-window-corner--${corner}`}
      viewBox="0 0 68 68"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
          <stop offset="16%" stopColor="#0ea5e9" stopOpacity="0.08" />
          <stop offset="28%" stopColor="#22c55e" stopOpacity="0.38" />
          <stop offset="42%" stopColor="#facc15" stopOpacity="1" />
          <stop offset="58%" stopColor="#ff7a00" stopOpacity="1" />
          <stop offset="72%" stopColor="#ff2d55" stopOpacity="0.38" />
          <stop offset="84%" stopColor="#ec4899" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} stroke={`url(#${gradientId})`} strokeOpacity="0.52" strokeWidth="2" />
    </svg>
  )
}

// ─── Dark Mini-Window ─────────────────────────────────────────────────────────

function MiniWindow({
  style,
  layout,
  delay,
}: {
  style: React.CSSProperties
  layout: 'horizontal' | 'left-corner' | 'right-corner' | 'vertical'
  delay: string
}) {
  return (
    <div
      aria-hidden="true"
      className="makeploy-window-flow absolute rounded-[18px] border border-white/[0.06] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #141414 0%, #0c0c0c 100%)',
        boxShadow:
          '0 2px 16px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
        ...style,
        animationDelay: `${delay}, ${delay}`,
      }}
    >
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <WindowCorner corner="top-left" />
        <WindowCorner corner="top-right" />
        <WindowCorner corner="bottom-right" />
        <WindowCorner corner="bottom-left" />
      </div>
      {/* 3 traffic-light dots */}
      <div className="flex items-center gap-[5px] px-[9px] pt-[8px]">
        <span className="w-[8px] h-[8px] rounded-full bg-white/[0.10]" />
        <span className="w-[8px] h-[8px] rounded-full bg-white/[0.10]" />
        <span className="w-[8px] h-[8px] rounded-full bg-white/[0.10]" />
      </div>
      {layout === 'horizontal' && (
        <div className="mt-[16px] space-y-[8px] px-[10px]">
          <div className="h-[2px] w-[42%] rounded-full bg-white/[0.12]" />
          <div className="h-[2px] w-[28%] rounded-full bg-white/[0.07]" />
        </div>
      )}
      {layout === 'left-corner' && (
        <div className="mt-[15px] flex items-start gap-[8px] px-[10px]">
          <div className="h-[27px] w-[2px] shrink-0 rounded-full bg-white/[0.10]" />
          <div className="mt-[2px] h-[2px] w-[36%] rounded-full bg-white/[0.08]" />
        </div>
      )}
      {layout === 'right-corner' && (
        <div className="mt-[15px] px-[10px]">
          <div className="h-[2px] w-[44%] rounded-full bg-white/[0.10]" />
          <div className="ml-[44%] h-[27px] w-[2px] rounded-full bg-white/[0.08]" />
        </div>
      )}
      {layout === 'vertical' && (
        <div className="mt-[15px] px-[10px]">
          <div className="h-[27px] w-[2px] rounded-full bg-white/[0.10]" />
        </div>
      )}
    </div>
  )
}

// ─── AI Logo Capsule Tab (flush against the card's left border) ───────────────

function AILogoCapsuleTab() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30"
    >
      {/* Capsule container — flat on left, rounded-r-full on right */}
      <div className="relative flex items-center h-[54px] w-[96px]">
        {/* SVG background & exact gradient border matching reference */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 96 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle base rim — understated neutral glass border */}
            <linearGradient
              id="capsule-subtle-rim"
              x1="0"
              y1="0"
              x2="96"
              y2="54"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </linearGradient>

            {/* Official MakePloy logo spectrum beam: Blue, Green, Yellow, Orange, Coral Red, Magenta */}
            <linearGradient
              id="neon-streaming-beam"
              x1="0"
              y1="0"
              x2="96"
              y2="54"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.45" />
              <stop offset="20%" stopColor="#22c55e" stopOpacity="0.45" />
              <stop offset="42%" stopColor="#facc15" stopOpacity="0.48" />
              <stop offset="65%" stopColor="#ff7a00" stopOpacity="0.48" />
              <stop offset="85%" stopColor="#ff2d55" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Capsule background fill */}
          <path
            d="M 0 0.5 L 69 0.5 A 26.5 26.5 0 0 1 69 53.5 L 0 53.5 Z"
            fill="#0a0a0c"
          />

          {/* Base border: open on the left so main card border is never touched */}
          <path
            d="M 0 0.5 L 69 0.5 A 26.5 26.5 0 0 1 69 53.5 L 0 53.5"
            fill="none"
            stroke="url(#capsule-subtle-rim)"
            strokeWidth="1"
          />

          {/* Smooth animated beam streaming with pure CSS for 60/120fps hardware acceleration and seamless loop */}
          <path
            d="M 0 0.5 L 69 0.5 A 26.5 26.5 0 0 1 69 53.5 L 0 53.5"
            fill="none"
            stroke="url(#neon-streaming-beam)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              strokeDasharray: '68px 350px',
              animation: 'makeployCapsuleBeam 5.6s linear infinite',
              willChange: 'stroke-dashoffset',
            }}
          />
        </svg>

        {/* Pure CSS keyframe for zero-overhead, buttery smooth loop transition */}
        <style>{`
          @keyframes makeployCapsuleBeam {
            0% {
              stroke-dashoffset: 72px;
            }
            100% {
              stroke-dashoffset: -226px;
            }
          }
        `}</style>

        {/* Logo directly inside the capsule on the right — continuously rotating clockwise */}
        <div className="relative ml-auto mr-[15px] flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center justify-center"
          >
            <img
              src="/nova-logo-128.webp"
              alt="MakePloy"
              width={38}
              height={38}
              className="relative z-10 w-[38px] h-[38px] object-contain rounded-[8px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Composition ─────────────────────────────────────────────────────────

export function IdeaToWindowsPreview() {
  return (
    <div className="relative w-full h-full min-h-[200px] overflow-hidden">
      <style>{`
        @keyframes makeployWindowFlow {
          0% { top: -8%; right: -42%; opacity: 0; }
          12.5% { top: 2%; right: -38%; opacity: 1; }
          37.5% { top: 22%; right: -30%; opacity: 1; }
          62.5% { top: 42%; right: -22%; opacity: 1; }
          75% { top: 52%; right: -18%; opacity: 1; }
          87.5% { top: 62%; right: -14%; opacity: 0; }
          100% { top: 72%; right: -10%; opacity: 0; }
        }

        @keyframes makeployWindowDepth {
          0% { z-index: 10; }
          25% { z-index: 11; }
          50% { z-index: 12; }
          75%, 100% { z-index: 13; }
        }

        .makeploy-window-flow {
          animation: makeployWindowFlow 6s linear infinite,
            makeployWindowDepth 6s steps(1, end) infinite;
        }

        .makeploy-window-corner {
          position: absolute;
          width: 68px;
          height: 68px;
        }

        .makeploy-window-corner--top-left {
          top: 0;
          left: 0;
        }

        .makeploy-window-corner--top-right {
          top: 0;
          right: 0;
        }

        .makeploy-window-corner--bottom-right {
          right: 0;
          bottom: 0;
        }

        .makeploy-window-corner--bottom-left {
          bottom: 0;
          left: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .makeploy-window-flow { animation: none; }
        }
      `}</style>

      {/* AI Logo Capsule Tab — flush against the card's left border */}
      <div className="absolute left-0 top-3 sm:top-4 z-30">
        <AILogoCapsuleTab />
      </div>

      {/* Three visible windows; the next enters as the front one fades out. */}
      <div className="absolute inset-0 translate-y-[10%]">
        <MiniWindow
          layout="horizontal"
          delay="-0.75s"
          style={{
            width: '95%',
            height: '65%',
            right: '-38%',
            top: '2%',
            zIndex: 11,
          }}
        />
        <MiniWindow
          layout="left-corner"
          delay="-2.25s"
          style={{
            width: '95%',
            height: '65%',
            right: '-30%',
            top: '22%',
            zIndex: 12,
          }}
        />
        <MiniWindow
          layout="right-corner"
          delay="-3.75s"
          style={{
            width: '95%',
            height: '65%',
            right: '-22%',
            top: '42%',
            zIndex: 13,
          }}
        />
        <MiniWindow
          layout="vertical"
          delay="-5.25s"
          style={{
            width: '95%',
            height: '65%',
            right: '-14%',
            top: '62%',
            zIndex: 13,
            opacity: 0,
          }}
        />
      </div>
    </div>
  )
}
