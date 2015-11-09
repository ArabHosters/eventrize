Alloy.Collections.pages.fetch();

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
