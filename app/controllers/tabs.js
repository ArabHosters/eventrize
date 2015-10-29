var args = arguments[0] || {};

// Load tabs depend on configs
_.each(Alloy.CFG.tabs, function(tabName) {
  $.tabs.addTab(Alloy.createController(tabName + '_tab/index').getView());
});
