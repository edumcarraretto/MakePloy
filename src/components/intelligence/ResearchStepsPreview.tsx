import { useState } from 'react'
import { RESEARCH_SCENES } from '@/components/intelligence/researchSourceData'
import {
  FAST_SOURCE_INTERVAL_MS,
  FINAL_SOURCE_COUNT,
  FINAL_SOURCE_INTERVAL_MS,
  getResearchCompletionMs,
  INITIAL_SOURCE_COUNT,
  INITIAL_SOURCE_INTERVAL_MS,
  SOURCE_START_MS,
} from '@/components/intelligence/researchPreviewTiming'
import { ChevronDown, ExternalLink, Search, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

const VISIBLE_SOURCES = 3

export function ResearchStepsPreview({ ideaIndex, elapsed }: { ideaIndex: number; elapsed: number }) {
  const [expanded, setExpanded] = useState(true)
  const scene = RESEARCH_SCENES[ideaIndex] ?? RESEARCH_SCENES[0]
  const researchTime = elapsed - SOURCE_START_MS
  const initialPhaseDuration = INITIAL_SOURCE_COUNT * INITIAL_SOURCE_INTERVAL_MS
  const middleSourceCount = Math.max(0, scene.sources.length - INITIAL_SOURCE_COUNT - FINAL_SOURCE_COUNT)
  const finalPhaseStart = initialPhaseDuration + middleSourceCount * FAST_SOURCE_INTERVAL_MS
  const revealedCount = researchTime < 0 ? 0 : Math.min(
    scene.sources.length,
    researchTime < initialPhaseDuration
      ? Math.floor(researchTime / INITIAL_SOURCE_INTERVAL_MS) + 1
      : researchTime < finalPhaseStart
        ? INITIAL_SOURCE_COUNT + Math.floor((researchTime - initialPhaseDuration) / FAST_SOURCE_INTERVAL_MS) + 1
        : INITIAL_SOURCE_COUNT + middleSourceCount + Math.floor((researchTime - finalPhaseStart) / FINAL_SOURCE_INTERVAL_MS) + 1,
  )
  const visibleSources = scene.sources.slice(Math.max(0, revealedCount - VISIBLE_SOURCES), revealedCount)
  const hasConclusion = elapsed >= getResearchCompletionMs(ideaIndex)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28 }}
      className="absolute inset-x-0 top-[44px] mx-auto w-full max-w-[280px]"
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="research-example-steps"
        onClick={() => setExpanded((value) => !value)}
        className="flex h-8 w-full cursor-pointer items-center gap-2.5 px-1 text-left focus-visible:rounded focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/70"
      >
        <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center text-neutral-300">
          <Search size={11} strokeWidth={1.8} />
        </span>
        <span className="min-w-0 flex-1 text-[10.5px] font-semibold text-neutral-200">Explorando referências</span>
        <ChevronDown aria-hidden="true" size={12} className={`shrink-0 text-neutral-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div id="research-example-steps" className="px-1 py-0.5">
          <div className="relative h-24">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleSources.map((source, index) => {
                const logoUrl = `https://www.google.com/s2/favicons?domain=${new URL(source.url).hostname}&sz=128`
                const isLastSource = index === visibleSources.length - 1

                return (
                  <motion.a
                    key={source.url}
                    layout="position"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: revealedCount <= INITIAL_SOURCE_COUNT ? 0.28 : revealedCount > scene.sources.length - FINAL_SOURCE_COUNT ? 0.3 : 0.14, ease: 'easeOut' }}
                    className="group/source relative flex h-8 items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/70"
                    aria-label={`${source.name}: ${source.message} (abre a fonte em outra aba)`}
                  >
                    <div className="relative flex size-6 shrink-0 items-center justify-center">
                      <span className="relative z-10 flex size-6 items-center justify-center overflow-hidden rounded-[7px] border border-black/5 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
                        <span aria-hidden="true" className="text-[9px] font-bold text-neutral-700">{source.name.slice(0, 2).toUpperCase()}</span>
                        <img
                          src={logoUrl}
                          alt=""
                          className="absolute size-4 bg-white object-contain"
                          onError={(event) => { event.currentTarget.hidden = true }}
                        />
                      </span>
                      {(!isLastSource || hasConclusion) && (
                        <span aria-hidden="true" className="absolute top-6 bottom-[-8px] left-1/2 w-px -translate-x-1/2 bg-white/[0.16]" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <span className="truncate text-[11px] font-semibold leading-[13px] text-neutral-200 transition-colors group-hover/source:text-white">{source.name}</span>
                      <span className="truncate text-[10px] leading-[12px] text-neutral-400">{source.message}</span>
                    </div>
                    <ExternalLink aria-hidden="true" size={11} className="shrink-0 text-neutral-500 transition-colors group-hover/source:text-neutral-200" />
                  </motion.a>
                )
              })}
            </AnimatePresence>
          </div>
          {hasConclusion && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative mt-0.5 flex h-[26px] items-center gap-2.5"
            >
              <div className="relative flex size-6 shrink-0 items-center justify-center">
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.55, 0], scale: [0.5, 1.7, 2.1] }}
                  transition={{ duration: 0.9, times: [0, 0.35, 1], ease: 'easeOut' }}
                  className="absolute size-4 rounded-full bg-white/35 blur-[6px]"
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: [0.7, 1.15, 1] }}
                  transition={{ duration: 0.55, times: [0, 0.55, 1], ease: 'easeOut' }}
                  className="relative z-10 flex size-6 items-center justify-center text-white"
                >
                  <Sparkles size={12} strokeWidth={1.8} />
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
                className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-neutral-200"
              >
                {scene.conclusion}
              </motion.span>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}
