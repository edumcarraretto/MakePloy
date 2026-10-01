import type { CSSProperties, RefObject } from 'react'
import { allProjects } from '@/components/showcase/showcaseData'
import './MakeployCollection.css'

// Non-overlapping regions reconstruct the original artwork without changing it.
function region(top: number, left: number, bottom: number, right: number, x: number, y: number) {
  return { clip: `inset(${top}% ${100 - right}% ${100 - bottom}% ${left}%)`, x: `${x}px`, y: `${y}px` }
}

// Header details, title lines, image fragments, then the lower content and CTAs.
// These 24 regions cover the artwork exactly, with no missing or overlapping areas.
const artworkParts = [
  ...Array.from({ length: 4 }, (_, col) => region(0, col * 25, 14, (col + 1) * 25, 0, -6)),
  ...Array.from({ length: 4 }, (_, row) => region(14 + row * 14.5, 0, 14 + (row + 1) * 14.5, 42, -7, 0)),
  ...Array.from({ length: 12 }, (_, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    return region(14 + row * 14.5, 42 + col * (58 / 3), 14 + (row + 1) * 14.5, 42 + (col + 1) * (58 / 3), 5, 4)
  }),
  ...Array.from({ length: 4 }, (_, col) => region(72, col * 25, 100, (col + 1) * 25, 0, 7)),
]

export function MakeployCollection({ collectionRef }: {
  collectionRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div ref={collectionRef} className="makeploy-collection" aria-hidden="true">
      <div className="makeploy-collection-heading"><span>MAKEPLOY STUDIO</span><span>COLEÇÃO EXCLUSIVA · 08</span></div>
      <div className="makeploy-collection-viewport" data-collection-viewport>
      <div className="makeploy-collection-stage">
        {allProjects.map((project, index) => (
          <div key={project.id} className="makeploy-masterpiece" data-project={project.id}>
            <div className="makeploy-artwork-surface">
            <div className="makeploy-artwork" style={{ '--artwork-ratio': project.width / project.height } as CSSProperties}>
            {artworkParts.map((part, partIndex) => (
              <img
                key={partIndex}
                className="makeploy-artwork-part"
                data-artwork-part
                data-build-delay={index * 1100 + partIndex * 35}
                src={project.image}
                alt=""
                width={project.width}
                height={project.height}
                decoding="async"
                style={{ clipPath: part.clip, '--part-x': part.x, '--part-y': part.y } as CSSProperties}
              />
            ))}
            </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="makeploy-collection-footer"><span className="makeploy-collection-dot" /><span data-build-status>Criando com MakePloy</span><span>Identidade em cada detalhe.</span></div>
    </div>
  )
}
