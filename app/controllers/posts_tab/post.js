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

function updateScrolls(e) {
  e.cancelBubble = true;
  if (e.source !== $.mainTable) {
    return;
  }
  $.featuredImageWidget.updateScroll(e);
}
