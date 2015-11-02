var args=arguments[0]|| {};
function myRefresher(e) {
Alloy.Collections.news.fetch({
success:e.hide,error:e.hide
});
}
$.ptr.refresh();
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


