var args = arguments[0] || {};

$.mainImageView.image = args.data.featured_image;
$.nameLabel.text = args.data.name;
$.titleLabel.text = args.data.title;
