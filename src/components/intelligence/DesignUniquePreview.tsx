import { MakeployCollection } from './MakeployCollection'
import { DesignTemplateGallery } from '@/components/intelligence/DesignTemplateGallery'

import { useDesignPreviewAnimation } from '@/components/intelligence/useDesignPreviewAnimation'
import './DesignUniquePreview.css'
import './DesignStorefronts.css'

export function DesignUniquePreview() {
  const { galleryRef, galleryViewportRef, cursorRef, logoRef, oldTitleRef, newTitleRef, collectionRef } = useDesignPreviewAnimation()
  return (
    <div role="img" aria-label="Demonstração: a galeria Outras plataformas se monta por partes. O cursor clica na logo e em Criar com a MakePloy; oito artes com identidade própria se montam em uma nova coleção com rolagem." className="relative flex h-[220px] w-full shrink-0 flex-col overflow-hidden rounded-xl border border-white/[0.12] bg-neutral-950 shadow-[0_12px_26px_-8px_rgba(0,0,0,0.85)]">
      <div aria-hidden="true" className="relative z-40 flex h-8 w-full shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-2">
        <div className="relative flex shrink-0 items-center justify-center pl-0.5">
          <img ref={logoRef} src="/nova-logo-128.webp" alt="" className="h-[14px] w-[14px] object-contain scale-[1.7] origin-center transition-transform" />
        </div>
        <span className="relative flex h-[22px] min-w-0 flex-1 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 px-2 shadow-inner overflow-hidden">
          <span ref={oldTitleRef} className="absolute inset-0 flex items-center justify-center truncate text-[8px] font-medium tracking-[0.01em] text-neutral-600 transition-none">Outras plataformas</span>
          <span ref={newTitleRef} className="design-preview-create absolute inset-0 flex items-center justify-center gap-1.5 whitespace-nowrap text-[9px] font-semibold text-white opacity-0 transition-none">
            <svg viewBox="0 0 16 16" className="h-[10px] w-[10px] shrink-0 text-zinc-200" fill="currentColor">
              <path d="m7 1 1.6 4.4L13 7l-4.4 1.6L7 13 5.4 8.6 1 7l4.4-1.6L7 1Zm6 9 .8 2.2L16 13l-2.2.8L13 16l-.8-2.2L10 13l2.2-.8L13 10Z" />
            </svg>
            <span>Criar com a</span>
            <span aria-label="MakePloy" className="inline-flex text-[10px] font-black tracking-[-0.04em]">
              {[
                ['M', '#168cff'], ['A', '#ff2d55'], ['K', '#facc15'], ['E', '#22c55e'],
                ['P', '#168cff'], ['L', '#ff2d55'], ['O', '#facc15'], ['Y', '#22c55e'],
              ].map(([letter, color], index) => (
                <span key={index} aria-hidden="true" style={{ color }}>{letter}</span>
              ))}
            </span>
          </span>
        </span>
      </div>
    <div className="relative min-h-0 w-full flex-1 overflow-hidden">
    <DesignTemplateGallery galleryRef={galleryRef} galleryViewportRef={galleryViewportRef} />
    <MakeployCollection collectionRef={collectionRef} />

    </div>
    <svg ref={cursorRef} aria-hidden="true" viewBox="0 0 24 27" style={{ transformOrigin: '2px 1.5px' }} className="pointer-events-none absolute z-50 h-[27px] w-6 opacity-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.45)]">
      <path d="M2 1.5v21l5.3-5.2 4.1 8 3.2-1.6-4.1-7.9 7.4-1.2L2 1.5Z" fill="white" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    </div>
  )
}
