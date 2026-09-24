import { motion } from 'motion/react'
import type { CreationPillar } from '@/components/creation/creationData'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechnologyPillarCardProps {
  pillar: CreationPillar
  index: number
  children: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TechnologyPillarCard({
  pillar,
  index,
  children,
}: TechnologyPillarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: 0.12 * index, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-[22px] sm:rounded-[26px] border border-white/[0.08] bg-black hover:border-white/[0.16] shadow-[0_12px_36px_-10px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300"
    >
      {/* Top subtle surface highlight / glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgb(255 255 255 / 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col h-full p-5 sm:p-6 md:p-6 z-10">
        {/* Eyebrow / Headline */}
        <h3
          className={`text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] ${pillar.eyebrowColor} mb-2.5`}
        >
          {pillar.eyebrow}
        </h3>

        {/* Description */}
        <p className="text-[13px] sm:text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
          {pillar.description}
        </p>

        {/* Mini-interface preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.45, delay: 0.2 + 0.1 * index }}
          className={`mt-auto h-[190px] sm:h-[210px] md:h-[220px] ${
            pillar.id === 'no-code'
              ? '-mx-5 -mb-5 sm:-mx-6 sm:-mb-6 overflow-visible'
              : 'rounded-[16px] overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300'
          }`}
        >
          {children}
        </motion.div>
      </div>
    </motion.article>
  )
}
