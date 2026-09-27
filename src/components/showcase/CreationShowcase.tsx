import { motion } from 'motion/react'
import { allProjects } from '@/components/showcase/showcaseData'
import { ShowcaseCard } from '@/components/showcase/ShowcaseCard'

// ─── Component ────────────────────────────────────────────────────────────────

export function CreationShowcase() {
  // A sequência contínua (V, H, V, H, V, H, V, H) é definida pela iteração simples.
  // O MarqueeSet contém a sequência inteira. O pr-* final (padding-right) 
  // garante que o espaço até o início do loop repetido seja perfeitamente 
  // igual ao gap entre os cards internos, zerando as quebras de padrão.
  const MarqueeSet = () => (
    <div className="flex h-full shrink-0 gap-4 sm:gap-5 md:gap-6 pr-4 sm:pr-5 md:pr-6">
      {allProjects.map((project, index) => (
        <ShowcaseCard 
          key={project.id} 
          project={project} 
          layout={index % 2 === 0 ? 'vertical' : 'horizontal'}
        />
      ))}
    </div>
  )

  return (
    <section
      className="relative py-14 sm:py-20"
      aria-labelledby="showcase-heading"
    >
      <h2 id="showcase-heading" className="sr-only">
        Possibilidades de produtos construídos dentro da MAKEPLOY
      </h2>

      {/* Scoped styles & Animations */}
      <style>{`
        .showcase-card {
          transition: transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }
        @media (hover: hover) {
          .showcase-card:hover {
            transform: scale(1.02);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
            z-index: 20;
          }
        }
        @keyframes showcase-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-showcase-marquee {
          animation: showcase-marquee 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-showcase-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>

      {/* ── Gallery container ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-4 sm:mx-6 md:mx-10 lg:mx-16"
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(380px, 46vw, 580px)',
            borderRadius: '20px',
          }}
        >
          {/* Track infinito puro (sem Javascript), com 2 sets duplicados para loop contínuo */}
          <div className="flex h-full w-max animate-showcase-marquee">
            <MarqueeSet />
            <MarqueeSet />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
