var args = arguments[0] || {};

//implement pull to refresh
function fetchPostsCollection(e) {
  Alloy.Collections.posts.fetch({
    urlparams: {
      per_page: Alloy.CFG.posts.per_page,
      page: 1,
      'filter[connected_items]': Alloy.Globals.lastActiveEvent.id
    },
    sql: {
      where: {
        event_id: Alloy.Globals.lastActiveEvent.id
      },
      orderBy: "date DESC"
    },
    success: e.hide,
    error: e.hide
  });
}

$.ptr.refresh();

function fetchMorePostsCollection(e) {
  var ln = Alloy.Collections.posts.models.length;
  Alloy.Collections.posts.fetch({
    // whatever your sync adapter needs to fetch the next page
    urlparams: {
      per_page: Alloy.CFG.posts.per_page,
      page: parseInt(ln / 10) + 1,
      'filter[connected_items]': Alloy.Globals.lastActiveEvent.id
    },
    sql: {
      where: {
        event_id: Alloy.Globals.lastActiveEvent.id
      },
      orderBy: "date DESC"
    },
    // don't reset the collection, but add to it
    add: true,
    silent: true,
    returnExactServerResponse: true,
    success: function(col) {
      if (col.models.length === ln) {
        e.done();
      } else {
        e.success();
      }
    },
    // call error() when fetch fails
    error: e.error
  });
}

function postsTransfomer(model) {
  var transform = model.toJSON();

  transform.prettyDate = require('alloy/moment')(transform.date).fromNow();
  return transform;
}

function onItemClick(e) {

  var win = Alloy.createController('posts_tab/post', {
    $model: Alloy.Collections.posts.at(e.itemIndex)
  }).getView();

  $.index.open(win);
}

$.is.init($.list);

// Show back button to re-select event
if (OS_IOS && args.eventsCount > 1) {
  var backButton = Ti.UI.createButton({
    title: L('back')
  });
  backButton.addEventListener('click', function(e) {
    // Close TabGroup
    Alloy.Globals.tabGroup.close();
  });
  $.myWin.leftNavButton = backButton;
}
