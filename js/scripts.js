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
	$('body').css('visibility','visible');
	
	/**
	 * Financing Progress
	 */
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	var dataEth = $('.financing-progress-line').data('eth');
	var currentDol = Math.round(dataEth * 300);
	var currentDolStart = currentDol - 5000000;
	var prc = Math.round(currentDolStart / 20000000 * 100);
	var prcMarket = prc + '%';
	$('.financing-progress-bar').css({'width': prcMarket , 'height': prcMarket });
	$('.total-dolar').text(numberWithCommas(currentDol));
	$('.total-eth').text(numberWithCommas(dataEth));
	

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
		mainClass: 'my-mfp-zoom-in',
	});
	
	$('.team-member').on('mfpOpen', function(e /*, params */) {
		var magnificPopup = $.magnificPopup.instance;
		var thisPopupId = magnificPopup.currItem.src;
		var thisImgSrc = $(thisPopupId).find('.modal-profile-photo').data('image');
		var img = $("<img />").attr('src', thisImgSrc)
		.on('load', function() {
			if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
				alert('broken image!');
			} else {
				$(thisPopupId).find('.modal-profile-photo').html(img);
			}
		});
	});

	$('[href="#modal-get-contract"]').magnificPopup({
		type: 'inline',
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	/**
	 * Agreements
	 */
	$('.checkbox').on('click', function(){
		$(this).removeClass('error');
	})
	$('[href="#continue"]').on('click', function(event){
		event.preventDefault();
		var thisBtn = $(this);
		var errorCount = 0;
		$('.agreement-item').find('input[type="checkbox"]').each(function(){
			thisInput = $(this);
			if (thisInput.prop('checked')==true){ 
				thisInput.parent().removeClass('error animated bounce');
			} else {
				errorCount++;
				thisInput.parent().addClass('error animated bounce');
			}
		});
		setTimeout(function(){
			$('.agreement-item .checkbox').removeClass('animated bounce');
		}, 1000 );
		if( errorCount == 0 ){
			$.magnificPopup.close();
			setTimeout(function(){
				$.magnificPopup.open({
					items: {
						src: '#modal-contract-address',
						type: 'inline',
					},
					removalDelay: 300,
					mainClass: 'my-mfp-zoom-in'
				});
			}, 300 );	
		}
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
	 * CountDown
	 */
	var austDay = new Date();
	austDay = new Date(Date.UTC(2017, 05, 29, 13, 0));
	$('.countdown-compact').countdown({
		until: austDay,
		format: 'DHMS',
		padZeroes: true,
	});
	var austDay2 = new Date();
	austDay2 = new Date( Date.UTC( 2017, 06, 2, 13, 0) );
	$('.countdown-compact').countdown({
		until: austDay2,
		format: 'DHMS',
		padZeroes: true,
	});
	var austDayToken = new Date();
	austDayToken = new Date( Date.UTC( 2017, 05, 28, 13, 0) );
	$('.informer-day').countdown({
		since: austDayToken,
		format: 'D',
		padZeroes: false,
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
	 * Clipboard.js
	 */
	if(typeof Clipboard == 'function'){
		$('body').append('<span class="copy-alert">Copied!</span>');
		var clipboard = new Clipboard('[data-clipboard-target]');
		clipboard.on('success', function(e) {
			$('.copy-alert').addClass('in');
			setTimeout(function(){
				$('.copy-alert').removeClass('in');
			}, 2000 );
			e.clearSelection();
		});
	}

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
