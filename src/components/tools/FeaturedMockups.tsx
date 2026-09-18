import { useEffect, useId, useState } from 'react'
import { Globe } from 'lucide-react'
import { motion } from 'motion/react'
import { IntegratedCodeEditorPreview } from '@/components/creation/IntegratedCodeEditorPreview'

const BRAIN_PHRASES = [
  'Quero uma ideia de SaaS',
  'Criar uma página de venda',
  'Analisar meu concorrente',
  'Gerar um plano de negócio',
]

export function BrainMockup() {
  const id = useId()
  const safeId = id.replace(/:/g, '')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const phraseIdx = Math.floor(tick / 24) % BRAIN_PHRASES.length
  const currentPhrase = BRAIN_PHRASES[phraseIdx]
  
  // The animation cycle is 24s, but the "Pesquisando" row fades out around 20s
  // and the checkmark finishes around 18s. To make the countdown hit 0 right 
  // when the checkmark appears, we accelerate it slightly.
  const tickInCycle = tick % 24
  const timeLeft = Math.max(0, Math.ceil(24 - (tickInCycle * (24 / 9))))

  // ── 12s TIMELINE (all percentages) ──
  // 0-12%   → typing text
  // 12-16%  → mouse moves + clicks Enviar
  // 17-21%  → Row 2 slides in (Pesquisando... 28)
  // 22-26%  → Row 3 slides in (skeleton lines)
  // 27-31%  → Row 4 slides in (ring + "Analisando")
  // 32-42%  → word1 "mercado",  ring → 25%
  // 44-54%  → word2 "público",  ring → 50%
  // 56-66%  → word3 "dados",    ring → 75%
  // 68-75%  → word4 "histórico",ring → 100%
  // 76-82%  → ring fades, checkmark pops, "Concluído!"
  // 83-90%  → everything fades out
  // 91-100% → blank, then restart
  return (
    <svg key={phraseIdx} viewBox="0 0 240 184" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`${safeId}-shadow`} x="-20%" y="-30%" width="140%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.06" />
        </filter>

        <clipPath id={`${safeId}-type-clip`}>
          <rect x="18" y="4" width="0" height="34" className={`a-type-${safeId}`} />
        </clipPath>
        
        <style>
          {`
            /* ── 1. TYPING ── */
            @keyframes aType-${safeId} {
              0%,1%  { width:0 }
              12%    { width:150px }
              83%    { width:150px }
              90%,100% { width:0 }
            }
            .a-type-${safeId} { animation: aType-${safeId} 24s infinite cubic-bezier(.2,0,.2,1); }

            /* ── 2. CURSOR ── */
            @keyframes aCur-${safeId} {
              0%,1%  { transform:translateX(0); opacity:.9 }
              12%    { transform:translateX(128px); opacity:.9 }
              14%,83%{ opacity:0; transform:translateX(128px) }
              90%,100%{ opacity:0; transform:translateX(0) }
            }
            @keyframes aBlink-${safeId} { 0%,100%{opacity:.9} 50%{opacity:0} }
            .a-cur-${safeId} { animation: aCur-${safeId} 24s infinite ease-out, aBlink-${safeId} .65s infinite; }

            /* ── 3. SEND BUTTON ── */
            @keyframes aBtn-${safeId} {
              0%,1%  { opacity:0; transform:scale(.92) }
              3%,14% { opacity:1; transform:scale(1) }
              15%    { opacity:1; transform:scale(.9); filter:brightness(1.2) }
              16.5%  { opacity:1; transform:scale(1) }
              18%,83%{ opacity:0; transform:scale(.95) }
              90%,100%{ opacity:0 }
            }
            .a-btn-${safeId} { transform-origin:199px 24px; animation: aBtn-${safeId} 24s infinite cubic-bezier(.2,0,.2,1); }

            /* ── 4. MOUSE POINTER ── */
            @keyframes aMouse-${safeId} {
              0%,10% { opacity:0; transform:translate(215px,110px) }
              12%    { opacity:1; transform:translate(208px,70px) }
              15%    { opacity:1; transform:translate(199px,24px) scale(1) }
              15.5%  { opacity:1; transform:translate(199px,24px) scale(.85) }
              16.5%  { opacity:1; transform:translate(199px,24px) scale(1) }
              19%,100%{ opacity:0; transform:translate(199px,18px) }
            }
            .a-mouse-${safeId} { transform-origin:0 0; animation: aMouse-${safeId} 24s infinite cubic-bezier(.25,1,.5,1); }

            /* ── 5. CLICK RIPPLE ── */
            @keyframes aRipple-${safeId} {
              0%,15%   { r:0; opacity:0 }
              15.5%    { r:4px; opacity:.6 }
              18%      { r:16px; opacity:0 }
              19%,100% { r:0; opacity:0 }
            }
            .a-ripple-${safeId} { animation: aRipple-${safeId} 24s infinite ease-out; }

            /* ── 6. BUBBLE BOX (visible 1-83%) ── */
            @keyframes aBubble-${safeId} {
              0%     { opacity:0; transform:translateY(-4px) }
              1%,83% { opacity:1; transform:translateY(0) }
              90%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-bubble-${safeId} { animation: aBubble-${safeId} 24s infinite ease-out; }

            /* ── 7. ROW 2 (visible 21-83%) ── */
            @keyframes aR2-${safeId} {
              0%,17% { opacity:0; transform:translateY(8px) }
              21%,83%{ opacity:1; transform:translateY(0) }
              90%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-r2-${safeId} { animation: aR2-${safeId} 24s infinite cubic-bezier(.16,1,.3,1); }

            /* ── 8. ROW 3 (visible 26-83%) ── */
            @keyframes aR3-${safeId} {
              0%,22% { opacity:0; transform:translateY(8px) }
              26%,83%{ opacity:1; transform:translateY(0) }
              90%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-r3-${safeId} { animation: aR3-${safeId} 24s infinite cubic-bezier(.16,1,.3,1); }

            /* ── 9. ROW 4 / STATUS (visible 31-88%) ── */
            @keyframes aR4-${safeId} {
              0%,27% { opacity:0; transform:translateY(8px) }
              31%,85%{ opacity:1; transform:translateY(0) }
              92%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-r4-${safeId} { animation: aR4-${safeId} 24s infinite cubic-bezier(.16,1,.3,1); }

            /* ── 10. CYCLING WORDS (synced with ring) ── */
            @keyframes aW1-${safeId} {
              0%,30% { opacity:0; transform:translateY(4px) }
              33%    { opacity:1; transform:translateY(0) }
              41%    { opacity:1; transform:translateY(0) }
              43%    { opacity:0; transform:translateY(-2px) }
              100%   { opacity:0 }
            }
            @keyframes aW2-${safeId} {
              0%,43% { opacity:0; transform:translateY(4px) }
              46%    { opacity:1; transform:translateY(0) }
              53%    { opacity:1; transform:translateY(0) }
              55%    { opacity:0; transform:translateY(-2px) }
              100%   { opacity:0 }
            }
            @keyframes aW3-${safeId} {
              0%,55% { opacity:0; transform:translateY(4px) }
              58%    { opacity:1; transform:translateY(0) }
              65%    { opacity:1; transform:translateY(0) }
              67%    { opacity:0; transform:translateY(-2px) }
              100%   { opacity:0 }
            }
            @keyframes aW4-${safeId} {
              0%,67% { opacity:0; transform:translateY(4px) }
              70%    { opacity:1; transform:translateY(0) }
              75%    { opacity:1; transform:translateY(0) }
              77%    { opacity:0; transform:translateY(-2px) }
              100%   { opacity:0 }
            }
            .a-w1-${safeId} { animation: aW1-${safeId} 24s infinite ease-in-out; }
            .a-w2-${safeId} { animation: aW2-${safeId} 24s infinite ease-in-out; }
            .a-w3-${safeId} { animation: aW3-${safeId} 24s infinite ease-in-out; }
            .a-w4-${safeId} { animation: aW4-${safeId} 24s infinite ease-in-out; }

            /* ── 11. PROGRESS RING (circ ≈ 50.3, synced with words) ── */
            @keyframes aRing-${safeId} {
              0%,30% { stroke-dashoffset:50.3 }
              42%    { stroke-dashoffset:37.7 }
              54%    { stroke-dashoffset:25.1 }
              66%    { stroke-dashoffset:12.6 }
              76%    { stroke-dashoffset:0 }
              100%   { stroke-dashoffset:0 }
            }
            .a-ring-${safeId} { animation: aRing-${safeId} 24s infinite ease-in-out; }

            /* Ring group fades when checkmark appears */
            @keyframes aRingFade-${safeId} {
              0%,76% { opacity:1 }
              79%    { opacity:0 }
              100%   { opacity:0 }
            }
            .a-ring-fade-${safeId} { animation: aRingFade-${safeId} 24s infinite ease-in-out; }

            /* ── 12. CHECKMARK POP (76-85%) ── */
            @keyframes aCheck-${safeId} {
              0%,76% { opacity:0; transform:translate(17px,164px) scale(0) }
              79%    { opacity:1; transform:translate(17px,164px) scale(1.2) }
              81%,85%{ opacity:1; transform:translate(17px,164px) scale(1) }
              89%    { opacity:0; transform:translate(17px,164px) scale(.85) }
              100%   { opacity:0; transform:translate(17px,164px) scale(0) }
            }
            .a-check-${safeId} { animation: aCheck-${safeId} 24s infinite cubic-bezier(.34,1.56,.64,1); }

            /* ── 13. LABEL SWAP: "Analisando" → "Concluído!" ── */
            @keyframes aLabelA-${safeId} {
              0%,76% { opacity:1 }
              79%    { opacity:0 }
              100%   { opacity:0 }
            }
            .a-labelA-${safeId} { animation: aLabelA-${safeId} 24s infinite ease-in-out; }

            @keyframes aLabelB-${safeId} {
              0%,76% { opacity:0; transform:translateY(3px) }
              79%    { opacity:1; transform:translateY(0) }
              85%    { opacity:1; transform:translateY(0) }
              89%    { opacity:0; transform:translateY(-2px) }
              100%   { opacity:0 }
            }
            .a-labelB-${safeId} { animation: aLabelB-${safeId} 24s infinite ease-in-out; }

            /* ── PULSING DOTS ── */
            @keyframes aPulse-${safeId} { 0%,100%{opacity:.3} 50%{opacity:1} }
            .a-dots-${safeId} { animation: aPulse-${safeId} 1.3s infinite ease-in-out; }
          `}
        </style>
      </defs>

      {/* ─── 1. Chat bubble ─── */}
      <g className={`a-bubble-${safeId}`}>
        <rect x="8" y="8" width="224" height="32" rx="16" fill="#fff" stroke="#e5e7eb" strokeWidth=".9" filter={`url(#${safeId}-shadow)`} />
        <g clipPath={`url(#${safeId}-type-clip)`}>
          <text x="22" y="27.5" fontSize="11" fontWeight="500" fill="#374151">{currentPhrase}</text>
        </g>
        <line x1="22" y1="16" x2="22" y2="30" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round" className={`a-cur-${safeId}`} />
        <g className={`a-btn-${safeId}`}>
          <rect x="168" y="12.5" width="58" height="23" rx="11.5" fill="#0f172a" />
          <text x="178" y="27" fontSize="9.5" fontWeight="500" fontFamily="Inter, sans-serif" fill="#fff">Enviar</text>
          <path d="M211 24 L216 24 M213.5 21.5 L216 24 L213.5 26.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>

      {/* Click ripple + mouse */}
      <circle cx="199" cy="24" r="0" fill="#3b82f6" className={`a-ripple-${safeId}`} />
      <g className={`a-mouse-${safeId}`}>
        <path d="M0,0 L0,14.5 L3.8,11.2 L6.5,16.5 L8.8,15.3 L6.1,10.2 L11,10.2 Z" fill="#0f172a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </g>

      {/* ─── 2. Pesquisando row ─── */}
      <g className={`a-r2-${safeId}`}>
        <image href="/nova-logo-128.webp" xlinkHref="/nova-logo-128.webp" x="8" y="48" width="28" height="28" preserveAspectRatio="xMidYMid meet" />
        <line x1="42" y1="53.5" x2="42" y2="70.5" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
        <text x="50" y="66.5" fontSize="12.5" fontWeight="600" fill="#1f2937">Pesquisando</text>
        <g className={`a-dots-${safeId}`}>
          <circle cx="130" cy="63.5" r="1.5" fill="#6366f1" />
          <circle cx="135" cy="63.5" r="1.5" fill="#6366f1" />
          <circle cx="140" cy="63.5" r="1.5" fill="#6366f1" />
        </g>
        <rect x="149" y="55" width="22" height="16" rx="4" fill="#f1f5f9" />
        <text x="160" y="66.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">{timeLeft}</text>
      </g>

      {/* ─── 3. Skeleton lines ─── */}
      <g className={`a-r3-${safeId}`}>
        <rect x="10" y="92" width="215" height="9" rx="4.5" fill="#f1f5f9" />
        <rect x="10" y="112" width="175" height="9" rx="4.5" fill="#f3f6fa" />
        <rect x="10" y="132" width="130" height="9" rx="4.5" fill="#f8fafc" />
      </g>

      {/* ─── 4. Status row ─── */}
      <g className={`a-r4-${safeId}`}>
        {/* Progress ring */}
        <g className={`a-ring-fade-${safeId}`}>
          <circle cx="17" cy="164" r="8" fill="none" stroke="#e5e7eb" strokeWidth="2" />
          <circle cx="17" cy="164" r="8" fill="none" stroke="#22c55e" strokeWidth="2.2"
            strokeDasharray="50.3" strokeDashoffset="50.3" strokeLinecap="round"
            className={`a-ring-${safeId}`}
            style={{ transformOrigin: '17px 164px', transform: 'rotate(-90deg)' }} />
        </g>

        {/* Checkmark (pops after ring completes) */}
        <g className={`a-check-${safeId}`} style={{ transformOrigin: '0 0' }}>
          <circle cx="0" cy="0" r="9" fill="#22c55e" />
          <path d="M-4 0.5 L-1.2 3.5 L4.5 -3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Labels */}
        <text x="31" y="168" fontSize="11.5" fontWeight="600" fill="#1f2937" className={`a-labelA-${safeId}`}>Analisando</text>
        <text x="31" y="168" fontSize="11.5" fontWeight="700" fill="#22c55e" opacity="0" className={`a-labelB-${safeId}`}>Concluído!</text>

        {/* Cycling words */}
        <text x="97" y="168" fontSize="11.5" fontWeight="700" fill="#7c3aed" opacity="0" className={`a-w1-${safeId}`}>mercado</text>
        <text x="97" y="168" fontSize="11.5" fontWeight="700" fill="#7c3aed" opacity="0" className={`a-w2-${safeId}`}>público</text>
        <text x="97" y="168" fontSize="11.5" fontWeight="700" fill="#7c3aed" opacity="0" className={`a-w3-${safeId}`}>dados</text>
        <text x="97" y="168" fontSize="11.5" fontWeight="700" fill="#7c3aed" opacity="0" className={`a-w4-${safeId}`}>histórico</text>
      </g>
    </svg>
  )
}

export function VisualMockup() {
  const id = useId()
  const safeId = id.replace(/:/g, '')

  const pieces = [
    // Navbar (Movido ainda mais para cima, y=5)
    { id: 'nB', t: 0, x: 160, y: 5 },
    { id: 'nL', t: 4, x: 40, y: 5 },
    { id: 'nM', t: 8, x: 160, y: 5 },
    { id: 'nC', t: 12, x: 260, y: 5 },
    // Hero Text (Distribuído melhor)
    { id: 'hT', t: 16, x: 90, y: 70 },
    { id: 'hS', t: 20, x: 90, y: 95 },
    { id: 'hB', t: 24, x: 90, y: 120 },
    // Hero Graphic
    { id: 'gB', t: 28, x: 235, y: 90 },
    { id: 'gI', t: 32, x: 235, y: 90 },
    // Features (Movido para baixo, y=175)
    { id: 'f1B', t: 36, x: 60, y: 175 },
    { id: 'f1C', t: 40, x: 60, y: 175 },
    { id: 'f2B', t: 44, x: 160, y: 175 },
    { id: 'f2C', t: 48, x: 160, y: 175 },
    { id: 'f3B', t: 52, x: 260, y: 175 },
    { id: 'f3C', t: 56, x: 260, y: 175 },
  ]

  const generateStyles = () => {
    let css = ''
    pieces.forEach(p => {
      css += `
        .a-${p.id}O1-${safeId} { animation: ${p.id}O1-${safeId} 40s infinite cubic-bezier(0.2,0.8,0.2,1); }
        .a-${p.id}O2-${safeId} { animation: ${p.id}O2-${safeId} 40s infinite cubic-bezier(0.2,0.8,0.2,1); }
        .a-${p.id}F-${safeId}  { animation: ${p.id}F-${safeId} 40s infinite cubic-bezier(.34,1.56,.64,1); }
        
        @keyframes ${p.id}O1-${safeId} {
          ${p.t === 0 ? '' : `0%,${p.t - 0.1}% {opacity:0; transform:translate(160px,115px) scale(0.6) rotate(0deg)}`}
          ${p.t}% {opacity:1; transform:translate(160px,105px) scale(0.85) rotate(-2deg)}
          ${p.t + 1}% {opacity:1; transform:translate(160px,95px) scale(0.95) rotate(2deg)}
          ${p.t + 1.1}%,100% {opacity:0; transform:translate(160px,95px) scale(0.95) rotate(2deg)}
        }
        @keyframes ${p.id}O2-${safeId} {
          0%,${p.t + 0.9}% {opacity:0; transform:translate(160px,115px) scale(0.6) rotate(0deg)}
          ${p.t + 1}% {opacity:1; transform:translate(160px,105px) scale(0.85) rotate(2deg)}
          ${p.t + 2}% {opacity:1; transform:translate(160px,95px) scale(0.95) rotate(-2deg)}
          ${p.t + 2.1}%,100% {opacity:0; transform:translate(160px,95px) scale(0.95) rotate(-2deg)}
        }
        @keyframes ${p.id}F-${safeId} {
          0%,${p.t + 1.9}% {opacity:0; transform:translate(160px,110px) scale(0.6)}
          ${p.t + 2}% {opacity:1; transform:translate(160px,90px) scale(1.1)}
          ${p.t + 4}%,88% {opacity:1; transform:translate(${p.x}px,${p.y}px) scale(1)}
          93%,100% {opacity:0; transform:translate(${p.x}px,${p.y}px) scale(0.8)}
        }
      `
    })
    return css
  }

  const renderPiece = (id: string, O1: React.ReactNode, O2: React.ReactNode, F: React.ReactNode) => (
    <g key={id}>
      <g className={`a-${id}O1-${safeId}`}>{O1}</g>
      <g className={`a-${id}O2-${safeId}`}>{O2}</g>
      <g className={`a-${id}F-${safeId}`}>{F}</g>
    </g>
  )

  return (
    <svg viewBox="0 -15 320 215" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`${safeId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.08" />
        </filter>
        <style>{generateStyles()}</style>
      </defs>

      {/* --- NAVBAR --- */}
      {renderPiece('nB', 
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="#f1f5f9" />,
        <rect x="-145" y="-15" width="290" height="30" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" filter={`url(#${safeId}-shadow)`} />
      )}
      
      {renderPiece('nL',
        <circle cx="0" cy="0" r="8" fill="none" stroke="#94a3b8" strokeWidth="2" />,
        <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#cbd5e1" />,
        <circle cx="0" cy="0" r="8" fill="#4f46e5" />
      )}
      
      {renderPiece('nM',
        <rect x="-40" y="-2" width="80" height="4" rx="2" fill="#cbd5e1" />,
        <><rect x="-40" y="-2" width="20" height="4" rx="2" fill="#94a3b8" /><rect x="20" y="-2" width="20" height="4" rx="2" fill="#94a3b8" /></>,
        <><rect x="-35" y="-2" width="20" height="4" rx="2" fill="#94a3b8" /><rect x="-5" y="-2" width="25" height="4" rx="2" fill="#94a3b8" /><rect x="30" y="-2" width="20" height="4" rx="2" fill="#94a3b8" /></>
      )}

      {renderPiece('nC',
        <rect x="-20" y="-10" width="40" height="20" rx="10" fill="none" stroke="#94a3b8" strokeWidth="2" />,
        <rect x="-20" y="-10" width="40" height="20" rx="4" fill="#cbd5e1" />,
        <rect x="-20" y="-10" width="40" height="20" rx="6" fill="#4f46e5" />
      )}

      {/* --- HERO TEXT --- */}
      {renderPiece('hT',
        <rect x="-50" y="-15" width="100" height="30" rx="6" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-50" y="-15" width="100" height="30" rx="6" fill="#f1f5f9" />,
        <><rect x="-50" y="-10" width="100" height="12" rx="4" fill="#0f172a" /><rect x="-50" y="6" width="80" height="12" rx="4" fill="#0f172a" /></>
      )}

      {renderPiece('hS',
        <rect x="-50" y="-3" width="100" height="6" rx="3" fill="#e2e8f0" />,
        <rect x="-50" y="-6" width="100" height="12" rx="6" fill="#f1f5f9" />,
        <><rect x="-50" y="-5" width="110" height="6" rx="3" fill="#64748b" /><rect x="-50" y="5" width="70" height="6" rx="3" fill="#64748b" /></>
      )}

      {renderPiece('hB',
        <rect x="-50" y="-9" width="95" height="18" rx="9" fill="none" stroke="#cbd5e1" strokeWidth="2" />,
        <rect x="-50" y="-9" width="45" height="18" rx="9" fill="#e2e8f0" />,
        <><rect x="-50" y="-9" width="45" height="18" rx="6" fill="#4f46e5" /><rect x="5" y="-9" width="45" height="18" rx="6" fill="#e2e8f0" /></>
      )}

      {/* --- HERO GRAPHIC --- */}
      {renderPiece('gB',
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />,
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="#f1f5f9" />,
        <rect x="-55" y="-40" width="110" height="80" rx="10" fill="#e0e7ff" filter={`url(#${safeId}-shadow)`} />
      )}

      {renderPiece('gI',
        <circle cx="0" cy="0" r="20" fill="#c7d2fe" />,
        <rect x="-30" y="-20" width="60" height="40" rx="8" fill="#c7d2fe" />,
        <>
          <rect x="-45" y="-30" width="90" height="15" rx="4" fill="white" />
          <circle cx="-35" cy="-22.5" r="4" fill="#818cf8" />
          <rect x="-25" y="-24" width="30" height="3" rx="1.5" fill="#c7d2fe" />
          <rect x="-45" y="-10" width="40" height="40" rx="4" fill="white" />
          <rect x="5" y="-10" width="40" height="40" rx="4" fill="#4f46e5" />
        </>
      )}

      {/* --- FEATURE CARDS --- */}
      {[
        { id: 'f1', colorBase: '#ecfdf5', colorDot: '#10b981' },
        { id: 'f2', colorBase: '#f5f3ff', colorDot: '#8b5cf6' },
        { id: 'f3', colorBase: '#fffbeb', colorDot: '#f59e0b' }
      ].map((f) => (
        <g key={f.id}>
          {renderPiece(`${f.id}B`,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill="#f1f5f9" />,
            <rect x="-42.5" y="-25" width="85" height="50" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" filter={`url(#${safeId}-shadow)`} />
          )}
          {renderPiece(`${f.id}C`,
            <rect x="-20" y="-15" width="40" height="30" rx="4" fill="#f1f5f9" />,
            <circle cx="0" cy="0" r="10" fill="#e2e8f0" />,
            <>
              <rect x="-32.5" y="-15" width="16" height="16" rx="4" fill={f.colorBase} />
              <circle cx="-24.5" cy="-7" r="4" fill={f.colorDot} />
              <rect x="-10" y="-13" width="35" height="4" rx="2" fill="#334155" />
              <rect x="-10" y="-5" width="20" height="4" rx="2" fill="#94a3b8" />
              <rect x="-32.5" y="10" width="65" height="4" rx="2" fill="#cbd5e1" />
              <rect x="-32.5" y="18" width="40" height="4" rx="2" fill="#cbd5e1" />
            </>
          )}
        </g>
      ))}
    </svg>
  )
}

export function CodingMockup() {
  return (
    <div className="w-full h-full overflow-hidden [&>div]:rounded-none [&>div]:border-none [&>div]:bg-transparent">
      <IntegratedCodeEditorPreview />
    </div>
  )
}

export function DeployMockup() {
  return (
    <div className="absolute -top-6 -left-6 -right-6 bottom-0 flex flex-col bg-white/5 rounded-t-3xl overflow-hidden">
       {/* Top Half: 2 Columns */}
       <div className="flex w-full h-[55%] border-b border-slate-100">
          {/* Top Left: Brain */}
          <div className="w-1/2 h-full border-r border-slate-100 relative flex items-center justify-center overflow-hidden bg-white">
             <div className="absolute inset-0 flex items-center justify-center transform scale-[0.6] sm:scale-[0.7]">
               <BrainMockup />
             </div>
          </div>
          
          {/* Top Right: Visual */}
          <div className="w-1/2 h-full relative flex items-center justify-center overflow-hidden bg-white">
             <div className="absolute inset-0 flex items-center justify-center transform scale-[0.6] sm:scale-[0.7]">
               <VisualMockup />
             </div>
          </div>
       </div>

       {/* Bottom Half: Code + Deploy Badge */}
       <div className="w-full h-[45%] relative flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 flex items-center justify-center transform scale-[0.65] sm:scale-[0.75] -mt-4">
             <CodingMockup />
          </div>
          
          {/* Published Project Effect overlay */}
          <motion.div
             initial={{ opacity: 0, y: 10, x: "-50%" }}
             animate={{ opacity: 1, y: 0, x: "-50%" }}
             transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
             className="absolute bottom-4 left-1/2 flex flex-col items-center gap-1.5 w-full z-20"
          >
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] rounded-lg">
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-mono font-semibold text-slate-700">seuprojeto.makeploy.app</span>
             </div>
             <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] font-bold text-emerald-600 tracking-wider">ONLINE</span>
             </div>
          </motion.div>
       </div>
       
       {/* Gradient overlay at the very bottom to blend with the CardBase title area if needed, 
           but since we span -bottom-6, we are covering the title! 
           Wait, if we cover the title, we should render our own Deploy title on top, 
           OR we only span down to the title area. Let's adjust to leave space for the title! */}
    </div>
  )
}

export { BrainMockup as ProjectsMockup }
export { VisualMockup as DocumentsMockup }
export { CodingMockup as AIMockup }
export { DeployMockup as ChatMockup }

