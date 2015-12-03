function listItemClicked(e) {
  Alloy.createController('agenda_tab/child', {
    $model: $.agendaCollection.get(e.section.getItemAt(e.itemIndex).properties.myId)
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
    _.each($.segmentBar.children, function(button) {
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


var index = 0;

function listDataTransformer(model) {
  var modelData = model.toJSON();

  modelData.iconImage = Alloy.createWidget('ti.ux.iconfont', 'widget', {
    width: 44,
    height: 44,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    color: Alloy.CFG.style.mainColor,
    icon: modelData.icon
  }).getView().toImage();

  return modelData;
}

function dataTransformer(model) {
  var modelData = model.toJSON();

  // Reformat date with localization
  var dateFormat = Ti.Locale.currentLanguage === 'ar' ? 'DD MMM' : 'MMM-D';
  modelData.dayNumberFormated = require('alloy/moment')(modelData.dayNumber).format(dateFormat);

  // Set equal width
  var width = Math.floor(100 / $.agendaDaysCollection.length);
  modelData.width = width + '%';
  modelData[Alloy.CFG.tss.common.left] = (width * index++) + '%';
  modelData[Alloy.CFG.tss.common.right] = null;
  return modelData;
}

var loadEvent = OS_IOS ? 'focus' : 'selected';
$.index.addEventListener(loadEvent, function init() {
  $.index.removeEventListener(loadEvent, init);

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
        if (OS_IOS) {
          $.list.top = 45;
          $.lineView.top = 67;
        } else if (OS_ANDROID) {
          $.list.bottom = 45;
        }

        segmentBarClicked({
          source: $.segmentBar.children[0]
        });
      }
    }
  });
});
