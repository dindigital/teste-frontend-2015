$(document).ready(function(){
	$('.bxSlider').bxSlider({
		auto: true,
		captions: true,
		pause: 5000
	});

	$('.slider1').bxSlider({
		slideWidth: 220,
		nextSelector: '#slider-next',
		prevSelector: '#slider-prev',
		captions: false,
		minSlides: 2,
		maxSlides: 6,
		slideMargin: 40
	});

});