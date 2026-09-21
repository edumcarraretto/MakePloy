import { useState, useEffect, useRef, useCallback, type ComponentType } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, TerminalSquare } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { openEarlyAccess } from '@/lib/earlyAccess'
import { HighlightText } from '@/components/text/HighlightText'
import { tools, type Tool } from '@/components/tools/toolsData'
import { ProjectsMockup, DocumentsMockup, AIMockup, ChatMockup } from '@/components/tools/FeaturedMockups'
import './FeaturedCard.css'

// ────────────────────────────────────────────────────────────
// Grid placement types & algorithms
// ────────────────────────────────────────────────────────────
type Placement = { tool: Tool; col: number; row: number }

// ── 1. Desktop placement (10 columns, 8 rows) ──
const DESKTOP_COLS = 10
const DESKTOP_TOTAL_ROWS = 8


function buildDesktopPlacements(allTools: Tool[]): Placement[] {
  const occupied = new Set<string>()
  const featured = allTools.filter((t) => t.featured)

  for (const ft of featured) {
    for (let r = ft.rowStart! + 1; r < ft.rowStart! + 1 + ft.rowSpan; r++) {
      for (let c = ft.colStart!; c < ft.colStart! + ft.colSpan; c++) {
        occupied.add(`${r}-${c}`)
      }
    }
  }

  const placements: Placement[] = featured.map((ft) => ({
    tool: ft,
    col: ft.colStart!,
    row: ft.rowStart! + 1,
  }))

  const small = allTools.filter((t) => !t.featured)
  let idx = 0

  for (let r = 2; r <= DESKTOP_TOTAL_ROWS - 1 && idx < small.length; r++) {
    for (let c = 1; c <= DESKTOP_COLS && idx < small.length; c++) {
      if (occupied.has(`${r}-${c}`)) continue
      placements.push({ tool: small[idx], col: c, row: r })
      idx++
    }
  }

  return placements
}

// ── 2. 8-Column placement for Tablet & Mobile (8 columns, 8 rows) ──
const EIGHT_COLS = 8
const EIGHT_TOTAL_ROWS = 8

const MOBILE_ROW_HEIGHT = 80

function buildEightColumnPlacements(allTools: Tool[]): Placement[] {
  const occupied = new Set<string>()

  // In 8 columns:
  // Center cards occupy cols 3-4 and cols 5-6 (leaving 2 columns on left and 2 on right)
  const featuredMap: Record<string, { col: number; row: number }> = {
    projetos: { col: 3, row: 3 },
    documentos: { col: 5, row: 3 },
    'assistente-ia': { col: 3, row: 5 },
    conversas: { col: 5, row: 5 },
  }

  const featured = allTools.filter((t) => t.featured)
  const placements: Placement[] = []

  for (const ft of featured) {
    const pos = featuredMap[ft.id]
    if (pos) {
      for (let r = pos.row; r < pos.row + 2; r++) {
        for (let c = pos.col; c < pos.col + 2; c++) {
          occupied.add(`${r}-${c}`)
        }
      }
      placements.push({
        tool: { ...ft, colSpan: 2, rowSpan: 2 },
        col: pos.col,
        row: pos.row,
      })
    }
  }

  const small = allTools.filter((t) => !t.featured)
  let idx = 0

  for (let r = 2; r <= EIGHT_TOTAL_ROWS - 1 && idx < small.length; r++) {
    for (let c = 1; c <= EIGHT_COLS && idx < small.length; c++) {
      if (occupied.has(`${r}-${c}`)) continue
      placements.push({ tool: small[idx], col: c, row: r })
      idx++
    }
  }

  return placements
}

const desktopPlacements = buildDesktopPlacements(tools)
const eightColPlacements = buildEightColumnPlacements(tools)

// ────────────────────────────────────────────────────────────
// Mockup registry
// ────────────────────────────────────────────────────────────
const featuredMockups: Record<string, ComponentType<{ isPlaying?: boolean; onComplete?: () => void }>> = {
  projetos: ProjectsMockup,
  documentos: DocumentsMockup,
  'assistente-ia': AIMockup,
  conversas: ChatMockup,
}

// Finish on a useful result before the original loops clear their content.
const DEMO_DURATION: Record<string, number> = {
  projetos: 9700,
  documentos: 12000,
  conversas: 10800,
}

// ────────────────────────────────────────────────────────────
// Edge-fade mask — applied to the grid container via CSS
// mask-image so ALL four sides fade uniformly.
// ────────────────────────────────────────────────────────────
const GRID_MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage: [
    'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    'linear-gradient(to bottom, transparent 0%, black 12.5%, black 87.5%, transparent 100%)',
  ].join(', '),
  maskImage: [
    'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    'linear-gradient(to bottom, transparent 0%, black 12.5%, black 87.5%, transparent 100%)',
  ].join(', '),
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect' as const,
}

// ────────────────────────────────────────────────────────────
// Small tool cell component
// ────────────────────────────────────────────────────────────
interface SmallToolCellProps {
  tool: Tool
  col: number
  row: number
  isSelected: boolean
  onSelect: (id: string) => void
  isMobileOrTablet?: boolean
}

function SmallToolCell({
  tool,
  col,
  row,
  isSelected,
  onSelect,
  isMobileOrTablet = false,
}: SmallToolCellProps) {
  const Icon = tool.icon
  const isGitHub = tool.id === 'github'

  return (
    <motion.button
      type="button"
      aria-pressed={isSelected}
      aria-label={tool.title}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: (row * 4 + col) * 0.015 }}
      style={{
        gridColumn: `${col} / span 1`,
        gridRow: `${row} / span 1`,
      }}
      className="relative group"
      title={tool.title}
      onClick={() => onSelect(tool.id)}
    >
      <div
        className={[
          'flex flex-col items-center justify-center gap-1 h-full w-full select-none p-1',
          'border-r border-b border-gray-200/60',
          'transition-all duration-200 ease-out cursor-pointer',
          // ── Selected state ──
          isSelected
            ? 'scale-[1.04] -translate-y-1 shadow-2xl z-20 ring-2 ring-gray-900/10 bg-white rounded-lg'
            : 'scale-100 translate-y-0 z-0',
          // ── Hover (only when NOT selected) ──
          !isSelected ? 'hover:bg-gray-50 hover:scale-[1.02] hover:z-10 hover:ring-1 hover:ring-black/50' : '',
        ].join(' ')}
      >
        {isGitHub ? (
          <SiGithub
            className={[
              isMobileOrTablet ? 'w-4 h-4' : 'w-5 h-5',
              'transition-colors duration-200 shrink-0',
              isSelected ? 'text-gray-800' : 'text-gray-500',
              !isSelected ? 'group-hover:text-gray-700' : '',
            ].join(' ')}
          />
        ) : (
          <Icon
            className={[
              isMobileOrTablet ? 'w-4 h-4' : 'w-5 h-5',
              'transition-colors duration-200 shrink-0',
              isSelected ? 'text-gray-800' : 'text-gray-500',
              !isSelected ? 'group-hover:text-gray-700' : '',
            ].join(' ')}
            strokeWidth={2.25}
          />
        )}
        <span
          className={[
            isMobileOrTablet ? 'text-[9px] leading-tight' : 'text-[11px] leading-tight',
            'text-center px-0.5 max-w-full truncate transition-colors duration-200',
            isSelected ? 'text-gray-800 font-medium' : 'text-gray-400 font-normal',
            !isSelected ? 'group-hover:text-gray-500' : '',
          ].join(' ')}
        >
          {tool.title}
        </span>
      </div>
    </motion.button>
  )
}

// ────────────────────────────────────────────────────────────
// Featured tool card (2×2 cells)
// ────────────────────────────────────────────────────────────
interface FeaturedToolCardProps {
  tool: Tool
  col: number
  row: number
  isSelected: boolean
  onSelect: (id: string) => void
  isFocused?: boolean
  isMobileOrTablet?: boolean
  playbackEnabled: boolean
  onDemoComplete: (id: string) => void
  onInteract: (id: string, source: 'pointer' | 'keyboard', active: boolean) => void
}

function FeaturedToolCard({
  tool,
  col,
  row,
  onSelect,
  isFocused = false,
  isMobileOrTablet = false,
  playbackEnabled,
  onDemoComplete,
  onInteract,
}: FeaturedToolCardProps) {
  const Icon = tool.icon
  const Mockup = featuredMockups[tool.id]
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLButtonElement>(null)
  const isVisible = useInView(cardRef, { amount: 0.5 })
  const canPlay = isFocused && isVisible && playbackEnabled && !reduceMotion
  const [demoComplete, setDemoComplete] = useState(false)
  const finishDemo = useCallback(() => {
    if (!canPlay) return
    setDemoComplete(true)
    onDemoComplete(tool.id)
  }, [canPlay, onDemoComplete, tool.id])

  useEffect(() => {
    setDemoComplete(false)
    if (!canPlay || tool.id === 'assistente-ia') return
    const timer = setTimeout(finishDemo, DEMO_DURATION[tool.id])
    return () => clearTimeout(timer)
  }, [canPlay, tool.id, finishDemo])

  const isPlaying = canPlay && !demoComplete
  
  // Rounded corner ONLY on the inner vertex facing the center (creates the 4-point star cutout in the center)
  const centerCornerRounding =
    tool.id === 'projetos'
      ? 'rounded-br-[12px] sm:rounded-br-[16px]'
      : tool.id === 'documentos'
      ? 'rounded-bl-[12px] sm:rounded-bl-[16px]'
      : tool.id === 'assistente-ia'
      ? 'rounded-tr-[12px] sm:rounded-tr-[16px]'
      : tool.id === 'conversas'
      ? 'rounded-tl-[12px] sm:rounded-tl-[16px]'
      : ''

  return (
    <motion.button
      ref={cardRef}
      data-featured-focus={isFocused}
      data-featured-motion={isVisible && playbackEnabled && !reduceMotion}
      type="button"
      aria-pressed={isFocused}
      aria-label={tool.title}
      initial={{ opacity: 0, scale: 1 }}
      whileInView={{ opacity: 1, scale: isFocused && !reduceMotion ? 1.02 : 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
      style={{
        gridColumn: `${col} / span ${tool.colSpan}`,
        gridRow: `${row} / span ${tool.rowSpan}`,
        transformOrigin: 'center',
      }}
      className={`featured-tool-card relative group cursor-pointer overflow-hidden ${centerCornerRounding}`}
      onClick={() => onSelect(tool.id)}
      onHoverStart={() => onInteract(tool.id, 'pointer', true)}
      onHoverEnd={() => onInteract(tool.id, 'pointer', false)}
      onFocus={(event) => {
        if (event.currentTarget.matches(':focus-visible')) onInteract(tool.id, 'keyboard', true)
      }}
      onBlur={() => onInteract(tool.id, 'keyboard', false)}
    >
      <div
        className={[
          'h-full w-full flex flex-col overflow-hidden',
          tool.id === 'assistente-ia' ? 'bg-[#0a0a0f]' : 'bg-white',
          tool.id === 'assistente-ia' ? 'border-r border-b border-zinc-800/60' : 'border-r border-b border-gray-200/60',
          centerCornerRounding,
          'transition-all duration-200 ease-out',
        ].join(' ')}
      >
        <div aria-hidden="true" className="featured-card-border" />
        
        <div
          className={[
            'absolute inset-0 opacity-80 pointer-events-none',
            tool.id === 'projetos' ? 'bg-[radial-gradient(ellipse_at_top,rgba(244,114,182,0.16)_0%,rgba(192,132,252,0.10)_45%,transparent_75%)]' :
            tool.id === 'documentos' ? 'bg-[radial-gradient(ellipse_at_top,rgba(191,219,254,0.45)_0%,transparent_70%)]' :
            tool.id === 'conversas' ? 'bg-[radial-gradient(ellipse_at_top,rgba(192,132,252,0.2)_0%,transparent_70%)]' :
            ''
          ].join(' ')}
        />
        {/* Mockup preview area */}
        <div aria-hidden="true" className={`featured-demo relative flex-1 min-h-0 overflow-visible flex items-center justify-center pb-0 z-20 ${tool.id === 'assistente-ia' ? 'pt-0 px-0' : 'p-2 md:p-3'}`}>
          <div className="featured-demo-content w-full h-full" data-playing={isPlaying}>
            <Mockup isPlaying={isPlaying} onComplete={finishDemo} />
          </div>
        </div>

        {/* Card label */}
        <div className="relative flex items-center justify-center gap-2 pb-3 md:pb-4 pt-1 shrink-0">
          {tool.id === 'projetos' ? (
            <img
              src="/nova-logo-128.webp"
              alt="MakePloy"
              className={`${isMobileOrTablet ? 'w-7 h-7 rounded-[6px]' : 'w-10 h-10 rounded-[8px]'} object-contain shrink-0`}
            />
          ) : tool.id === 'documentos' ? (
            <Icon className={`${isMobileOrTablet ? 'w-6 h-6' : 'w-8 h-8'} text-[#0ea5e9] shrink-0`} strokeWidth={2.5} />
          ) : tool.id === 'assistente-ia' ? (
            <div className="relative shrink-0 flex items-center justify-center">
              <svg width="0" height="0" className="absolute">
                <linearGradient id="vibe-coding-brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop stopColor="#ff2d55" stopOpacity="0.75" offset="0%" />
                  <stop stopColor="#ff7a00" stopOpacity="0.75" offset="25%" />
                  <stop stopColor="#facc15" stopOpacity="0.75" offset="45%" />
                  <stop stopColor="#22c55e" stopOpacity="0.75" offset="67%" />
                  <stop stopColor="#168cff" stopOpacity="0.75" offset="100%" />
                </linearGradient>
              </svg>
              <TerminalSquare 
                className={`${isMobileOrTablet ? 'w-[22px] h-[22px]' : 'w-7 h-7'} shrink-0`} 
                strokeWidth={1.75} 
                style={{ stroke: 'url(#vibe-coding-brand-gradient)' }}
              />
            </div>
          ) : tool.id === 'conversas' ? (
            <Icon className={`${isMobileOrTablet ? 'w-6 h-6' : 'w-8 h-8'} text-[#7c3aed] shrink-0`} strokeWidth={2.5} />
          ) : (
            <Icon
              className={`${isMobileOrTablet ? 'w-4 h-4' : 'w-5 h-5'} ${tool.accentColor ?? 'text-gray-500'} shrink-0`}
              strokeWidth={2.5}
            />
          )}
          <span
            className={[
              isMobileOrTablet ? 'text-base' : 'text-xl md:text-2xl',
              'font-bold tracking-tight',
              tool.id === 'assistente-ia' ? 'text-white' : 'text-gray-900'
            ].join(' ')}
          >
            {tool.title}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

// ────────────────────────────────────────────────────────────
// Main section export with responsive device configurations
// ────────────────────────────────────────────────────────────
const FEATURED_CYCLE: { id: string }[] = [
  { id: 'projetos' },
  { id: 'documentos' },
  { id: 'assistente-ia' },
  { id: 'conversas' },
]
const RESULT_HOLD_MS = 1000

export function ToolsSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isVisible = useInView(gridRef, { amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const [pointerId, setPointerId] = useState<string | null>(null)
  const [keyboardId, setKeyboardId] = useState<string | null>(null)
  const playbackEnabled = isVisible && pageVisible
  const [completedId, setCompletedId] = useState<string | null>(null)
  const handleDemoComplete = useCallback((id: string) => setCompletedId(id), [])

  useEffect(() => {
    if (!playbackEnabled) setCompletedId(null)
  }, [playbackEnabled])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    if (!playbackEnabled || reduceMotion || pointerId || keyboardId) return
    if (completedId !== FEATURED_CYCLE[activeStepIndex].id) return
    const timer = setTimeout(() => {
      setCompletedId(null)
      setActiveStepIndex((prev) => (prev + 1) % FEATURED_CYCLE.length)
    }, RESULT_HOLD_MS)
    return () => clearTimeout(timer)
  }, [activeStepIndex, completedId, playbackEnabled, reduceMotion, pointerId, keyboardId])

  const focusedId = FEATURED_CYCLE[activeStepIndex].id

  const handleInteract = (id: string, source: 'pointer' | 'keyboard', active: boolean) => {
    const setInteraction = source === 'pointer' ? setPointerId : setKeyboardId
    setInteraction((previous) => active ? id : previous === id ? null : previous)
    if (active && id !== focusedId) {
      setCompletedId(null)
      setActiveStepIndex(FEATURED_CYCLE.findIndex((item) => item.id === id))
    }
  }

  const handleSelect = (id: string) => {
    setSelectedToolId((prev) => (prev === id ? null : id))
    const index = FEATURED_CYCLE.findIndex((item) => item.id === id)
    if (index !== -1) {
      if (id !== focusedId) setCompletedId(null)
      setActiveStepIndex(index)
    }
  }

  return (
    <section
      id="ferramentas"
      className="py-20 md:py-28 bg-white w-full flex flex-col items-center overflow-x-clip"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="max-w-2xl w-full text-center mb-12 md:mb-16 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
          Seu projeto inteiro.
          <br />
          <HighlightText variant="yellow">No mesmo lugar.</HighlightText>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
          +40 ferramentas para tudo o que vem pela frente, sem precisar sair da MakePloy.
        </p>
      </motion.div>

      <div ref={gridRef} className="w-full">
      {/* ── 1. Desktop grid (>= 1024px: 10 columns, full width) ──── */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto px-4 xl:px-8">
        <div className="overflow-visible pb-6" style={GRID_MASK_STYLE}>
          <div
            className="border-t border-l border-gray-200/60"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${DESKTOP_COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${DESKTOP_TOTAL_ROWS}, minmax(0, 1fr))`,
              aspectRatio: `${DESKTOP_COLS} / ${DESKTOP_TOTAL_ROWS}`,
            }}
          >
            {/* Linha 1: células vazias para formar a borda fantasma superior */}
            {Array.from({ length: DESKTOP_COLS }).map((_, i) => (
              <div
                key={`desktop-empty-top-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: 1 }}
              />
            ))}

            {/* Linha Final: células vazias para formar a borda fantasma inferior */}
            {Array.from({ length: DESKTOP_COLS }).map((_, i) => (
              <div
                key={`desktop-empty-bottom-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: DESKTOP_TOTAL_ROWS }}
              />
            ))}

            {desktopPlacements.map(({ tool, col, row }) =>
              tool.featured ? (
                <FeaturedToolCard
                  key={`desktop-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isFocused={focusedId === tool.id}
                  playbackEnabled={playbackEnabled}
                  onInteract={handleInteract}
                  onDemoComplete={handleDemoComplete}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                />
              ) : (
                <SmallToolCell
                  key={`desktop-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* ── 2. Tablet grid (768px - 1023px: 8 columns, 8 rows) ──── */}
      <div className="hidden md:block lg:hidden w-full max-w-4xl mx-auto px-4">
        <div className="overflow-visible pb-6" style={GRID_MASK_STYLE}>
          <div
            className="border-t border-l border-gray-200/60"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${EIGHT_COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${EIGHT_TOTAL_ROWS}, minmax(0, 1fr))`,
              aspectRatio: `${EIGHT_COLS} / ${EIGHT_TOTAL_ROWS}`,
            }}
          >
            {/* Top ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`tablet-empty-top-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: 1 }}
              />
            ))}

            {/* Bottom ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`tablet-empty-bottom-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: EIGHT_TOTAL_ROWS }}
              />
            ))}

            {eightColPlacements.map(({ tool, col, row }) =>
              tool.featured ? (
                <FeaturedToolCard
                  key={`tablet-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isFocused={focusedId === tool.id}
                  playbackEnabled={playbackEnabled}
                  onInteract={handleInteract}
                  onDemoComplete={handleDemoComplete}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              ) : (
                <SmallToolCell
                  key={`tablet-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* ── 3. Mobile grid (< 768px: 8 columns, static centered matrix with fade, no side scrolling) ──── */}
      <div
        className="block md:hidden w-full overflow-hidden py-2"
        style={GRID_MASK_STYLE}
      >
        <div className="flex justify-center w-full mx-auto">
          <div
            className="border-t border-l border-gray-200/60 shrink-0 select-none"
            style={{
              display: 'grid',
              width: '640px',
              gridTemplateColumns: `repeat(${EIGHT_COLS}, 80px)`,
              gridTemplateRows: `repeat(${EIGHT_TOTAL_ROWS}, ${MOBILE_ROW_HEIGHT}px)`,
            }}
          >
            {/* Top ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`mobile-empty-top-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: 1 }}
              />
            ))}

            {/* Bottom ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`mobile-empty-bottom-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: EIGHT_TOTAL_ROWS }}
              />
            ))}

            {eightColPlacements.map(({ tool, col, row }) =>
              tool.featured ? (
                <FeaturedToolCard
                  key={`mobile-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isFocused={focusedId === tool.id}
                  playbackEnabled={playbackEnabled}
                  onInteract={handleInteract}
                  onDemoComplete={handleDemoComplete}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              ) : (
                <SmallToolCell
                  key={`mobile-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              )
            )}
          </div>
        </div>
      </div>

      </div>

      {/* ── Call to action below grid ──── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex justify-center mt-10 md:mt-14 px-4"
      >
        <button
          type="button"
          onClick={() => openEarlyAccess('tools')}
          className="
            group inline-flex items-center gap-2
            px-7 py-3.5 sm:px-8 sm:py-4
            bg-neutral-900 text-white text-sm sm:text-[15px] font-bold
            rounded-full
            hover:bg-neutral-800
            active:scale-[0.97]
            transition-all duration-200
            shadow-md hover:shadow-lg
            cursor-pointer
          "
        >
          Explorar ferramentas integradas
          <ArrowRight
            size={16}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </motion.div>
    </section>
  )
}
