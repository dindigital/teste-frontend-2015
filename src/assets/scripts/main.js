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

/* =============================== *\
	 #Carousel
\* =============================== */

	/* Caching */

	var $carouselControls  = $('#carousel-controls'),
		$carousel 		 = $('#carousel'),
		$carouselBelt	 = $carousel.find('.carousel__belt'),
		$carouselProjects = $carouselBelt.find('.project');

	var $carouselPrev = $carouselControls.find('#carousel-prev'),
		$carouselNext = $carouselControls.find('#carousel-next');

	if( $carouselProjects.length > 4 ) {
		console.log("O tamanho é " + $carouselProjects.length);

		$carouselBelt.css('width', $carouselProjects.length * 275 + 'px');
	}

	var mgL = 0;

	$carouselControls.find('.control').click( function(ev) {
		ev.preventDefault();

		var $this = $(this);

		var total = ($carouselBelt.css('width').replace(/px/g, "") * 1) + ($carouselBelt.css('margin-left').replace(/px/g, "") * 1),
			width = $carousel.css('width').replace(/px/g, "");

			console.log('Total carousel size: ' + total);
			console.log('Carousel width: ' + width);

		if( total >= width ) {
			mgL = ((width / 2) + (30 * ($carouselProjects.length - 4))) * ($this.hasClass('control--prev') ? 0 : -1);
			console.log('mgL now should be ' + mgL);
			$carouselBelt.animate({
	          marginLeft: mgL
	        }, 500, "easeInOutQuad");
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
