import { afterEach, describe, expect, test, vi } from 'vitest'
import * as Tabs from './tabs.fg'
import * as Settings from './settings'
import { MTab } from 'src/defaults/mocks.tabs.fg'

describe('New tab highlighting', () => {
  afterEach(() => {
    Settings.resetSettings()
    vi.useRealTimers()
  })

  test.each([true, false])('briefly flashes a new tab (active=%s)', active => {
    vi.useFakeTimers()
    Settings.state.tabsHighlightNew = true
    const flashFxEl = document.createElement('div')
    const tab = new MTab({ active, flashFxEl })

    Tabs.highlightNewTab(tab)

    expect(flashFxEl.dataset.run).toBe('true')
    vi.advanceTimersByTime(1000)
    expect(flashFxEl.dataset.run).toBe('false')
    expect(tab.flashAnimationTimeout).toBeUndefined()
  })

  test('does not flash when disabled', () => {
    const flashFxEl = document.createElement('div')
    Tabs.highlightNewTab(new MTab({ flashFxEl }))
    expect(flashFxEl.dataset.run).toBeUndefined()
  })
})
