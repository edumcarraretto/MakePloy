import type { CSSProperties, RefObject } from 'react'
import { designTemplates } from '@/components/intelligence/designTemplatesData'
import { PlatformReferenceMark } from '@/components/intelligence/PlatformReferenceMark'

type DesignTemplateGalleryProps = {
  galleryRef: RefObject<HTMLDivElement | null>
  galleryViewportRef: RefObject<HTMLDivElement | null>
}

export function DesignTemplateGallery({ galleryRef, galleryViewportRef }: DesignTemplateGalleryProps) {
  return (
    <div ref={galleryRef} aria-hidden="true" className="design-template-gallery absolute inset-0 flex flex-col overflow-hidden bg-neutral-950">
      <div ref={galleryViewportRef} className="design-template-viewport min-h-0 flex-1 overflow-hidden px-3">
        <div className="relative grid grid-cols-2 gap-2 pb-3 pt-3">
          {designTemplates.slice(0, 8).map((template, index) => (
            <div key={template.layout} data-design-template className="design-template-assembly">
              {Array.from({ length: 6 }, (_, partIndex) => (
                <div key={partIndex} data-template-part data-build-delay={index * 550 + partIndex * 65}
                  className={`design-template design-template-part design-template--${template.layout}`}
                  style={{
                    clipPath: `inset(${Math.floor(partIndex / 2) * 100 / 3}% ${partIndex % 2 === 0 ? 50 : 0}% ${(2 - Math.floor(partIndex / 2)) * 100 / 3}% ${partIndex % 2 === 0 ? 0 : 50}%)`,
                    '--part-x': partIndex % 2 === 0 ? '-5px' : '5px',
                    '--part-y': '4px',
                  } as CSSProperties}>
              <div className="design-template-art">
                <div className="design-template-nav"><span>{template.brand}</span><span className="design-template-menu">Loja · Sobre</span></div>
                <img className="design-template-photo" src={template.image} alt="" loading="eager" decoding="async" />
                <div className="design-template-copy"><small>{template.category}</small><span>{template.headline}</span><strong>{template.price}</strong><b>Comprar agora ↗</b></div>
                <div className="design-template-trust">Compra segura · Envio para todo o Brasil</div>
              </div>
              <div className="design-template-caption">
                <span className="flex min-w-0 items-center gap-1">
                  <span className="flex shrink-0 items-center justify-center"><PlatformReferenceMark platform={template.platform} size={14} /></span>
                  <span>{template.name}</span>
                </span>
                <span className="design-template-number">{String(index + 1).padStart(2, '0')}</span>

              </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
