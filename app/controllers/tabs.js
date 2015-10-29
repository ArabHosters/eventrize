var args = arguments[0] || {};

// Load tabs depend on configs
_.each(Alloy.CFG.tabs, function(tabName) {
  var controllerName = tabName + '_tab/index';
  try {
    $.tabs.addTab(Alloy.createController(controllerName).getView());
  } catch (exp) {
    Ti.API.error("Can't catch controller:", controllerName);
  }
});
