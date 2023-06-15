$(document).ready(function(){
	$('.carousel__inner').slick({
		speed: 1300,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
		speed: 900,
		cssEase: 'linear',
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.png"></button>',
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

	//скрипт для табов 1. расфасовка каждого контента в отдельную вкладку

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	//скрипт для переключения инфы в карточке (кнопка ПОДРОБНЕЕ)

	$('.catalog-item__link').each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});

	//скрипт для переключения инфы в карточке назад (кнопка НАЗАД)

	$('.catalog-item__back').each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});

	//модальные окна (3 скрипта вместе)

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn();
	});

	//красный крестик для закрытия

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #application, #order').fadeOut();
	});

	//скрипт для название того товара (пульсометра, на который нажали) отображение в модально окне

	$('.catalog-item__btn').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		})
	});

	//кастомизация формы

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: 'required',
				phone: {
					minlength: 11,
					required: true
				},
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Напиши свое имя, Олег",
				phone: {
					required: "Кому-то бомбер прилетит)))",
					minlength: jQuery.validator.format("Заебал, введи уже {0} символов")
				},
				email: {
				  required: "Вводи настояшую почту, Олег",
				  email: "Не наебешь меня"
				}
			}	
		});
	};

	//валидация формы

	valideForms('#consultation-forms');
	valideForms('#consultation form');
	valideForms('#order form');

	//отправка писем на почту (скрипт)

	$('form').submit(function(e) {
		e.preventDefault();
		if (!$(this).valid()) {
			return;
		}
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val("");
			$('#consultation, #order').fadeOut();
            $('.overlay, #application').fadeIn();
			$('form').trigger('reset');
		})
		return false;
	});

	//стрелка для пролистывания вверх

	$(window).scroll(function() {
		if ($(this).scrollTop () > 1500) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	//плавный скролл

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

	//анимация отзывов (wow.js + animate.css)

	new WOW().init();
}); 
