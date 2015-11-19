var args = arguments[0] || {};

function shareButtonClicked(e) {
  // share text status
  require('com.alcoapps.socialshare').share({
    status: $model.name,
    url: $model.link,
    androidDialogTitle: L('shareDialogTitle')
  });
}

// Social icons buttons
var socialData = JSON.parse($model.toJSON().speaker_social),
  colors = {
    'facebook': '#3b5998',
    'twitter': '#00aced',
    'google-plus': '#dd4b39',
    'linkedin': '#007bb5',
    'link': Alloy.CFG.style.mainColor,
    'youtube': '#bb0000',
    'instagram': '#125688',
    'whatsapp': '#4dc247',
    'pinterest': '#cb2027',
    'vine': '#00bf8f',
    'flickr': '#ff0084',
    'tumblr': '#32506d',
    'vk': '#45668e',
    'vimeo': '#aad450'
  };

function openUrl(e) {
  if (e.source.link) {
    var dialog = Ti.UI.createAlertDialog({
      title: L('openSpeakerLinkAlertDialogTitle'),
      message: L('openSpeakerLinkAlertDialogMessage'),
      buttonNames: [L('cancelButton'), L('OK')],
      cancel: 0
    });

    dialog.addEventListener('click', function(ev) {
      if (ev.index === 0) {
        return;
      }

      Titanium.Platform.openURL(e.source.link);
    });

    dialog.show();
  }
}

_.each(socialData, function(row) {
  if (row.social_url.length === 0) {
    return;
  }
  var iconLabelWidget = Alloy.createWidget('ti.ux.iconfont', 'widget', {
    width: 40,
    height: 40,
    left: 5,
    color: '#ffffff',
    borderRadius: 20,
    borderColor: '#ffffff',
    borderWidth: 3,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    backgroundColor: colors[row.stack_title] || 'silver',
    icon: 'fa-' + (row.stack_title || 'link'),
    link: row.social_url
  }).getView();

  $.iconsView.add(iconLabelWidget);
});
