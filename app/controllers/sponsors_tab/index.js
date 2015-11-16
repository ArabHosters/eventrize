var args = arguments[0] || {};

function openUrl(e) {
  if (e.source.link) {
    var dialog = Ti.UI.createAlertDialog({
      title: L('openSponsorLinkAlertDialogTitle'),
      message: L('openSponsorLinkAlertDialogMessage'),
      buttonNames: [L('cancelButton'), L('OK')],
      cancel: 0
    });

    dialog.addEventListener('click', function(ev) {
      if (ev.index === ev.cancel) {
        return;
      }

      Titanium.Platform.openURL(e.source.link);
    });

    dialog.show();
  }
}

$.sponsorsSliderCollection.fetch({
  query: {
    statement: 'SELECT * from ' + $.sponsorsSliderCollection.config.adapter.collection_name + ' where event_id = ? limit 4',
    params: [Alloy.Globals.lastActiveEvent.id]
  }
});
$.sponsorsGridCollection.fetch({
  query: {
    statement: 'SELECT * from ' + $.sponsorsGridCollection.config.adapter.collection_name + ' where event_id = ? limit 4, 99',
    params: [Alloy.Globals.lastActiveEvent.id]
  },
  success: function(collection) {

    var color = '#E5E5E5';

    _.each(collection.models, function(model, key) {

      // Switch color
      if (key % 3 === 0) {
        color = color === '#F2F2F2' ? '#E5E5E5' : '#F2F2F2';
      }

      $.gridDeals.addItem(Alloy.createController('sponsors_tab/image', {
        data: model.toJSON(),
        color: color
      }).getView());
    });
  }
});
