var args = arguments[0] || {},
  Map = require('ti.map');

$.mapView.region = {
  latitude: Alloy.Globals.lastActiveEvent.latitude,
  longitude: Alloy.Globals.lastActiveEvent.longitude,
  zoom: Alloy.Globals.lastActiveEvent.mapZoom
};
console.log(Alloy.Globals.lastActiveEvent.venueThumbnail);
// Add venue location
var myAnnotation = Map.createAnnotation({
  title: Alloy.Globals.lastActiveEvent.venueTitle,
  subtitle: Alloy.Globals.lastActiveEvent.venueAddress,
  latitude: Alloy.Globals.lastActiveEvent.latitude,
  longitude: Alloy.Globals.lastActiveEvent.longitude,
  leftButton: Alloy.Globals.lastActiveEvent.venueThumbnail,
  myid: 1
});
$.mapView.addAnnotation(myAnnotation);
myAnnotation.fireEvent('click');
