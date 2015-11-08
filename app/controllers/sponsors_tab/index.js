var args = arguments[0] || {};

function openUrl(e) {
  if (e.source.link) {
    var dialog = Ti.UI.createAlertDialog({
      title: L('openSponsorLinkAlertDialogTitle'),
      message: L('openSponsorLinkAlertDialogMessage'),
      buttonNames: [L('cancelButton'), L('OK')],
      cancel: 0
    });

    dialog.addEventListener('click', function(e) {
      if (e.index === e.cancel) {
        return;
      }

      Ti.Platform.openURL(e.source.link);
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
    statement: 'SELECT * from ' + $.sponsorsGridCollection.config.adapter.collection_name + ' where event_id = ? limit 99, 4',
    params: [Alloy.Globals.lastActiveEvent.id]
  }
});
