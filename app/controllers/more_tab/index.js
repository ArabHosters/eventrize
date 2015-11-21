var loadEvent = OS_IOS ? 'focus' : 'selected';
$.index.addEventListener(loadEvent, function init() {
  $.index.removeEventListener(loadEvent, init);

  Alloy.Collections.pages.fetch({
    urlparams: {
      'filter[connected_items]': Alloy.Globals.lastActiveEvent.id,
      'lang': Ti.Locale.currentLanguage
    },
    sql: {
      where: {
        event_id: Alloy.Globals.lastActiveEvent.id,
        lang: Ti.Locale.currentLanguage
      },
      orderBy: "menu_order ASC"
    },
    localOnly: !Ti.Network.online
  });
});

function onItemClick(e) {
  switch (e.sectionIndex) {
    case 0:
      $.index.open(Alloy.createController('posts_tab/post', {
        $model: Alloy.Collections.pages.at(e.itemIndex)
      }).getView());
      break;
    case 1:
      $.index.open(Alloy.createController(e.section.getItemAt(e.itemIndex).properties.controllerToOpen).getView());
      break;
  }
}
