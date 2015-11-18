var args = arguments[0] || {};

function closeWindow() {
  $.child.close();
}

$.speakersModel.fetch({
  query: {
    statement: "SELECT sp.* from speakers as sp JOIN agenda_speakers agsp ON sp.id = agsp.speaker_id WHERE agsp.agenda_id = ? AND agsp.event_id = ? GROUP BY sp.id limit 1",
    params: [$model.id, Alloy.Globals.lastActiveEvent.id]
  }
});
