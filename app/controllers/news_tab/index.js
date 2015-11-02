var args = arguments[0] || {};

//implement pull to refresh
function myRefresher(e) {
	setTimeout(function(){
		e.hide();
	}, 3000);
}

$.ptr.refresh();

function myLoader(e) {
	var ln = Alloy.Collections.news.models.length;
	Alloy.Collections.news.fetch({
		// whatever your sync adapter needs to fetch the next page
		data : {
			offset : ln
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
