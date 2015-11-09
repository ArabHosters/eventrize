var moment = require('alloy/moment');
if (Ti.Locale.currentLanguage === 'ar') {
  require('alloy/moment/lang/ar');
  moment.lang(Ti.Locale.currentLanguage);
}

Alloy.Globals.androidBackPressedToExitTheApp = function() {
  if (OS_ANDROID) {
    var win = Ti.UI.createWindow({
      exitOnClose: true
    });
    win.addEventListener('open', function() {
      win.close();
    });
    win.open();
  }
};
