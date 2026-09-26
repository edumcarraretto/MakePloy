import { useId, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Code2, File, Folder, ChevronRight, FileCode2, Atom, Eye } from 'lucide-react'

function highlightCode(code: string) {
  let res = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  res = res.replace(/"([^"]*)"/g, '___STR_$1___');
  res = res.replace(/\b(export|default|function|return|import|from)\b/g, '___KW_$1___');
  res = res.replace(/&lt;([A-Z]\w+)/g, '&lt;___COMP_$1___');
  res = res.replace(/&lt;\/([A-Z]\w+)&gt;/g, '&lt;/___COMP_$1___&gt;');
  res = res.replace(/&lt;([a-z]+)/g, '&lt;___TAG_$1___');
  res = res.replace(/&lt;\/([a-z]+)&gt;/g, '&lt;/___TAG_$1___&gt;');
  res = res.replace(/ ([a-zA-Z]+)=/g, ' ___PROP_$1___=');
  res = res.replace(/___KW_function___ ([A-Z]\w+)/g, '___KW_function___ ___COMP_$1___');
  
  res = res.replace(/___STR_(.*?)___/g, '<span class="text-green-300">"$1"</span>');
  res = res.replace(/___KW_([a-z]+)___/g, '<span class="text-pink-400">$1</span>');
  res = res.replace(/___COMP_([A-Za-z0-9]+)___/g, '<span class="text-amber-200">$1</span>');
  res = res.replace(/___TAG_([a-z]+)___/g, '<span class="text-blue-300">$1</span>');
  res = res.replace(/___PROP_([a-zA-Z]+)___/g, '<span class="text-sky-300">$1</span>');
  
  return res;
}

// ─── File Icon Helper ─────────────────────────────────────────────────────────

function FileIcon({ name, isDir, size = 14 }: { name: string; isDir?: boolean; size?: number }) {
  const wrap = (svg: React.ReactNode) => <span className="shrink-0 inline-flex items-center justify-center" style={{ width: size, height: size }}>{svg}</span>

  if (isDir) {
    return wrap(
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
      </svg>
    )
  }
  
  if (name.endsWith('.css')) {
    return wrap(
      <svg width={size} height={size} viewBox="0 0 128 128">
        <path fill="#1572B6" d="M14.05 15.65l8.63 96.88L64 124l41.34-11.47 8.61-96.88H14.05z"/>
        <path fill="#33A9DC" d="M64 114.7l31.25-8.68L101.46 25H64v89.7z"/>
        <path fill="#FFF" d="M64 48H39l-1.33-14.96H64V48zm0 29.89H41.52l1.63 18.3 20.85 5.79V102l-28.79-8-1.03-11.53H64v-14.58z"/>
        <path fill="#EBEBEB" d="M64 48h25l1.33-14.96H64V48zm0 29.89V63.31l12.72-.01-1.02-11.43H64V37.91h37.49l-3.32 37.11-20.86 5.78v-11.66z"/>
      </svg>
    )
  }

  // React TSX
  if (name.endsWith('.tsx') || name.endsWith('.ts')) {
    return wrap(
      <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className="text-cyan-400">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="2.5" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  }

  return wrap(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

// ─── Code lines shown in sync ─────────────────────────────────────────────────

const codeElements = [
  // --- App.tsx ---
  // 1. nB
  { file: 'App.tsx', name: 'Page Config', code: 'export default function App() {\n  return (\n    <main className="flex min-h-screen flex-col">', color: 'text-neutral-300' },
  // 2. nL
  { file: 'App.tsx', name: 'Logo', code: '      <nav className="flex items-center justify-between">\n        <Logo name="studio" />', color: 'text-violet-300' },
  // 3. nM
  { file: 'App.tsx', name: 'Menu', code: '        <Menu items={["Products", "Pricing"]} />', color: 'text-pink-300' },
  // 4. nC
  { file: 'App.tsx', name: 'Nav CTA', code: '        <Button variant="outline">Login</Button>\n      </nav>\n      <Hero />\n      <Features />\n      <Footer />\n    </main>\n  )\n}', color: 'text-fuchsia-300' },
  
  // --- Hero.tsx ---
  // 5. hT
  { file: 'Hero.tsx', name: 'Hero Title', code: 'export function Hero() {\n  return (\n    <>\n      <section className="mt-20 text-center">\n        <h1 className="text-5xl font-bold">\n          Ideias ganham vida.\n        </h1>', color: 'text-amber-300' },
  // 6. hS
  { file: 'Hero.tsx', name: 'Hero Subtitle', code: '        <p className="mt-4 text-lg text-neutral-400">\n          Comece agora mesmo.\n        </p>', color: 'text-emerald-300' },
  // 7. hB
  { file: 'Hero.tsx', name: 'Hero Button', code: '        <Button size="lg" className="mt-8">\n          Começar ↗\n        </Button>\n      </section>\n', color: 'text-violet-400' },
  // 8. gB
  { file: 'Hero.tsx', name: 'Graphic BG', code: '      <Section bg="gradient" className="py-24">', color: 'text-sky-300' },
  // 9. gI
  { file: 'Hero.tsx', name: 'Graphic', code: '        <Image src="/hero-graphic.webp" priority />\n      </Section>\n    </>\n  )\n}\n', color: 'text-sky-200' },

  // --- Card.tsx ---
  // 10. f1B
  { file: 'Card.tsx', name: 'Card 1', code: 'export function Features() {\n  return (\n      <Grid cols={3} gap={6} className="px-8">\n        <Card variant="green">', color: 'text-emerald-400' },
  // 11. f1C
  { file: 'Card.tsx', name: 'Card 1 Content', code: '          <Content icon="zap" title="Rápido" />\n        </Card>', color: 'text-emerald-300' },
  // 12. f2B
  { file: 'Card.tsx', name: 'Card 2', code: '        <Card variant="violet">', color: 'text-violet-400' },
  // 13. f2C
  { file: 'Card.tsx', name: 'Card 2 Content', code: '          <Content icon="shield" title="Seguro" />\n        </Card>', color: 'text-violet-300' },
  // 14. f3B
  { file: 'Card.tsx', name: 'Card 3', code: '        <Card variant="amber">', color: 'text-amber-400' },
  // 15. f3C
  { file: 'Card.tsx', name: 'Card 3 Content', code: '          <Content icon="star" title="Premium" />\n        </Card>\n      </Grid>\n  )\n}\n', color: 'text-amber-300' },

  // --- Footer.tsx ---
  // 16. ctB
  { file: 'Footer.tsx', name: 'CTA Banner', code: 'export function Footer() {\n  return (\n    <>\n      <Banner variant="dark" className="mt-32">', color: 'text-indigo-400' },
  // 17. ctT
  { file: 'Footer.tsx', name: 'CTA Text', code: '        <h2 className="text-3xl">Pronto para escalar?</h2>', color: 'text-indigo-300' },
  // 18. ctA
  { file: 'Footer.tsx', name: 'CTA Button', code: '        <Button>Assine já</Button>\n      </Banner>\n', color: 'text-indigo-200' },
  // 19. t1B
  { file: 'Footer.tsx', name: 'Testimonial 1', code: '      <Testimonials className="py-20">\n        <TestimonialCard author="Maria">', color: 'text-teal-400' },
  // 20. t1C
  { file: 'Footer.tsx', name: 'Testimonial 1 C', code: '          <Rating value={5} />\n        </TestimonialCard>', color: 'text-teal-300' },
  // 21. t2B
  { file: 'Footer.tsx', name: 'Testimonial 2', code: '        <TestimonialCard author="João">', color: 'text-cyan-400' },
  // 22. t2C
  { file: 'Footer.tsx', name: 'Testimonial 2 C', code: '          <Rating value={5} />\n        </TestimonialCard>\n      </Testimonials>\n', color: 'text-cyan-300' },
  // 23. ftB
  { file: 'Footer.tsx', name: 'Footer', code: '      <footer className="border-t border-white/10">\n        <div className="flex justify-between">', color: 'text-neutral-400' },
  // 24. ftL
  { file: 'Footer.tsx', name: 'Footer Left', code: '          <FooterLinks />', color: 'text-neutral-500' },
  // 25. ftR
  { file: 'Footer.tsx', name: 'Footer Right', code: '          <SocialIcons />\n        </div>\n      </footer>\n    </>\n  )\n}', color: 'text-neutral-500' },
] as const

// ─── Flying-Pieces Visual Mockup (dark theme) ─────────────────────────────────

function DarkAssemblyMockup({ stage, cycle, reducedMotion }: { stage: number; cycle: number; reducedMotion: boolean }) {
  const id = useId()
  const safeId = id.replace(/:/g, '')
  const viewportRef = useRef<HTMLDivElement>(null)

  // Piece definitions: id, animation-start-%, final-x, final-y
  const pieces = [
    // Navbar
    { id: 'nB', t: 0, x: 160, y: 5 },
    { id: 'nL', t: 3, x: 40, y: 5 },
    { id: 'nM', t: 6, x: 160, y: 5 },
    { id: 'nC', t: 9, x: 260, y: 5 },
    // Hero
    { id: 'hT', t: 12, x: 90, y: 70 },
    { id: 'hS', t: 15, x: 90, y: 92 },
    { id: 'hB', t: 18, x: 90, y: 112 },
    // Hero graphic
    { id: 'gB', t: 21, x: 235, y: 88 },
    { id: 'gI', t: 24, x: 235, y: 88 },
    // Feature cards
    { id: 'f1B', t: 27, x: 60, y: 180 },
    { id: 'f1C', t: 29, x: 60, y: 180 },
    { id: 'f2B', t: 31, x: 160, y: 180 },
    { id: 'f2C', t: 33, x: 160, y: 180 },
    { id: 'f3B', t: 35, x: 260, y: 180 },
    { id: 'f3C', t: 37, x: 260, y: 180 },
    // CTA banner
    { id: 'ctB', t: 40, x: 160, y: 260 },
    { id: 'ctT', t: 43, x: 120, y: 260 },
    { id: 'ctA', t: 46, x: 230, y: 260 },
    // Testimonials
    { id: 't1B', t: 49, x: 80, y: 340 },
    { id: 't1C', t: 51, x: 80, y: 340 },
    { id: 't2B', t: 53, x: 240, y: 340 },
    { id: 't2C', t: 55, x: 240, y: 340 },
    // Footer
    { id: 'ftB', t: 58, x: 160, y: 410 },
    { id: 'ftL', t: 61, x: 60, y: 410 },
    { id: 'ftR', t: 64, x: 260, y: 410 },
  ].map((piece) => {
    // Keep each card and its content together while varying the composition.
    if (cycle % 2 === 1 && (piece.id.startsWith('h') || piece.id.startsWith('g'))) {
      return { ...piece, x: 320 - piece.x }
    }
    if (/^f[123]/.test(piece.id)) {
      const slot = (Number(piece.id[1]) - 1 + cycle) % 3
      return { ...piece, x: 60 + slot * 100, y: 180 + (cycle % 3 === 1 && slot === 1 ? -10 : 0) }
    }
    if (cycle % 2 === 1 && /^t[12]/.test(piece.id)) return { ...piece, x: 320 - piece.x }
    return piece
  })

  const activeY = pieces[Math.max(0, stage - 1)]?.y ?? 5
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const updateScroll = () => viewport.scrollTo({
      top: reducedMotion ? 0 : Math.max(0, (activeY + 60) * viewport.clientWidth / 320 - viewport.clientHeight),
      behavior: reducedMotion ? 'instant' : 'smooth',
    })
    updateScroll()
    const observer = new ResizeObserver(updateScroll)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [activeY, reducedMotion])

  const generateStyles = () => {
    let css = ''
    pieces.forEach(p => {
      css += `
        .a-${p.id}O1-${safeId} { animation: ${p.id}O1-${safeId} 0.8s both ease-out; }
        .a-${p.id}O2-${safeId} { animation: ${p.id}O2-${safeId} 0.8s both ease-out; }
        .a-${p.id}F-${safeId} { animation: ${p.id}F-${safeId} 0.8s both cubic-bezier(.2,.8,.2,1); }
        @keyframes ${p.id}O1-${safeId} {
          0% {opacity:0; transform:translate(160px,170px) scale(0.6)}
          15%,24% {opacity:1; transform:translate(160px,160px) scale(0.85)}
          25%,100% {opacity:0; transform:translate(160px,150px) scale(0.95)}
        }
        @keyframes ${p.id}O2-${safeId} {
          0%,24% {opacity:0; transform:translate(160px,170px) scale(0.6)}
          25%,49% {opacity:1; transform:translate(160px,150px) scale(0.95)}
          50%,100% {opacity:0; transform:translate(160px,150px) scale(0.95)}
        }
        @keyframes ${p.id}F-${safeId} {
          0%,49% {opacity:0; transform:translate(160px,165px) scale(0.6)}
          50% {opacity:1; transform:translate(160px,145px) scale(1.1)}
          100% {opacity:1; transform:translate(${p.x}px,${p.y}px) scale(1)}
        }
      `
    })
    return css
  }

  const r = (pid: string, O1: React.ReactNode, O2: React.ReactNode, F: React.ReactNode) => {
    const index = pieces.findIndex((piece) => piece.id === pid)
    if (index >= stage) return null
    const piece = pieces[index]
    const family = pid.replace(/[BCLMIRSTA]$/g, '')
    const hueOffset = [...family].reduce((total, letter) => total + letter.charCodeAt(0), 0)
    const style = { filter: `hue-rotate(${cycle === 0 ? 0 : (cycle * 67 + hueOffset * 3) % 360}deg)` }
    if (reducedMotion) return <g key={pid} style={style} transform={`translate(${piece.x},${piece.y})`}>{F}</g>
    return (
      <g key={pid} style={style}>
        <g className={`a-${pid}O1-${safeId}`}>{O1}</g>
        <g className={`a-${pid}O2-${safeId}`}>{O2}</g>
        <g className={`a-${pid}F-${safeId}`}>{F}</g>
      </g>
    )
  }

  return (
    <div ref={viewportRef} className="h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <svg viewBox="0 -15 320 450" className="block w-full h-auto" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <defs>
        <filter id={`${safeId}-sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
        </filter>
        <linearGradient id={`${safeId}-grd`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id={`${safeId}-cta`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <style>{generateStyles()}</style>
      </defs>

      {/* NAVBAR */}
      {r('nB',
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="#1e293b" />,
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" filter={`url(#${safeId}-sh)`} />
      )}
      {r('nL',
        <circle cx="0" cy="0" r="8" fill="none" stroke="#6366f1" strokeWidth="2" />,
        <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#4338ca" />,
        <circle cx="0" cy="0" r="8" fill={`url(#${safeId}-grd)`} />
      )}
      {r('nM',
        <rect x="-40" y="-2" width="80" height="4" rx="2" fill="#334155" />,
        <><rect x="-40" y="-2" width="20" height="4" rx="2" fill="#64748b" /><rect x="20" y="-2" width="20" height="4" rx="2" fill="#64748b" /></>,
        <><rect x="-35" y="-2" width="20" height="4" rx="2" fill="#94a3b8" /><rect x="-5" y="-2" width="25" height="4" rx="2" fill="#94a3b8" /><rect x="30" y="-2" width="20" height="4" rx="2" fill="#94a3b8" /></>
      )}
      {r('nC',
        <rect x="-20" y="-10" width="40" height="20" rx="10" fill="none" stroke="#6366f1" strokeWidth="2" />,
        <rect x="-20" y="-10" width="40" height="20" rx="4" fill="#4338ca" />,
        <rect x="-20" y="-10" width="40" height="20" rx="6" fill={`url(#${safeId}-grd)`} />
      )}

      {/* HERO TEXT */}
      {r('hT',
        <rect x="-50" y="-15" width="100" height="30" rx="6" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-50" y="-15" width="100" height="30" rx="6" fill="#1e293b" />,
        <><rect x="-50" y="-10" width="100" height="12" rx="4" fill="#e2e8f0" /><rect x="-50" y="6" width="80" height="12" rx="4" fill="#e2e8f0" /></>
      )}
      {r('hS',
        <rect x="-50" y="-3" width="100" height="6" rx="3" fill="#1e293b" />,
        <rect x="-50" y="-6" width="100" height="12" rx="6" fill="#1e293b" />,
        <><rect x="-50" y="-5" width="110" height="6" rx="3" fill="#94a3b8" /><rect x="-50" y="5" width="70" height="6" rx="3" fill="#64748b" /></>
      )}
      {r('hB',
        <rect x="-50" y="-9" width="95" height="18" rx="9" fill="none" stroke="#475569" strokeWidth="2" />,
        <rect x="-50" y="-9" width="45" height="18" rx="9" fill="#1e293b" />,
        <><rect x="-50" y="-9" width="45" height="18" rx="6" fill={`url(#${safeId}-grd)`} /><rect x="5" y="-9" width="45" height="18" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="0.5" /></>
      )}

      {/* HERO GRAPHIC */}
      {r('gB',
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="none" stroke="#f9a8d4" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="#be185d" />,
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="#831843" filter={`url(#${safeId}-sh)`} />
      )}
      {r('gI',
        <circle cx="0" cy="0" r="20" fill="#ec4899" />,
        <rect x="-30" y="-20" width="60" height="40" rx="8" fill="#ec4899" />,
        <>
          <rect x="-45" y="-30" width="90" height="15" rx="4" fill="#500724" />
          <circle cx="-35" cy="-22.5" r="4" fill="#fbcfe8" />
          <rect x="-25" y="-24" width="30" height="3" rx="1.5" fill="#ec4899" />
          <rect x="-45" y="-10" width="40" height="40" rx="4" fill="#500724" />
          <rect x="5" y="-10" width="40" height="40" rx="4" fill={`url(#${safeId}-grd)`} />
        </>
      )}

      {/* FEATURE CARDS */}
      {[
        { id: 'f1', colorBase: '#047857', colorDot: '#6ee7b7', surface: '#065f46' },
        { id: 'f2', colorBase: '#be185d', colorDot: '#f9a8d4', surface: '#831843' },
        { id: 'f3', colorBase: '#b45309', colorDot: '#fde68a', surface: '#78350f' },
      ].map((f) => (
        <g key={f.id}>
          {r(`${f.id}B`,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill="none" stroke={f.colorDot} strokeWidth="2" strokeDasharray="4 4" />,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill={f.colorBase} />,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill={f.surface} stroke={f.colorDot} strokeWidth="0.5" filter={`url(#${safeId}-sh)`} />
          )}
          {r(`${f.id}C`,
            <rect x="-20" y="-15" width="40" height="30" rx="4" fill={f.colorBase} />,
            <circle cx="0" cy="0" r="10" fill={f.colorDot} />,
            <>
              <rect x="-32.5" y="-15" width="16" height="16" rx="4" fill={f.colorBase} />
              <circle cx="-24.5" cy="-7" r="4" fill={f.colorDot} />
              <rect x="-10" y="-13" width="35" height="4" rx="2" fill="#cbd5e1" />
              <rect x="-10" y="-5" width="20" height="4" rx="2" fill={f.colorDot} />
              <rect x="-32.5" y="10" width="65" height="4" rx="2" fill={f.colorDot} opacity="0.65" />
              <rect x="-32.5" y="18" width="40" height="4" rx="2" fill={f.colorDot} opacity="0.45" />
            </>
          )}
        </g>
      ))}

      {/* CTA BANNER */}
      {r('ctB',
        <rect x="-130" y="-20" width="260" height="40" rx="10" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-130" y="-20" width="260" height="40" rx="10" fill="#1e293b" />,
        <rect x="-130" y="-20" width="260" height="40" rx="10" fill={`url(#${safeId}-cta)`} filter={`url(#${safeId}-sh)`} />
      )}
      {r('ctT',
        <rect x="-60" y="-6" width="120" height="12" rx="6" fill="#334155" />,
        <rect x="-60" y="-6" width="120" height="12" rx="6" fill="#475569" />,
        <><rect x="-60" y="-8" width="90" height="8" rx="3" fill="#e2e8f0" /><rect x="-60" y="4" width="60" height="5" rx="2.5" fill="#c4b5fd" /></>
      )}
      {r('ctA',
        <rect x="-25" y="-10" width="50" height="20" rx="10" fill="none" stroke="#a78bfa" strokeWidth="2" />,
        <rect x="-25" y="-10" width="50" height="20" rx="6" fill="#475569" />,
        <rect x="-25" y="-10" width="50" height="20" rx="6" fill="#f5f5f5" />
      )}

      {/* TESTIMONIALS */}
      {r('t1B',
        <rect x="-65" y="-30" width="130" height="60" rx="10" fill="none" stroke="#5eead4" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#0f766e" />,
        <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#134e4a" stroke="#2dd4bf" strokeWidth="0.5" filter={`url(#${safeId}-sh)`} />
      )}
      {r('t1C',
        <circle cx="0" cy="0" r="12" fill="#0f766e" />,
        <rect x="-40" y="-15" width="80" height="30" rx="4" fill="#0f766e" />,
        <>
          <circle cx="-48" cy="-18" r="8" fill="#f472b6" />
          <rect x="-35" y="-22" width="35" height="4" rx="2" fill="#ccfbf1" />
          <rect x="-35" y="-14" width="22" height="3" rx="1.5" fill="#5eead4" />
          <rect x="-55" y="-4" width="110" height="4" rx="2" fill="#2dd4bf" />
          <rect x="-55" y="4" width="95" height="4" rx="2" fill="#2dd4bf" />
          <rect x="-55" y="12" width="70" height="4" rx="2" fill="#2dd4bf" />
          <rect x="-55" y="22" width="18" height="3" rx="1.5" fill="#fbbf24" /><rect x="-33" y="22" width="18" height="3" rx="1.5" fill="#fbbf24" /><rect x="-11" y="22" width="18" height="3" rx="1.5" fill="#fbbf24" /><rect x="11" y="22" width="18" height="3" rx="1.5" fill="#fbbf24" /><rect x="33" y="22" width="18" height="3" rx="1.5" fill="#5eead4" />
        </>
      )}
      {r('t2B',
        <rect x="-65" y="-30" width="130" height="60" rx="10" fill="none" stroke="#5eead4" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#0f766e" />,
        <rect x="-65" y="-30" width="130" height="60" rx="10" fill="#134e4a" stroke="#2dd4bf" strokeWidth="0.5" filter={`url(#${safeId}-sh)`} />
      )}
      {r('t2C',
        <circle cx="0" cy="0" r="12" fill="#0f766e" />,
        <rect x="-40" y="-15" width="80" height="30" rx="4" fill="#0f766e" />,
        <>
          <circle cx="-48" cy="-18" r="8" fill="#064e3b" />
          <rect x="-35" y="-22" width="40" height="4" rx="2" fill="#ccfbf1" />
          <rect x="-35" y="-14" width="25" height="3" rx="1.5" fill="#5eead4" />
          <rect x="-55" y="-4" width="110" height="4" rx="2" fill="#2dd4bf" />
          <rect x="-55" y="4" width="100" height="4" rx="2" fill="#2dd4bf" />
          <rect x="-55" y="12" width="80" height="4" rx="2" fill="#2dd4bf" />
          <rect x="-55" y="22" width="18" height="3" rx="1.5" fill="#34d399" /><rect x="-33" y="22" width="18" height="3" rx="1.5" fill="#34d399" /><rect x="-11" y="22" width="18" height="3" rx="1.5" fill="#34d399" /><rect x="11" y="22" width="18" height="3" rx="1.5" fill="#34d399" /><rect x="33" y="22" width="18" height="3" rx="1.5" fill="#34d399" />
        </>
      )}

      {/* FOOTER */}
      {r('ftB',
        <rect x="-145" y="-15" width="290" height="30" rx="6" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-145" y="-15" width="290" height="30" rx="6" fill="#1e293b" />,
        <rect x="-145" y="-15" width="290" height="30" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
      )}
      {r('ftL',
        <circle cx="0" cy="0" r="8" fill="#334155" />,
        <rect x="-8" y="-6" width="16" height="12" rx="3" fill="#334155" />,
        <><circle cx="0" cy="0" r="6" fill={`url(#${safeId}-grd)`} /><rect x="12" y="-3" width="25" height="3" rx="1.5" fill="#475569" /><rect x="12" y="3" width="18" height="3" rx="1.5" fill="#334155" /></>
      )}
      {r('ftR',
        <rect x="-40" y="-4" width="80" height="8" rx="4" fill="#334155" />,
        <><rect x="-40" y="-4" width="20" height="8" rx="4" fill="#475569" /><rect x="20" y="-4" width="20" height="8" rx="4" fill="#475569" /></>,
        <><rect x="-50" y="-3" width="20" height="3" rx="1.5" fill="#475569" /><rect x="-22" y="-3" width="20" height="3" rx="1.5" fill="#475569" /><rect x="6" y="-3" width="20" height="3" rx="1.5" fill="#475569" /><rect x="34" y="-3" width="20" height="3" rx="1.5" fill="#475569" /></>
      )}
    </svg>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function VisualToCodePreview() {
  const ref = useRef<HTMLDivElement>(null)
  const codeScrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reducedMotion = useReducedMotion()
  const [{ step, cycle }, setPlayback] = useState({ step: 0, cycle: 0 })
  const [showCode, setShowCode] = useState(false)
  const [typedChars, setTypedChars] = useState(0)
  const count = codeElements.length
  const stage = reducedMotion ? count : step

  // Flatten all code into individual lines for character-by-character rendering
  const allFlatLines: { text: string; number: number; file: string; startChar: number; endChar: number }[] = []
  let charsSoFar = 0
  let currentFile = ''
  let fileLineCounter = 1

  // Also track where each codeElement ends (for step → char mapping)
  const stepCharEnds: number[] = []

  codeElements.forEach((element) => {
    element.code.split('\n').forEach((line) => {
      const len = line.length === 0 ? 1 : line.length
      if (currentFile !== element.file) {
        currentFile = element.file
        fileLineCounter = 1
      }
      allFlatLines.push({ text: line, number: fileLineCounter++, file: element.file, startChar: charsSoFar, endChar: charsSoFar + len })
      charsSoFar += len
    })
    stepCharEnds.push(charsSoFar)
  })
  const totalChars = charsSoFar

  // Visual animation keeps running even when showCode is active
  useEffect(() => {
    if (!inView || reducedMotion) return
    const timer = window.setTimeout(() => setPlayback((current) => (
      current.step === count
        ? { step: 0, cycle: current.cycle + 1 }
        : { ...current, step: current.step + 1 }
    )), step === count ? 2400 : 950)
    return () => window.clearTimeout(timer)
  }, [inView, reducedMotion, step, count])

  // Reset typing when loop resets
  useEffect(() => {
    if (step === 0) setTypedChars(0)
  }, [step, cycle])

  // Character-by-character typing — driven by the visual step
  // The target chars = how many chars should be visible based on current step
  useEffect(() => {
    if (!showCode || reducedMotion) return
    
    // Target: all chars up to and including the current step's code
    const targetChars = step > 0 ? (stepCharEnds[step - 1] ?? 0) : 0
    
    if (typedChars >= targetChars) return // already caught up
    
    const timer = setTimeout(() => {
      setTypedChars(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, Math.random() * 25 + 10)
    return () => clearTimeout(timer)
  }, [showCode, reducedMotion, typedChars, step, stepCharEnds])

  // Auto-scroll as new lines appear
  useEffect(() => {
    if (codeScrollRef.current) {
      codeScrollRef.current.scrollTo({
        top: codeScrollRef.current.scrollHeight,
        behavior: reducedMotion ? 'instant' : 'smooth'
      })
    }
  }, [typedChars, reducedMotion])

  const panelPose = (front: boolean) => ({
    x: front ? 0 : 14,
    y: front ? 20 : -12,
    rotateY: front ? 0 : -12,
    rotateX: front ? 0 : 4,
    rotateZ: front ? 0 : 5,
    scale: front ? 1 : 0.94,
  })

  return (
    <div ref={ref} role="group" aria-label="Painéis de criação visual e código em camadas" className="relative h-full overflow-visible [perspective:900px]">
      <motion.div
        initial={false}
        animate={panelPose(showCode)}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
        style={{ zIndex: showCode ? 2 : 1, transformOrigin: 'center top' }}
        className="absolute bottom-6 left-3 right-7 -top-1 flex flex-col overflow-hidden rounded-xl border border-white/[0.12] bg-neutral-950 shadow-[0_12px_26px_-8px_rgba(0,0,0,0.85)]"
      >
        {/* Code Panel Header */}
        <div className="flex h-8 w-full shrink-0 items-center gap-2 border-b border-white/[0.08] bg-neutral-900 px-2">
          <button type="button" aria-label="Abrir ambiente de código" aria-pressed={showCode} onClick={() => setShowCode(true)} className="flex min-w-0 flex-1 items-center gap-2 rounded text-left focus-visible:outline-2 focus-visible:outline-blue-400">
            <img src="/nova-logo-128.webp" alt="" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" />
            <span className="flex h-[22px] min-w-0 flex-1 items-center justify-center rounded-md border border-white/5 bg-neutral-950 px-2 shadow-inner">
              <span className="truncate text-[8px] font-medium tracking-[0.01em] text-neutral-400">meu-app.makeploy.dev/code</span>
            </span>
          </button>
          <button type="button" aria-label="Trazer a criação visual para frente" aria-pressed={!showCode} onClick={() => setShowCode(false)} className="flex h-[22px] shrink-0 items-center justify-center gap-1 rounded-md border border-transparent bg-white px-2.5 text-[9px] font-semibold text-black shadow-sm transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white">
            <Eye size={11} strokeWidth={2} /> Visual
          </button>
        </div>

        {/* Code Workspace */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="w-[110px] shrink-0 border-r border-white/5 bg-neutral-950 flex flex-col hidden sm:flex" onClick={() => setShowCode(true)}>
            <div className="px-2 py-1.5 text-[8px] font-semibold text-neutral-500 tracking-wider">ARQUIVOS</div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden text-[9px] py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(() => {
              const activeFile = allFlatLines.find(l => typedChars >= l.startChar && typedChars < l.endChar)?.file || allFlatLines[allFlatLines.length - 1].file
              return (
                <>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 text-neutral-300 whitespace-nowrap">
                    <FileIcon name="src" isDir size={11} /> src/
                  </div>
                  
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 pl-5 whitespace-nowrap ${activeFile === 'App.tsx' ? 'bg-white/5 text-neutral-100 font-medium' : 'text-neutral-500 hover:text-neutral-300'}`}>
                    <FileIcon name="App.tsx" size={11} /> App.tsx
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 pl-5 text-neutral-300 whitespace-nowrap">
                    <FileIcon name="components" isDir size={11} /> components/
                  </div>
                  
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 pl-8 whitespace-nowrap ${activeFile === 'Hero.tsx' ? 'bg-white/5 text-neutral-100 font-medium' : 'text-neutral-500 hover:text-neutral-300'}`}>
                    <FileIcon name="Hero.tsx" size={11} /> Hero.tsx
                  </div>

                  <div className={`flex items-center gap-1.5 px-2 py-0.5 pl-8 whitespace-nowrap ${activeFile === 'Card.tsx' ? 'bg-white/5 text-neutral-100 font-medium' : 'text-neutral-500 hover:text-neutral-300'}`}>
                    <FileIcon name="Card.tsx" size={11} /> Card.tsx
                  </div>
                  
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 pl-8 whitespace-nowrap ${activeFile === 'Footer.tsx' ? 'bg-white/5 text-neutral-100 font-medium' : 'text-neutral-500 hover:text-neutral-300'}`}>
                    <FileIcon name="Footer.tsx" size={11} /> Footer.tsx
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 pl-5 text-neutral-300 whitespace-nowrap">
                    <FileIcon name="styles" isDir size={11} /> styles/
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2 py-0.5 pl-8 text-neutral-500 hover:text-neutral-300 whitespace-nowrap">
                    <FileIcon name="index.css" size={11} /> index.css
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 pl-5 text-neutral-300 whitespace-nowrap">
                    <FileIcon name="pages" isDir size={11} /> pages/
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2 py-0.5 pl-8 text-neutral-500 hover:text-neutral-300 whitespace-nowrap">
                    <FileIcon name="Home.tsx" size={11} /> Home.tsx
                  </div>
                </>
              )
            })()}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-black">
          {/* Tabs */}
          <div className="flex bg-neutral-950 border-b border-white/5 shrink-0" onClick={() => setShowCode(true)}>
             {(() => {
               const activeFile = allFlatLines.find(l => typedChars >= l.startChar && typedChars < l.endChar)?.file || allFlatLines[allFlatLines.length - 1].file
               const files = ['App.tsx', 'Hero.tsx', 'Card.tsx', 'Footer.tsx']
               const activeIdx = files.indexOf(activeFile)
               const prevFile = activeIdx > 0 ? files[activeIdx - 1] : files[files.length - 1]
               const visibleTabs = activeIdx === 0 ? ['index.css', 'App.tsx'] : [prevFile, activeFile]
               
               return visibleTabs.map(file => {
                 const isActive = activeFile === file
                 return (
                   <div key={file} className={`flex items-center gap-2 px-4 py-2 text-[10px] cursor-pointer ${isActive ? 'text-white bg-black border-b-[2px] border-b-blue-500' : 'text-neutral-500 border-r border-white/5 hover:bg-white/5'}`}>
                      <FileIcon name={file} size={12} /> {file}
                   </div>
                 )
               })
             })()}
          </div>
          
          {/* Code Area */}
          <div ref={codeScrollRef} role="region" aria-label="Código de exemplo da página" className={`flex-1 overflow-y-auto py-2 font-mono text-[9px] leading-[16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${showCode ? '' : 'pointer-events-none'}`}>
             {(() => {
               const activeFile = allFlatLines.find(l => typedChars >= l.startChar && typedChars < l.endChar)?.file || allFlatLines[allFlatLines.length - 1].file
               const activeLines = allFlatLines.filter(l => l.file === activeFile)
               
               return activeLines.map((line) => {
                 // Skip lines not yet reached
                 if (typedChars <= line.startChar) return null
                 // How many chars of this line are visible
                 const visibleCount = Math.min(typedChars - line.startChar, line.text.length)
                 const visibleText = line.text.length === 0 ? '' : line.text.slice(0, visibleCount)
                 const isComplete = visibleCount >= line.text.length
                 return (
                   <div key={line.number} className="flex gap-2 px-2 hover:bg-white/5">
                     <span className="w-4 shrink-0 text-right text-neutral-600 select-none">{line.number}</span>
                     <span className="min-w-0 whitespace-pre-wrap break-words text-neutral-300">
                       <span dangerouslySetInnerHTML={{ __html: highlightCode(visibleText) }} />
                       {!isComplete && <span className="inline-block w-[6px] h-[12px] bg-neutral-300 ml-[2px] align-middle animate-pulse" />}
                     </span>
                   </div>
                 )
               })
             })()}
          </div>
          
          {/* Status Bar */}
          <div className="h-5 shrink-0 bg-neutral-950 border-t border-white/5 flex items-center justify-between px-3 text-[8px] text-neutral-500">
             <div className="flex gap-3"><span>TypeScript React</span> <span>UTF-8</span></div>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Salvo</div>
          </div>
        </div>
        </div>
      </motion.div>
      <motion.div
        initial={false}
        animate={panelPose(!showCode)}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
        style={{ zIndex: showCode ? 1 : 2, transformOrigin: 'center top' }}
        className="absolute bottom-6 left-3 right-7 -top-1 flex flex-col overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_14px_28px_-8px_rgba(0,0,0,0.9)]"
      >
        <div className="flex h-8 w-full shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-2">
          <button type="button" aria-label="Trazer a criação visual para frente" aria-pressed={!showCode} onClick={() => setShowCode(false)} className="flex min-w-0 flex-1 items-center gap-2 rounded text-left focus-visible:outline-2 focus-visible:outline-violet-300">
            <img src="/nova-logo-128.webp" alt="" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" />
            <span className="flex h-[22px] min-w-0 flex-1 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 px-2 shadow-inner">
              <span className="truncate text-[8px] font-medium tracking-[0.01em] text-neutral-500">meu-app.makeploy.dev</span>
            </span>
          </button>
          <button type="button" aria-label="Abrir ambiente de código" aria-pressed={showCode} onClick={() => setShowCode(true)} className="flex h-[22px] shrink-0 items-center justify-center gap-1 rounded-md border border-blue-400/40 bg-gradient-to-b from-blue-500 to-blue-600 px-2.5 text-[9px] font-semibold text-white shadow-[0_2px_6px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors hover:from-blue-400 hover:to-blue-500 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-300">
            <Code2 size={11} strokeWidth={2} /> IDE
          </button>
        </div>
        <div className={`min-h-0 flex-1 px-1 pt-2 ${showCode ? 'pointer-events-none' : ''}`} aria-hidden="true">
          <DarkAssemblyMockup key={cycle} stage={stage} cycle={cycle} reducedMotion={!!reducedMotion} />
        </div>
      </motion.div>
    </div>
  )
}

