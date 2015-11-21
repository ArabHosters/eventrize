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

Alloy.Globals.decodeHTMLEntities = function(text) {
  // Remove all tags, dublicated spaces, return back curly qoutes
  return text.replace(/(<([^>]+)>)/gi, '').replace(/(\[([^\]]+)\])/gi, '').replace(/(?:&nbsp;|\s)+/gi, ' ').replace(/&#8221;/g, '“').replace(/&#8220;/g, '”');
};

// Get device lang or last selected language and set it to moment and local
var lang = Ti.App.Properties.getString('languageFlag', Ti.Locale.currentLanguage);
require('com.shareourideas.locale').setLocale(lang);
// Set moment language
if (Ti.Locale.currentLanguage === 'ar') {
  var moment = require('alloy/moment');
  moment.lang("ar-sa");
}

// load mirroring file
require('mirroring').generate();

// Change language event handler
Alloy.Globals.changeLanguageButtonClicked = function() {
  var changeLanguageDialog = Ti.UI.createAlertDialog({
    title: L('changeLanguageDialogTitle'),
    message: L('changeLanguageDialogMessage'),
    cancel: 2,
    buttonNames: [L('arabicLanguageButton'), L('englishLanguageButton'), L('cancelButton')]
  });
  changeLanguageDialog.addEventListener('click', function(e) {
    if (e.index < 2) {

      // get selected language
      var lang = e.index === 0 ? 'ar' : 'en';

      // Android forget the value after app terminated, let's save in ourselves
      Ti.App.Properties.setString('languageFlag', lang);

      // Overwrite system locale
      require('com.shareourideas.locale').setLocale(lang);

      // Set moment language
      if (Ti.Locale.currentLanguage === 'ar') {
        var moment = require('alloy/moment');
        moment.lang("ar-sa");
      }

      // re-load mirroring file
      require('mirroring').generate();

      // Restart the window stack
      Alloy.Globals.restart();
    }
  });
  changeLanguageDialog.show();
};

// Push notifications
/*if (OS_ANDROID) {
  // set android-only options
  var pnOptions = {
    senderId: Alloy.CFG.api.GCMSenderId, // It's the same as your project id
    notificationSettings: {
      //sound: 'mysound.mp3', // Place soudn file in platform/android/res/raw/mysound.mp3
      smallIcon: 'appicon.png', // Place icon in platform/android/res/drawable/notification_icon.png
      largeIcon: 'appicon.png', // Same
      vibrate: true, // Whether the phone should vibrate
      insistent: true, // Whether the notification should be insistent
      group: 'News', // Name of group to group similar notifications together
      localOnly: false, // Whether this notification should be bridged to other devices
      priority: 2 // Notification priority, from -2 to 2
    }
  };

} else if (OS_IOS) { // set ios-only options.
  // Sets interactive notifications as well if iOS8 and above. Interactive notifications is optional.
  if (parseInt(Ti.Platform.version.split(".")[0], 10) >= 8) {
    var thumbUpAction = Ti.App.iOS.createUserNotificationAction({
      identifier: "THUMBUP_IDENTIFIER",
      title: L("pushNotificationAgreeNotificationActionTitle"),
      activationMode: Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_BACKGROUND,
      destructive: false,
      authenticationRequired: false
    });

    var thumbDownAction = Ti.App.iOS.createUserNotificationAction({
      identifier: "THUMBDOWN_IDENTIFIER",
      title: L("pushNotificationDisagreeNotificationActionTitle"),
      activationMode: Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_BACKGROUND,
      destructive: false,
      authenticationRequired: false
    });

    var thumbUpDownCategory = Ti.App.iOS.createUserNotificationCategory({
      identifier: "THUMBUPDOWN_CATEGORY",
      // The following actions will be displayed for an alert dialog
      actionsForDefaultContext: [thumbUpAction, thumbDownAction],
      // The following actions will be displayed for all other notifications
      actionsForMinimalContext: [thumbUpAction, thumbDownAction]
    });

    var pnOptions = {
      types: [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND],
      categories: [thumbUpDownCategory]
    };
  } else { //No support for interactive notifications, omit categories
    var pnOptions = {
      types: [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND]
    };
  }
}

// set cross-platform event
var onReceive = function(event) {
  Ti.UI.createAlertDialog({
    title: event.title,
    message: event.message
  }).show();
};

// Create instance with base url
var tiPush = require('ti-push-notification').init({
  backendUrl: Alloy.CFG.baseurl + Alloy.CFG.api.pushNotification
});

// register this device
tiPush.registerDevice({
  pnOptions: pnOptions,
  onReceive: onReceive
});*/
