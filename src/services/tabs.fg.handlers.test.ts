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
    'collapsing a domain tree with an active child keeps the active child displayed under the collapsed tree (nested=%s)',
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
      const tree = new MTab({
        id: 3100,
        index: 0,
        panelId,
        isGroup: true,
        isParent: true,
        url: Tabs.createDomainTreeUrl('example.com', 'Example'),
      })
      const parent = new MTab({
        id: 3101,
        index: 1,
        panelId,
        lvl: 1,
        parentId: tree.id,
        isGroup: nested,
        isParent: nested,
        url: nested ? Tabs.createDomainTreeUrl('sub.example.com', 'Group 1') : 'https://example.com/1',
      })
      const child = nested
        ? new MTab({ id: 3102, index: 2, panelId, lvl: 2, parentId: parent.id })
        : parent
      const sibling = new MTab({
        id: 3103,
        index: nested ? 3 : 2,
        panelId,
        lvl: nested ? 2 : 1,
        parentId: nested ? parent.id : tree.id,
      })
      const outside = new MTab({
        id: 3104,
        index: nested ? 4 : 3,
        panelId,
        lvl: 0,
      })
      child.active = true
      child.reactive.active = true
      Tabs.setActiveId(child.id)
      Tabs.list.length = 0
      Tabs.list.push(tree, parent, ...(nested ? [child] : []), sibling, outside)
      for (const tab of Tabs.list) Tabs.byId[tab.id] = tab
      Sidebar.panelsById[panelId] = {
        id: panelId,
        type: PanelType.tabs,
        tabs: Tabs.list,
        reactive: { visibleTabIds: Tabs.list.map(t => t.id) },
      } as any
      Tabs.DomainTrees.recordActiveChild(child)
      vi.spyOn(Tabs, 'updateSuccessionDebounced').mockImplementation(() => {})
      const update = vi.spyOn(browser.tabs, 'update').mockResolvedValue({} as browser.tabs.Tab)

      Tabs.foldTabsBranch(tree.id)

      expect(tree.folded).toBe(true)
      expect(child.active).toBe(true)
      expect(child.invisible).toBe(false)
      expect(child.reactive.lvl).toBe(1)
      expect(sibling.invisible).toBe(true)
      if (nested) {
        expect(parent.invisible).toBe(true)
      }
      expect(update).not.toHaveBeenCalled()
      expect((Sidebar.panelsById[panelId] as any).reactive.visibleTabIds).toEqual([
        tree.id,
        child.id,
        outside.id,
      ])

      // Expanding the tree restores intermediate groups, sibling visibility, and child level.
      Tabs.expTabsBranch(tree.id)
      expect(tree.folded).toBe(false)
      expect(child.invisible).toBe(false)
      expect(child.reactive.lvl).toBe(nested ? 2 : 1)
      expect(sibling.invisible).toBe(false)
      if (nested) {
        expect(parent.invisible).toBe(false)
      }

      // Folding again and switching to a tab outside the tree hides the previously active child.
      Tabs.foldTabsBranch(tree.id)
      expect(child.invisible).toBe(false)
      expect(child.reactive.lvl).toBe(1)

      onActivated({ tabId: outside.id, previousTabId: child.id, windowId: Windows.id })
      expect(child.active).toBe(false)
      expect(child.invisible).toBe(true)
      expect(child.reactive.lvl).toBe(nested ? 2 : 1)
      expect((Sidebar.panelsById[panelId] as any).reactive.visibleTabIds).toEqual([
        tree.id,
        outside.id,
      ])
    }
  )
})
