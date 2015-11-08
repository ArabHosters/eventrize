var args = arguments[0] || {},
  rowIndexer = 0;

function agendaTransfomer(model) {
  var transform = model.toJSON();

  transform.prettyStartDate = require('alloy/moment')(transform.startdate).format('h:mm a');
  transform.showLineView = (rowIndexer++ !== 0);

  return transform;
}

function onItemClick(e) {}

$.agendaCollection.fetch({
  query: {
    statement: 'SELECT * from ' + $.agendaCollection.config.adapter.collection_name + ' where event_id = ?',
    params: [Alloy.Globals.lastActiveEvent.id]
  }
});
