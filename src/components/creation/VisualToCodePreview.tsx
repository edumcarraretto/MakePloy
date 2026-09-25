import { useId, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Code2, File } from 'lucide-react'

// ─── Code lines shown in sync ─────────────────────────────────────────────────

const codeElements = [
  // 1. nB
  { name: 'Page Config', code: 'export default function Page() {\n  return (\n    <main className="flex min-h-screen flex-col">', color: 'text-neutral-300' },
  // 2. nL
  { name: 'Logo', code: '      <nav className="flex items-center justify-between">\n        <Logo name="studio" />', color: 'text-violet-300' },
  // 3. nM
  { name: 'Menu', code: '        <Menu items={["Products", "Pricing"]} />', color: 'text-pink-300' },
  // 4. nC
  { name: 'Nav CTA', code: '        <Button variant="outline">Login</Button>\n      </nav>\n', color: 'text-fuchsia-300' },
  // 5. hT
  { name: 'Hero Title', code: '      <section className="mt-20 text-center">\n        <h1 className="text-5xl font-bold">\n          Ideias ganham vida.\n        </h1>', color: 'text-amber-300' },
  // 6. hS
  { name: 'Hero Subtitle', code: '        <p className="mt-4 text-lg text-neutral-400">\n          Comece agora mesmo.\n        </p>', color: 'text-emerald-300' },
  // 7. hB
  { name: 'Hero Button', code: '        <Button size="lg" className="mt-8">\n          Começar ↗\n        </Button>\n      </section>\n', color: 'text-violet-400' },
  // 8. gB
  { name: 'Graphic BG', code: '      <Section bg="gradient" className="py-24">', color: 'text-sky-300' },
  // 9. gI
  { name: 'Graphic', code: '        <Image src="/hero-graphic.webp" priority />\n      </Section>\n', color: 'text-sky-200' },
  // 10. f1B
  { name: 'Card 1', code: '      <Grid cols={3} gap={6} className="px-8">\n        <Card variant="green">', color: 'text-emerald-400' },
  // 11. f1C
  { name: 'Card 1 Content', code: '          <Content icon="zap" title="Rápido" />\n        </Card>', color: 'text-emerald-300' },
  // 12. f2B
  { name: 'Card 2', code: '        <Card variant="violet">', color: 'text-violet-400' },
  // 13. f2C
  { name: 'Card 2 Content', code: '          <Content icon="shield" title="Seguro" />\n        </Card>', color: 'text-violet-300' },
  // 14. f3B
  { name: 'Card 3', code: '        <Card variant="amber">', color: 'text-amber-400' },
  // 15. f3C
  { name: 'Card 3 Content', code: '          <Content icon="star" title="Premium" />\n        </Card>\n      </Grid>\n', color: 'text-amber-300' },
  // 16. ctB
  { name: 'CTA Banner', code: '      <Banner variant="dark" className="mt-32">', color: 'text-indigo-400' },
  // 17. ctT
  { name: 'CTA Text', code: '        <h2 className="text-3xl">Pronto para escalar?</h2>', color: 'text-indigo-300' },
  // 18. ctA
  { name: 'CTA Button', code: '        <Button>Assine já</Button>\n      </Banner>\n', color: 'text-indigo-200' },
  // 19. t1B
  { name: 'Testimonial 1', code: '      <Testimonials className="py-20">\n        <TestimonialCard author="Maria">', color: 'text-teal-400' },
  // 20. t1C
  { name: 'Testimonial 1 C', code: '          <Rating value={5} />\n        </TestimonialCard>', color: 'text-teal-300' },
  // 21. t2B
  { name: 'Testimonial 2', code: '        <TestimonialCard author="João">', color: 'text-cyan-400' },
  // 22. t2C
  { name: 'Testimonial 2 C', code: '          <Rating value={5} />\n        </TestimonialCard>\n      </Testimonials>\n', color: 'text-cyan-300' },
  // 23. ftB
  { name: 'Footer', code: '      <footer className="border-t border-white/10">\n        <div className="flex justify-between">', color: 'text-neutral-400' },
  // 24. ftL
  { name: 'Footer Left', code: '          <FooterLinks />', color: 'text-neutral-500' },
  // 25. ftR
  { name: 'Footer Right', code: '          <SocialIcons />\n        </div>\n      </footer>\n    </main>\n  )\n}', color: 'text-neutral-500' },
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
  const inView = useInView(ref, { amount: 0.4 })
  const reducedMotion = useReducedMotion()
  const [{ step, cycle }, setPlayback] = useState({ step: 0, cycle: 0 })
  const [showCode, setShowCode] = useState(false)
  const count = codeElements.length
  const stage = reducedMotion ? count : step

  useEffect(() => {
    if (!inView || reducedMotion || showCode) return
    const timer = window.setTimeout(() => setPlayback((current) => (
      current.step === count
        ? { step: 0, cycle: current.cycle + 1 }
        : { ...current, step: current.step + 1 }
    )), step === count ? 2400 : 950)
    return () => window.clearTimeout(timer)
  }, [inView, reducedMotion, showCode, step, count])

  let lineNumber = 0
  const visibleCode = codeElements.map((element) => ({
    ...element,
    lines: element.code.split('\n').map((line) => ({ text: line, number: ++lineNumber })),
  }))

  const panelPose = (front: boolean) => ({
    x: front ? 0 : 14,
    y: front ? 32 : 0,
    rotateY: front ? -2 : -7,
    rotateX: front ? 0 : 3,
    rotateZ: front ? -1 : 2,
    scale: front ? 1 : 0.96,
  })

  return (
    <div ref={ref} role="group" aria-label="Painéis de criação visual e código em camadas" className="relative h-full overflow-hidden [perspective:900px]">
      <motion.div
        initial={false}
        animate={panelPose(showCode)}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
        style={{ zIndex: showCode ? 2 : 1, transformOrigin: 'center top' }}
        className="absolute bottom-11 left-3 right-7 top-2 flex flex-col overflow-hidden rounded-xl border border-violet-300/25 bg-[#101018] shadow-[0_12px_26px_-8px_rgba(0,0,0,0.85)]"
      >
        <button type="button" aria-label="Trazer o código para frente" aria-pressed={showCode} onClick={() => setShowCode(true)} className="flex h-7 w-full shrink-0 items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 text-left text-[9px] text-neutral-300 transition-colors hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-300">
          <File size={10} className="text-violet-300" /> Page.tsx
          <span className="ml-auto h-1 w-1 rounded-full bg-emerald-400" />
        </button>
        <div role="region" aria-label="Código de exemplo da página" className={`min-h-0 flex-1 overflow-y-auto p-2 font-mono text-[8px] leading-[12px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${showCode ? '' : 'pointer-events-none'}`}>
          {visibleCode.map((element) => (
            <div key={element.name}>
              {element.lines.map((line) => (
                <div key={line.number} className="flex gap-2">
                  <span className="w-4 shrink-0 text-right text-neutral-600">{line.number}</span>
                  <span className={`min-w-0 whitespace-pre-wrap break-words ${element.color}`}>{line.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={false}
        animate={panelPose(!showCode)}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
        style={{ zIndex: showCode ? 1 : 2, transformOrigin: 'center top' }}
        className="absolute bottom-11 left-3 right-7 top-2 flex flex-col overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_14px_28px_-8px_rgba(0,0,0,0.9)]"
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

