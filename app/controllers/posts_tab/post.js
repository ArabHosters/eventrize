var args = arguments[0] || {};

function shareButtonClicked(e) {
  // share text status
  require('com.alcoapps.socialshare').share({
    status: $model.title,
    image: $model.featured_image,
    url: $model.link,
    androidDialogTitle: L('shareDialogTitle')
  });
}
