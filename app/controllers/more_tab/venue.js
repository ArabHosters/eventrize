var args = arguments[0] || {},
  Map = require('ti.map');

$.mapView.region = {
  latitude: Alloy.Globals.lastActiveEvent.latitude,
  longitude: Alloy.Globals.lastActiveEvent.longitude,
  zoom: 14
};

// Add venue location
$.mapView.addAnnotation(Map.createAnnotation({
  title: Alloy.Globals.lastActiveEvent.venueTitle,
  subtitle: Alloy.Globals.lastActiveEvent.location,
  latitude: Alloy.Globals.lastActiveEvent.latitude,
  longitude: Alloy.Globals.lastActiveEvent.longitude,
  pincolor: Map.ANNOTATION_RED,
  myid: 1
}));
