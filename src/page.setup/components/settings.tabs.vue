<template lang="pug">
section(ref="el")
  h2 {{translate('settings.tabs_title')}}
  span.header-shadow
  SelectField(
    label="settings.warn_on_multi_tab_close"
    optLabel="settings.warn_on_multi_tab_close_"
    dbg="warnOnMultiTabClose"
    v-model:value="Settings.state.warnOnMultiTabClose"
    :default="DEFAULT_SETTINGS.warnOnMultiTabClose"
    :opts="Settings.getOpts('warnOnMultiTabClose')"
    @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.tabs_rm_undo_note"
    dbg="tabsRmUndoNote"
    v-model:value="Settings.state.tabsRmUndoNote"
    :default="DEFAULT_SETTINGS.tabsRmUndoNote"
    @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.activate_last_tab_on_panel_switching"
    dbg="activateLastTabOnPanelSwitching"
    :value="Settings.state.activateLastTabOnPanelSwitching"
    :default="DEFAULT_SETTINGS.activateLastTabOnPanelSwitching"
    @update:value="toggleActivateLastTabOnPanelSwitching")
  .sub-fields
    ToggleField(
      label="settings.activate_last_tab_on_panel_switching_loaded_only"
      dbg="activateLastTabOnPanelSwitchingLoadedOnly"
      v-model:value="Settings.state.activateLastTabOnPanelSwitchingLoadedOnly"
      :default="DEFAULT_SETTINGS.activateLastTabOnPanelSwitchingLoadedOnly"
      @update:value="Settings.saveDebounced(150)")
  SelectField(
    label="settings.switch_panel_after_switching_tab"
    optLabel="settings.switch_panel_after_switching_tab_"
    dbg="switchPanelAfterSwitchingTab"
    v-model:value="Settings.state.switchPanelAfterSwitchingTab"
    :default="DEFAULT_SETTINGS.switchPanelAfterSwitchingTab"
    :folded="true"
    :opts="Settings.getOpts('switchPanelAfterSwitchingTab')"
    @update:value="toggleSwitchPanelAfterSwitchingTab")
  SelectField(
    label="settings.scroll_panel_after_switching_tab"
    optLabel="settings.scroll_panel_after_switching_tab_"
    dbg="scrollPanelAfterSwitchingTab"
    v-model:value="Settings.state.scrollPanelAfterSwitchingTab"
    :default="DEFAULT_SETTINGS.scrollPanelAfterSwitchingTab"
    :folded="true"
    :opts="Settings.getOpts('scrollPanelAfterSwitchingTab')"
    @update:value="Settings.saveDebounced(150)")
  SelectField(
    label="settings.tab_rm_btn"
    optLabel="settings.tab_rm_btn_"
    dbg="tabRmBtn"
    v-model:value="Settings.state.tabRmBtn"
    :default="DEFAULT_SETTINGS.tabRmBtn"
    :folded="true"
    :opts="Settings.getOpts('tabRmBtn')"
    @update:value="Settings.saveDebounced(150)")
  SelectField(
    label="settings.activate_after_closing"
    optLabel="settings.activate_after_closing_"
    dbg="activateAfterClosing"
    v-model:value="Settings.state.activateAfterClosing"
    :default="DEFAULT_SETTINGS.activateAfterClosing"
    :folded="true"
    :opts="Settings.getOpts('activateAfterClosing')"
    @update:value="Settings.saveDebounced(150)")
  .sub-fields
    ToggleField(
      label="settings.activate_after_closing_stay_in_panel"
      dbg="activateAfterClosingStayInPanel"
      v-model:value="Settings.state.activateAfterClosingStayInPanel"
      :default="DEFAULT_SETTINGS.activateAfterClosingStayInPanel"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.activate_after_closing_global"
      dbg="activateAfterClosingGlobal"
      v-model:value="Settings.state.activateAfterClosingGlobal"
      :default="DEFAULT_SETTINGS.activateAfterClosingGlobal"
      :inactive="Settings.state.activateAfterClosing !== 'prev_act'"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.activate_after_closing_no_folded"
      dbg="activateAfterClosingNoFolded"
      v-model:value="Settings.state.activateAfterClosingNoFolded"
      :default="DEFAULT_SETTINGS.activateAfterClosingNoFolded"
      :inactive="Settings.state.activateAfterClosing !== 'prev_act'"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.activate_after_closing_no_discarded"
      dbg="activateAfterClosingNoDiscarded"
      v-model:value="Settings.state.activateAfterClosingNoDiscarded"
      :default="DEFAULT_SETTINGS.activateAfterClosingNoDiscarded"
      :inactive="Settings.state.activateAfterClosing === 'none'"
      @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.tabs_unread_mark"
    dbg="tabsUnreadMark"
    v-model:value="Settings.state.tabsUnreadMark"
    :default="DEFAULT_SETTINGS.tabsUnreadMark"
    @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.tabs_highlight_new"
    dbg="tabsHighlightNew"
    v-model:value="Settings.state.tabsHighlightNew"
    :default="DEFAULT_SETTINGS.tabsHighlightNew"
    @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.tabs_badge"
    dbg="tabsBadge"
    v-model:value="Settings.state.tabsBadge"
    :default="DEFAULT_SETTINGS.tabsBadge"
    @update:value="Settings.saveDebounced(150)")
  .sub-fields
    TextField.tabsBadgeRulesField(
      ref="badgeRulesEl"
      label="settings.tabs_badge_rules"
      dbg="tabsBadgeRules"
      v-model:value="Settings.state.tabsBadgeRules"
      or="---"
      input-width="66"
      :valid="tabsBadgeRulesValid"
      :padding="12"
      :inactive="!Settings.state.tabsBadge"
      :default="DEFAULT_SETTINGS.tabsBadgeRules"
      :fnote="translate('settings.tabs_badge_rules_note')"
      @update:value="onTabsBadgeRulesUpdate"
      @blur="onTabsBadgeRulesBlur")
  CountField.-inline(
    label="settings.tabs_reload_limit"
    dbg="tabsReloadLimit"
    v-model:value="Settings.state.tabsReloadLimit"
    :default="DEFAULT_SETTINGS.tabsReloadLimit"
    :min="1"
    @update:value="Settings.saveDebounced(500)")
  .sub-fields
    ToggleField(
      label="settings.tabs_reload_limit_notif"
      dbg="tabsReloadLimitNotif"
      v-model:value="Settings.state.tabsReloadLimitNotif"
      :default="DEFAULT_SETTINGS.tabsReloadLimitNotif"
      :inactive="!(Settings.state.tabsReloadLimit > 0)"
      @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.tabs_panel_switch_act_move"
    dbg="tabsPanelSwitchActMove"
    :value="Settings.state.tabsPanelSwitchActMove"
    :default="DEFAULT_SETTINGS.tabsPanelSwitchActMove"
    @update:value="toggleTabsPanelSwitchActMove")
  ToggleField(
    label="settings.tabs_panel_switch_act_move_auto"
    dbg="tabsPanelSwitchActMoveAuto"
    :value="Settings.state.tabsPanelSwitchActMoveAuto"
    :default="DEFAULT_SETTINGS.tabsPanelSwitchActMoveAuto"
    @update:value="toggleTabsPanelSwitchActMoveAuto")
  SelectField(
    label="settings.tabs_url_in_tooltip"
    optLabel="settings.tabs_url_in_tooltip_"
    dbg="tabsUrlInTooltip"
    v-model:value="Settings.state.tabsUrlInTooltip"
    :default="DEFAULT_SETTINGS.tabsUrlInTooltip"
    :opts="Settings.getOpts('tabsUrlInTooltip')"
    @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.tabs_container_in_tooltip"
    dbg="tabsContainerInTooltip"
    v-model:value="Settings.state.tabsContainerInTooltip"
    :default="DEFAULT_SETTINGS.tabsContainerInTooltip"
    @update:value="Settings.saveDebounced(150)")
  ToggleField(
    label="settings.show_new_tab_btns"
    dbg="showNewTabBtns"
    v-model:value="Settings.state.showNewTabBtns"
    :default="DEFAULT_SETTINGS.showNewTabBtns"
    @update:value="Settings.saveDebounced(150)")
  .sub-fields
    SelectField(
      label="settings.new_tab_bar_position"
      optLabel="settings.new_tab_bar_position_"
      dbg="newTabBarPosition"
      v-model:value="Settings.state.newTabBarPosition"
      :default="DEFAULT_SETTINGS.newTabBarPosition"
      :inactive="!Settings.state.showNewTabBtns"
      :opts="Settings.getOpts('newTabBarPosition')"
      @update:value="Settings.saveDebounced(150)")
  //- ToggleField(
  //-   label="settings.tab_warmup_on_hover"
  //-   v-model:value="Settings.state.tabWarmupOnHover"
  //-   @update:value="Settings.saveDebounced(150)")
  NumField.-inline(
    label="settings.tabs_switch_delay"
    dbg="tabSwitchDelay"
    v-model:value="Settings.state.tabSwitchDelay"
    :default="DEFAULT_SETTINGS.tabSwitchDelay"
    :or="0"
    @update:value="Settings.saveDebounced(500)")
  ToggleField(
    label="settings.sticky_active_tab"
    dbg="stickyActiveTab"
    v-model:value="Settings.state.stickyActiveTab"
    :default="DEFAULT_SETTINGS.stickyActiveTab"
    @update:value="Settings.saveDebounced(150)")
  NumField.-inline(
    label="settings.tabs_title_lines_max"
    dbg="tabsTitleLinesMax"
    v-model:value="Settings.state.tabsTitleLinesMax"
    :default="DEFAULT_SETTINGS.tabsTitleLinesMax"
    :or="1"
    :min-value="1"
    @update:value="Settings.saveDebounced(500)")
  .sub-fields
    SelectField(
      label="settings.tabs_title_lines_br"
      optLabel="settings.tabs_title_lines_br_"
      dbg="tabsTitleLinesBr"
      v-model:value="Settings.state.tabsTitleLinesBr"
      :default="DEFAULT_SETTINGS.tabsTitleLinesBr"
      :inactive="Settings.state.tabsTitleLinesMax < 2"
      :opts="Settings.getOpts('tabsTitleLinesBr')"
      @update:value="Settings.saveDebounced(150)")

  .wrapper(ref="newTabPosEl")
    .sub-title: .text {{translate('settings.nav_settings_new_tab_position')}}
    SelectField.-no-separator(
      label="settings.move_new_tab_pin"
      optLabel="settings.move_new_tab_pin_"
      dbg="moveNewTabPin"
      v-model:value="Settings.state.moveNewTabPin"
      :default="DEFAULT_SETTINGS.moveNewTabPin"
      :opts="Settings.getOpts('moveNewTabPin')"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.pinned_auto_group"
      :inactive="!Settings.state.tabsTree"
      dbg="pinnedAutoGroup"
      v-model:value="Settings.state.pinnedAutoGroup"
      :default="DEFAULT_SETTINGS.pinnedAutoGroup"
      @update:value="Settings.saveDebounced(150)")
    SelectField(
      label="settings.move_new_tab_parent"
      optLabel="settings.move_new_tab_parent_"
      dbg="moveNewTabParent"
      v-model:value="Settings.state.moveNewTabParent"
      :default="DEFAULT_SETTINGS.moveNewTabParent"
      :opts="Settings.getOpts('moveNewTabParent')"
      :folded="true"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      ToggleField(
        v-if="Settings.state.moveNewTabParent === 'default' && Settings.state.tabsTree"
        label="settings.move_new_tab_parent_indent"
        dbg="moveNewTabParentIndent"
        v-model:value="Settings.state.moveNewTabParentIndent"
        :default="DEFAULT_SETTINGS.moveNewTabParentIndent"
        @update:value="Settings.saveDebounced(150)")
      ToggleField(
        v-else
        label="settings.move_new_tab_parent_indent"
        :inactive="true"
        v-bind:value="Settings.state.tabsTree && (Settings.state.moveNewTabParent === 'first_child' || Settings.state.moveNewTabParent === 'last_child')")
      ToggleField(
        label="settings.move_new_tab_parent_act_panel"
        :inactive="Settings.state.moveNewTabParent === 'none'"
        dbg="moveNewTabParentActPanel"
        v-model:value="Settings.state.moveNewTabParentActPanel"
        :default="DEFAULT_SETTINGS.moveNewTabParentActPanel"
        @update:value="Settings.saveDebounced(150)")
    //- Place new tab (from New Tab button). options are reused from moveNewTab
    SelectField(
      label="settings.move_new_tab_button"
      optLabel="settings.move_new_tab_"
      dbg="moveNewTabButton"
      v-model:value="Settings.state.moveNewTabButton"
      :default="DEFAULT_SETTINGS.moveNewTabButton"
      :opts="Settings.getOpts('moveNewTab')"
      :folded="true"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      SelectField(
        :inactive="!newTabBtnPosRelativeToActiveTab"
        label="settings.move_new_tab_active_pin"
        optLabel="settings.move_new_tab_pin_"
        dbg="moveNewTabButtonActivePin"
        v-model:value="Settings.state.moveNewTabButtonActivePin"
        :default="DEFAULT_SETTINGS.moveNewTabButtonActivePin"
        :opts="Settings.getOpts('moveNewTabActivePin')"
        @update:value="Settings.saveDebounced(150)")
    //- Place new tab (general rule)
    SelectField(
      label="settings.move_new_tab"
      optLabel="settings.move_new_tab_"
      dbg="moveNewTab"
      v-model:value="Settings.state.moveNewTab"
      :default="DEFAULT_SETTINGS.moveNewTab"
      :opts="Settings.getOpts('moveNewTab')"
      :folded="true"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      SelectField(
        :inactive="!newTabPosRelativeToActiveTab"
        label="settings.move_new_tab_active_pin"
        optLabel="settings.move_new_tab_pin_"
        dbg="moveNewTabActivePin"
        v-model:value="Settings.state.moveNewTabActivePin"
        :default="DEFAULT_SETTINGS.moveNewTabActivePin"
        :opts="Settings.getOpts('moveNewTabActivePin')"
        @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.auto_scroll_to_new_tab"
      dbg="autoScrollToNewTab"
      v-model:value="Settings.state.autoScrollToNewTab"
      :default="DEFAULT_SETTINGS.autoScrollToNewTab"
      @update:value="Settings.saveDebounced(150)")

  .wrapper(ref="pinTabsEl")
    .sub-title: .text {{translate('settings.nav_settings_pinned_tabs')}}
    SelectField.-no-separator(
      dbg="pinnedTabsPosition"
      v-model:value="Settings.state.pinnedTabsPosition"
      :default="DEFAULT_SETTINGS.pinnedTabsPosition"
      label="settings.pinned_tabs_position"
      optLabel="settings.pinned_tabs_position_"
      :opts="Settings.getOpts('pinnedTabsPosition')"
      :folded="true"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.pinned_tabs_list"
      :inactive="Settings.state.pinnedTabsPosition !== 'panel' && Settings.state.pinnedTabsPosition!== 'top'"
      dbg="pinnedTabsList"
      v-model:value="Settings.state.pinnedTabsList"
      :default="DEFAULT_SETTINGS.pinnedTabsList"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.pinned.no_unload"
      dbg="pinnedNoUnload"
      v-model:value="Settings.state.pinnedNoUnload"
      :default="DEFAULT_SETTINGS.pinnedNoUnload"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      ToggleField(
        label="settings.pinned.no_unload_explicit"
        dbg="pinnedNoUnloadPanel"
        v-model:value="Settings.state.pinnedNoUnloadExplicit"
        :inactive="!Settings.state.pinnedNoUnload"
        :default="DEFAULT_SETTINGS.pinnedNoUnloadExplicit"
        @update:value="Settings.saveDebounced(150)")

  .wrapper(ref="tabsTreeEl")
    .sub-title: .text {{translate('settings.nav_settings_tabs_tree')}}
    ToggleField.-no-separator(
      label="settings.tabs_tree_layout"
      dbg="tabsTree"
      v-model:value="Settings.state.tabsTree"
      :default="DEFAULT_SETTINGS.tabsTree"
      @update:value="Settings.saveDebounced(150)")
    SelectField(
      label="settings.tabs_tree_limit"
      optLabel="settings.tabs_tree_limit_"
      dbg="tabsTreeLimit"
      v-model:value="Settings.state.tabsTreeLimit"
      :default="DEFAULT_SETTINGS.tabsTreeLimit"
      :inactive="!Settings.state.tabsTree"
      :opts="Settings.getOpts('tabsTreeLimit')"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.sticky_ancestor_tabs"
      dbg="stickyAncestorTabs"
      v-model:value="Settings.state.stickyAncestorTabs"
      :default="DEFAULT_SETTINGS.stickyAncestorTabs"
      :inactive="!Settings.state.tabsTree"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      SelectField(
        label="settings.sticky_ancestor_tabs_limit"
        optLabel="settings.sticky_ancestor_tabs_limit_"
        dbg="stickyAncestorTabsLimit"
        v-model:value="Settings.state.stickyAncestorTabsLimit"
        :default="DEFAULT_SETTINGS.stickyAncestorTabsLimit"
        :inactive="!Settings.state.tabsTree || !Settings.state.stickyAncestorTabs"
        :opts="Settings.getOpts('stickyAncestorTabsLimit')"
        @update:value="Settings.saveDebounced(150)")
      SelectField(
        label="settings.sticky_ancestor_tabs_layout"
        optLabel="settings.sticky_ancestor_tabs_layout_"
        dbg="stickyAncestorTabsLayout"
        v-model:value="Settings.state.stickyAncestorTabsLayout"
        :default="DEFAULT_SETTINGS.stickyAncestorTabsLayout"
        :inactive="!Settings.state.tabsTree || !Settings.state.stickyAncestorTabs"
        :opts="Settings.getOpts('stickyAncestorTabsLayout')"
        @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.auto_fold_tabs"
      :inactive="!Settings.state.tabsTree"
      dbg="autoFoldTabs"
      v-model:value="Settings.state.autoFoldTabs"
      :default="DEFAULT_SETTINGS.autoFoldTabs"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      SelectField(
        label="settings.auto_fold_tabs_except"
        optLabel="settings.auto_fold_tabs_except_"
        dbg="autoFoldTabsExcept"
        v-model:value="Settings.state.autoFoldTabsExcept"
        :default="DEFAULT_SETTINGS.autoFoldTabsExcept"
        :inactive="!Settings.state.tabsTree || !Settings.state.autoFoldTabs"
        :opts="Settings.getOpts('autoFoldTabsExcept')"
        @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.auto_exp_tabs"
      dbg="autoExpandTabs"
      v-model:value="Settings.state.autoExpandTabs"
      :default="DEFAULT_SETTINGS.autoExpandTabs"
      :inactive="!Settings.state.tabsTree"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.auto_exp_tabs_on_new"
      dbg="autoExpandTabsOnNew"
      v-model:value="Settings.state.autoExpandTabsOnNew"
      :default="DEFAULT_SETTINGS.autoExpandTabsOnNew"
      :inactive="!Settings.state.tabsTree"
      @update:value="Settings.saveDebounced(150)")
    SelectField(
      label="settings.rm_child_tabs"
      optLabel="settings.rm_child_tabs_"
      dbg="rmChildTabs"
      v-model:value="Settings.state.rmChildTabs"
      :default="DEFAULT_SETTINGS.rmChildTabs"
      :inactive="!Settings.state.tabsTree"
      :opts="Settings.getOpts('rmChildTabs')"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.tabs_lvl_dots"
      dbg="tabsLvlDots"
      v-model:value="Settings.state.tabsLvlDots"
      :default="DEFAULT_SETTINGS.tabsLvlDots"
      :inactive="!Settings.state.tabsTree"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.discard_folded"
      dbg="discardFolded"
      v-model:value="Settings.state.discardFolded"
      :default="DEFAULT_SETTINGS.discardFolded"
      :inactive="!Settings.state.tabsTree"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      NumField.-last(
        label="settings.discard_folded_delay"
        unitLabel="settings.discard_folded_delay_"
        dbg="discardFoldedDelay"
        v-model:value="Settings.state.discardFoldedDelay"
        v-model:unit="Settings.state.discardFoldedDelayUnit"
        :default="DEFAULT_SETTINGS.discardFoldedDelay"
        :default-unit="DEFAULT_SETTINGS.discardFoldedDelayUnit"
        :or="0"
        :inactive="!Settings.state.tabsTree || !Settings.state.discardFolded"
        :unitOpts="SETTINGS_OPTIONS.discardFoldedDelayUnit"
        @update:value="Settings.saveDebounced(500)"
        @update:unit="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.tabs_tree_bookmarks"
      :inactive="!Settings.state.tabsTree"
      dbg="tabsTreeBookmarks"
      v-model:value="Settings.state.tabsTreeBookmarks"
      :default="DEFAULT_SETTINGS.tabsTreeBookmarks"
      @update:value="Settings.saveDebounced(150)")
    SelectField(
      label="settings.tree_rm_outdent"
      optLabel="settings.tree_rm_outdent_"
      dbg="treeRmOutdent"
      v-model:value="Settings.state.treeRmOutdent"
      :default="DEFAULT_SETTINGS.treeRmOutdent"
      :inactive="!Settings.state.tabsTree"
      :opts="Settings.getOpts('treeRmOutdent')"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.auto_group_on_close"
      :inactive="!Settings.state.tabsTree"
      v-model:value="Settings.state.autoGroupOnClose"
      dbg="autoGroupOnClose"
      :default="DEFAULT_SETTINGS.autoGroupOnClose"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      ToggleField(
        label="settings.auto_group_on_close_0_lvl"
        :inactive="!Settings.state.tabsTree || !Settings.state.autoGroupOnClose"
        v-model:value="Settings.state.autoGroupOnClose0Lvl"
        dbg="autoGroupOnClose0Lvl"
        :default="DEFAULT_SETTINGS.autoGroupOnClose0Lvl"
        @update:value="Settings.saveDebounced(150)")
      ToggleField(
        label="settings.auto_group_on_close_mouse_only"
        :inactive="!Settings.state.tabsTree || !Settings.state.autoGroupOnClose"
        v-model:value="Settings.state.autoGroupOnCloseMouseOnly"
        dbg="autoGroupOnCloseMouseOnly"
        :default="DEFAULT_SETTINGS.autoGroupOnCloseMouseOnly"
        @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.ignore_folded_parent"
      :inactive="!Settings.state.tabsTree"
      v-model:value="Settings.state.ignoreFoldedParent"
      dbg="ignoreFoldedParent"
      :default="DEFAULT_SETTINGS.ignoreFoldedParent"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.show_new_group_conf"
      :inactive="!Settings.state.tabsTree"
      v-model:value="Settings.state.showNewGroupConf"
      dbg="showNewGroupConf"
      :default="DEFAULT_SETTINGS.showNewGroupConf"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.sort_groups_first"
      :inactive="!Settings.state.tabsTree"
      v-model:value="Settings.state.sortGroupsFirst"
      dbg="sortGroupsFirst"
      :default="DEFAULT_SETTINGS.sortGroupsFirst"
      @update:value="Settings.saveDebounced(150)")

  .wrapper(ref="domainTreesEl")
    .sub-title: .text {{translate('settings.nav_settings_domain_trees')}}
    ToggleField.-no-separator(
      label="settings.domain_trees"
      dbg="domainTrees"
      v-model:value="Settings.state.domainTrees"
      :default="DEFAULT_SETTINGS.domainTrees"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      ToggleField(
        label="settings.domain_trees_universal"
        dbg="domainTreesUniversal"
        v-model:value="Settings.state.domainTreesUniversal"
        :default="DEFAULT_SETTINGS.domainTreesUniversal"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      ToggleField(
        label="settings.domain_tree_group_parent_domain"
        dbg="domainTreeGroupParentDomain"
        v-model:value="Settings.state.domainTreeGroupParentDomain"
        :default="DEFAULT_SETTINGS.domainTreeGroupParentDomain"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      ToggleField(
        label="settings.domain_tree_auto_fold"
        dbg="domainTreeAutoFold"
        v-model:value="Settings.state.domainTreeAutoFold"
        :default="DEFAULT_SETTINGS.domainTreeAutoFold"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      SelectField(
        label="settings.domain_tree_new_tab_position"
        optLabel="settings.domain_tree_new_tab_position_"
        dbg="domainTreeNewTabPosition"
        v-model:value="Settings.state.domainTreeNewTabPosition"
        :default="DEFAULT_SETTINGS.domainTreeNewTabPosition"
        :opts="Settings.getOpts('domainTreeNewTabPosition')"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      SelectField(
        label="settings.domain_tree_collapse_timeout"
        optLabel="settings.domain_tree_collapse_timeout_"
        dbg="domainTreeCollapseTimeout"
        v-model:value="Settings.state.domainTreeCollapseTimeout"
        :default="DEFAULT_SETTINGS.domainTreeCollapseTimeout"
        :opts="Settings.getOpts('domainTreeCollapseTimeout')"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      NumField(
        v-if="Settings.state.domainTreeCollapseTimeout === 'custom'"
        label="settings.domain_tree_collapse_timeout_custom_minutes"
        dbg="domainTreeCollapseTimeoutCustom"
        v-model:value="Settings.state.domainTreeCollapseTimeoutCustom"
        :default="DEFAULT_SETTINGS.domainTreeCollapseTimeoutCustom"
        :minValue="1"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(500)")
      ToggleField(
        label="settings.domain_tree_move_to_top"
        dbg="domainTreeMoveToTop"
        v-model:value="Settings.state.domainTreeMoveToTop"
        :default="DEFAULT_SETTINGS.domainTreeMoveToTop"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      ToggleField(
        label="settings.domain_tree_focus_new_tab"
        dbg="domainTreeFocusNewTab"
        v-model:value="Settings.state.domainTreeFocusNewTab"
        :default="DEFAULT_SETTINGS.domainTreeFocusNewTab"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      ToggleField(
        label="settings.domain_tree_header_opens_first_tab"
        dbg="domainTreeHeaderOpensFirstTab"
        v-model:value="Settings.state.domainTreeHeaderOpensFirstTab"
        :default="DEFAULT_SETTINGS.domainTreeHeaderOpensFirstTab"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      ToggleField(
        label="settings.domain_tree_confirm_close"
        dbg="domainTreeConfirmClose"
        v-model:value="Settings.state.domainTreeConfirmClose"
        :default="DEFAULT_SETTINGS.domainTreeConfirmClose"
        :inactive="!Settings.state.domainTrees"
        @update:value="Settings.saveDebounced(150)")
      .dt-rules-section(:data-inactive="!Settings.state.domainTrees")
        .dt-rules-header
          .dt-rules-title
            .text {{translate('settings.domain_tree_rules')}}
            .count(v-if="Settings.state.domainTreeRules?.length") {{Settings.state.domainTreeRules.length}}
          .btn.dt-add-rule-btn(@click="addDomainTreeRule") {{translate('settings.domain_tree_rules_add_btn')}}
        .dt-rules-note {{translate('settings.domain_tree_rules_note')}}
        .dt-rules-empty(v-if="!Settings.state.domainTreeRules?.length")
          .text {{translate('settings.domain_tree_rules_empty')}}
        .dt-rules-list(v-else)
          .dt-rule-card(
            v-for="(rule, idx) in Settings.state.domainTreeRules"
            :key="rule.id"
            :data-active="rule.active !== false"
            :data-expanded="expandedRuleId === rule.id"
            :data-mode="rule.mode || 'group_1'"
            :data-color="rule.color || 'toolbar'")
            .dt-rule-card-header(@click="toggleExpandRule(rule.id)")
              .dt-rule-color-dot(:data-color="rule.color || 'toolbar'")
              .dt-rule-main
                .dt-rule-name(:class="{ '-unnamed': !rule.name }") {{getRuleDisplayName(rule)}}
                .dt-rule-chips-summary(v-if="getRulePatternsList(rule).length")
                  .dt-mini-chip(
                    v-for="pat in getRulePatternsList(rule).slice(0, 3)"
                    :key="pat"
                    :data-regex="pat.startsWith('/')") {{pat}}
                  .dt-mini-chip.-more(v-if="getRulePatternsList(rule).length > 3") +{{getRulePatternsList(rule).length - 3}}
              .dt-rule-badges
                .dt-badge.-mode(:data-mode="rule.mode || 'group_1'") {{getRuleModeBadge(rule)}}
                .dt-badge.-pin(
                  v-if="rule.mode !== 'exclude' && isRulePinnedToTop(rule)"
                  :title="translate('settings.domain_tree_rule_pin_top_label')") 📌
                .dt-badge.-flat(
                  v-if="rule.mode !== 'exclude' && rule.enableSubTrees === false"
                  :title="translate('settings.domain_tree_rule_subtrees_label')") Flat
                .dt-badge.-panel(
                  v-if="rule.mode !== 'exclude' && getRulePanelName(rule)") {{getRulePanelName(rule)}}
              .dt-rule-actions(@click.stop)
                ToggleInput(
                  :value="rule.active !== false"
                  @update:value="toggleRuleActive(rule, $event)")
                .card-ctrl.-up(
                  :data-inactive="idx === 0"
                  @click="moveRule(idx, -1)")
                  svg: use(href="#icon_expand")
                .card-ctrl.-down(
                  :data-inactive="idx === Settings.state.domainTreeRules.length - 1"
                  @click="moveRule(idx, 1)")
                  svg: use(href="#icon_expand")
                .card-ctrl.-exp(
                  :data-expanded="expandedRuleId === rule.id"
                  @click="toggleExpandRule(rule.id)")
                  svg: use(href="#icon_expand")
                .card-ctrl.-rm(@click="removeRule(idx)")
                  svg: use(href="#icon_remove")
            .dt-rule-card-body(v-if="expandedRuleId === rule.id")
              .dt-field-row
                .dt-field-label {{translate('settings.domain_tree_rule_name_label')}}
                input.dt-text-input(
                  type="text"
                  :value="rule.name || ''"
                  :placeholder="translate('settings.domain_tree_rule_name_placeholder')"
                  @input="onRuleNameInput(rule, $event)")
              .dt-field-col
                .dt-field-label {{translate('settings.domain_tree_rule_patterns_label')}}
                .dt-chips-box
                  .dt-chip(
                    v-for="(pat, pIdx) in getRulePatternsList(rule)"
                    :key="pat + '_' + pIdx"
                    :data-regex="pat.startsWith('/')")
                    span.dt-chip-tag(v-if="pat.startsWith('/')") re
                    span.dt-chip-text(@click="editPatternChip(rule, pIdx)") {{pat}}
                    span.dt-chip-rm(@click="removePatternChip(rule, pIdx)") ×
                  .dt-chip-input-row
                    input.dt-chip-input(
                      type="text"
                      :value="patternInputs[rule.id] || ''"
                      :data-invalid="!!patternErrors[rule.id]"
                      :placeholder="translate('settings.domain_tree_rule_pattern_placeholder')"
                      @input="onPatternInputChange(rule.id, $event)"
                      @keydown="onPatternInputKeydown(rule, $event)"
                      @blur="onPatternInputBlur(rule)")
                    .btn.dt-chip-add-btn(@click="commitPatternInput(rule)") {{translate('settings.domain_tree_rule_pattern_add_btn')}}
                .dt-pattern-error(v-if="patternErrors[rule.id]") {{patternErrors[rule.id]}}
              SelectField.-no-separator(
                label="settings.domain_tree_rule_mode_label"
                optLabel="settings.domain_tree_rule_mode_"
                :value="rule.mode || 'group_1'"
                :opts="['group_1', 'group_2', 'exclude']"
                @update:value="setRuleMode(rule, $event)")
              template(v-if="rule.mode !== 'exclude'")
                ToggleField(
                  label="settings.domain_tree_rule_subtrees_label"
                  :value="rule.enableSubTrees !== false"
                  @update:value="setRuleSubTrees(rule, $event)")
                ToggleField(
                  v-if="rule.enableSubTrees !== false"
                  label="settings.domain_tree_rule_group_parent_domain_label"
                  :value="rule.groupParentDomain !== undefined ? rule.groupParentDomain : Settings.state.domainTreeGroupParentDomain"
                  @update:value="setRuleGroupParentDomain(rule, $event)")
                ToggleField(
                  label="settings.domain_tree_rule_pin_top_label"
                  :value="isRulePinnedToTop(rule)"
                  @update:value="setRulePinToTop(rule, $event)")
                SelectField(
                  label="settings.domain_tree_rule_panel_label"
                  :value="rule.panelId || 'none'"
                  :opts="rulePanelOpts"
                  :folded="true"
                  @update:value="setRulePanel(rule, $event)")
                SelectField(
                  label="settings.domain_tree_rule_color_label"
                  :value="rule.color || 'toolbar'"
                  :opts="COLOR_OPTS"
                  :color="rule.color || 'toolbar'"
                  :icon="'#icon_circle'"
                  @update:value="setRuleColor(rule, $event)")
      .ctrls(v-if="Settings.state.domainTrees")
        .btn(@click="recalcDomainTrees") {{translate('settings.domain_trees_recalc')}}
        .btn(@click="viewDomainTreesLogs") {{translate('settings.domain_trees_view_logs')}}
        .btn(@click="copyDomainTreesLogs") {{copyLogsBtnLabel}}
        .btn.-warn(@click="clearDomainTreesLogs") {{translate('settings.domain_trees_clear_logs')}}

  .wrapper(ref="tabsColorEl")
    .sub-title: .text {{translate('settings.nav_settings_tabs_colorization')}}
    ToggleField.-no-separator(
      label="settings.colorize_tabs"
      v-model:value="Settings.state.colorizeTabs"
      dbg="colorizeTabs"
      :default="DEFAULT_SETTINGS.colorizeTabs"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      SelectField(
        label="settings.colorize_tabs_src"
        optLabel="settings.colorize_tabs_src_"
        v-model:value="Settings.state.colorizeTabsSrc"
        dbg="colorizeTabsSrc"
        :default="DEFAULT_SETTINGS.colorizeTabsSrc"
        :inactive="!Settings.state.colorizeTabs"
        :opts="Settings.getOpts('colorizeTabsSrc')"
        @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.colorize_branches"
      :inactive="!Settings.state.tabsTree"
      v-model:value="Settings.state.colorizeTabsBranches"
      dbg="colorizeTabsBranches"
      :default="DEFAULT_SETTINGS.colorizeTabsBranches"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      SelectField(
        label="settings.colorize_branches_src"
        optLabel="settings.colorize_branches_src_"
        v-model:value="Settings.state.colorizeTabsBranchesSrc"
        dbg="colorizeTabsBranchesSrc"
        :default="DEFAULT_SETTINGS.colorizeTabsBranchesSrc"
        :inactive="!Settings.state.tabsTree || !Settings.state.colorizeTabsBranches"
        :opts="Settings.getOpts('colorizeTabsBranchesSrc')"
        @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.tabs.inherit_custom_color"
      :inactive="!Settings.state.tabsTree"
      v-model:value="Settings.state.inheritCustomColor"
      dbg="inheritCustomColor"
      :default="DEFAULT_SETTINGS.inheritCustomColor"
      @update:value="Settings.saveDebounced(150)")

  .wrapper(ref="tabsPreviewEl")
    .sub-title: .text {{translate('settings.nav_settings_tabs_preview')}}
    ToggleField.-no-separator(
      label="settings.tabs.preview"
      :value="Settings.state.previewTabs"
      dbg="previewTabs"
      :default="DEFAULT_SETTINGS.previewTabs"
      @update:value="togglePreviewTabs")
    SelectField(
      label="settings.tabs.preview_mode"
      optLabel="settings.tabs.preview_mode_"
      v-model:value="Settings.state.previewTabsMode"
      dbg="previewTabsMode"
      :default="DEFAULT_SETTINGS.previewTabsMode"
      :inactive="!Settings.state.previewTabs"
      :opts="Settings.getOpts('previewTabsMode')"
      :folded="true"
      @update:value="Settings.saveDebounced(150)")
    .sub-fields
      SelectField(
        label="settings.tabs.preview_page_mode_fallback"
        optLabel="settings.tabs.preview_mode_"
        v-model:value="Settings.state.previewTabsPageModeFallback"
        dbg="previewTabsPageModeFallback"
        :default="DEFAULT_SETTINGS.previewTabsPageModeFallback"
        :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode !== 'p'"
        :opts="Settings.getOpts('previewTabsPageModeFallback')"
        :folded="true"
        @update:value="Settings.saveDebounced(150)")
    NumField.-inline(
      label="settings.tabs.preview_delay"
      v-model:value="Settings.state.previewTabsDelay"
      dbg="previewTabsDelay"
      :default="DEFAULT_SETTINGS.previewTabsDelay"
      :or="0"
      :inactive="!Settings.state.previewTabs"
      @update:value="Settings.saveDebounced(500)")
    NumField.-inline(
      label="settings.tabs.preview_inline_height"
      v-model:value="Settings.state.previewTabsInlineHeight"
      dbg="previewTabsInlineHeight"
      :default="DEFAULT_SETTINGS.previewTabsInlineHeight"
      :or="0"
      :inactive="!Settings.state.previewTabs || (Settings.state.previewTabsMode !== 'i' && Settings.state.previewTabsPageModeFallback !== 'i')"
      @update:value="Settings.saveDebounced(500)")
    NumField.-inline(
      label="settings.tabs.preview_popup_width"
      v-model:value="Settings.state.previewTabsPopupWidth"
      dbg="previewTabsPopupWidth"
      :default="DEFAULT_SETTINGS.previewTabsPopupWidth"
      :or="0"
      :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode === 'i'"
      @update:value="Settings.saveDebounced(500)")

    NumField.-inline(
      label="settings.tabs.preview_title"
      v-model:value="Settings.state.previewTabsTitle"
      dbg="previewTabsTitle"
      :default="DEFAULT_SETTINGS.previewTabsTitle"
      :or="0"
      :allowNegative="false"
      :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode === 'i'"
      @update:value="Settings.saveDebounced(500)")
    NumField.-inline(
      label="settings.tabs.preview_url"
      v-model:value="Settings.state.previewTabsUrl"
      dbg="previewTabsUrl"
      :default="DEFAULT_SETTINGS.previewTabsUrl"
      :or="0"
      :allowNegative="false"
      :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode === 'i'"
      @update:value="Settings.saveDebounced(500)")
    SelectField(
      label="settings.tabs.preview_side"
      optLabel="settings.tabs.preview_side_"
      v-model:value="Settings.state.previewTabsSide"
      dbg="previewTabsSide"
      :default="DEFAULT_SETTINGS.previewTabsSide"
      :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode === 'i'"
      :opts="Settings.getOpts('previewTabsSide')"
      @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.tabs.preview_follow_mouse"
      v-model:value="Settings.state.previewTabsFollowMouse"
      dbg="previewTabsFollowMouse"
      :default="DEFAULT_SETTINGS.previewTabsFollowMouse"
      :inactive="!Settings.state.previewTabs"
      @update:value="Settings.saveDebounced(150)")
    NumField.-inline(
      label="settings.tabs.preview_in_page_offset_y"
      v-model:value="Settings.state.previewTabsInPageOffsetY"
      dbg="previewTabsInPageOffsetY"
      :default="DEFAULT_SETTINGS.previewTabsInPageOffsetY"
      :allowNegative="true"
      :or="0"
      :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode !== 'p'"
      @update:value="Settings.saveDebounced(500)")
    NumField.-inline(
      label="settings.tabs.preview_in_page_offset_x"
      v-model:value="Settings.state.previewTabsInPageOffsetX"
      dbg="previewTabsInPageOffsetX"
      :default="DEFAULT_SETTINGS.previewTabsInPageOffsetX"
      :allowNegative="true"
      :or="0"
      :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode !== 'p'"
      @update:value="Settings.saveDebounced(500)")
    NumField.-inline(
      label="settings.tabs.preview_crop_right"
      v-model:value="Settings.state.previewTabsCropRight"
      dbg="previewTabsCropRight"
      :default="DEFAULT_SETTINGS.previewTabsCropRight"
      :or="0"
      :inactive="!Settings.state.previewTabs || Settings.state.previewTabsMode !== 'p'"
      @update:value="Settings.saveDebounced(500)")

  .wrapper(ref="nativeTabsEl")
    .sub-title: .text {{translate('settings.nav_settings_tabs_native')}}
    ToggleField.-no-separator(
      label="settings.hide_inactive_panel_tabs"
      :value="Settings.state.hideInact"
      dbg="hideInact"
      :default="DEFAULT_SETTINGS.hideInact"
      @update:value="toggleHideInact")
    ToggleField(
      label="settings.hide_folded_tabs"
      :inactive="!Settings.state.tabsTree"
      :value="Settings.state.hideFoldedTabs"
      dbg="hideFoldedTabs"
      :default="DEFAULT_SETTINGS.hideFoldedTabs"
      @update:value="toggleHideFoldedTabs")
    .sub-fields
      SelectField(
        label="settings.hide_folded_parent"
        optLabel="settings.hide_folded_parent_"
        v-model:value="Settings.state.hideFoldedParent"
        dbg="hideFoldedParent"
        :default="DEFAULT_SETTINGS.hideFoldedParent"
        :inactive="!Settings.state.hideFoldedTabs"
        :opts="Settings.getOpts('hideFoldedParent')"
        @update:value="Settings.saveDebounced(150)")
    ToggleField(
      label="settings.hide_unloaded_tabs"
      :inactive="!Settings.state.tabsTree"
      :value="Settings.state.hideUnloadedTabs"
      dbg="hideUnloadedTabs"
      :default="DEFAULT_SETTINGS.hideUnloadedTabs"
      @update:value="toggleHideUnloadedTabs")
    ToggleField(
      label="settings.native_highlight"
      :note="translate('settings.native_highlight_note')"
      v-model:value="Settings.state.nativeHighlight"
      dbg="nativeHighlight"
      :default="DEFAULT_SETTINGS.nativeHighlight"
      @update:value="Settings.saveDebounced(150)")
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, useTemplateRef } from 'vue'
import * as Utils from 'src/utils'
import { translate } from 'src/dict'
import type { TextInputComponent, DomainTreeRuleConfig, DomainTreeRuleMode } from 'src/types'
import { COLOR_OPTS, DEFAULT_SETTINGS, NOID, SETTINGS_OPTIONS } from 'src/defaults'
import * as Settings from 'src/services/settings.fg'
import * as Permissions from 'src/services/permissions.fg'
import * as SetupPage from 'src/services/setup-page.fg'
import * as SidebarConf from 'src/services/sidebar-config.fg'
import * as Tabs from 'src/services/tabs.fg'
import * as DomainTrees from 'src/services/tabs.fg.domain-trees'
import * as Windows from 'src/services/windows.fg'
import * as IPC from 'src/services/ipc'
import CountField from '../../components/count-field.vue'
import ToggleField from '../../components/toggle-field.vue'
import ToggleInput from '../../components/toggle-input.vue'
import SelectField from '../../components/select-field.vue'
import NumField from '../../components/num-field.vue'
import TextField from '../../components/text-field.vue'

const el = ref<HTMLElement | null>(null)
const newTabPosEl = ref<HTMLElement | null>(null)
const pinTabsEl = ref<HTMLElement | null>(null)
const tabsTreeEl = ref<HTMLElement | null>(null)
const domainTreesEl = ref<HTMLElement | null>(null)
const tabsColorEl = ref<HTMLElement | null>(null)
const tabsPreviewEl = ref<HTMLElement | null>(null)
const nativeTabsEl = ref<HTMLElement | null>(null)
const badgeRulesEl = useTemplateRef<TextInputComponent>('badgeRulesEl')

const newTabPosRelativeToActiveTab = computed<boolean>(() => {
  return (
    Settings.state.moveNewTab === 'after' ||
    Settings.state.moveNewTab === 'before' ||
    Settings.state.moveNewTab === 'first_child' ||
    Settings.state.moveNewTab === 'last_child'
  )
})

const newTabBtnPosRelativeToActiveTab = computed<boolean>(() => {
  return (
    Settings.state.moveNewTabButton === 'after' ||
    Settings.state.moveNewTabButton === 'before' ||
    Settings.state.moveNewTabButton === 'first_child' ||
    Settings.state.moveNewTabButton === 'last_child'
  )
})

function toggleActivateLastTabOnPanelSwitching(): void {
  Settings.state.activateLastTabOnPanelSwitching = !Settings.state.activateLastTabOnPanelSwitching

  if (!Settings.state.activateLastTabOnPanelSwitching && Settings.state.hideInact) {
    Settings.state.hideInact = false
  }

  Settings.saveDebounced(150)
}

async function toggleHideInact(): Promise<void> {
  if (!Settings.state.hideInact && !Permissions.reactive.tabHide) {
    const result = await Permissions.request('tabHide')
    if (!result) return
  }

  Settings.state.hideInact = !Settings.state.hideInact

  if (Settings.state.hideInact && !Settings.state.activateLastTabOnPanelSwitching) {
    Settings.state.activateLastTabOnPanelSwitching = true
  }

  if (Settings.state.hideInact && !Settings.state.tabsPanelSwitchActMove) {
    Settings.state.tabsPanelSwitchActMove = true
  }

  const notAlwaysSwitch = Settings.state.switchPanelAfterSwitchingTab !== 'always'
  if (Settings.state.hideInact && notAlwaysSwitch) {
    Settings.state.switchPanelAfterSwitchingTab = 'always'
  }

  Settings.saveDebounced(150)
}

function toggleTabsPanelSwitchActMove(): void {
  Settings.state.tabsPanelSwitchActMove = !Settings.state.tabsPanelSwitchActMove

  if (!Settings.state.tabsPanelSwitchActMove && Settings.state.hideInact) {
    Settings.state.hideInact = false
  }

  Settings.saveDebounced(150)
}

function toggleTabsPanelSwitchActMoveAuto(): void {
  Settings.state.tabsPanelSwitchActMoveAuto = !Settings.state.tabsPanelSwitchActMoveAuto

  if (!Settings.state.tabsPanelSwitchActMoveAuto && Settings.state.hideInact) {
    Settings.state.hideInact = false
  }

  Settings.saveDebounced(150)
}

async function toggleHideFoldedTabs(): Promise<void> {
  if (!Settings.state.hideInact && !Permissions.reactive.tabHide) {
    const result = await Permissions.request('tabHide')
    if (!result) return
  }

  Settings.state.hideFoldedTabs = !Settings.state.hideFoldedTabs

  Settings.saveDebounced(150)
}

async function toggleHideUnloadedTabs() {
  if (!Settings.state.hideInact && !Permissions.reactive.tabHide) {
    const result = await Permissions.request('tabHide')
    if (!result) return
  }

  Settings.state.hideUnloadedTabs = !Settings.state.hideUnloadedTabs

  Settings.saveDebounced(150)
}

function toggleSwitchPanelAfterSwitchingTab() {
  const notAlways = Settings.state.switchPanelAfterSwitchingTab !== 'always'

  if (notAlways && Settings.state.hideInact) {
    Settings.state.hideInact = false
  }

  Settings.saveDebounced(150)
}

async function togglePreviewTabs() {
  if (!Settings.state.previewTabs && !Permissions.reactive.webData) {
    const result = await Permissions.request('<all_urls>')
    if (!result) return
  }

  Settings.state.previewTabs = !Settings.state.previewTabs

  Settings.saveDebounced(150)
}

const tabsBadgeRulesValid = ref('')
const validateTabsBadgeRulesDebounced = Utils.debounce(validateTabsBadgeRules)
function validateTabsBadgeRules(value: string) {
  for (const rule of value.trim().split('\n')) {
    try {
      Tabs.parseBadgeRegexpRule(rule)
    } catch (err) {
      if (err === 'no rule') continue
      tabsBadgeRulesValid.value = 'invalid'
      return false
    }
  }
  tabsBadgeRulesValid.value = ''
  return true
}
function onTabsBadgeRulesUpdate(value: string): void {
  Settings.state.tabsBadgeRules = value
  Settings.saveDebounced(500)
  validateTabsBadgeRulesDebounced(100, value)
}

function onTabsBadgeRulesBlur(): void {
  if (tabsBadgeRulesValid.value === 'invalid') {
    badgeRulesEl.value?.error()
  }
}

interface RulePanelOption {
  value: ID
  icon?: string
  color?: string
  title?: string
  tooltip?: string
}

const expandedRuleId = ref<ID | null>(null)
const patternInputs = reactive<Record<string, string>>({})
const patternErrors = reactive<Record<string, string>>({})

const rulePanelOpts = computed<RulePanelOption[]>(() => {
  const noneLabel = translate('settings.domain_tree_rule_panel_none')
  const result: RulePanelOption[] = [
    {
      value: 'none',
      color: 'inactive',
      icon: '#icon_none',
      title: noneLabel,
      tooltip: noneLabel,
    },
  ]

  for (const id of SidebarConf.reactive.nav) {
    const p = SidebarConf.reactive.panels[id]
    if (!Utils.isTabsPanel(p)) continue
    const icon = p.iconIMG ? p.iconIMG : '#' + p.iconSVG
    result.push({ value: p.id, color: p.color, icon, title: p.name, tooltip: p.name })
  }

  return result
})

function ensureNormalizedDomainTreeRules(): void {
  if (!Array.isArray(Settings.state.domainTreeRules)) {
    Settings.state.domainTreeRules = []
    return
  }
  Settings.state.domainTreeRules = Settings.state.domainTreeRules.map((r, idx) =>
    DomainTrees.normalizeDomainTreeRule(r, idx)
  )
}

function getRulePatternsList(rule: DomainTreeRuleConfig): string[] {
  return DomainTrees.getRulePatterns(rule)
}

function getRuleDisplayName(rule: DomainTreeRuleConfig): string {
  if (rule.name?.trim()) return rule.name.trim()
  const patterns = getRulePatternsList(rule)
  if (patterns.length > 0) return patterns[0]
  return translate('settings.domain_tree_rule_unnamed')
}

function getRuleModeBadge(rule: DomainTreeRuleConfig): string {
  if (rule.mode === 'exclude') return 'Exclude'
  if (rule.mode === 'group_2') return '2+ tabs'
  return '1+ tab'
}

function isRulePinnedToTop(rule: DomainTreeRuleConfig): boolean {
  if (rule.pinToTop !== undefined) return !!rule.pinToTop
  return !!rule.name?.trim()
}

function getRulePanelName(rule: DomainTreeRuleConfig): string {
  if (!rule.panelId || rule.panelId === 'none' || rule.panelId === NOID) return ''
  const panel = SidebarConf.reactive.panels[rule.panelId]
  return panel?.name || ''
}

function addDomainTreeRule(): void {
  if (!Array.isArray(Settings.state.domainTreeRules)) {
    Settings.state.domainTreeRules = []
  }
  const newRule = DomainTrees.normalizeDomainTreeRule(
    {
      id: `rule_${Utils.uid()}`,
      active: true,
      name: '',
      url: '',
      patterns: [],
      mode: 'group_1',
      enableSubTrees: true,
      pinToTop: false,
      panelId: 'none',
      color: 'toolbar',
    },
    Settings.state.domainTreeRules.length
  )
  Settings.state.domainTreeRules.push(newRule)
  expandedRuleId.value = newRule.id
  Settings.saveDebounced(150)
}

function toggleExpandRule(ruleId: ID): void {
  expandedRuleId.value = expandedRuleId.value === ruleId ? null : ruleId
}

function toggleRuleActive(rule: DomainTreeRuleConfig, val: boolean): void {
  rule.active = val
  Settings.saveDebounced(150)
}

function moveRule(idx: number, dir: -1 | 1): void {
  const list = Settings.state.domainTreeRules
  if (!list) return
  const targetIdx = idx + dir
  if (targetIdx < 0 || targetIdx >= list.length) return
  const [item] = list.splice(idx, 1)
  list.splice(targetIdx, 0, item)
  Settings.saveDebounced(150)
}

function removeRule(idx: number): void {
  const list = Settings.state.domainTreeRules
  if (!list || idx < 0 || idx >= list.length) return
  const [removed] = list.splice(idx, 1)
  if (removed && expandedRuleId.value === removed.id) {
    expandedRuleId.value = null
  }
  Settings.saveDebounced(150)
}

function onRuleNameInput(rule: DomainTreeRuleConfig, e: Event): void {
  const val = (e.target as HTMLInputElement).value
  const hadName = !!rule.name?.trim()
  const trimmed = val.trim()
  rule.name = trimmed || undefined
  if (!hadName && trimmed && !rule.pinToTop) {
    rule.pinToTop = true
  }
  Settings.saveDebounced(300)
}

function onPatternInputChange(ruleId: ID, e: Event): void {
  const key = String(ruleId)
  patternInputs[key] = (e.target as HTMLInputElement).value
  if (patternErrors[key]) patternErrors[key] = ''
}

function commitPatternInput(rule: DomainTreeRuleConfig): boolean {
  const key = String(rule.id)
  const raw = (patternInputs[key] || '').trim()
  if (!raw) {
    patternErrors[key] = ''
    return true
  }

  const tokens = raw.startsWith('/')
    ? [raw]
    : raw
        .split(/[|,]+/)
        .map(s => s.trim())
        .filter(Boolean)

  for (const token of tokens) {
    if (!DomainTrees.isValidRulePattern(token)) {
      patternErrors[key] = translate('settings.domain_tree_rule_pattern_invalid')
      return false
    }
  }

  const current = DomainTrees.getRulePatterns(rule)
  for (const token of tokens) {
    if (!current.includes(token)) {
      current.push(token)
    }
  }

  rule.patterns = current
  rule.url = current.join('|')
  patternInputs[key] = ''
  patternErrors[key] = ''
  Settings.saveDebounced(150)
  return true
}

function onPatternInputKeydown(rule: DomainTreeRuleConfig, e: KeyboardEvent): void {
  const key = String(rule.id)
  const currentVal = patternInputs[key] || ''

  if (e.key === 'Enter') {
    e.preventDefault()
    commitPatternInput(rule)
    return
  }

  if ((e.key === ',' || e.key === '|') && !currentVal.trim().startsWith('/')) {
    e.preventDefault()
    commitPatternInput(rule)
    return
  }

  if (e.key === 'Backspace' && !currentVal) {
    const current = DomainTrees.getRulePatterns(rule)
    if (current.length > 0) {
      current.pop()
      rule.patterns = current
      rule.url = current.join('|')
      Settings.saveDebounced(150)
    }
  }
}

function onPatternInputBlur(rule: DomainTreeRuleConfig): void {
  const key = String(rule.id)
  if ((patternInputs[key] || '').trim()) {
    commitPatternInput(rule)
  }
}

function removePatternChip(rule: DomainTreeRuleConfig, pIdx: number): void {
  const current = DomainTrees.getRulePatterns(rule)
  if (pIdx < 0 || pIdx >= current.length) return
  current.splice(pIdx, 1)
  rule.patterns = current
  rule.url = current.join('|')
  Settings.saveDebounced(150)
}

function editPatternChip(rule: DomainTreeRuleConfig, pIdx: number): void {
  const current = DomainTrees.getRulePatterns(rule)
  if (pIdx < 0 || pIdx >= current.length) return
  const [chip] = current.splice(pIdx, 1)
  rule.patterns = current
  rule.url = current.join('|')
  const key = String(rule.id)
  patternInputs[key] = chip
  patternErrors[key] = ''
  Settings.saveDebounced(150)
}

function setRuleMode(rule: DomainTreeRuleConfig, mode: DomainTreeRuleMode): void {
  rule.mode = mode
  Settings.saveDebounced(150)
}

function setRuleSubTrees(rule: DomainTreeRuleConfig, val: boolean): void {
  rule.enableSubTrees = val
  Settings.saveDebounced(150)
}

function setRuleGroupParentDomain(rule: DomainTreeRuleConfig, val: boolean): void {
  rule.groupParentDomain = val
  Settings.saveDebounced(150)
}

function setRulePinToTop(rule: DomainTreeRuleConfig, val: boolean): void {
  rule.pinToTop = val
  Settings.saveDebounced(150)
}

function setRulePanel(rule: DomainTreeRuleConfig, panelId: ID): void {
  rule.panelId = panelId
  Settings.saveDebounced(150)
}

function setRuleColor(rule: DomainTreeRuleConfig, color: string): void {
  rule.color = color
  Settings.saveDebounced(150)
}

async function recalcDomainTrees(): Promise<void> {
  const winId = Windows.lastFocusedId !== NOID ? Windows.lastFocusedId : Windows.id
  await IPC.sidebar(winId, 'recalcDomainTrees')
}

const copyLogsBtnLabel = ref(translate('settings.domain_trees_copy_logs'))
let copyLogsTimeout: number | undefined

async function fetchDomainTreesLogs(): Promise<string> {
  const winId = Windows.lastFocusedId !== NOID ? Windows.lastFocusedId : Windows.id
  let logs = ''
  try {
    logs = await IPC.sidebar(winId, 'getDomainTreesLogs')
  } catch {
    // fallback
  }
  if (!logs) {
    try {
      const stored = await browser.storage.local.get<{ domainTreesLogs?: any[] }>('domainTreesLogs')
      if (stored?.domainTreesLogs?.length) {
        logs = stored.domainTreesLogs
          .map((e: any) => `[${e.timestamp}] [${e.level}] [${e.tag}] ${e.message}`)
          .join('\n')
      }
    } catch {
      // ignore
    }
  }
  return logs || 'No domain tree logs recorded yet.'
}

async function viewDomainTreesLogs(): Promise<void> {
  const logs = await fetchDomainTreesLogs()
  SetupPage.reactive.detailsTitle = translate('settings.domain_trees_view_logs')
  SetupPage.reactive.detailsText = logs
  SetupPage.reactive.detailsMode = 'view'
}

async function copyDomainTreesLogs(): Promise<void> {
  const logs = await fetchDomainTreesLogs()
  try {
    await navigator.clipboard.writeText(logs)
    copyLogsBtnLabel.value = translate('settings.domain_trees_logs_copied')
    clearTimeout(copyLogsTimeout)
    copyLogsTimeout = setTimeout(() => {
      copyLogsBtnLabel.value = translate('settings.domain_trees_copy_logs')
    }, 2000) as unknown as number
  } catch {
    viewDomainTreesLogs()
  }
}

async function clearDomainTreesLogs(): Promise<void> {
  const winId = Windows.lastFocusedId !== NOID ? Windows.lastFocusedId : Windows.id
  try {
    await IPC.sidebar(winId, 'clearDomainTreesLogs')
  } catch {
    // ignore
  }
  try {
    await browser.storage.local.remove('domainTreesLogs')
  } catch {
    // ignore
  }
  if (SetupPage.reactive.detailsTitle === translate('settings.domain_trees_view_logs')) {
    SetupPage.reactive.detailsText = 'Logs cleared.'
  }
}

onMounted(() => {
  ensureNormalizedDomainTreeRules()

  SetupPage.registerEl('settings_tabs', el.value)
  SetupPage.registerEl('settings_new_tab_position', newTabPosEl.value)
  SetupPage.registerEl('settings_pinned_tabs', pinTabsEl.value)
  SetupPage.registerEl('settings_tabs_tree', tabsTreeEl.value)
  SetupPage.registerEl('settings_domain_trees', domainTreesEl.value)
  SetupPage.registerEl('settings_tabs_colorization', tabsColorEl.value)
  SetupPage.registerEl('settings_tabs_preview', tabsPreviewEl.value)
  SetupPage.registerEl('settings_tabs_native', nativeTabsEl.value)

  badgeRulesEl.value?.recalcTextHeight()
  validateTabsBadgeRules(Settings.state.tabsBadgeRules)
})
</script>
