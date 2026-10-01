import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const between = (time: number, start: number, end: number) => {
  const progress = clamp((time - start) / (end - start))
  return progress * progress * (3 - 2 * progress)
}
const mix = (start: number, end: number, progress: number) => start + (end - start) * progress

export function useDesignPreviewAnimation() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const galleryViewportRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<SVGSVGElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const oldTitleRef = useRef<HTMLSpanElement>(null)
  const newTitleRef = useRef<HTMLSpanElement>(null)
  const collectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const gallery = galleryRef.current
    const galleryViewport = galleryViewportRef.current
    const cursor = cursorRef.current
    const logo = logoRef.current
    const oldTitle = oldTitleRef.current
    const newTitle = newTitleRef.current
    const collection = collectionRef.current
    if (!gallery || !galleryViewport || !cursor || !logo || !oldTitle || !newTitle || !collection) return

    const templates = Array.from(gallery.querySelectorAll<HTMLElement>('[data-design-template]'))
    const templateParts = Array.from(gallery.querySelectorAll<HTMLElement>('[data-template-part]'))
    const artworkParts = Array.from(collection.querySelectorAll<HTMLElement>('[data-artwork-part]'))
    const collectionViewport = collection.querySelector<HTMLElement>('[data-collection-viewport]')!
    const collectionCards = Array.from(collection.querySelectorAll<HTMLElement>('[data-project]'))
    const buildStatus = collection.querySelector<HTMLElement>('[data-build-status]')
    collection.dataset.reducedMotion = String(Boolean(prefersReducedMotion))
    collectionViewport.scrollTop = 0
    galleryViewport.scrollTop = 0

    if (prefersReducedMotion) {
      gallery.style.opacity = '0'
      cursor.style.opacity = '0'
      collection.style.opacity = '1'
      collection.style.setProperty('--assembly', '1')
      artworkParts.forEach(part => part.style.setProperty('--part-progress', '1'))
      if (buildStatus) buildStatus.textContent = 'Criado com MakePloy'
      oldTitle.style.opacity = '0'
      newTitle.style.opacity = '1'
      newTitle.style.transform = 'none'
      return
    }

    let frame = 0
    let startedAt: number | null = null
    const galleryDuration = 5150
    const gallerySlowdown = 2.2
    const galleryExtraTime = galleryDuration * (gallerySlowdown - 1)
    const removedGalleryPause = 8300 - galleryDuration
    const collectionStart = 11400
    const collectionSlowdown = 1.4
    const cycle = collectionStart + (27800 - collectionStart) * collectionSlowdown
      + galleryExtraTime - removedGalleryPause

    // Row offsets come from the rendered grids, so scrolling follows their actual size.
    const followRows = (viewport: HTMLElement, cards: HTMLElement[], time: number, firstBuild: number, interval: number, lead: number, columns = 3) => {
      const distance = Math.max(0, viewport.scrollHeight - viewport.clientHeight)
      let position = 0
      let previous = 0
      for (let index = columns; index < cards.length; index += columns) {
        const target = Math.min(distance, cards[index].offsetTop - cards[0].offsetTop)
        const rowStart = firstBuild + index * interval
        position += (target - previous) * between(time, rowStart - lead, rowStart)
        previous = target
      }
      return position
    }

    const animate = (now: number) => {
      startedAt ??= now
      const elapsed = (now - startedAt) % cycle
      // Allow more time to view the initial gallery, including its scrolling and pauses.
      const timeline = elapsed < galleryDuration * gallerySlowdown
        ? elapsed / gallerySlowdown
        : elapsed - galleryExtraTime + removedGalleryPause
      const time = timeline < collectionStart ? timeline
        : collectionStart + (timeline - collectionStart) / collectionSlowdown
      const reveal = between(time, 10700, 11400)
      const fadeOut = between(time, 26500, 27300)
      const resetting = time >= 26500

      gallery.style.opacity = String(1 - reveal * (1 - fadeOut))
      collection.style.opacity = String(reveal * (1 - fadeOut))
      templateParts.forEach(part => {
        const start = 350 + Number(part.dataset.buildDelay)
        part.style.setProperty('--part-progress', String(resetting ? 0 : between(time, start, start + 200)))
      })
      galleryViewport.scrollTop = resetting ? 0
        : followRows(galleryViewport, templates, time, 350, 550, 300, 2) * (1 - between(time, 4800, galleryDuration))

      artworkParts.forEach(part => {
        const start = 11400 + Number(part.dataset.buildDelay)
        part.style.setProperty('--part-progress', String(between(time, start, start + 260)))
      })
      collectionViewport.scrollTop = followRows(collectionViewport, collectionCards, time, 11400, 1100, 500, 2)
        * (1 - between(time, 22600, 25100))
      collection.style.setProperty('--assembly', String(between(time, 11400, 20200)))
      const status = time < 12200 ? 'Montando a estrutura…'
        : time < 13200 ? 'Compondo os textos…'
        : time < 19300 ? 'Construindo o visual…'
        : time < 20200 ? 'Refinando os detalhes…'
        : 'Criado com MakePloy'
      if (buildStatus && buildStatus.textContent !== status) buildStatus.textContent = status

      const logoClick = time >= 9000 && time < 9300
      const titleClick = time >= 10300 && time < 10600
      const menuOpen = between(time, 9300, 9600) * (1 - fadeOut)
      oldTitle.style.opacity = String(1 - menuOpen)
      newTitle.style.opacity = String(menuOpen)
      newTitle.style.transform = `translateY(${mix(-4, 0, menuOpen)}px) scale(${titleClick ? 0.96 : 1})`
      newTitle.style.boxShadow = titleClick ? 'inset 0 0 0 1px rgb(255 255 255 / 0.5)' : ''
      logo.style.transform = logoClick ? 'scale(1.5)' : 'scale(1.7)'

      // The only cursor interaction is with the fixed header.
      const cursorContainer = cursor.parentElement!
      const containerBounds = cursorContainer.getBoundingClientRect()
      const logoBounds = logo.getBoundingClientRect()
      const titleBounds = newTitle.getBoundingClientRect()
      const logoX = logoBounds.left - containerBounds.left - cursorContainer.clientLeft + logoBounds.width / 2 - 2
      const logoY = logoBounds.top - containerBounds.top - cursorContainer.clientTop + logoBounds.height / 2 - 1.5
      const titleX = titleBounds.left - containerBounds.left - cursorContainer.clientLeft + titleBounds.width / 2 - 2
      const titleY = titleBounds.top - containerBounds.top - cursorContainer.clientTop + titleBounds.height / 2 - 1.5
      const approach = between(time, 8300, 9000)
      const toTitle = between(time, 9650, 10200)
      cursor.style.left = `${mix(mix(logoX + 45, logoX, approach), titleX, toTitle)}px`
      cursor.style.top = `${mix(mix(logoY + 35, logoY, approach), titleY, toTitle)}px`
      cursor.style.opacity = String(between(time, 8300, 8550) * (1 - between(time, 10600, 10900)))
      cursor.style.transform = `scale(${logoClick || titleClick ? 0.86 : 1})`
      frame = window.requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(([entry]) => {
      window.cancelAnimationFrame(frame)
      if (entry.isIntersecting) {
        startedAt = null
        frame = window.requestAnimationFrame(animate)
      }
    })
    observer.observe(gallery)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [prefersReducedMotion])

  return { galleryRef, galleryViewportRef, cursorRef, logoRef, oldTitleRef, newTitleRef, collectionRef }
}
