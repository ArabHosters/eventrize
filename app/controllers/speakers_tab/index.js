var args = arguments[0] || {};

function speakersTransfomer(model) {
  var transform = model.toJSON();

  transform.prettyStartDate = require('alloy/moment')(transform.startdate).format('h:mm a');
  return transform;
}

function onItemClick(e) {
  $.index.open(Alloy.createController('speakers_tab/child', {
    $model: $.speakersCollection.get(e.section.getItemAt(e.itemIndex).properties.myId)
  }).getView());
}

$.speakersCollection.fetch({
  query: {
    statement: 'SELECT * from ' + $.speakersCollection.config.adapter.collection_name + ' where event_id = ? and lang = ? order by menu_order ASC',
    params: [Alloy.Globals.lastActiveEvent.id, Ti.Locale.currentLanguage]
  }
});
