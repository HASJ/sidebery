import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import * as Tabs from './tabs.fg'
import * as Settings from './settings'
import * as Sidebar from './sidebar.fg'
import { addMPanel, resetMSidebar } from 'src/defaults/mocks.sidebar.fg'
import { LoadSrc } from 'src/enums'
import * as Utils from 'src/utils'

describe('Sidebar tab restoration', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    resetMSidebar()
    addMPanel({ id: 'startup' })
    Settings.state.domainTrees = true
    Settings.state.tabsBadge = false
    vi.spyOn(Tabs, 'setupTabsListeners').mockImplementation(() => {})
    vi.spyOn(Tabs, 'resetTabsListeners').mockImplementation(() => {})
    vi.spyOn(Tabs, 'updateNativeTabsVisibility').mockImplementation(() => {})
    vi.spyOn(Tabs, 'updateSuccessionDebounced').mockImplementation(() => {})
    vi.spyOn(Tabs, 'scrollToTab').mockImplementation(() => {})
    vi.spyOn(Tabs, 'linkGroupWithPinnedTab').mockImplementation(() => {})
    vi.spyOn(Sidebar, 'updateMediaStateOfPanel').mockImplementation(() => {})
    Object.assign(browser, {
      windows: { WINDOW_ID_CURRENT: -2 },
      sessions: {
        getTabValue: vi.fn().mockResolvedValue(undefined),
        setTabValue: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    Tabs.unload()
    resetMSidebar()
    Settings.resetSettings()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  test.each([
    [undefined, false],
    [LoadSrc.SessionOnly, false],
    [undefined, true],
  ] as const)(
    'restores 500 unloaded tabs before starting domain maintenance (source=%s, unload=%s)',
    async (source, unload) => {
      const nativeTabs = Array.from({ length: 525 }, (_, index) => ({
        id: index + 1,
        index,
        url:
          index % 21 === 0
            ? Tabs.createDomainTreeUrl(`site${Math.floor(index / 21)}.com`, 'Site')
            : `https://site${Math.floor(index / 21)}.com/${index}`,
        title: `Tab ${index}`,
        active: index === 0,
        pinned: false,
        discarded: true,
        windowId: 1,
        cookieStoreId: 'firefox-default',
        status: 'complete' as const,
      }))
      const cache = nativeTabs.map(tab => ({
        id: tab.id,
        url: tab.url,
        panelId: 'startup',
        parentId: tab.index % 21 === 0 ? -1 : Math.floor(tab.index / 21) * 21 + 1,
      }))
      vi.mocked(browser.sessions.getTabValue).mockImplementation(async id =>
        cache.find(tab => tab.id === id)
      )
      Object.assign(browser.tabs, {
        query: vi.fn().mockResolvedValue(nativeTabs),
        reload: vi.fn(),
        update: vi.fn().mockResolvedValue({}),
      })
      vi.spyOn(browser.storage.local, 'get').mockResolvedValue({ tabsDataCache: [cache] })
      const scan = vi.spyOn(Tabs.DomainTrees, 'scanExistingTabs').mockResolvedValue()
      const clean = vi.spyOn(Tabs.DomainTrees, 'cleanEmptyDomainTrees').mockResolvedValue()
      const cleanup = vi
        .spyOn(Tabs.DomainTrees, 'cleanEmptyDomainTreesDebounced')
        .mockImplementation(() => {})

      await Tabs.load(source)

      expect(Tabs.ready).toBe(true)
      const panel = Sidebar.panelsById.startup
      if (!Utils.isTabsPanel(panel)) throw new Error('Expected restored tabs panel')
      expect(panel.reactive.visibleTabIds).toHaveLength(525)
      expect(Tabs.list.every(tab => tab.discarded)).toBe(true)
      expect(browser.tabs.reload).not.toHaveBeenCalled()
      expect(scan).not.toHaveBeenCalled()
      expect(cleanup).not.toHaveBeenCalled()
      vi.advanceTimersToNextFrame()
      expect(scan).not.toHaveBeenCalled()
      if (unload) Tabs.unload()
      vi.advanceTimersToNextFrame()
      expect(scan).toHaveBeenCalledTimes(!unload && source !== LoadSrc.SessionOnly ? 1 : 0)
      expect(clean).toHaveBeenCalledTimes(!unload && source === LoadSrc.SessionOnly ? 1 : 0)
    }
  )
})
