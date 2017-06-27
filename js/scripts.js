( function($) {

	/**
	 * Is Mobile
	 */
	var isMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile = true;
	}

	/**
	 * Menu Toggle
	 */
	if(!isMobile) {
		var btnEvent = 'click';
	} else {
		var btnEvent = 'touchend';
	}
	$('.btn-menu').on( btnEvent, function(e){
		e.preventDefault();
		$(this).toggleClass('btn-menu-close');
		$('.language-switcher > a + ul').removeClass('in');
		$('.navbar .navbar-right').toggleClass('in');
	});

	/**
	 * Language Switcher
	 */
	$('.language-switcher > a').on('click', function(e) {
		e.preventDefault();
		$(this).next('ul').toggleClass('in');
	});

	/**
	 * Fixed Navbar
	 */
	$(window).on('scroll load', function() {
		if ( $(this).scrollTop() > 50 ){
			$('.navbar').addClass('affix');
		} else {
			$('.navbar').removeClass('affix');
		}
	});

	/**
	 * Animate Slogan
	 */
	$(window).on('scroll load', function() {
		if ( $(this).scrollTop() > 280 ){
			$('.logo').addClass('in');
		} else {
			$('.logo').removeClass('in');
		}
	});

	/**
	 * Fade in body after load
	 */
	$(window).load(function(){
		$('body').removeClass('before-load');
	});

	/**
	 * Magnific Popup
	 */
	$('.team-member').not('.disabled').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	/**
	 * FAQ Accordion
	 */
	$('.faq-item h3').on( 'click', function(e) {
		e.preventDefault();
		$('.faq-item.open .faq-content').slideUp(200, 'linear', function(){
			$(this).parent().removeClass('open');
		});
		if($(this).parent().hasClass('open')){
			$(this).next().slideUp(200, 'linear', function(){
				$(this).parent().removeClass('open');
			});
		} else {
			$(this).next().slideDown(200, 'linear', function(){
				$(this).parent().addClass('open');
			});
		}
		return false;
	});

	/**
	 * Info block Open/Closed
	 */
	$('#openInfo').click(function(e){
		e.preventDefault();
		$('.open_info_block').toggleClass('activ');
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest(".navbar-info").length) {
			$('.open_info_block').removeClass("activ");
		}
		e.stopPropagation();
	});

	/**
	 * Animate elements on load
	 */
	/*$(".contant_header h1, .contant_header h2, .contant_header form, .email_form").animated("bounceTop");*/

	/**
	 * CountDown
	 */
	var austDay = new Date();
	austDay = new Date( austDay.getFullYear(), austDay.getMonth() + 1, 0, -8);
	$('.countdown-compact').countdown({
		until: austDay,
		format: 'DHMS',
		padZeroes: true,
	});
	$('.countdown-full').countdown({
		until: austDay,
		format: 'DHMS',
		padZeroes: true,
	});

	/**
	 * Video Ajax
	 */
	$(document).on('click','[data-video]', function(e){
		e.preventDefault();
		var thisUrl = $(this).data('video');
		var youtubeUrl = '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + thisUrl + '?autoplay=1&loop=0&showinfo=0&theme=light&color=red&controls=1&modestbranding=0&start=0&fs=1&iv_load_policy=3&wmode=transparent&rel=0" allowfullscreen></iframe>';
		$(this).parent('.embed-responsive').html(youtubeUrl);
	
	});

	/**
	 * Smooth Scroll
	 */
	$.fn.smoothScroll = function( options ) {

		return this.each(function() {
			$(this).bind('click',function(e){
				e.preventDefault();

				var $href = 'body';
				if($(this).data('target')){
					$href = $(this).data('target');
				} else if ($(this).attr('href')) {
					$href = $(this).attr('href');
				} else {
					$href = 'body';
				}

				// Default options.
				var settings = $.extend({
					fromTop: 0,
					speed: 1000,
					easing: 'swing'
				}, options );

				if($($href).length == 0){
					console.log('taget ' + $href + ' not exists');
				} else {
					$('html, body').stop().animate({
						scrollTop: $($href).offset().top - settings.fromTop
					}, settings.speed, settings.easing);
				}

			});

		});
	};

	$('.navbar-menu > li > a[href^="#"]').smoothScroll({
		fromTop: 70
	});

	/**
	 * Chart.js
	 */
	var ctx = document.getElementById("pie-chart-initial");

	var myChart = new Chart(ctx, {

		type: 'pie',
		data: {
			labels: ["Purchasers", "Legal Entity", "Bounty", "Early adopters & Founders"],
			datasets: [{
				data: [70, 10, 10, 10],
				backgroundColor: [
					'#ff9900',
					'#b2701d',
					'#764b13',
					'#3a260a',
				],
				hoverBackgroundColor: [
					'rgba(255, 153, 0, 1)',
					'rgba(255, 153, 0, .6)',
					'rgba(255, 153, 0, .4)',
					'rgba(255, 153, 0, .2)',
				],
				borderColor: [
					'#fff',
					'#fff',
					'#fff',
					'#fff',
				],
				borderWidth: 0,
				hoverBorderWidth: 3,
			}]
		},
		options: {

			animation: {
				duration: 100,
				onComplete: function (event){
					//console.log(this.data.datasets[0]);
				},
				onProgress: function () {
					var ctx = this.chart.ctx;
					ctx.font = "bold 16px BasisGrotesquePro";
					ctx.textAlign = 'center';

					this.data.datasets.forEach(function (dataset) {

						for (var i = 0; i < dataset.data.length; i++) {
							var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
							  total = dataset._meta[Object.keys(dataset._meta)[0]].total,
							  mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
							  start_angle = model.startAngle,
							  end_angle = model.endAngle,
							  mid_angle = start_angle + (end_angle - start_angle)/2;

							var x = mid_radius * Math.cos(mid_angle);
							var y = mid_radius * Math.sin(mid_angle);

							ctx.fillStyle = '#fff';
							var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
							ctx.fillText(percent, model.x + x, model.y + y + 5);
						}
					});
				}
			},
			responsive: true,
			cutoutPercentage: 50,
			legend: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
			},

		},
	});

	document.getElementById('pie-chart-initial-legend').innerHTML = myChart.generateLegend();

	/**
	 * Chart.js
	 */
	var ctx = document.getElementById("pie-chart-indented");

	var myChart = new Chart(ctx, {

		type: 'pie',
		data: {
			labels: ["Research<br> & development", "Operation", "Marketing", "Legal"],
			datasets: [{
				data: [60, 20, 15, 5],
				backgroundColor: [
					'#ff9900',
					'#b2701d',
					'#764b13',
					'#3a260a',
				],
				hoverBackgroundColor: [
					'rgba(255, 153, 0, 1)',
					'rgba(255, 153, 0, .6)',
					'rgba(255, 153, 0, .4)',
					'rgba(255, 153, 0, .2)',
				],
				borderColor: [
					'#fff',
					'#fff',
					'#fff',
					'#fff',
				],
				borderWidth: 0,
				hoverBorderWidth: 3,
			}]
		},
		options: {

			animation: {
				duration: 100,
				onComplete: function (event){
					//console.log(this.data.datasets[0]);
				},
				onProgress: function () {
					var ctx = this.chart.ctx;
					ctx.font = "bold 16px BasisGrotesquePro";
					ctx.textAlign = 'center';

					this.data.datasets.forEach(function (dataset) {

						for (var i = 0; i < dataset.data.length; i++) {
							var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
							  total = dataset._meta[Object.keys(dataset._meta)[0]].total,
							  mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
							  start_angle = model.startAngle,
							  end_angle = model.endAngle,
							  mid_angle = start_angle + (end_angle - start_angle)/2;

							var x = mid_radius * Math.cos(mid_angle);
							var y = mid_radius * Math.sin(mid_angle);

							ctx.fillStyle = '#fff';
							var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
							ctx.fillText(percent, model.x + x, model.y + y + 5);
						}
					});
				}
			},
			responsive: true,
			cutoutPercentage: 50,
			legend: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
			},

		},
	});

	document.getElementById('pie-chart-indented-legend').innerHTML = myChart.generateLegend();

})(jQuery);