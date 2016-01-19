(function($) {

	function isMobileWidth() {
		return $('#mobile-indicator').is(':visible');
	}

	$('#header__icon').click(function(e){
		e.preventDefault();
		$('body').toggleClass('with--sidebar');
	});

	$('#site-cache').click(function(e){
		$('body').removeClass('with--sidebar');
	});

	// Checking if it is mobile

	$('nav .has-submenu').click(function(e){
		if (isMobileWidth()) {
			e.preventDefault();
			$(this).find('.submenu').toggleClass('submenu--active').slideToggle('fast');
		}
	});

	/* Responsive Events Reaction */

	$(window).resize(function() {
	    if(this.resizeTO) clearTimeout(this.resizeTO);
	    this.resizeTO = setTimeout(function() {
	        $(this).trigger('resizeEnd');
	    }, 500);
	});

	$(window).bind('resizeEnd', function() {
		if (!isMobileWidth()) {
			$('nav .has-submenu > .submenu').removeAttr('style');
		}
	});

	$(document).ready( function(){

		/* FlexSlider Initialization */
		var mainSlider = $('#main-slider');
		mainSlider.flexslider({
			animation: 'slide',
			directionNav: false,
			slideshowSpeed: 3000,
			pauseOnHover: false
		});
	});

})(jQuery);
