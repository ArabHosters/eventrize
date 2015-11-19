// Open the landing page, will use it to restart app while change language
$.index.open({
  animated: false
});

// Star loading play
$.loadingImageView.start();

// Open app home
var eventWindow = Alloy.createController('events').getView();

Alloy.Globals.restart = function() {

  if (Alloy.Globals.tabs) {

    // Close events after closing tabs
    Alloy.Globals.tabs.addEventListener('close', function() {

      // Create anothe events controller after close current
      eventWindow.addEventListener('close', function() {
        eventWindow = Alloy.createController('events').getView();
      });
      try {
        eventWindow.close();
      } catch (exp) {
        Ti.API.warn('Maybe we have 1 event!');
      }
    });

    Alloy.Globals.tabs.close();
  }
};
