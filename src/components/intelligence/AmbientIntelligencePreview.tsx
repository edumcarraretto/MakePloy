import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function AnimatedRow({
  phrases,
  intervalDelay,
  markerColor,
  bgClass,
  blurClass,
  targetOpacity,
  textColor,
  indentClass,
}: {
  phrases: string[]
  intervalDelay: number
  markerColor: string
  bgClass: string
  blurClass: string
  targetOpacity: number
  textColor: string
  indentClass: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, intervalDelay)
    return () => clearInterval(timer)
  }, [intervalDelay, phrases.length])

  return (
    <div className={`h-[26px] ${indentClass} flex items-center`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: targetOpacity, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`inline-flex items-center gap-2 px-2 py-1 rounded-[4px] ${bgClass} ${blurClass}`}
        >
          <div className={`w-[7px] h-[7px] shrink-0 ${markerColor}`} />
          <span className={`text-[13px] font-medium tracking-tight ${textColor}`}>
            {phrases[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function AmbientIntelligencePreview() {
  return (
    <div className="relative w-full max-w-[310px] mx-auto mt-4 pb-2 flex flex-col select-none">
      
      {/* ── 1. MAIN PILL (EXACT STADIUM/CAPSULE MATCH TO REFERENCE) ── */}
      <div className="relative w-full h-[52px] rounded-full bg-black border border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.8)] overflow-hidden mb-5 flex items-center justify-between px-5">
        
        {/* Brilho suave com as cores da marca */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.85]"
          style={{
            background: 'var(--gradient-brand)',
            maskImage: 'linear-gradient(90deg, black 0%, black 18%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 18%, transparent 100%)',
          }}
        />

        {/* Left Side: Crisp 8-spoke Spinner + Text */}
        <div className="relative z-10 flex items-center gap-3.5 min-w-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 shrink-0 text-[#d4d4d8]"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="8" y1="2" x2="8" y2="4.5" opacity="1.0" />
              <line x1="12.24" y1="3.76" x2="10.47" y2="5.53" opacity="0.85" />
              <line x1="14" y1="8" x2="11.5" y2="8" opacity="0.7" />
              <line x1="12.24" y1="12.24" x2="10.47" y2="10.47" opacity="0.55" />
              <line x1="8" y1="14" x2="8" y2="11.5" opacity="0.4" />
              <line x1="3.76" y1="12.24" x2="5.53" y2="10.47" opacity="0.3" />
              <line x1="2" y1="8" x2="4.5" y2="8" opacity="0.2" />
              <line x1="3.76" y1="3.76" x2="5.53" y2="5.53" opacity="0.15" />
            </svg>
          </motion.div>

          <span className="text-[13.5px] font-medium text-white tracking-tight truncate">
            Preparando sugestões
          </span>
        </div>

        {/* Logo oficial da MakePloy */}
        <div className="relative z-10 shrink-0 ml-3 flex items-center justify-center">
          <img src="/nova-logo-128.webp" alt="" width="24" height="24" className="h-6 w-6 object-contain" />
        </div>
      </div>

      {/* ── 2. CONTEXTUAL SUGGESTIONS (ANIMATED LIVE LOOP) ── */}
      <div className="flex flex-col items-start gap-2.5 w-full">
        
        {/* Row 1 — Solid, purple square */}
        <AnimatedRow 
          phrases={[
            "Trocar as cores da página",
            "Criar uma versão pro celular",
            "Resumir a descrição do produto"
          ]}
          intervalDelay={3500}
          targetOpacity={1}
          markerColor="bg-blue-500"
          bgClass="border border-white/[0.08] rounded-md"
          blurClass=""
          textColor="text-white/90"
          indentClass="ml-0"
        />

        {/* Row 2 — Solid, teal square, indented */}
        <AnimatedRow 
          phrases={[
            "Ajustar o site para buscas no Google",
            "Ver o que os concorrentes fazem",
            "Sugerir novas imagens"
          ]}
          intervalDelay={4600}
          targetOpacity={0.85}
          markerColor="bg-[#0d9488]"
          bgClass="border border-white/[0.08] rounded-md"
          blurClass=""
          textColor="text-white/90"
          indentClass="ml-[36px]"
        />

        {/* Row 3 — Blurred, purple square */}
        <AnimatedRow 
          phrases={[
            "Conectar o domínio do site",
            "Agendar a publicação"
          ]}
          intervalDelay={5200}
          targetOpacity={0.4}
          markerColor="bg-blue-700"
          bgClass=""
          blurClass="blur-[1.5px]"
          textColor="text-white/70"
          indentClass="ml-0"
        />

        {/* Row 4 — Heavily blurred, blue square, indented */}
        <AnimatedRow 
          phrases={[
            "Adicionar ícones e favicon",
            "Preparar posts para redes sociais"
          ]}
          intervalDelay={6100}
          targetOpacity={0.15}
          markerColor="bg-[#3b82f6]"
          bgClass=""
          blurClass="blur-[2.5px]"
          textColor="text-white/40"
          indentClass="ml-[36px]"
        />

      </div>
    </div>
  )
}
