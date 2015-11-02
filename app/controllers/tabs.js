var args = arguments[0] || {};

// Load tabs depend on configs
_.each(Alloy.CFG.tabs, function(tabName) {
  var controllerName = tabName + '_tab/index';

  // Using try in case we don't have this controller
  try {
    $.tabs.addTab(Alloy.createController(controllerName).getView());
  } catch (exp) {
    Ti.API.error("Can't catch controller:", controllerName);
  }
});

// Only with iOS load pages as tabs from pages collection
if (OS_IOS) {
  // Load pages
  var pages = Alloy.createCollection('pages');
  pages.fetch({
    success: function(collection) {
      var tabsArray = [];
      _.each(collection.models, function(pageModel) {
        $.tabs.addTab(Alloy.createController('pages_tab/index', pageModel.toJSON()).getView());
      });
    }
  });
} else if (OS_ANDROID) {
  $.tabs.addTab(Alloy.createController("pages_tab/index").getView());
}
