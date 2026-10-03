import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Check, LoaderCircle, MousePointer2 } from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { getResearchCompletionMs } from '@/components/intelligence/researchPreviewTiming'
import { ResearchStepsPreview } from '@/components/intelligence/ResearchStepsPreview'
import { BorderBeam } from '@/components/ui/border-beam'
import { EffortSelector, ModelSelector } from '@/components/ui/model-selector'
import './chat-input.css'

const CHIP: CSSProperties = {
  borderRadius: 36,
  background: 'rgba(255,255,255,0.04)',
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 0 rgba(255,255,255,0.04)',
}

const IDEAS = [
  'Quero abrir uma loja de roupas.',
  'Quero criar um aplicativo de delivery.',
  'Quero lançar uma marca de cosméticos.',
  'Quero criar uma plataforma de cursos.',
  'Quero abrir uma cafeteria.',
]

// The prompt and its research steps share the same cycle and idea.
const CYCLE_MS = 27000
const START_DELAY_MS = 900
const CHARACTER_MS = 65
const COMPLETION_PAUSE_MS = 450

export function ChatInput({ idea, cycleTime, analysisStarts, analyzing, researchComplete, reduceMotion }: {
  idea: string
  cycleTime: number
  analysisStarts: number
  analyzing: boolean
  researchComplete: boolean
  reduceMotion: boolean
}) {
  const count = reduceMotion ? idea.length : Math.max(0, Math.floor((cycleTime - START_DELAY_MS) / CHARACTER_MS))
  const text = idea.slice(0, count)
  const typing = !reduceMotion && count > 0 && count < idea.length
  const typingEnds = START_DELAY_MS + idea.length * CHARACTER_MS
  const cursorStarts = typingEnds + 850
  const clickStarts = cursorStarts + 850
  const ready = count >= idea.length && !analyzing
  const clicking = !reduceMotion && cycleTime >= clickStarts && cycleTime < analysisStarts
  const showCursor = !reduceMotion && cycleTime >= cursorStarts && cycleTime < analysisStarts + 450
  const cursorProgress = Math.max(0, Math.min(1, (cycleTime - cursorStarts) / 850))
  const cursorEase = 1 - (1 - cursorProgress) ** 3
  const clickProgress = Math.max(0, Math.min(1, (cycleTime - clickStarts) / 420))

  return (
    <div
      className="relative w-full overflow-hidden rounded-[14px] bg-black p-1.5"
      style={{ boxShadow: 'inset 0 0 0 1px rgba(44,47,54,0.52)' }}
    >
      <div className="px-1 py-2 text-[10px] leading-[14px] text-neutral-400">
        <span className="sr-only">Exemplo de ideia: {idea}</span>
        {analyzing ? (
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={researchComplete ? 'complete' : 'analyzing'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: researchComplete ? 0.42 : 0.34, ease: 'easeOut' }}
              className="flex items-center justify-center gap-2 font-medium text-neutral-200"
            >
              {researchComplete ? (
                <motion.span
                  initial={{ scale: 0.7 }}
                  animate={{ scale: [0.7, 1.18, 1] }}
                  transition={{ duration: 0.8, times: [0, 0.55, 1], ease: 'easeOut' }}
                  className="relative flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-300/45 bg-emerald-300/10 text-emerald-200"
                >
                  <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0.45, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.2 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border border-emerald-300/50"
                  />
                  <Check aria-hidden="true" size={10} strokeWidth={2.4} />
                </motion.span>
              ) : (
                <LoaderCircle aria-hidden="true" size={12} strokeWidth={1.5} style={{ transform: `rotate(${(cycleTime - analysisStarts) * 0.18}deg)` }} />
              )}
              {researchComplete ? 'Pesquisa concluída' : 'Analisamos sua ideia'}
            </motion.span>
          </AnimatePresence>
        ) : <span aria-hidden="true" className={text ? 'text-neutral-200' : undefined}>
          {text || 'Pergunte à MakePloy'}
          {typing && <span className="ml-0.5 inline-block h-[10px] w-px translate-y-px bg-neutral-300" />}
        </span>}
      </div>
      <AnimatePresence initial={false}>
      {!analyzing && <motion.div
        key="prompt-controls"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 22, opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeInOut' }}
        className="flex items-center gap-1.5 text-[9px] leading-3 text-[#caccd2]"
      >
        <ModelSelector />
        <EffortSelector />
        <div
          aria-hidden="true"
          className="relative ml-auto flex h-[22px] w-[22px] shrink-0 items-center justify-center transition-colors duration-300 motion-reduce:transition-none"
          style={{ ...CHIP, background: ready ? '#fff' : CHIP.background, color: ready ? '#171717' : '#8b8b8b', transform: clicking ? 'scale(0.86)' : undefined }}
        >
          <ArrowUp size={13} strokeWidth={1.5} />
          {!reduceMotion && cycleTime >= clickStarts && clickProgress < 1 && (
            <span className="pointer-events-none absolute inset-0 rounded-full border border-white/70" style={{ transform: `scale(${1 + clickProgress * 0.8})`, opacity: 1 - clickProgress }} />
          )}
          {showCursor && (
            <MousePointer2
              size={19}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-2 top-2 z-10 fill-white text-black"
              style={{
                transform: `translate(${-65 * (1 - cursorEase)}px, ${-24 * (1 - cursorEase)}px) scale(${clicking ? 0.88 : 1})`,
                transformOrigin: 'top left',
                opacity: Math.min(1, (cycleTime - cursorStarts) / 150, Math.max(0, (analysisStarts + 450 - cycleTime) / 300)),
              }}
            />
          )}
        </div>
      </motion.div>}
      </AnimatePresence>
    </div>
  )
}

export default function ChatInputDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    let previous = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      const delta = now - previous
      previous = now
      if (!document.hidden) setElapsed((value) => (value + Math.min(delta, 150)) % (CYCLE_MS * IDEAS.length))
    }, CHARACTER_MS)
    return () => window.clearInterval(timer)
  }, [inView, reduceMotion])

  const ideaIndex = Math.floor(elapsed / CYCLE_MS)
  const idea = IDEAS[ideaIndex]
  const cycleTime = elapsed % CYCLE_MS
  const analysisStarts = START_DELAY_MS + idea.length * CHARACTER_MS + 850 + 850 + 260
  const analyzing = !reduceMotion && cycleTime >= analysisStarts
  const researchElapsed = cycleTime - analysisStarts - 350
  const researchComplete = analyzing && researchElapsed >= getResearchCompletionMs(ideaIndex) + COMPLETION_PAUSE_MS

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Exemplo de pergunta e pesquisa da MakePloy"
      className="relative h-[210px] w-full max-w-[280px] shrink-0 select-none"
    >
      <motion.div
        animate={{ y: analyzing ? -36 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
        className="absolute inset-x-0 top-[38px] z-10"
      >
        <BorderBeam
          className="makeploy-prompt-border"
          size="md"
          duration={6}
          colorVariant="colorful"
          staticColors
          active={!reduceMotion}
          brightness={1}
          style={{ width: '100%', '--beam-inner-opacity': 0, '--beam-bloom-opacity': 0 } as CSSProperties}
        >
          <ChatInput idea={idea} cycleTime={cycleTime} analysisStarts={analysisStarts} analyzing={analyzing} researchComplete={researchComplete} reduceMotion={!!reduceMotion} />
        </BorderBeam>
      </motion.div>
      <AnimatePresence initial={false}>
        {analyzing && researchElapsed >= 0 && <ResearchStepsPreview key={ideaIndex} ideaIndex={ideaIndex} elapsed={researchElapsed} />}
      </AnimatePresence>
    </div>
  )
}
