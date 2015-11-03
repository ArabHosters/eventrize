var args = arguments[0] || {};

$.index.title = $.postWindow.title = args.data.title;
$.contentLabel.text = args.data.content;
if (args.data.featured_image) {
  $.featuredImageView.image = args.data.featured_image;
}
