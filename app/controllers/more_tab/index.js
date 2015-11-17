Alloy.Collections.pages.fetch({
  urlparams: {
    'filter[connected_items]': Alloy.Globals.lastActiveEvent.id
  },
  sql: {
    where: {
      event_id: Alloy.Globals.lastActiveEvent.id
    },
    orderBy: "menu_order ASC"
  }
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
