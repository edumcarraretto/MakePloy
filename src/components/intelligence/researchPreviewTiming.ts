import { RESEARCH_SCENES } from '@/components/intelligence/researchSourceData'

export const SOURCE_START_MS = 160
export const INITIAL_SOURCE_COUNT = 6
export const INITIAL_SOURCE_INTERVAL_MS = 340
export const FAST_SOURCE_INTERVAL_MS = 150
export const FINAL_SOURCE_COUNT = 3
export const FINAL_SOURCE_INTERVAL_MS = 700
export const FINAL_SOURCE_HOLD_MS = 750

export function getResearchCompletionMs(ideaIndex: number) {
  const sourceCount = (RESEARCH_SCENES[ideaIndex] ?? RESEARCH_SCENES[0]).sources.length
  const middleSourceCount = Math.max(0, sourceCount - INITIAL_SOURCE_COUNT - FINAL_SOURCE_COUNT)
  const finalSourceCount = Math.min(FINAL_SOURCE_COUNT, Math.max(0, sourceCount - INITIAL_SOURCE_COUNT))
  return SOURCE_START_MS
    + INITIAL_SOURCE_COUNT * INITIAL_SOURCE_INTERVAL_MS
    + middleSourceCount * FAST_SOURCE_INTERVAL_MS
    + Math.max(0, finalSourceCount - 1) * FINAL_SOURCE_INTERVAL_MS
    + FINAL_SOURCE_HOLD_MS
}
