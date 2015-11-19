var args = arguments[0] || {},
  rowIndexer = 0;

function viewClicked(e) {
  Alloy.createController('agenda_tab/child', {
    $model: $.agendaCollection.get(e.source.myId)
  }).getView().open({
    modal: true
  });
}

// Tabs click handler
function segmentBarClicked(e) {

  // If fired cos event only one day
  if (e === undefined) {
    $.agendaCollection.fetch({
      query: {
        statement: "SELECT * from " + $.agendaCollection.config.adapter.collection_name + " where event_id = ? and lang = ? order by startdate ASC",
        params: [Alloy.Globals.lastActiveEvent.id, Ti.Locale.currentLanguage]
      }
    });
  } else {

    // Mark clicked event background #ffffff
    _.each($.segmentBar.children, function(button, key) {
      if (button.dayNumber === e.source.dayNumber) {
        button.backgroundColor = '#ffffff';
      } else {
        button.backgroundColor = '#eeeeee';
      }
    });

    // Load data filtered by this day
    $.agendaCollection.fetch({
      query: {
        statement: "SELECT * from " + $.agendaCollection.config.adapter.collection_name + " where event_id = ? and date(startdate) = ? and lang = ? order by startdate ASC",
        params: [Alloy.Globals.lastActiveEvent.id, e.source.dayNumber, Ti.Locale.currentLanguage]
      }
    });
  }
}

function dataTransformer(model) {
  var modelData = model.toJSON();

  // Reformat date with localization
  modelData.dayNumberFormated = require('alloy/moment')(modelData.dayNumber).format('MMM-DD');

  // Set equal width
  modelData.width = Math.floor(100 / $.agendaDaysCollection.length) + '%';
  return modelData;
}

$.agendaDaysCollection.fetch({
  query: {
    statement: "SELECT *, date(startdate) dayNumber, count(*) ccc from " + $.agendaCollection.config.adapter.collection_name + " where event_id = ? and lang = ? group by dayNumber order by startdate ASC",
    params: [Alloy.Globals.lastActiveEvent.id, Ti.Locale.currentLanguage]
  },
  success: function(collection) {
    if (collection.length <= 1) {
      $.segmentBar.hide();
      segmentBarClicked();
    } else {

      // put tabs at the top or bottom
      $.containnerScrollView[OS_IOS ? 'top' : 'bottom'] = 40;

      segmentBarClicked({
        source: $.segmentBar.children[0]
      });
    }
  }
});
