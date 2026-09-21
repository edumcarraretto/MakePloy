import { act, cleanup, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { IntegratedCodeEditorPreview } from './IntegratedCodeEditorPreview'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

it('reports completed typing once and holds the file instead of starting another', () => {
  vi.useFakeTimers()
  vi.spyOn(Math, 'random').mockReturnValue(0.5)
  const onComplete = vi.fn()
  const { container } = render(<IntegratedCodeEditorPreview interactive={false} onComplete={onComplete} />)
  for (let step = 0; step < 500 && !onComplete.mock.calls.length; step++) {
    act(() => vi.advanceTimersByTime(30))
  }
  expect(onComplete).toHaveBeenCalledTimes(1)
  const completedText = container.textContent
  act(() => vi.advanceTimersByTime(5000))
  expect(onComplete).toHaveBeenCalledTimes(1)
  expect(container.textContent).toBe(completedText)
})
