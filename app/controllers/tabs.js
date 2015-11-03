var args = arguments[0] || {},
  tabs = [];

// Load tabs depend on configs
_.each(Alloy.CFG.tabs, function(tabName) {
  var controllerName = tabName + '_tab/index';

  // Using try in case we don't have this controller
  try {
    tabs.push(Alloy.createController(controllerName).getView());
  } catch (exp) {
    Ti.API.error("Can't catch controller:", controllerName);
  }
});

// Only with iOS load pages as tabs from pages collection
if (OS_IOS) {
  // Load pages
  var pages = Alloy.createCollection('pages');
  pages.fetch({
    localOnly: true,
    success: function(collection) {
      var tabsArray = [];
      _.each(collection.models, function(pageModel) {
        tabs.push(Alloy.createController('pages_tab/index', {
          data: pageModel.toJSON()
        }).getView());
      });
      $.tabs.tabs = tabs;
      $.tabs.open();
    },
    error: function() {
      $.tabs.tabs = tabs;
      $.tabs.open();
    }
  });
} else if (OS_ANDROID) {
  tabs.push(Alloy.createController("pages_tab/index").getView());
  $.tabs.tabs = tabs;
  $.tabs.open();
}
