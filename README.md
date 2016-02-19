# Titanium UI - Rating

Rating control

xml

	<Widget id="rating" src="com.imobicloud.rating" class="imc-rating" clickable="true"/>
	
tss

	".imc-rating": { width: Titanium.UI.SIZE, height: 12, top: 3, layout: 'horizontal' }
		".imc-rating-star": { width: 13, height: 12, left: 3.5, right: 3.5, touchEnabled: false }
		".imc-rating-empty": { image: '/images/v2/ui/star.png' }
		".imc-rating-full": { image: '/images/v2/ui/star-full.png' }
		
		/*
		// use iconfont for star icon
		".imc-rating-star": { width: Ti.UI.SIZE, left: 3.5, right: 3.5, touchEnabled: false,
			color: '#fff', font: { fontSize: 13, fontFamily: 'sportsmap_iconfont' } }
		".imc-rating-empty": { text: 'star_e' }
		".imc-rating-full": { text: 'star_f' }
		*/
		
js

	$.rating.load($, { value: 5 });
	
	/*
	// use iconfont for checkbox's icon
	// https://github.com/imobicloud/libs/blob/master/iconfont.js
	$.rating.load($, { value: rating, module: require('iconfont') });
	*/
	
	// get value
	$.rating.getValue(); // true or false
	
	// set value
	$.rating.setValue(3);
	
	$.rating.unload();