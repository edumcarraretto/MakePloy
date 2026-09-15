import { useState, useRef } from 'react'

// Offset exatos para dividir a imagem em 3 partes perfeitas
const OFFSETS = [0, 33.333, 66.666]

export function MobileProblemImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const slideWidth = container.offsetWidth
    const newIndex = Math.round(container.scrollLeft / slideWidth)
    setActiveIndex(Math.min(Math.max(newIndex, 0), OFFSETS.length - 1))
  }

  const goToSlide = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    container.scrollTo({ left: container.offsetWidth * index, behavior })
    setActiveIndex(index)
  }

  return (
    <section className="w-full flex flex-col items-center gap-3" aria-label="Etapas do projeto">
      {/* ── Horizontal Snap Slider ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="slider"
        aria-valuemin={1}
        aria-valuemax={OFFSETS.length}
        aria-valuenow={activeIndex + 1}
        aria-orientation="horizontal"
        aria-label={`Etapa ${activeIndex + 1} de ${OFFSETS.length}`}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') goToSlide(Math.max(0, activeIndex - 1))
          if (event.key === 'ArrowRight') goToSlide(Math.min(OFFSETS.length - 1, activeIndex + 1))
        }}
        className="w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {OFFSETS.map((offset, index) => (
          <div
            key={index}
            className="w-full shrink-0 snap-center"
          >
            {/* Image Frame: displays exact third of the original image */}
            <div className="relative w-full overflow-hidden flex items-center" style={{ aspectRatio: '1.15 / 1' }}>
              <img
                src="/images/diagrama-problem-v3.svg"
                alt={`Etapa ${index + 1} de 3`}
                width={2480}
                height={709}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute top-0 bottom-0 h-full w-[300%] max-w-none object-cover select-none pointer-events-none transition-transform duration-300 antialiased"
                style={{
                  left: '0%',
                  transform: `translateX(-${offset}%) translateZ(0)`,
                  backfaceVisibility: 'hidden',
                  imageRendering: 'high-quality',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Minimal dots indicator ── */}
      <div className="flex items-center gap-1.5">
        {OFFSETS.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Mostrar etapa ${i + 1}`}
            aria-current={activeIndex === i ? 'true' : undefined}
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={`rounded-full transition-all duration-300 ${activeIndex === i ? 'w-5 h-1.5 bg-blue-600' : 'w-1.5 h-1.5 bg-neutral-400'}`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
