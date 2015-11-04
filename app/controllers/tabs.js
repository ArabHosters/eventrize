var args = arguments[0] || {},
  tabs = [];

// Load tabs depend on configs
_.each(Alloy.CFG.tabs, function(tabName) {
  var controllerName = tabName + '_tab/index';

  // Using try in case we don't have this controller
  try {
    tabs.push(Alloy.createController(controllerName).getView());
  } catch (exp) {
    Ti.API.error("Can't catch controller:", controllerName, exp);
  }
});

$.tabs.tabs = tabs;
$.tabs.open();
