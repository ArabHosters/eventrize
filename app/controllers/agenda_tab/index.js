var args = arguments[0] || {};

function agendaTransfomer(model) {
  var transform = model.toJSON();

  transform.prettyStartDate = require('alloy/moment')(transform.startdate).format('h:mm a');
  return transform;
}

function onItemClick(e) {}

$.agendaCollection.fetch();
