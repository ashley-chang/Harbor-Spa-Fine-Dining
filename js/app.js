$(document).foundation();
$(document).ready(function() {

  ScrollReveal().reveal('.scroll-reveal', { delay: 120, duration: 1100, mobile: false, distance: '20px' });

  // Sticky Header
  //--------------
  $('.title-bar').on('sticky.zf.stuckto:top', function(){
    $(this).addClass('shrink');
  }).on('sticky.zf.unstuckfrom:top', function(){
    $(this).removeClass('shrink');
  });
  // $('#menu-icon').click(function() {
  //   $('#header').foundation('_calc', true);
  // });

  // Slider
  //--------------
  // Initialize....
  let sliderInterval;
  let currentSlide = 0;
  let slides = $('.slider-image');
  let slidesLen = slides.length;
  $('.slider-image:gt(0)').hide();

  let sliderCircleContainer = $("#slider-circle-container")
  for (let i = 0; i < slidesLen; i++) {
    let circle = $("<div>", {"class": "slider-circle", "data-image-num": i});
    if (i === 0) {
      circle.addClass("active");
    }
    circle.click(function(){
      changeSlide(currentSlide, i);
      console.log(i + slides[i]);
      clearInterval(sliderInterval);
      autoSlide();
    });
    sliderCircleContainer.append(circle);
  }

  $('#slider-nav-next').click(() => {
    clearInterval(sliderInterval);
    changeSlide(currentSlide, currentSlide + 1);
    autoSlide();
    console.log('click next');
  });

  $('#slider-nav-previous').click(() => {
    clearInterval(sliderInterval);
    changeSlide(currentSlide, currentSlide + 1);
    autoSlide();
    console.log('click prev');
  });

  function autoSlide() { //closure
    sliderInterval = setInterval(function() {
      if (slidesLen < 1) {
        console.log("No slides to show.");
        return;
      }
      changeSlide(currentSlide, currentSlide + 1);
      console.log('changed slide');
    }, 4500);
    console.log('autoslide');
  }

  function checkSlideNum(num) {
    if (num > slidesLen - 1) return 0;
    else if (num < 0) return (slidesLen - 1);
    else return num;
  }

  function changeSlide(current, next) {
    let circles = $(".slider-circle");
    let nextSlide = checkSlideNum(next);

    $(slides[current]).fadeOut(1000);
    $(slides[nextSlide]).stop().fadeIn(1000);
    currentSlide = nextSlide;

    $(circles[current]).toggleClass("active");
    $(circles[nextSlide]).toggleClass("active");
    console.log("changeSlide function");
  }

  autoSlide();

  // Smooth Scrolling, bc Foundation SS doesn't leave section space
  //-----------------
  // needs to handle focus issues
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        console.log(target);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top - $('#header').outerHeight(true)
            }, 1000);
        this.blur();
            return false;
        }
    }
  });

  $(window).resize(function () {
    if ($(window).width() > 815) {
      $('.menu-item').show();
    }
  });

  $('#menu-icon').on('click', function() {
    $('#menu-group').toggleClass('menu-show');
    let height = $('#header').outerHeight();
    if ($('#menu-group').hasClass('menu-show')) {
      $('.menu-item').each(function() {
        $(this).show(300);
      });
      $('#header-container').animate({"height": height }, 300);
    } else {
      $('.menu-item').each(function() {
        $(this).hide(300);
      });
      $('#header-container').animate({"height": height }, 300);
    }
    // $('#header-container').outerHeight(height);
    // $('.sticky-container').foundation('_calc', true);
  });



});
