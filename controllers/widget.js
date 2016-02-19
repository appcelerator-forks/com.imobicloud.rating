var G, params;

init(arguments[0] || {});
function init(args) {
	var container = $.getView();
	
  	var exclude = ['id', 'clickable'];
    container.applyProperties( _.omit(args, exclude) );
    
    if (args.clickable == 'true') {
    	container.addEventListener('click', ratingClick);
    }
}

/*
 _params = {
 	value: 0,
 	module: null // use iconfont module for icon. ex: require('iconfont')
 }
 * */
exports.load = function(_G, _params) {
	params && $.container.removeAllChildren();
	
	G = _G;
	params = _params;
	
	var container = $.getView();
	for (var i=0; i < 5; i++) {
		var starStyle = { classes: 'imc-rating-star ' + getClass(i), touchEnabled: false };
	  	if (params.module == null) {
			container.add( _G.UI.create('ImageView', starStyle) );
		} else {
			container.add( _params.module.createLabel( G.createStyle(starStyle) ) );
		}
	};
};

exports.unload = function() {
	$.container.removeAllChildren();
	G = params = null;
};

function getClass(i) {
  	var classes = 'imc-rating-empty';
	if (i < params.value) {
		if (params.value - i > 0.5) {
			classes = 'imc-rating-full';
		} else {
			classes = 'imc-rating-half';
		}
	}
	return classes;
}

function ratingClick(e) {
	var width = $.getView().rect.width / 5;
  	var _value = Math.ceil(e.x / width);
  	setValue(_value);
}

function setValue(_value) {
	params.value = _value;
	
  	var children = $.getView().children;
  	for(var i=0,j=children.length; i<j; i++){
  		var starStyle = G.createStyle({ classes: getClass(i) });
  		if (params.module && starStyle.text) {
	  		starStyle.text = params.module.getText(starStyle.text);
		}
  		children[i].applyProperties(starStyle);
	};
}
exports.setValue = setValue;

exports.getValue = function() {
	return params.value;
};