var value, G;

init(arguments[0] || {});
function init(args) {
	var container = $.getView();
	
  	var exclude = ['id', 'clickable'];
    container.applyProperties( _.omit(args, exclude) );
    
    if (args.clickable == 'true') {
    	container.addEventListener('click', ratingClick);
    }
}

exports.load = function(_G, params) {
	G = _G;
	value = params.value;
	
	var container = $.getView();
	for (var i=0; i < 5; i++) {
	  	container.add( _G.UI.create('ImageView', { classes: 'imc-rating-star ' + getClass(i), touchEnabled: false }) );
	};
};

function getClass(i) {
  	var classes = 'imc-rating-empty';
	if (i < value) {
		if (value - i > 0.5) {
			classes = 'imc-rating-full';
		} else {
			classes = 'imc-rating-half';
		}
	}
	return classes;
}

function ratingClick(e) {
	var width = $.getView().rect.width;
	
  	var _value = Math.floor(e.x / width);
  	var remain = e.x / width - _value;
  	_value += remain > 0.5 ? 1 : (remain > 0.5 ? 0.5 : 0);	
  	
  	setValue(_value);
}

function setValue(_value) {
	value = _value;
	
  	var children = $.getView().children;
  	for(var i=0,j=children.length; i<j; i++){
  		children[i].applyProperties( G.createStyle({ classes: getClass(i) }) );
	};
}
exports.setValue = setValue;

exports.getValue = function() {
	return value;
};