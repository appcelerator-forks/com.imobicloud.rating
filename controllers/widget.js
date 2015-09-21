var args = arguments[0],
	width = 24;

init();
function init() {
	var container = $.getView();
	
  	var exclude = ['id', 'children', 'clickable', 'value', 'size'];
    container.applyProperties( _.omit(args, exclude) );
    
    if (args.size) {
    	width = parseInt(args.size, 10);
    	container.height = width;
    	var children = container.children;
	  	for(var i=0,j=children.length; i<j; i++){
			children[i].applyProperties({ width: width, height: width });
		};
    }
    
    if (args.value != null) {
    	setValue( parseFloat(args.value) );
    }
    
    if (args.clickable == 'true') {
    	container.addEventListener('click', ratingClick);
    }
}

function ratingClick(e) {
  	var x = e.x,
  		halfWidth = width / 2,
  		children = this.children;
  		
  	for(var i=0,j=children.length; i<j; i++){
  		var image = '/images/star.png',
  			current = i * width;
		if (current < x) {
			if (x - current > halfWidth) {
				image = '/images/star-full.png';
			} else {
				image = '/images/star-half.png';
			}
		}
		children[i].children[0].image = WPATH(image);
	};
}

function setValue(value) {
  	var children = $.getView().children;
  	for(var i=0,j=children.length; i<j; i++){
  		var image = '/images/star.png';
		if (i < value) {
			if (value - i > 0.5) {
				image = '/images/star-full.png';
			} else {
				image = '/images/star-half.png';
			}
		}
		children[i].children[0].image = WPATH(image);
	};
}
exports.setValue = setValue;