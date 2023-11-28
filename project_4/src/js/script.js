const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

$(document).ready(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a").on('click', function(event) {
		if (this.hash !== "") {
		  event.preventDefault();
		  var hash = this.hash;
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 800, function(){
			window.location.hash = hash;
		  });
		}
	});
  new WOW().init();
  $('.portfolio__inner').slick({
		speed: 1300,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
		speed: 900,
		cssEase: 'linear',
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/social/top_arrow.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/social/top_arrow.png"></button>',
		dots: '<button type="button" class="slick-dots"></button>',
		responsive: [
			{
				breakpoint: 991,
				settings: {
				  arrows: false,
				  dots: true
				}
			}
		]
	});	
});