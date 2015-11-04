Alloy.Collections.pages.fetch();

function onItemClick(e) {
  $.index.open(Alloy.createController('posts_tab/post', {
    data: Alloy.Collections.pages.at(e.itemIndex).toJSON()
  }).getView());
}
