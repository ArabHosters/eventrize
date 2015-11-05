var args = arguments[0] || {};

function onItemClick(e) {
  // Open app home
  Alloy.createController('tabs', {
    eventModelJSON: Alloy.Collections.events.at(e.itemIndex).toJSON(),
    eventsCount: Alloy.Collections.events.length
  }).getView().open();
}

Alloy.Collections.events.fetch({
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
