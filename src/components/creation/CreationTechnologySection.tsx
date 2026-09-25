import { motion } from 'motion/react'
import { FaApple, FaWindows, FaGooglePlay } from 'react-icons/fa'
import { creationPillars } from '@/components/creation/creationData'
import { TechnologyPillarCard } from '@/components/creation/TechnologyPillarCard'
import { NoCodeBuilderPreview } from '@/components/creation/NoCodeBuilderPreview'
import { VisualToCodePreview } from '@/components/creation/VisualToCodePreview'
import { IntegratedCodeEditorPreview } from '@/components/creation/IntegratedCodeEditorPreview'
import { CreationShowcase } from '@/components/showcase/CreationShowcase'
import { GradientText } from '@/components/text/GradientText'

// ─── Preview registry ─────────────────────────────────────────────────────────

const PILLAR_PREVIEWS: Record<string, React.ReactNode> = {
  'no-code': <NoCodeBuilderPreview />,
  ai: <VisualToCodePreview />,
  code: <IntegratedCodeEditorPreview />,
}


// ─── Section ──────────────────────────────────────────────────────────────────

export function CreationTechnologySection() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="creation-heading"
      className="relative w-full bg-white"
    >
      {/* Main dark area — inset card (top half, connects with MAKEPLOY section below) */}
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 relative bg-black rounded-t-[24px] sm:rounded-t-[32px] overflow-hidden">

        {/* ── Header ──────────────────────────────── */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 pt-14 pb-14 sm:pt-20 sm:pb-20 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3.5 sm:gap-4 mb-8 sm:mb-10"
          >
            <img
              src="/nova-logo-128.webp"
              alt="MAKEPLOY"
              width={512}
              height={512}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-md"
            />
            <span className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-white tracking-tight leading-none">
              MAKEPLOY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="creation-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight"
          >
            Visual por escolha.
            <br className="hidden sm:block" />{' '}
            <GradientText inverse className="font-bold">
              Código por controle.
            </GradientText>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed"
          >
            Comece pela interface. Use IA para avançar. Abra o IDE quando precisar de profundidade.
          </motion.p>

          {/* Tech badges line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            role="group"
            aria-label="Plataformas disponíveis"
          >
            <span className="text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-[0.18em] mr-2">
              O PROJETO ACOMPANHA VOCÊ
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-[0.18em]">
              <FaApple className="text-sm" /> MACOS
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-[0.18em]">
              <FaApple className="text-sm" /> IOS
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-[0.18em]">
              <FaWindows className="text-sm" /> WINDOWS
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-[0.18em]">
              <FaGooglePlay className="text-sm" /> ANDROID
            </span>
          </motion.div>
        </div>

        {/* ── Cards grid ──────────────────────────── */}
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {creationPillars.map((pillar, i) => (
              <TechnologyPillarCard
                key={pillar.id}
                pillar={pillar}
                index={i}
              >
                {PILLAR_PREVIEWS[pillar.id]}
              </TechnologyPillarCard>
            ))}
          </div>
        </div>

        {/* ── Creation Showcase (design gallery) ── */}
        <CreationShowcase />
      </div>
    </section>
  )
}
