//Most basic standard view titanium properties.
//You can add any other TI property to be applied with method setTiProps
var TI_PROPS = [ "backgroundColor", "borderColor", "borderRadius", "borderWidth", "bottom", "bubbleParent", "center", "color", "height", "layout", "left", "opacity", "right", "tintColor", "top", "touchEnabled", "transform", "visible", "width", "zIndex", "textAlign" ];

exports.cleanArgs = function( args ) {
	// delete irrelevant args
	delete args.id;
	delete args.__parentSymbol;
	delete args.children;

	return args;
};

exports.setTiProps = function( _args, component ) {

	if( !component ) {
		return;
	}

	var args = _args || {},
	    prop = '',
	    i = 0;

	for( i,
	j = TI_PROPS.length; i < j; i += 1 ) {
		prop = TI_PROPS[ i ];
		if( typeof args[ prop ] !== "undefined" ) {
			//			Ti.API.info('applying prop ' + prop);
			component[ prop ] = args[ prop ];
			//		}else{
			//			Ti.API.info('not applyin ' + prop)
		}
	}
};
