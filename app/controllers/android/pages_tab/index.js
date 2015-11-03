Alloy.Collections.pages.fetch();

function onItemClick(e) {

  Alloy.createController('pages_tab/index', {
    data: Alloy.Collections.pages.at(e.itemIndex).toJSON()
  }).getView().open();
}
