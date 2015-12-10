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