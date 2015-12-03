function shareButtonClicked() {

  require('com.alcoapps.socialshare').share({
    status: $model.get('title') + "\n" + $model.get('link'),
    url: $model.get('link'),
    subject: $model.get('title'),
    text: $model.get('content') + "\n" + $model.get('link'),
    androidDialogTitle: L('shareDialogTitle')
  });
}
