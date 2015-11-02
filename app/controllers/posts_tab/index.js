var args = arguments[0] || {};

//implement pull to refresh
function myRefresher(e) {
	Alloy.Collections.posts.fetch({
		success : e.hide,
		error : e.hide
	});
}

$.ptr.refresh();

function myLoader(e) {
	var ln = Alloy.Collections.posts.models.length;
	Alloy.Collections.posts.fetch({
		// whatever your sync adapter needs to fetch the next page
		data : {
			//offset : ln
		},
		// don't reset the collection, but add to it
		add : true,
		success : function(col) {
			// call done() when we received last page - else success()
			(col.models.length === ln) ? e.done() : e.success();
		},
		// call error() when fetch fails
		error : function(col) {
			// pass optional error message to display
			e.error(L('isError', 'Tap to try again...'));
		}
	});
}

$.is.init($.list);
