var args=arguments[0]|| {};
//implement pull to refresh
function myRefresher(e) {
Alloy.Collections.news.fetch({
success:e.hide,error:e.hide
});
}
$.ptr.refresh();
//------------------------------------------------------------------------------
/*for (var i = 0; i < 2; i++) {
var newsRow = Alloy.createModel('news', {
image : "http://i.imgur.com/yxu9fZ1.jpg",
title : "Tiltle1",
short_desc : "AAAAA",
date : new Date()
});
newsRow.save();
}*/
//Alloy.Collections.news.fetch();
//--------------------------------------------------------------------------------
// NOTE: do not use: var myLoader = function(e) {
function myLoader(e) {

var ln=Alloy.Collection.news.models.length;

Alloy.Collections.news.fetch({
// whatever your sync adapter needs to fetch the next page

data: {
offset:ln
},
// don't reset the collection, but add to it

add:true,success: function(col) {
// call done() when we received last page - else success()
(col.models.length===ln)?e.done():e.success();
},
// call error() when fetch fails
error: function(col) {
// pass optional error message to display
e.error(L('isError','Tap to try again...'));
}
});
}
$.is.init($.list);
//-------------------------------------------------------------------------------


