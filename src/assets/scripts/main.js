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

	var $carouselControls = $('#carousel-controls'),
		$carousel 		  = $('#carousel'),
		$carouselBelt	  = $carousel.find('.carousel__belt'),
		$carouselProjects = $carouselBelt.find('.project');

	var $carouselPrev = $carouselControls.find('#carousel-prev'),
		$carouselNext = $carouselControls.find('#carousel-next');

	var cPL    = $carouselProjects.length,
		maxMgL = 0,
		mgL    = 0;

	var cW ;
	var cbW = 0;

	/* Calculates the carousel elements size based on the device dimensions */
	function calcCarousel(){
		var projW = 0;

		cW = $carousel.css('width').replace(/px/g, "") * 1;
		if( $carouselProjects.length > 4 ) {
				if( isMobileWidth() ){
				    cBW = cPL * ((cW + 25) / 3);
				} else {
					cBW = cPL * ((cW + 50) / 4);
				}

				console.log("cPL: " + cPL + ". cW: " + cW + ". cBW: " + cBW);
				$carouselBelt.css('width', cBW + 'px');
				maxMgL = cBW - $carousel.css('width').replace(/px/g, "");
				console.log('max negative mg left : ' + maxMgL);
		}

		if( isMobileWidth() && cBW > 0 ) {
			projW = (cW - (10 * 3)) / 3;
			$carouselProjects.each( function (idx) {
				$(this).css( 'width', projW + 'px' );
				$(this).css( 'height', projW * 0.725 + 'px');
			});
			$carousel.css('height', (projW * 0.725) + 5 + 'px');
		} else {
			$carousel.removeAttr('style');
			$carouselProjects.each( function (idx) {
				$(this).removeAttr('style');
			});
		}

		console.log("Carousel calculated. Now each item width is " + projW +"px.");

	} // ends calcCarousel()

	calcCarousel();

	$carouselControls.find('.control').click( function(ev) {
		ev.preventDefault();

		var $this = $(this);

		var left = ($carouselBelt.css('width').replace(/px/g, "") * 1) + ($carouselBelt.css('margin-left').replace(/px/g, "") * 1);

		console.log('Left width: ' + left + 'px. Carousel width: '+ cW + 'px');

		if( isMobileWidth() ) {
			mgL += cW * ($this.hasClass('control--prev') ? 1 : -1);
		} else {
			mgL += 550 * ($this.hasClass('control--prev') ? 1 : -1);
		}

		console.log('mgL now should be ' + mgL );
		if( mgL <= 0 && mgL >= -maxMgL ) {

			if( mgL <= 0) {
				$carouselBelt.animate({
		          marginLeft: mgL
		        }, 500, "easeInOutQuad");
			} else {
				mgL = 0;
			}
		} else if( mgL > 0 ) {
			mgL = 0;
		} else if ( mgL < -maxMgL ) {
			mgL = -maxMgL;
		}
		$carouselBelt.animate({
		          marginLeft: mgL
		        }, 350, "easeInOutQuad");
	});

	/*window.mySwipe = Swipe(document.getElementById('carousel'));*/

/* Responsive Events Reaction */

	$(window).resize(function() {
	    if(this.resizeTO) clearTimeout(this.resizeTO);
	    this.resizeTO = setTimeout(function() {
	        $(this).trigger('resizeEnd');
	    }, 500);
	});

	$(window).bind('resizeEnd', function() {
		calcCarousel();
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
