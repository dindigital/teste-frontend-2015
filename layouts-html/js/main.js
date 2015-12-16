$(function() {

  var widthMenuResp = $('.container-menu-responsive').width();

  $('.menu-anchor').on('click', function(){
    if($('.container-menu-responsive').hasClass('menu-is-open')){
      $('.container-menu-responsive').stop().animate({'left': -(widthMenuResp + 50)});
      $('.wrap-all').stop().animate({'left' : 0});
      $('.container-menu-responsive').removeClass('menu-is-open');
    }else{
      $('.container-menu-responsive').stop().animate({'left': 0});
      $('.wrap-all').stop().animate({'left' : widthMenuResp + 50});
      $('.container-menu-responsive').addClass('menu-is-open');
    }
  });

  $('.menu-responsive .m-dropdown').on('click', function(){
    $(this).find('ul').slideToggle();
  })
});
