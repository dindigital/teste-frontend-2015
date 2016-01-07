function slideShow() {
  var counter = 0,
    itens = $('.m-sliderBoxA__labelBox__item').length;


  $('.m-sliderBoxA__labelBox__item').click(function () {
    console.log($(this).index());
  });
}



//stater functions
$(document).ready(function () {
  slideShow();
});
