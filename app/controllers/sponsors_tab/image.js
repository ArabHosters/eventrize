var args = arguments[0] || {};

$.myImage.image = args.data.thumbnail;
$.image.backgroundColor = args.color;

function openUrl() {

  if (args.data.link) {
    var dialog = Ti.UI.createAlertDialog({
      title: L('openSponsorLinkAlertDialogTitle'),
      message: L('openSponsorLinkAlertDialogMessage'),
      buttonNames: [L('cancelButton'), L('OK')],
      cancel: 0
    });

    dialog.addEventListener('click', function(ev) {
      if (ev.index !== 1) {
        return;
      }

      Titanium.Platform.openURL(args.data.link);
    });

    dialog.show();
  }
}
