(function () {

	'use strict';

	// iPad and iPod detection
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};


	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		// $('#fh5co-primary-menu').superfish({
		// 	delay: 0,
		// 	animation: {
		// 		opacity: 'show'
		// 	},
		// 	speed: 'fast',
		// 	cssArrows: true,
		// 	disableHI: true
		// });

	};

	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar({
				horizontalOffset: 50,
			});
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});

	}



	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};

	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	};

	const countdown = () => {
		// Definir a data-alvo (07/10/2023 às 17h00)
		var countDownDate = new Date("2023-10-07T20:30:00.000Z").getTime();

		// Atualiza a contagem regressiva a cada 1 segundo
		var x = setInterval(function() {

			// Pega a data e hora atual
			var now = new Date().getTime();

			// Calcula a diferença entre a data-alvo e a data atual
			var distance = countDownDate - now;

			// Calcula os dias, horas, minutos e segundos restantes
			var days = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
			var hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			var minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));

			const elementoDias = document.getElementById("dias");
			const elementoHoras = document.getElementById("horas");
			const elementoMinutos = document.getElementById("minutos");

			if (elementoDias.innerHTML !== days) {
				elementoDias.innerHTML = days;
			}

			if (elementoHoras.innerHTML !== hours) {
				elementoHoras.innerHTML = hours;
			}

			if (elementoMinutos.innerHTML !== minutes) {
				elementoMinutos.innerHTML = minutes;
			}

			// Se a contagem regressiva terminar, exibe a mensagem
			if (distance < 0) {
				clearInterval(x);
				document.getElementById("countdown").innerHTML = "O casamento foi dia 07/10/2023!";
			}
		}, 1000);
	}

	const adjustWatercolorMobileOffset = () => {
		if (window.screen.width < 800) {
			const element = document.getElementById('fh5co-started');
			element.setAttribute("data-stellar-horizontal-offset", 50);
			element.setAttribute("data-stellar-vertical-offset", 0);
		}
	}

	// Document on load.

	$(function(){
		mainMenu();
		adjustWatercolorMobileOffset();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
		countdown();
	});


}());
