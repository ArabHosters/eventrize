var args = arguments[0] || {};

function shareButtonClicked(e) {
  // share text status
  require('com.alcoapps.socialshare').share({
    status: $model.name,
    url: $model.link,
    androidDialogTitle: L('shareDialogTitle')
  });
}
