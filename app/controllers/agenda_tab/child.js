function closeWindow() {
  $.child.close();
}

$.speakersColection.fetch({
  query: {
    statement: "SELECT sp.* from speakers as sp JOIN agenda_speakers agsp ON sp.id = agsp.speaker_id WHERE agsp.agenda_id = ? AND agsp.event_id = ? and lang = ? GROUP BY sp.id",
    params: [$model.id, Alloy.Globals.lastActiveEvent.id, Ti.Locale.currentLanguage]
  },
  success: function(coll) {
    _.each(coll.models, function(model) {
      var viewToAdd = Alloy.createController('speakers_tab/image', {
        data: model.toJSON(),
        $model: model
      }).getView();

      viewToAdd.addEventListener('click', function() {

        // Close this modal window
        $.child.close();

        // Set speakers active tab
        Alloy.Globals.tabGroup.setActiveTab(Alloy.CFG.tabs.indexOf('speakers'));

        // Open the speaker in speakers tab
        Alloy.Globals.speakersTab.open(Alloy.createController('speakers_tab/child', {
          $model: model
        }).getView());
      });

      $.gridDeals.addItem(viewToAdd);
    });
  }
});
