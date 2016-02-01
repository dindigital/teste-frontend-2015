/*global jQuery: false, console: false, alert: false, WOW: false, google: false*/

jQuery.noConflict();

(function ($) {

    'use strict';

    function pageLoader() {
        //Exemplo de uso: <div class="page-loader"><div class="loader">Loading...</div></div>
        $('.page-loader div').delay(0).fadeOut();
        $('.page-loader').delay(200).fadeOut('slow');
    } //pageLoader

    function wowPlugin() {
        //Exemplo de uso: <body class="appear-animate">
        //Exemplo de uso: <section class="wow fadeIn" data-wow-delay="0.1s" data-wow-duration="2s">
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 90,
            mobile: false,
            live: true
        });

        if ($('body').hasClass('appear-animate')) {
            wow.init();
        }
    }

    function pageParallax() {
        //Exemplo de uso: <section class="parallax" data-speed="5">
        //Exemplo de uso css: background-position: 50% 0; background-repeat: repeat; background-attachment: fixed!important;
        wowPlugin();

        $('.parallax').each(function () {
            var $obj = $(this);
            $(window).scroll(function () {
                var yPos  = -($(window).scrollTop() / $obj.data('speed')),
                    bgpos = '50%' + yPos + 'px';
                $obj.css('background-position', bgpos);
            });
        });
    }

    function fixedTop() {
        var viewportWidth = $(window).width(),
            viewportScroll = $(window).scrollTop();

        if (viewportScroll > 100) {
            $('.navbar-default').addClass('scroll-on-page');
        } else {
            $('.navbar-default').removeClass('scroll-on-page');
        }
    }

    function smoothScroll() {
        $('a[href*=#]:not([href=#]):not([data-toggle=collapse])').click(function () {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({ scrollTop: target.offset().top }, 1000);
                return false;
            }
            console.log(target);
        });
    }

    function fieldPhoneValidation() {
        var masks = ['(00) 00000-0000', '(00) 0000-00009'];
        $('input[type="tel"]').mask(masks[1], {
            onKeyPress: function (val, e, field, options) {
                field.mask(val.length > 14 ? masks[0] : masks[1], options);
            }
        });

        $('.field-money').maskMoney({
            symbol: 'R$ ',
            showSymbol: true,
            thousands: '.',
            decimal: ',',
            symbolStay: true
        });
    }

    function msDropDown() {
        $('body select').msDropDown();

        $('.dd .ddChild ul li').on('click', function () {
            if (!$('.dd').hasClass('selected-item')) {
                $('.dd').addClass('selected-item');
            }
        });

        $('.dd .ddChild ul li').mouseover(function () {
            $('.dd').addClass('selected-hover');
        });

        $('.dd .ddChild ul li').mouseleave(function () {
            $('.dd').removeClass('selected-hover');
        });
    }

    function init_maps(divMap) {
        var gmMapDiv = divMap,
            gmCenterAddress = gmMapDiv.attr('data-address'),
            gmMarkerAddress = gmMapDiv.attr('data-address');

        $(divMap).find('.map-section').click(function () {
            $(this).toggleClass('js-active');
            $(this).find('.mt-open').toggle();
            $(this).find('.mt-close').toggle();
        });

        if (gmMapDiv.length) {
            gmMapDiv.gmap3({
                action: 'init',
                marker: {
                    address: gmMarkerAddress,
                    options: {
                        icon: 'library/images/icone-map-marker.png'
                    }
                },
                map: {
                    options: {
                        zoom: 17,
                        zoomControl: false,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        },
                        mapTypeControl: false,
                        scaleControl: false,
                        scrollwheel: false,
                        streetViewControl: false,
                        draggable: false,
                        disableDoubleClickZoom: true,
                        styles: [
                            {'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [{'color': '#8ebdff'}]},
                            {'featureType': 'transit', 'stylers': [{'visibility': 'on'}]},
                            {'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{'visibility': 'on'}, {'color': '#b3b3b3'}]},
                            {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]},
                            {'featureType': 'road.local', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'weight': 1.8}]},
                            {'featureType': 'road.local', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#d7d7d7'}]},
                            {'featureType': 'poi', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'}, {'color': '#ebebeb'}]},
                            {'featureType': 'administrative', 'elementType': 'geometry', 'stylers': [{'color': '#a7a7a7'}]},
                            {'featureType': 'road.arterial', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]},
                            {'featureType': 'road.arterial', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]},
                            {'featureType': 'landscape', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'}, {'color': '#efefef'}]},
                            {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#696969'}]},
                            {'featureType': 'administrative', 'elementType': 'labels.text.fill', 'stylers': [{'visibility': 'on'}, {'color': '#737373'}]},
                            {'featureType': 'poi', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'on'}]},
                            {'featureType': 'poi', 'elementType': 'labels', 'stylers': [{'visibility': 'on'}]},
                            {'featureType': 'road.arterial', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#d6d6d6'}]},
                            {'featureType': 'road', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'on'}]},
                            {'featureType': 'poi', 'elementType': 'geometry.fill', 'stylers': [{'color': '#cadfaa'}]}
                        ]
                    }
                }
            });
        }
    }


    function init_map() {
        $('.map-canvas').each(function () {
            init_maps($(this));
        });
    }

    function owlCarousel() {
        $('.owl-carousel').owlCarousel({
            autoPlay: 3000,
            stopOnHover: true,
            slideSpeed: 300,
            paginationSpeed : 400,
            navigation: false,
            singleItem: true
        });

        $('.owl-carousel-works').owlCarousel({
            autoPlay: 3000,
            stopOnHover: true,
            navigation: true,
            pagination: false,
            items: 4,
            itemsDesktopSmall: [1024, 4],
            itemsTablet: [768, 3],
            itemsMobile: [640, 1]
        });
    }

    function triggerFunctionLoad() {
        pageLoader();
    }

    function triggerFunctionReady() {
        pageParallax();
        fixedTop();
        smoothScroll();
        fieldPhoneValidation();
        msDropDown();
        init_map();
        owlCarousel();
    }

    function triggerFunctionScroll() {
        fixedTop();
    }

    function triggerFunctionResize() {
        fixedTop();
        msDropDown();
    }


    $(window).load(triggerFunctionLoad);
    $(window).ready(triggerFunctionReady);
    $(window).scroll(triggerFunctionScroll);
    $(window).resize(triggerFunctionResize);
}(jQuery));
