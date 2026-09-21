import { act, fireEvent, render, cleanup } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ToolsSection } from './ToolsSection'

const environment = vi.hoisted(() => ({ visible: true, reducedMotion: false }))

vi.mock('motion/react', async (importOriginal) => ({
  ...await importOriginal<typeof import('motion/react')>(),
  useInView: () => environment.visible,
  useReducedMotion: () => environment.reducedMotion,
}))

vi.mock('./FeaturedMockups', () => {
  const Preview = ({ isPlaying }: { isPlaying: boolean }) => <span data-playing={isPlaying} />
  const CodingPreview = ({ isPlaying, onComplete }: { isPlaying: boolean; onComplete: () => void }) => (
    <span role="button" tabIndex={0} data-playing={isPlaying} onClick={onComplete} onKeyDown={onComplete}>Complete code</span>
  )
  return { ProjectsMockup: Preview, DocumentsMockup: Preview, AIMockup: CodingPreview, ChatMockup: Preview }
})

function desktopCards(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLButtonElement>('.featured-tool-card')).slice(0, 4)
}

function playing(cards: HTMLButtonElement[]) {
  return cards.filter((card) => card.querySelector('[data-playing="true"]'))
}

describe('featured card playback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    environment.visible = true
    environment.reducedMotion = false
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('plays one demonstration, holds its result, then advances through all four cards', () => {
    const { container } = render(<ToolsSection />)
    const cards = desktopCards(container)
    expect(playing(cards)).toEqual([cards[0]])
    act(() => vi.advanceTimersByTime(9700))
    expect(playing(cards)).toHaveLength(0)
    expect(cards[0]).toHaveAttribute('data-featured-focus', 'true')
    act(() => vi.advanceTimersByTime(999))
    expect(cards[0]).toHaveAttribute('data-featured-focus', 'true')
    act(() => vi.advanceTimersByTime(1))
    expect(playing(cards)).toEqual([cards[1]])
    act(() => vi.advanceTimersByTime(12000))
    expect(playing(cards)).toHaveLength(0)
    act(() => vi.advanceTimersByTime(999))
    expect(cards[1]).toHaveAttribute('data-featured-focus', 'true')
    act(() => vi.advanceTimersByTime(1))
    expect(playing(cards)).toEqual([cards[2]])
    // Coding waits for actual completion, regardless of typing duration.
    act(() => vi.advanceTimersByTime(15000))
    expect(playing(cards)).toEqual([cards[2]])
    fireEvent.click(cards[2].querySelector('span[data-playing]')!)
    act(() => vi.advanceTimersByTime(999))
    expect(cards[2]).toHaveAttribute('data-featured-focus', 'true')
    act(() => vi.advanceTimersByTime(1))
    expect(playing(cards)).toEqual([cards[3]])
    act(() => vi.advanceTimersByTime(10800))
    act(() => vi.advanceTimersByTime(1000))
    expect(playing(cards)).toEqual([cards[0]])
  })

  it('gives a clicked card immediate priority and stops the previous demonstration', () => {
    const { container } = render(<ToolsSection />)
    const cards = desktopCards(container)
    fireEvent.click(cards[3])
    expect(playing(cards)).toEqual([cards[3]])
    expect(cards[3]).toHaveAttribute('aria-pressed', 'true')
    expect(cards[0]).toHaveAttribute('aria-pressed', 'false')
  })

  it('holds keyboard focus until the user leaves the card', () => {
    const { container } = render(<ToolsSection />)
    const cards = desktopCards(container)
    vi.spyOn(cards[1], 'matches').mockReturnValue(true)
    fireEvent.focus(cards[1])
    act(() => vi.advanceTimersByTime(40000))
    expect(cards[1]).toHaveAttribute('data-featured-focus', 'true')
    expect(playing(cards)).toHaveLength(0)
    fireEvent.blur(cards[1])
    act(() => vi.advanceTimersByTime(999))
    expect(cards[1]).toHaveAttribute('data-featured-focus', 'true')
    act(() => vi.advanceTimersByTime(1))
    expect(playing(cards)).toEqual([cards[2]])
  })

  it('stops offscreen playback and disables automatic motion for reduced motion', () => {
    const { container, rerender } = render(<ToolsSection />)
    const cards = desktopCards(container)
    environment.visible = false
    rerender(<ToolsSection />)
    act(() => vi.advanceTimersByTime(60000))
    expect(playing(cards)).toHaveLength(0)
    expect(cards[0]).toHaveAttribute('data-featured-focus', 'true')
    environment.visible = true
    environment.reducedMotion = true
    rerender(<ToolsSection />)
    act(() => vi.advanceTimersByTime(60000))
    expect(playing(cards)).toHaveLength(0)
    expect(cards[0]).toHaveAttribute('data-featured-focus', 'true')
  })

  it('cancels an outgoing hold when a different card is selected', () => {
    const { container } = render(<ToolsSection />)
    const cards = desktopCards(container)
    act(() => vi.advanceTimersByTime(9700))
    act(() => vi.advanceTimersByTime(500))
    fireEvent.click(cards[3])
    act(() => vi.advanceTimersByTime(1000))
    expect(playing(cards)).toEqual([cards[3]])
    expect(cards[3]).toHaveAttribute('data-featured-focus', 'true')
  })
})
