// Open the landing page, will use it to restart app while change language
$.index.open({
  animated: false
});

// Star loading play
$.loadingImageView.start();

// Open app home
Alloy.createController('events').getView();
