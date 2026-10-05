import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimationControls } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { openEarlyAccess } from '@/lib/earlyAccess'
import { AnimatedText } from '@/components/text/AnimatedText'

// ─── Section ─────────────────────────────────────────────────────────────────

export function WorkflowHeroSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  // margin: '-100px 0px' means the element must be at least 100px
  // inside the viewport before it counts as "in view"
  const isInView = useInView(imageRef, { once: true, margin: '-100px 0px -100px 0px' })
  const controls = useAnimationControls()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-20 sm:pt-28 md:pt-32 pb-20 sm:pb-28 md:pb-36">

        {/* ── Eyebrow ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm sm:text-[15px] font-medium text-neutral-900 tracking-tight italic mb-5 sm:mb-6"
        >
          Da primeira faísca à próxima versão
        </motion.p>

        {/* ── Headline ── */}
        <motion.h2
          id="workflow-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-center text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.25rem] font-extrabold text-black leading-[0.95] tracking-[-0.03em] mb-6 sm:mb-8 md:mb-10"
        >
          Uma ideia. O caminho{' '}
          <AnimatedText text="inteiro." />
        </motion.h2>

        {/* ── Subtitle with inline avatars ── */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="text-center text-lg sm:text-xl md:text-[1.4rem] font-medium text-neutral-900 leading-[1.55] max-w-lg mx-auto mb-8 sm:mb-10 md:mb-12"
        >
          Entender, validar, dar forma, construir, publicar e evoluir — tudo continua no mesmo projeto.
        </motion.p>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex justify-center mb-16 sm:mb-20 md:mb-24"
        >
          <a
            href="#comece"
            onClick={(e) => {
              e.preventDefault()
              openEarlyAccess('workflow')
            }}
            className="
              group inline-flex items-center gap-2
              px-7 py-3 sm:px-8 sm:py-3.5
              bg-black text-white text-sm sm:text-[15px] font-bold
              rounded-full
              hover:bg-neutral-800
              active:scale-[0.97]
              transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
              cursor-pointer
            "
          >
            Explorar automações
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* ── Animated Automation Flow Image (reveal on scroll) ── */}
        <div ref={imageRef} className="flex justify-center -mx-6 sm:mx-0 overflow-hidden">
          <div className="relative w-full max-w-[720px] md:max-w-[740px] flex justify-center">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
              }}
              transition={{
                duration: 7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full flex justify-center"
            >
              <img
                src="/images/automation-flow-mobile.webp"
                alt="Fluxo de automação entre pessoas e agentes: uma versão é publicada, operar e evoluir"
                width={1024}
                height={649}
                className="w-full max-w-[720px] md:max-w-[740px] h-auto block mx-auto object-contain select-none"
                decoding="async"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}
