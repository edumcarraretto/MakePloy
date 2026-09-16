import { useEffect, useId, useState } from 'react'
import { Check, Code2, Globe, MousePointer2, Sparkles } from 'lucide-react'

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

  const phraseIdx = Math.floor(tick / 12) % BRAIN_PHRASES.length
  const currentPhrase = BRAIN_PHRASES[phraseIdx]
  
  // The animation cycle is 12s, but the "Pesquisando" row fades out around 10s
  // and the checkmark finishes around 9s. To make the countdown hit 0 right 
  // when the checkmark appears, we accelerate it slightly.
  const tickInCycle = tick % 12
  const timeLeft = Math.max(0, Math.ceil(12 - (tickInCycle * (12 / 9))))

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
            .a-type-${safeId} { animation: aType-${safeId} 12s infinite cubic-bezier(.2,0,.2,1); }

            /* ── 2. CURSOR ── */
            @keyframes aCur-${safeId} {
              0%,1%  { transform:translateX(0); opacity:.9 }
              12%    { transform:translateX(128px); opacity:.9 }
              14%,83%{ opacity:0; transform:translateX(128px) }
              90%,100%{ opacity:0; transform:translateX(0) }
            }
            @keyframes aBlink-${safeId} { 0%,100%{opacity:.9} 50%{opacity:0} }
            .a-cur-${safeId} { animation: aCur-${safeId} 12s infinite ease-out, aBlink-${safeId} .65s infinite; }

            /* ── 3. SEND BUTTON ── */
            @keyframes aBtn-${safeId} {
              0%,1%  { opacity:0; transform:scale(.92) }
              3%,14% { opacity:1; transform:scale(1) }
              15%    { opacity:1; transform:scale(.9); filter:brightness(1.2) }
              16.5%  { opacity:1; transform:scale(1) }
              18%,83%{ opacity:0; transform:scale(.95) }
              90%,100%{ opacity:0 }
            }
            .a-btn-${safeId} { transform-origin:199px 24px; animation: aBtn-${safeId} 12s infinite cubic-bezier(.2,0,.2,1); }

            /* ── 4. MOUSE POINTER ── */
            @keyframes aMouse-${safeId} {
              0%,10% { opacity:0; transform:translate(215px,110px) }
              12%    { opacity:1; transform:translate(208px,70px) }
              15%    { opacity:1; transform:translate(199px,24px) scale(1) }
              15.5%  { opacity:1; transform:translate(199px,24px) scale(.85) }
              16.5%  { opacity:1; transform:translate(199px,24px) scale(1) }
              19%,100%{ opacity:0; transform:translate(199px,18px) }
            }
            .a-mouse-${safeId} { transform-origin:0 0; animation: aMouse-${safeId} 12s infinite cubic-bezier(.25,1,.5,1); }

            /* ── 5. CLICK RIPPLE ── */
            @keyframes aRipple-${safeId} {
              0%,15%   { r:0; opacity:0 }
              15.5%    { r:4px; opacity:.6 }
              18%      { r:16px; opacity:0 }
              19%,100% { r:0; opacity:0 }
            }
            .a-ripple-${safeId} { animation: aRipple-${safeId} 12s infinite ease-out; }

            /* ── 6. BUBBLE BOX (visible 1-83%) ── */
            @keyframes aBubble-${safeId} {
              0%     { opacity:0; transform:translateY(-4px) }
              1%,83% { opacity:1; transform:translateY(0) }
              90%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-bubble-${safeId} { animation: aBubble-${safeId} 12s infinite ease-out; }

            /* ── 7. ROW 2 (visible 21-83%) ── */
            @keyframes aR2-${safeId} {
              0%,17% { opacity:0; transform:translateY(8px) }
              21%,83%{ opacity:1; transform:translateY(0) }
              90%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-r2-${safeId} { animation: aR2-${safeId} 12s infinite cubic-bezier(.16,1,.3,1); }

            /* ── 8. ROW 3 (visible 26-83%) ── */
            @keyframes aR3-${safeId} {
              0%,22% { opacity:0; transform:translateY(8px) }
              26%,83%{ opacity:1; transform:translateY(0) }
              90%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-r3-${safeId} { animation: aR3-${safeId} 12s infinite cubic-bezier(.16,1,.3,1); }

            /* ── 9. ROW 4 / STATUS (visible 31-88%) ── */
            @keyframes aR4-${safeId} {
              0%,27% { opacity:0; transform:translateY(8px) }
              31%,85%{ opacity:1; transform:translateY(0) }
              92%,100%{ opacity:0; transform:translateY(-4px) }
            }
            .a-r4-${safeId} { animation: aR4-${safeId} 12s infinite cubic-bezier(.16,1,.3,1); }

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
            .a-w1-${safeId} { animation: aW1-${safeId} 12s infinite ease-in-out; }
            .a-w2-${safeId} { animation: aW2-${safeId} 12s infinite ease-in-out; }
            .a-w3-${safeId} { animation: aW3-${safeId} 12s infinite ease-in-out; }
            .a-w4-${safeId} { animation: aW4-${safeId} 12s infinite ease-in-out; }

            /* ── 11. PROGRESS RING (circ ≈ 50.3, synced with words) ── */
            @keyframes aRing-${safeId} {
              0%,30% { stroke-dashoffset:50.3 }
              42%    { stroke-dashoffset:37.7 }
              54%    { stroke-dashoffset:25.1 }
              66%    { stroke-dashoffset:12.6 }
              76%    { stroke-dashoffset:0 }
              100%   { stroke-dashoffset:0 }
            }
            .a-ring-${safeId} { animation: aRing-${safeId} 12s infinite ease-in-out; }

            /* Ring group fades when checkmark appears */
            @keyframes aRingFade-${safeId} {
              0%,76% { opacity:1 }
              79%    { opacity:0 }
              100%   { opacity:0 }
            }
            .a-ring-fade-${safeId} { animation: aRingFade-${safeId} 12s infinite ease-in-out; }

            /* ── 12. CHECKMARK POP (76-85%) ── */
            @keyframes aCheck-${safeId} {
              0%,76% { opacity:0; transform:translate(17px,164px) scale(0) }
              79%    { opacity:1; transform:translate(17px,164px) scale(1.2) }
              81%,85%{ opacity:1; transform:translate(17px,164px) scale(1) }
              89%    { opacity:0; transform:translate(17px,164px) scale(.85) }
              100%   { opacity:0; transform:translate(17px,164px) scale(0) }
            }
            .a-check-${safeId} { animation: aCheck-${safeId} 12s infinite cubic-bezier(.34,1.56,.64,1); }

            /* ── 13. LABEL SWAP: "Analisando" → "Concluído!" ── */
            @keyframes aLabelA-${safeId} {
              0%,76% { opacity:1 }
              79%    { opacity:0 }
              100%   { opacity:0 }
            }
            .a-labelA-${safeId} { animation: aLabelA-${safeId} 12s infinite ease-in-out; }

            @keyframes aLabelB-${safeId} {
              0%,76% { opacity:0; transform:translateY(3px) }
              79%    { opacity:1; transform:translateY(0) }
              85%    { opacity:1; transform:translateY(0) }
              89%    { opacity:0; transform:translateY(-2px) }
              100%   { opacity:0 }
            }
            .a-labelB-${safeId} { animation: aLabelB-${safeId} 12s infinite ease-in-out; }

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
  return (
    <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden="true">
      <rect x="10" y="10" width="220" height="130" rx="10" fill="white" stroke="#e2e8f0" />
      <path d="M10 31 H230" stroke="#e2e8f0" />
      <Sparkles x="20" y="16" width="9" height="9" color="#0284c7" />
      <text x="34" y="24" fontSize="9" fill="#475569">Da ideia à interface</text>
      <rect x="20" y="42" width="29" height="87" rx="4" fill="#f1f5f9" />
      {['#38bdf8', '#a5b4fc', '#fcd34d'].map((color, i) => <rect key={color} x="28" y={51 + i * 20} width="13" height="13" rx="4" fill={color} />)}
      <rect x="59" y="42" width="160" height="87" rx="4" fill="#f0f9ff" />
      <text x="71" y="57" fontSize="7" fontWeight="600" fill="#0284c7">SEU PROJETO</text>
      <text x="71" y="74" fontSize="10" fontWeight="700" fill="#0f172a">Uma ideia. Muitas formas.</text>
      <rect x="71" y="83" width="92" height="3" rx="1.5" fill="#bae6fd" />
      <rect x="71" y="91" width="69" height="3" rx="1.5" fill="#bae6fd" />
      <rect x="71" y="104" width="60" height="15" rx="4" fill="#0284c7" />
      <text x="101" y="114" textAnchor="middle" fontSize="7" fill="white">Começar agora</text>
      <rect x="66" y="63" width="148" height="17" fill="none" stroke="#38bdf8" strokeDasharray="3 2" />
      <MousePointer2 x="199" y="76" width="15" height="15" fill="#0284c7" color="white" />
    </svg>
  )
}

export function CodingMockup() {
  return (
    <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden="true">
      <rect x="10" y="10" width="220" height="27" rx="8" fill="white" stroke="#fbcfe8" />
      <Sparkles x="20" y="19" width="10" height="10" color="#db2777" />
      <text x="36" y="27" fontSize="9" fill="#475569">Crie uma tela de cadastro</text>
      <rect x="10" y="45" width="220" height="96" rx="9" fill="#18181b" />
      <Code2 x="20" y="54" width="10" height="10" color="#f9a8d4" />
      <text x="35" y="62" fontSize="8" fill="#d4d4d8">Sua ideia ganhando forma</text>
      <path d="M10 70 H230" stroke="#3f3f46" />
      <g fontFamily="monospace" fontSize="8">
        <text x="20" y="87" fill="#f9a8d4">{'<Cadastro>'}</text>
        <text x="27" y="101" fill="#c4b5fd">{'<Nome />'}</text>
        <text x="27" y="115" fill="#c4b5fd">{'<Email />'}</text>
        <text x="20" y="129" fill="#f9a8d4">{'</Cadastro>'}</text>
      </g>
      <rect x="126" y="79" width="94" height="54" rx="5" fill="white" />
      <text x="134" y="90" fontSize="7" fontWeight="600" fill="#27272a">Crie sua conta</text>
      <rect x="134" y="96" width="78" height="9" rx="2" fill="#f4f4f5" />
      <rect x="134" y="109" width="78" height="9" rx="2" fill="#f4f4f5" />
      <rect x="134" y="122" width="78" height="7" rx="2" fill="#ec4899" />
    </svg>
  )
}

export function DeployMockup() {
  return (
    <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden="true">
      <rect x="15" y="10" width="210" height="130" rx="10" fill="white" stroke="#e2e8f0" />
      <Globe x="27" y="22" width="13" height="13" color="#7c3aed" />
      <text x="46" y="32" fontSize="10" fontWeight="600" fill="#334155">Seu projeto no ar</text>
      <circle cx="207" cy="28" r="3" fill="#10b981" />
      <path d="M27 44 H213" stroke="#f1f5f9" />
      {['Preparação concluída', 'Verificações aprovadas', 'Publicação realizada'].map((step, i) => (
        <g key={step}>
          <circle cx="33" cy={58 + i * 21} r="7" fill="#ecfdf5" />
          <Check x="28" y={53 + i * 21} width="10" height="10" color="#059669" strokeWidth="2" />
          <text x="47" y={61 + i * 21} fontSize="9" fill="#475569">{step}</text>
        </g>
      ))}
      <rect x="27" y="117" width="186" height="16" rx="5" fill="#f5f3ff" />
      <text x="120" y="128" textAnchor="middle" fontSize="8" fontWeight="600" fill="#7c3aed">Pronto para receber seus visitantes</text>
    </svg>
  )
}

export { BrainMockup as ProjectsMockup }
export { VisualMockup as DocumentsMockup }
export { CodingMockup as AIMockup }
export { DeployMockup as ChatMockup }

