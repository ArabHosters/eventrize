var args = arguments[0] || {},
  rowIndexer = 0;

function viewClicked(e) {
  $.index.open(Alloy.createController('agenda_tab/child', {
    $model: $.agendaCollection.get(e.source.myId)
  }).getView());
}

$.agendaCollection.fetch({
  query: {
    statement: 'SELECT * from ' + $.agendaCollection.config.adapter.collection_name + ' where event_id = ? order by startdate ASC',
    params: [Alloy.Globals.lastActiveEvent.id]
  }
});
