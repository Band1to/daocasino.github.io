function ICOProgress(){
	var walletaddr  = '0x01dBB419d66bE0D389faB88064493f1D698DC27a';
	var dolRate     = 300;
	var needDolSumm = 25000000;
	
	if(!$('.financing-progress-line').length){
		return
	}

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	var jsonUrl = 'https://api.etherscan.io/api?module=account&action=balance&address='+walletaddr+'&tag=latest&apikey=YourApiKeyToken';
	$.getJSON(jsonUrl, function(data) {

		var dataEth    = Math.round(data.result / 1000000000000000000);
		var currentDol = dataEth * dolRate;
	
		var prc        = Math.round(currentDol / needDolSumm * 100);
		var prcMarket  = prc + '%';

		$('.financing-progress-bar').css({'width': prcMarket , 'height': prcMarket });
		$('.total-dolar').text(numberWithCommas(currentDol));
		$('.total-eth').text(numberWithCommas(dataEth));

		if (currentDol>=15000000) {
			$('.financing-step-two').addClass('active');
		}
		if (currentDol>=25000000) {
			$('.financing-step-three').addClass('active');
		}

		setTimeout(function(){
			ICOProgress()
		}, 7777);

	});
}


/**
 * CountDown
 */

var DaysPrices = [
	{ start:0  , end:2  ,  price:2000},
	{ start:2  , end:15 ,  price:1800},
	{ start:16 , end:19 ,  price:1700},
	{ start:19 , end:22 ,  price:1600},
	{ start:22 , end:25 ,  price:1500},
	{ start:25 , end:28 ,  price:1400},
];

function startTimer(diff){
	var move_days = 0;

	var start_day = 29 - move_days;

	var curday  = new Date().getTime() - new Date( Date.UTC( 2017, 05, (start_day-1), 13, 0)-diff ).getTime();
		curday  = Math.round(curday/24/60/60/1000);

	var nextday = 2;

	var price      = DaysPrices[0].price;
	var next_price = DaysPrices[1].price;

	for(let k in DaysPrices){
		var next_k = k*1+1;
		var d      = DaysPrices[k]
		var next_d = DaysPrices[next_k]

		if (curday >= d.start && curday <= d.end) {
			price      = d.price
			
			if (next_d) {
				next_price = next_d.price
				nextday    = next_d.start 
			}
		}
	}

	$('.informer-day').text('Day ' + curday)

	$('.informer-left  .informer-exchange .current-bet').text(price)
	$('.informer-right .informer-exchange .before-bet').text(next_price)

	var austDay2 = new Date( -(move_days*24*60*60*1000)+Date.UTC( 2017, 06, nextday-2, 13, 0)-diff );
	$('.countdown-compact').countdown({
		until: austDay2,
		format: 'DHMS',
		padZeroes: true,
	});

	var austDay = new Date((Date.UTC(2017, 05, start_day, 13, 0)-diff));
	$('.countdown-full').countdown({
		until: austDay,
		format: 'DHMS',
		padZeroes: true,
	});

	
}



( function($) {

	ICOProgress();

	startTimer(0);

	$.getJSON('https://platform.dao.casino/api/proxy.php?a=time', function(r){
		var diff = 0;
		if (r && r.time && !isNaN(r.time*1)) {
			diff = (r.time*1000) - (new Date().getTime())
		}
		startTimer(diff)
	})



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
		
		ga('send', 'event', 'acceptterms');
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