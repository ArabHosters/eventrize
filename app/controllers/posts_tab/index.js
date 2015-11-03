var args = arguments[0] || {};

//implement pull to refresh
function fetchPostsCollection(e) {
  Alloy.Collections.posts.fetch({
    urlparams: {
      per_page: Alloy.CFG.posts.per_page,
      page: 1
    },
    sql: {
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
      page: parseInt(ln / 10) + 1
    },
    // don't reset the collection, but add to it
    add: true,
    silent: true,
    returnExactServerResponse: true,
    success: function(col) {
      // call done() when we received last page - else success()
      (col.models.length === ln) ? e.done(): e.success();
    },
    // call error() when fetch fails
    error: e.error
  });
}

$.is.init($.list);
