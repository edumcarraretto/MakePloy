import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'

const pills = [
  {
    label: 'E-book',
    colors: ['#FDE047', '#FACC15'],
    position: 'left-[6%] top-[14%] w-[48%] -rotate-[9deg]',
  },
  {
    label: 'Landing Page',
    colors: ['#FBBF24', '#F59E0B'],
    position: 'right-[0%] top-[15%] w-[43%] rotate-[8deg]',
  },
  {
    label: 'Site',
    colors: ['#F472B6', '#EC4899'],
    position: 'left-[7%] top-[43%] w-[82%] -rotate-[5deg] z-10',
    featured: true,
  },
  {
    label: 'Curso',
    colors: ['#60A5FA', '#3B82F6'],
    position: 'left-[5%] bottom-[2%] w-[45%] rotate-[8deg]',
  },
  {
    label: 'Comunidade',
    colors: ['#38BDF8', '#0EA5E9'],
    position: 'right-[4%] bottom-[6%] w-[43%] -rotate-[7deg]',
  },
]

const extraLabels = [
  'Área de membros', 'Loja', 'Marketplace', 'Aplicação',
  'Portal', 'SaaS', 'Plataforma',
]

const gradients = [
  ...pills.map((pill) => pill.colors),
  ['#FB923C', '#F97316'],
  ['#A78BFA', '#8B5CF6'],
  ['#6EE7B7', '#34D399'],
]

export function NoCodeBuilderPreview() {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3 })
  const [rotation, setRotation] = useState(() => ({
    visible: pills.map((pill) => pill.label),
    colors: pills.map((_, index) => index),
    waiting: extraLabels,
    slot: 0,
  }))

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    const timer = window.setInterval(() => {
      setRotation(({ visible, colors, waiting, slot }) => {
        // Exclude the outgoing color too, since both balloons overlap during the transition.
        const nextColor = gradients
          .map((_, offset) => (colors[slot] + offset + 1) % gradients.length)
          .find((color) => !colors.includes(color)) ?? colors[slot]

        return {
          visible: visible.map((label, index) => index === slot ? waiting[0] : label),
          colors: colors.map((color, index) => index === slot ? nextColor : color),
          waiting: [...waiting.slice(1), visible[slot]],
          slot: (slot + 1) % pills.length,
        }
      })
    }, 2800)

    return () => window.clearInterval(timer)
  }, [isInView, prefersReducedMotion])

  return (
    <div ref={containerRef} className="relative mx-auto h-full w-full max-w-[380px]">
      {pills.map((pill, i) => {
        const [surface, accent] = gradients[rotation.colors[i]]

        return (
        <div key={pill.label} className={`absolute flex items-center justify-center min-w-0 ${pill.featured ? 'h-12 sm:h-14' : 'h-10 sm:h-11'} ${pill.position}`}>
            <AnimatePresence initial={false}>
              <motion.div
                key={rotation.visible[i]}
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 30,
                  rotate: prefersReducedMotion ? 0 : -5,
                  scale: prefersReducedMotion ? 1 : 0.84,
                  filter: prefersReducedMotion ? 'blur(0px)' : 'blur(2px)',
                }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : -28,
                  rotate: prefersReducedMotion ? 0 : 5,
                  scale: prefersReducedMotion ? 1 : 0.88,
                  filter: prefersReducedMotion ? 'blur(0px)' : 'blur(2px)',
                  transition: { duration: prefersReducedMotion ? 0 : 0.38, ease: [0.4, 0, 1, 1] },
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  ease: [0.18, 0.9, 0.25, 1.18],
                  opacity: { duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' },
                  filter: { duration: prefersReducedMotion ? 0 : 0.3 },
                }}
                style={{ background: `linear-gradient(to right, ${surface}, ${accent})` }}
                className={`absolute h-full w-max px-6 sm:px-8 whitespace-nowrap flex items-center justify-center rounded-full text-center font-semibold leading-tight text-black shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] ${pill.featured ? 'text-lg tracking-wide ring-1 ring-white/20 sm:text-xl md:text-lg lg:text-xl' : rotation.visible[i].length > 10 ? 'text-[11px] md:text-[9px] lg:text-[11px]' : 'text-[13px] md:text-[10px] lg:text-[13px]'}`}
              >
                {rotation.visible[i]}
              </motion.div>
            </AnimatePresence>
        </div>
        )
      })}
    </div>
  )
}
