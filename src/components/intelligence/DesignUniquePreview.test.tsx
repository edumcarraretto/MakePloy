import { act, cleanup, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { DesignUniquePreview } from './DesignUniquePreview'

const motion = vi.hoisted(() => ({ reduced: false }))
vi.mock('motion/react', () => ({ useReducedMotion: () => motion.reduced }))

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  motion.reduced = false
})

it('assembles both galleries, only clicks the header, scrolls and resets the loop', () => {
  let nextFrame: FrameRequestCallback = () => {}
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { nextFrame = callback; return 1 })
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  vi.stubGlobal('IntersectionObserver', class {
    private callback: IntersectionObserverCallback
    constructor(callback: IntersectionObserverCallback) { this.callback = callback }
    observe() { this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver) }
    disconnect() {}
  })
  const { container } = render(<DesignUniquePreview />)
  const title = container.querySelector<HTMLElement>('.design-preview-create')!
  const collection = container.querySelector<HTMLElement>('.makeploy-collection')!
  const collectionViewport = collection.querySelector<HTMLElement>('[data-collection-viewport]')!
  const cards = Array.from(collection.querySelectorAll<HTMLElement>('[data-project]'))
  expect(cards.map(card => card.dataset.project)).toEqual(['luma', 'nativa', 'maestro', 'aura', 'mana', 'lumi', 'pata', 'conexa'])
  Object.defineProperties(collectionViewport, { scrollHeight: { value: 560 }, clientHeight: { value: 140 } })
  cards.forEach((card, index) => Object.defineProperty(card, 'offsetTop', { value: Math.floor(index / 2) * 140 }))
  const cursor = container.querySelector<SVGElement>('svg.z-50')!
  vi.spyOn(title, 'getBoundingClientRect').mockReturnValue({ left: 30, top: 5, width: 200, height: 22 } as DOMRect)
  const advance = (elapsed: number) => {
    const timeline = elapsed < 11400 ? elapsed : 11400 + (elapsed - 11400) * 1.4
    act(() => nextFrame(elapsed <= 5150 ? elapsed * 2.2 : timeline + 3030))
  }
  const galleryViewport = container.querySelector<HTMLElement>('.design-template-viewport')!
  const templates = Array.from(container.querySelectorAll<HTMLElement>('[data-design-template]'))
  const templateParts = Array.from(container.querySelectorAll<HTMLElement>('[data-template-part]'))
  Object.defineProperties(galleryViewport, { scrollHeight: { value: 480 }, clientHeight: { value: 180 } })
  templates.forEach((card, index) => Object.defineProperty(card, 'offsetTop', { value: 12 + Math.floor(index / 2) * 120 }))
  expect(templates).toHaveLength(8)
  expect(container.querySelector('.design-preview-frame')).toBeNull()
  advance(0)
  expect(templateParts.every(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  advance(500)
  expect(templateParts.some(part => Number(part.style.getPropertyValue('--part-progress')) > 0)).toBe(true)
  expect(templateParts.some(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  expect(cursor.style.opacity).toBe('0')
  advance(2200)
  expect(galleryViewport.scrollTop).toBe(120)
  act(() => nextFrame(7200))
  expect(templateParts.some(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  expect(cursor.style.opacity).toBe('0')
  advance(4750)
  expect(templateParts.every(part => part.style.getPropertyValue('--part-progress') === '1')).toBe(true)
  expect(galleryViewport.scrollTop).toBe(300)
  expect(cursor.style.opacity).toBe('0')
  act(() => nextFrame(11450))
  expect(Number(cursor.style.opacity)).toBeGreaterThan(0)
  expect(galleryViewport.scrollTop).toBe(0)
  expect(collection.style.opacity).toBe('0')
  const logo = container.querySelector<HTMLImageElement>('img[src="/nova-logo-128.webp"]')!
  vi.spyOn(logo, 'getBoundingClientRect').mockReturnValue({ left: 8, top: 9, width: 14, height: 14 } as DOMRect)
  advance(9100)
  expect(galleryViewport.scrollTop).toBe(0)
  expect(cursor.style.left).toBe('13px')
  expect(cursor.style.top).toBe('14.5px')
  expect(cursor.style.transform).toBe('scale(0.86)')
  expect(collection.style.opacity).toBe('0')
  advance(9700)
  expect(title.style.opacity).toBe('1')
  expect(collection.style.opacity).toBe('0')
  advance(10450)
  expect(cursor.style.left).toBe('128px')
  expect(cursor.style.top).toBe('14.5px')
  expect(cursor.style.transform).toBe('scale(0.86)')
  expect(collection.style.opacity).toBe('0')
  advance(12100)
  expect(collection.style.opacity).toBe('1')

  expect(cards).toHaveLength(8)
  expect(cursor.style.opacity).toBe('0')
  const parts = Array.from(collection.querySelectorAll<HTMLElement>('[data-artwork-part]'))
  expect(parts).toHaveLength(192)
  expect(parts.some(part => Number(part.style.getPropertyValue('--part-progress')) > 0)).toBe(true)
  expect(parts.some(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  advance(13600)
  expect(collection.querySelector('[data-build-status]')).toHaveTextContent('Construindo o visual')
  expect(parts.some(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  expect(collectionViewport.scrollTop).toBe(140)
  advance(16200)
  expect(collectionViewport.scrollTop).toBe(280)
  expect(parts.slice(0, 72).every(part => part.style.getPropertyValue('--part-progress') === '1')).toBe(true)
  expect(parts.slice(144).every(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  advance(19600)
  expect(collectionViewport.scrollTop).toBe(420)
  expect(collection.querySelector('[data-build-status]')).toHaveTextContent('Refinando os detalhes')
  advance(20600)
  expect(parts.every(part => part.style.getPropertyValue('--part-progress') === '1')).toBe(true)
  expect(collection.querySelector('[data-build-status]')).toHaveTextContent('Criado com MakePloy')
  advance(25600)
  expect(collectionViewport.scrollTop).toBe(0)
  advance(27800 + 100)
  expect(collection.style.opacity).toBe('0')
  expect(title.style.opacity).toBe('0')
  expect(templateParts.every(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  expect(galleryViewport.scrollTop).toBe(0)
  expect(parts.every(part => part.style.getPropertyValue('--part-progress') === '0')).toBe(true)
  expect(collectionViewport.scrollTop).toBe(0)
})

it('shows the completed collection without moving the cursor when reduced motion is requested', () => {
  motion.reduced = true
  const { container } = render(<DesignUniquePreview />)
  expect(container.querySelector<HTMLElement>('.makeploy-collection')!.style.opacity).toBe('1')
  expect(container.querySelector('.makeploy-collection')).toHaveAttribute('data-reduced-motion', 'true')
  expect(container.querySelectorAll('[data-project]')).toHaveLength(8)

  expect(container.querySelector<SVGElement>('svg.z-50')!.style.opacity).toBe('0')
  expect(Array.from(container.querySelectorAll<HTMLElement>('[data-artwork-part]')).every(part => part.style.getPropertyValue('--part-progress') === '1')).toBe(true)
})
