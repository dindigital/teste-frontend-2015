$(document).ready(function() {
        $( 'li.sub1' ).hover(
            function(){
                $(this).children('ul li ul').fadeIn(400);
                $('a.sub1').addClass( "ativo" );
            },
            function(){
                $(this).children('ul li ul').fadeOut(400);
                $('a.sub1').removeClass( "ativo" );
            }
        );
    });

$(document).ready(function() {
        $( 'li.sub2' ).hover(
            function(){
                $(this).children('ul li ul').fadeIn(400);
                $('a.sub2').addClass( "ativo" );
            },
            function(){
                $(this).children('ul li ul').fadeOut(400);
                $('a.sub2').removeClass( "ativo" );
            }
        );
    });
