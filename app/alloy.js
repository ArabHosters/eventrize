if (Ti.Locale.currentLanguage === 'ar') {
  var moment = require('alloy/moment');
  require('alloy/moment/lang/ar');
  moment.lang(Ti.Locale.currentLanguage);
}
