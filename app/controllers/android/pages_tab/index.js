Alloy.Collections.pages.fetch();

function onItemClick(e) {
  //var item = section[e.sectionIndex].getItemAt(e.itemIndex);

  Alloy.createController('posts_tab/post', Alloy.Collections.pages.at(e.itemIndex).toJSON()).getView().open();
}
