var args = arguments[0] || {};

// Set statusBarStyle in case we got it from config file
if (OS_IOS && Alloy.CFG.style.selectEvent.statusBarStyle) {
  $.events.statusBarStyle = Titanium.UI.iPhone.StatusBar[Alloy.CFG.style.selectEvent.statusBarStyle];
}

function onItemClick(e) {
  // Open app home
  Alloy.createController('tabs', {
    eventModelJSON: Alloy.Collections.events.at(e.itemIndex).toJSON(),
    eventsCount: Alloy.Collections.events.length
  }).getView().open();
}

Alloy.Collections.events.fetch({
  urlparams: {
    lang: Ti.Locale.currentLanguage
  },
  sql: {
    orderBy: "start_date DESC",
    where: {
      lang: Ti.Locale.currentLanguage
    }
  },
  success: function(collection) {
    // If only one event
    if (collection.length === 1) {

      // Clean window databinding
      $.destroy();

      // Open this only 1 event
      Alloy.createController('tabs', {
        eventModelJSON: collection.at(0).toJSON(),
        eventsCount: collection.length
      }).getView().open();
    } else {

      // Show events window to list all events
      $.events.open();
    }
  }
});
