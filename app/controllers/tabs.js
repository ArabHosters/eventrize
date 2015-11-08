var args = arguments[0] || {},
  tabs = [];

Alloy.Globals.lastActiveEvent = args.eventModelJSON;

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

// Set tabs into the TabGroup
$.tabs.tabs = tabs;
tabs = null;

// In case we have only 1 event, no need to return back to last screen, close app directly
if (args.eventsCount === 1) {
  $.tabs.addEventListener('androidback', Alloy.Globals.androidBackPressedToExitTheApp);
}

// Let the tabs rock the ram
$.tabs.open();
