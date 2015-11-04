var moment = require('alloy/moment');
if (Ti.Locale.currentLanguage === 'ar') {
  require('alloy/moment/lang/ar');
  moment.lang(Ti.Locale.currentLanguage);
}
