var args = arguments[0] || {};

$.index.title = args.data.title;
$.contentLabel.text = args.data.content;
if (args.data.featured_image) {
  $.featuredImageView.image = args.data.featured_image;
}

function shareButtonClicked(e) {
  // share text status
  require('com.alcoapps.socialshare').share({
    status: args.data.title,
    image: args.data.featured_image,
    url: args.data.link,
    androidDialogTitle: L('shareDialogTitle')
  });
}
