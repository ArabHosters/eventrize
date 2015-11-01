var args = arguments[0] || {};



/*
for (var i = 0; i < 4; i++) {

	var newsRow = Alloy.createModel('news', {
		image : "http://www.zastavki.com/pictures/originals/2013/Photoshop_Image_of_the_horse_053857_.jpg",
		title : "Tiltle1",
		short_desc : "AAAAA",
		date : new Date()
	});
	
	newsRow.save();

}*/


Alloy.Collections.news.fetch();
