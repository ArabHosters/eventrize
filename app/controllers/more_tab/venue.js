var Map = require('ti.map');

$.mapView.region = {
	latitude: Alloy.Globals.lastActiveEvent.latitude,
	longitude: Alloy.Globals.lastActiveEvent.longitude,
	zoom: Alloy.Globals.lastActiveEvent.mapZoom
};

// Add venue location
var myAnnotation = Map.createAnnotation({
	latitude: Alloy.Globals.lastActiveEvent.latitude,
	longitude: Alloy.Globals.lastActiveEvent.longitude,
	myid: 1,
	title: Alloy.Globals.lastActiveEvent.venueTitle,
	subtitle: Alloy.Globals.lastActiveEvent.venueAddress,
	leftView: Ti.UI.createImageView({
		image: Alloy.Globals.lastActiveEvent.venueThumbnail,
		width: 70,
		height: 70
	})
});

$.mapView.addAnnotation(myAnnotation);
