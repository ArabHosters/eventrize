var args = arguments[0] || {};

function shareButtonClicked(e) {
  // share text status
  require('com.alcoapps.socialshare').share({
    status: $model.title,
    url: $model.link,
    androidDialogTitle: L('shareDialogTitle')
  });
}

$.speakersModel.fetch({
  query: {
    statement: "SELECT sp.* from speakers as sp JOIN agenda_speakers agsp ON sp.id = agsp.speaker_id WHERE agsp.agenda_id = ? AND agsp.event_id = ? GROUP BY sp.id",
    params: [$model.id, Alloy.Globals.lastActiveEvent.id]
  }
});
