import { motion } from 'motion/react'
import { HighlightText } from '@/components/text/HighlightText'
import { MobileProblemImageCarousel } from '@/components/problem/MobileProblemImageCarousel'

export function ProblemSection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white dark:bg-neutral-950 w-full flex flex-col items-center overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-16 text-neutral-900 dark:text-white tracking-tight px-2 leading-[1.25]"
        >
          Uma ideia. Muitos caminhos.{' '}
          <br className="hidden sm:inline" />
          <HighlightText variant="coral">Uma direção.</HighlightText>
        </motion.h2>

        {/* Desktop Image Container (hidden on mobile, visible on md+) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:block w-full"
        >
          <img 
            src="/images/novaimagem-v2-2048.webp"
            alt="Como um projeto perde continuidade: contexto disperso, decisões repetidas e retrabalho crescente"
            loading="lazy"
            decoding="async"
            width={2480}
            height={709}
            draggable={false}
            className="w-full h-auto object-contain select-none"
            style={{ imageRendering: 'auto', maxWidth: '100%' }}
          />
        </motion.div>

        {/* Mobile Carousel framing the original image (visible on mobile, hidden on md+) */}
        <div className="block md:hidden w-full">
          <MobileProblemImageCarousel />
        </div>

      </div>
    </section>
  )
}
