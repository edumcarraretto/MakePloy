import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react'

// ─── Bar chart data ───────────────────────────────────────────────────────────

const BARS = [
  { h: 42, minScale: 0.55, duration: 8.4, phase: 0, top: '#ff2d55', bottom: '#ffafc0' },
  { h: 76, minScale: 0.7, duration: 9.6, phase: 1.4, top: '#ff7a00', bottom: '#ffd2a1' },
  { h: 51, minScale: 0.56, duration: 8.8, phase: 3.1, top: '#facc15', bottom: '#fff0a3' },
  { h: 86, minScale: 0.72, duration: 10.4, phase: 4.7, top: '#22c55e', bottom: '#a6efbd' },
  { h: 62, minScale: 0.65, duration: 9.2, phase: 2.2, top: '#64d2ff', bottom: '#bceeff' },
  { h: 100, minScale: 0.72, duration: 11.2, phase: 5.4, top: '#168cff', bottom: '#9bcaff' },
]

const WAVE_STEPS = 16
const ANALYSIS_STEPS = [
  'Lendo o briefing',
  'Identificando objetivos',
  'Reunindo referências',
  'Comparando abordagens',
  'Analisando o público',
  'Mapeando oportunidades',
  'Relacionando ideias',
  'Organizando descobertas',
  'Definindo prioridades',
  'Preparando próximos passos',
] as const
const STEP_DURATION_SECONDS = 3
const LOADING_DOTS = [0, 1, 2] as const

function barWave(minScale: number, phase: number) {
  return Array.from({ length: WAVE_STEPS + 1 }, (_, step) =>
    minScale + (1 - minScale) * (0.5 - 0.5 * Math.cos((step / WAVE_STEPS) * Math.PI * 2 + phase)),
  )
}

// ─── Cursor label component ──────────────────────────────────────────────────

function CursorLabel({
  name,
  x,
  y,
  cursorAngle,
  delay,
}: {
  name: string
  x: string
  y: string
  cursorAngle: number
  delay: number
}) {
  return (
    <div className="absolute z-30" style={{ left: x, top: y, transform: 'translateX(-50%)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col items-center"
      >
        {/* Name pill */}
        <div className="relative rounded-[9px] border border-white/15 bg-black px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_16px_rgba(0,0,0,0.4)] whitespace-nowrap">
          {name}
        </div>

        {/* Cursor arrow centered below the label */}
        <motion.svg
          animate={{ x: [0, 3, -2, 0], y: [0, -2, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
          width="16"
          height="19"
          viewBox="0 0 16 19"
          fill="none"
          className="mt-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
          style={{ transform: `rotate(${cursorAngle}deg)` }}
        >
          <path
            d="M1.5 1L14 9L7.5 10L5 18L1.5 1Z"
            fill="#111111"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AIModelsPreview() {
  const reduceMotion = useReducedMotion()
  const [analysisStep, setAnalysisStep] = useState(0)
  const borderProgress = useMotionValue(0)
  const previousStep = useRef(0)

  useMotionValueEvent(borderProgress, 'change', (progress) => {
    const nextStep = Math.min(Math.floor(progress * ANALYSIS_STEPS.length), ANALYSIS_STEPS.length - 1)
    if (nextStep === previousStep.current) return

    previousStep.current = nextStep
    setAnalysisStep(nextStep)
  })

  useEffect(() => {
    borderProgress.set(0)
    if (reduceMotion) return

    const animation = animate(borderProgress, 1, {
      duration: ANALYSIS_STEPS.length * STEP_DURATION_SECONDS,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })

    return () => animation.stop()
  }, [borderProgress, reduceMotion])

  return (
    <div className="relative h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {/* Six softly shaded bars from the reference */}
        <div className="absolute left-[12%] right-[21%] top-[40%] bottom-[12%] flex items-end justify-between gap-2">
          {BARS.map((bar, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: barWave(bar.minScale, bar.phase)[0], opacity: 0 }}
              animate={{
                scaleY: reduceMotion ? 1 : barWave(bar.minScale, bar.phase),
                opacity: 1,
              }}
              transition={reduceMotion
                ? { duration: 0 }
                : {
                    scaleY: { duration: bar.duration, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 0.5, delay: 0.12 + i * 0.08 },
                  }}
              className="relative min-w-0 max-w-[30px] flex-1 overflow-hidden rounded-t-[13px]"
              style={{
                height: `${bar.h}%`,
                transformOrigin: 'center bottom',
                background: `linear-gradient(180deg, ${bar.top} 0%, ${bar.bottom} 100%)`,
                maskImage: 'linear-gradient(to bottom, #000 0%, rgb(0 0 0 / 0.85) 18%, rgb(0 0 0 / 0.22) 52%, transparent 78%)',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, rgb(0 0 0 / 0.85) 18%, rgb(0 0 0 / 0.22) 52%, transparent 78%)',
              }}
            />
          ))}
        </div>

        {/* Dark control bar beneath the chart */}
        <div className="absolute inset-x-[4%] bottom-[5%] z-20 flex h-[48px] items-center justify-between rounded-full border border-white/20 bg-black px-1.5 shadow-[0_-5px_18px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.08)]">
          {!reduceMotion && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="analysis-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-brand-coral)" />
                  <stop offset="25%" stopColor="var(--color-brand-orange)" />
                  <stop offset="45%" stopColor="var(--color-brand-yellow)" />
                  <stop offset="67%" stopColor="var(--color-brand-green)" />
                  <stop offset="100%" stopColor="var(--color-brand-blue)" />
                </linearGradient>
              </defs>
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="24"
                fill="none"
                stroke="url(#analysis-border-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: borderProgress }}
              />
            </svg>
          )}
          <div className="min-w-0 flex-1 pl-3 pr-2" aria-hidden="true">
            <div className="relative h-4 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.span
                  key={ANALYSIS_STEPS[analysisStep]}
                  initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 block truncate text-[10px] font-medium leading-4 text-neutral-300"
                >
                  {ANALYSIS_STEPS[analysisStep]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.8 }}
            className="flex h-[36px] min-w-[120px] items-center justify-center rounded-full border border-white/40 bg-black"
          >
            <span className="flex h-full w-full items-center justify-center whitespace-nowrap rounded-full bg-black px-4 text-[12px] font-semibold text-white">
              Analisando<span className="sr-only">...</span>
              <span className="inline-flex" aria-hidden="true">
                {LOADING_DOTS.map((dot) => (
                  <motion.span
                    key={dot}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
                    transition={reduceMotion
                      ? { duration: 0 }
                      : { duration: 1.2, repeat: Infinity, delay: dot * 0.2, ease: 'easeInOut' }}
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.div>
        </div>

        <CursorLabel name="Início" x="15%" y="45%" cursorAngle={-12} delay={0.6} />
        <CursorLabel name="Agora" x="84%" y="37%" cursorAngle={8} delay={0.9} />
      </motion.div>
    </div>
  )
}
