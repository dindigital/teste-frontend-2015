(function ($){
	$(document).ready(function() {
		$('.carousel').carousel();

		$("#owl-demo").owlCarousel({
 
		      autoPlay: 3000, //Set AutoPlay to 3 seconds
		 	  navigation: true,
		 	  pagination: false,
		      items : 4,
		      itemsDesktop : [1199,3],
		      itemsDesktopSmall : [979,3],
		      navigationText: [
		      	'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>',
		      	'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
		      ]
		  });
	});
})(jQuery);
