# Titanium UI - Rating

Rating control

xml

	<Widget id="rating" src="com.imobicloud.rating" class="rating" 
		clickable="true" value="3" onChange="ratingChange"/>
	
tss

	".rating": { width: Titanium.UI.SIZE, height: 13.66, top: 2.33, left: 0, layout: 'horizontal',
		Star: { width: 15, height: 13.66, left: 0.33, touchEnabled: false },
		StarEmpty: { image: '/images/star.png' },
		StarFull:  { image: '/images/star-full.png' },
		StarHalf:  { image: '/images/star-half.png' } 
	}
		
	/*
	// use iconfont for star icon
	".rating": { width: Titanium.UI.SIZE, height: 13.66, top: 2.33, left: 0, layout: 'horizontal',
		Star: { width: Ti.UI.SIZE, left: 3.5, right: 3.5, touchEnabled: false,
			color: '#fff', font: { fontSize: 13, fontFamily: 'sportsmap_iconfont' } },
		StarEmpty: { text: 'star_e' },
		StarFull:  { text: 'star_f' },
		StarHalf:  {  } 
	}
	*/
		
js

	// load value manualy
	$.rating.load({ value: 3 });
	
	/*
	// use iconfont for checkbox's icon
	// https://github.com/imobicloud/libs/blob/master/iconfont.js
	$.rating.load({ value: 3, module: require('iconfont') });
	*/
	
	// get value
	$.rating.getValue(); // 1, 2, ..., 5
	
	// set value
	$.rating.setValue(3);
	
	$.rating.unload();
	
	function ratingChange(e) { e.value }

Change log:
- 5/26/2016: 
	+ remove $ parameter of load function
	+ change tss
	