$(document).ready(function() {
    "use strict";

    Cursor();

});



(function($) {
    

    //AOS Init
    AOS.init({
        disable: 'mobile'
    });


    // Preloader
    $(".loader").fadeOut();
    $("#preloder").delay(400).fadeOut("slow");


    //Menu
    $('.main-menu ul li').on('click', function(e) {
        e.preventDefault();

        if ($(this).siblings('li').find('ul.submenu:visible').length) {
            $('ul.submenu').slideUp('normal');
        }
        $(this).find('ul.submenu').slideToggle('normal');
    });

    var t1 = new TimelineMax({
        paused: true
    });

    t1.to('.main-menu', 0.8, {
        autoAlpha: 1
    });

    t1.staggerFrom('.main-menu li a:not(.submenu li a)', 1, {
        opacity: 0,
        y: 10,
        ease: Power3.easeInOut
    }, 0.1);

    t1.from('.submenu', 0.8, {
        autoAlpha: 0
    });

    t1.staggerFrom(".media ul li", 1, {
        opacity: 0,
        y: 10,
        ease: Power3.easeInOut
    }, 0.1, "-=2");

    t1.from('.social', 1, {
        delay: -2,
        opacity: 0,
        y: 10,
        ease: Power3.easeInOut
    });


    t1.from('.menu-background-left', 1, {
        delay: -3,
        opacity: 0,
        y: 10,
        ease: Power3.easeInOut
    });

    t1.reverse();

    $(document).on('click', '.menu-btn', function() {
        t1.reversed(!t1.reversed());
    });

    $(document).on('click', '.close-menu', function() {
        t1.reversed(!t1.reversed());
    });

    $('.main-menu ul li a').on('click', function(e) {
        e.preventDefault();

        var url = $(this).attr('href');

        if (url != '#') {
            t1.reversed(!t1.reversed());
            setTimeout(() => {
                $(location).attr('href', url);
            }, 2000);
        }

    });



    //Sound
    window.addEventListener('load', function() {
        $('body').append('<audio loop volume="0.2" id="audio"><source src="sound.mp3" type="audio/mpeg"/></audio>');
    });

    $(".button-wrap").on('click', function() {

        var audio = document.getElementById("audio");

        $('body').toggleClass("mute");
        $(this).toggleClass("disabled");

        if ($(this).hasClass('disabled')) {
            $('.button-text span').text($('.button-text span').data('off'));
            $('.button-text span').attr("data-off", $('.button-text span').data('on'));
            $('.button-text span').attr("data-on", $('.button-text span').text());

            audio.volume = 0;
            audio.pause();
        } else {

            $('.button-text span').text($('.button-text span').data('on'));
            $('.button-text span').attr("data-on", $('.button-text span').data('on'));
            $('.button-text span').attr("data-off", $('.button-text span').data('off'));

            audio.volume = 0.2;
            audio.play();
        }

    });



    // Isotope Filter
    var $container = $('.work-gallery');
    $container.imagesLoaded().progress(function() {
        $container.isotope();
    });

    $('.filter-wrapper li a').on('click', function() {
        $(".filter-wrapper li a").removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr('data-filter');
        $container.imagesLoaded().progress(function() {
            $container.isotope({
                filter: selector,
            });
        });
        return false;
    });




    // scroll body to 0px on click
    $('#back-to-top').on('click', function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });




    // Slider Home
    var sickPrimary = {
        autoplay: true,
        autoplaySpeed: 2400,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 1800,
        cssEase: 'cubic-bezier(.84, 0, .08, .99)',
        asNavFor: '.text-slider',
        centerMode: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next')
    }

    var sickSecondary = {
        autoplay: true,
        autoplaySpeed: 2400,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1800,
        cssEase: 'cubic-bezier(.84, 0, .08, .99)',
        asNavFor: '.image-slider',
        prevArrow: $('.prev'),
        nextArrow: $('.next')
    }

    $('.image-slider').slick(sickPrimary);
    $('.text-slider').slick(sickSecondary);



})(jQuery);




// Cursor
function Cursor() {

    var cursor = $(".cursor"),
        follower = $(".cursor-follower");

    var posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

    TweenMax.to({}, 0.016, {
        repeat: -1,
        onRepeat: function() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            TweenMax.set(follower, {
                css: {
                    left: posX - 25,
                    top: posY - 25
                }
            });

            TweenMax.set(cursor, {
                css: {
                    left: mouseX - 5,
                    top: mouseY - 5
                }
            });
        }
    });

    const link = document.querySelectorAll('.hover-this');

    const animateit = function(e) {
        const span = this.querySelector('span');
        const {
            offsetX: x,
            offsetY: y
        } = e, {
            offsetWidth: width,
            offsetHeight: height
        } = this,

        move = 25,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;

        span.style.transform = `translate(${xMove}px, ${yMove}px)`;

        if (e.type === 'mouseleave') span.style.transform = '';
    };


    $(document).on('mousemove', function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    $(".portfolio-item").on('mouseenter', function() {
        cursor.addClass("active");
        follower.addClass("active");
    });

    $(".portfolio-item").on('mouseleave', function() {
        cursor.removeClass("active");
        follower.removeClass("active");
    });


    $(".cursor-item").on('mouseenter', function() {
        cursor.addClass("active");
        follower.addClass("active");
    });

    $(".cursor-item").on('mouseleave', function() {
        cursor.removeClass("active");
        follower.removeClass("active");
    });


    link.forEach(b => b.addEventListener('mousemove', animateit));
    link.forEach(b => b.addEventListener('mouseleave', animateit));
    window.addEventListener('mousemove', editCursor);
}