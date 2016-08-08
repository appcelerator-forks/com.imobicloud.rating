var args = $.args;
var module;

var measurement;
if (OS_ANDROID) {
	measurement = require('alloy/measurement');
}

init();
function init() {
	var container = $.container;
	
  	var exclude = ['id', 'clickable', 'value', 'Star', 'StarEmpty', 'StarFull', 'StarHalf'];
    container.applyProperties( _.omit(args, exclude) );
    
	args.clickable && container.addEventListener('click', ratingClick);
    
    args.value != null && loadStars();
}

/*
 params = {
 	value: 0,
 	clickable: null,
 	module: null // use iconfont module for icon. ex: require('iconfont')
 }
 * */
exports.load = function(params) {
	unloadStars();
	
	args.value = params.value;
	
	if (params.clickable != null) {
		args.clickable = params.clickable;
   		$.container[ params.clickable ? 'addEventListener' : 'removeEventListener' ]('click', ratingClick);
	}
	
	module = params.module;
	loadStars();
};

exports.unload = function() {
	args.clickable && $.container.removeEventListener('click', ratingClick);
	unloadStars();
	args = null;
	module = null;
};

function unloadStars() {
  	$.container.removeAllChildren();
}

function loadStars() {
  	var container = $.container;
	for (var i=0; i < 5; i++) {
		var starStyle = _.extend({ touchEnabled: false }, args.Star, getStyles(i));
	  	if (module == null) {
			container.add( $.UI.create('ImageView', starStyle) );
		} else {
			container.add( module.createLabel(starStyle) );
		}
	};
}

function getStyles(i) {
  	var styles = args.StarEmpty;
  	var value = args.StarHalf ? args.value: Math.floor(args.value);
  	
	if (i < value) {
		if (value - i > 0.5) {
			styles = args.StarFull;
		} else {
			styles = args.StarHalf;
		}
	}
	return styles;
}

function ratingClick(e) {
	var touchX = e.x;
	if (OS_ANDROID) {
		touchX = measurement.pxToDP(touchX);
	}
	
	var width = $.container.rect.width / 5;
  	var _value = Math.ceil(touchX / width);
  	
  	if (_value != args.value) {
  		setValue(_value);
  		$.trigger('change', { value: _value });
  	}
}

function setValue(_value) {
	args.value = _value;
	
  	var children = $.container.children;
  	for(var i=0,j=children.length; i<j; i++){
  		var starStyle = getStyles(i);
  		if (module && starStyle.text) {
	  		starStyle.text = module.getText(starStyle.text);
		}
  		children[i].applyProperties(starStyle);
	};
}
exports.setValue = setValue;

exports.getValue = function() {
	return args.value;
};
