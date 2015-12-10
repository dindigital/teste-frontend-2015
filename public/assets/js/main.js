
$( document ).ready(function() {
    
	$('.icon-menu').click(function() {
		$('.menu-mobile').toggleClass( "menu-hide", 1000 );
	});

});
$(document).ready(function($) {
    $(function() {
        $('a').bind('click',function(event){
            var $anchor = $(this);

            $('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top}, 2000,'easeInOutExpo');

        // Outras Animações
        // linear, swing, jswing, easeInQuad, easeInCubic, easeInQuart, easeInQuint, easeInSine, easeInExpo, easeInCirc, easeInElastic, easeInBack, easeInBounce, easeOutQuad, easeOutCubic, easeOutQuart, easeOutQuint, easeOutSine, easeOutExpo, easeOutCirc, easeOutElastic, easeOutBack, easeOutBounce, easeInOutQuad, easeInOutCubic, easeInOutQuart, easeInOutQuint, easeInOutSine, easeInOutExpo, easeInOutCirc, easeInOutElastic, easeInOutBack, easeInOutBounce
        return false;

        });
    });
});
$(document).ready(function(){
	$('.bxSlider').bxSlider({
		auto: true,
		captions: true,
		pause: 5000
	});

	$('#slider1').bxSlider({
	  // auto: true,
	  pause: 2000
	});

});