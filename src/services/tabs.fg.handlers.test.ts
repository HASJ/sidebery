import { afterEach, describe, expect, test, vi } from 'vitest'
import * as Tabs from './tabs.fg'
import * as Settings from './settings'
import * as Sidebar from './sidebar.fg'
import * as Windows from './windows.fg'
import { MTab } from 'src/defaults/mocks.tabs.fg'
import { PanelType } from 'src/enums'

describe('Domain tree activation', () => {
  afterEach(() => {
    Tabs.resetTabsListeners()
    Settings.resetSettings()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  test.each([false, true])(
    'collapsing the active child keeps the tree folded (nested=%s)',
    nested => {
      vi.useFakeTimers()
      vi.spyOn(Tabs, 'ready', 'get').mockReturnValue(true)
      vi.spyOn(Sidebar, 'hasTabs', 'get').mockReturnValue(true)
      Object.assign(browser, { sessions: { setTabValue: vi.fn().mockResolvedValue(undefined) } })
      const event = () => ({ addListener: vi.fn(), removeListener: vi.fn() })
      Object.assign(browser.tabs, {
        onCreated: event(),
        onUpdated: event(),
        onRemoved: event(),
        onMoved: event(),
        onDetached: event(),
        onAttached: event(),
        onActivated: event(),
      })
      Tabs.setupTabsListeners()
      const onActivated = vi.mocked(browser.tabs.onActivated.addListener).mock.calls[0][0]
      Settings.state.domainTrees = true
      Settings.state.autoExpandTabs = true
      Settings.state.hideFoldedTabs = false
      Settings.state.discardFolded = false
      Settings.state.switchPanelAfterSwitchingTab = 'no'
      Settings.state.scrollPanelAfterSwitchingTab = 'no'
      const panelId = 'activation_panel'
      Sidebar.panelsById[panelId] = { id: panelId, type: PanelType.tabs } as any
      const tree = new MTab({
        id: 3100,
        index: 0,
        panelId,
        isGroup: true,
        isParent: true,
        url: Tabs.createDomainTreeUrl('example.com', 'Example'),
      })
      const parent = new MTab({ id: 3101, index: 1, panelId, lvl: 1, parentId: tree.id })
      const child = nested
        ? new MTab({ id: 3102, index: 2, panelId, lvl: 2, parentId: parent.id })
        : parent
      child.active = true
      Tabs.list.length = 0
      Tabs.list.push(tree, parent, ...(nested ? [child] : []))
      for (const tab of Tabs.list) Tabs.byId[tab.id] = tab
      Tabs.DomainTrees.recordActiveChild(child)
      vi.spyOn(Sidebar, 'recalcVisibleTabs').mockImplementation(() => {})
      vi.spyOn(Tabs, 'updateSuccessionDebounced').mockImplementation(() => {})
      const expand = vi.spyOn(Tabs, 'expTabsBranch').mockImplementation(() => {
        tree.folded = false
      })
      const update = vi.spyOn(browser.tabs, 'update').mockResolvedValue({} as browser.tabs.Tab)

      Tabs.foldTabsBranch(tree.id)
      expect(update).toHaveBeenCalledExactlyOnceWith(tree.id, { active: true })
      onActivated({ tabId: tree.id, previousTabId: child.id, windowId: Windows.id })

      expect(tree.folded).toBe(true)
      expect(tree.active).toBe(true)
      expect(expand).not.toHaveBeenCalled()
      expect(update).toHaveBeenCalledExactlyOnceWith(tree.id, { active: true })

      // Activation from outside the tree still opens its last active child.
      update.mockClear()
      onActivated({ tabId: tree.id, previousTabId: -1, windowId: Windows.id })
      expect(expand).toHaveBeenCalledWith(tree.id)
      expect(update).toHaveBeenCalledExactlyOnceWith(child.id, { active: true })
    }
  )
})
