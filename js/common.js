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
		var btnMenuEvent = 'click';
	} else {
		var btnMenuEvent = 'touchend';
	}
	$('.btn-menu').on( btnMenuEvent, function(e){
		e.preventDefault();
		$(this).toggleClass('btn-menu-close');
		$('.wrap_top_menu_mobile').toggleClass('menu-open');
	});
	$(document).on('click', '.btn-menu-close',function(){
		$('.language-switcher > a + ul').removeClass('lang-open');
	});

	function heightDetect() {
		$(".header").css("height", $(window).height()).removeClass('hidden');
		$('.contant_header').removeClass('hidden');
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	/* Language Switcher */
	$('select.slct_home').on('change',function(){
		window.location = $(this).val()
	});

	$('.hamburger').click (function(){
		$(this).toggleClass('open');
		$('body').toggleClass('ovh');
	});

	/*
	$(".top_mnu ul a").click(function() {
		$(".top_mnu").fadeOut(600);
		$(".hamburger").toggleClass("open");
		$('body').toggleClass('ovh');
		$(".top_text").css("opacity", "1");
	});
	*/
	
	$(".wrap_top_menu > ul > li:not(.language-switcher) > a").click(function() {
		$(this).parents('.wrap_top_menu').toggleClass('menu-open');
		$(".btn-menu").toggleClass("btn-menu-close");
		$(".hamburger").toggleClass("open");
		//$('body').toggleClass('ovh');
	});
	//.append("<span>");

	$(".hamburger").on('click',function(e) {
		e.preventDefault();
		$('.wrap_top_menu_mobile').toggleClass('menu-open');
		
		if ($(".top_mnu").is(":visible")) {
			$(".top_text").css("opacity", "1");
			$(".top_mnu").fadeOut(600);
			$(".top_mnu li a").removeClass("fadeInUp animated");
		} else {
			$(".top_text").css("opacity", ".1");
			$(".top_mnu").fadeIn(600);
			$(".top_mnu li a").addClass("fadeInUp animated");
		};
	});

	$(".hamburger.open").click(function(){
		$(".toggle_mnu").toggleClass("hid");
		$('body').toggleClass('ovh');
		$('.language-switcher > a + ul').toggleClass('lang-open');
	});
	
	$('.language-switcher > a').on('click',function(e){
		e.preventDefault();
		$(this).next('ul').addClass('lang-open');
	});

	/**/

	$("body").css('visibility', 'visible');

	$('.top_menu > li > a, .top_mnu > li > a').mPageScroll2id();

	$('.popup-with-zoom-anim').magnificPopup({
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

	// Info block Open/Closed
	
	$('#openInfo').click(function(){
		$('.open_info_block').toggleClass("activ");
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest(".info_block").length) {
			$('.open_info_block').removeClass("activ");
		}
		e.stopPropagation();
	});
	
	//****************************** Lazy load ******************************//
	window.addEventListener("DOMContentLoaded", lazyLoadImages);
	window.addEventListener("load", lazyLoadImages);
	window.addEventListener("resize", lazyLoadImages);
	window.addEventListener("scroll", lazyLoadImages);
	
	function lazyLoadImages() {
		var images = document.querySelectorAll(".lazy[data-src]"), item;
		// load images that have entered the viewport

		[].forEach.call(images, function (item) {
				if (item.getBoundingClientRect().top>-1) { //alert(1);

						//$(this).
						var image = item.getAttribute("data-src"),
						img = jQuery('<img />');
						img.bind('load', function() {
							jQuery(item).find(".base64private").addClass('b-placeholder--fadeout');
						});
						img.attr('src', image);
						jQuery(item).css("background-image","url("+image+")")

						item.removeAttribute("data-src");
					}
				})
		// if all the images are loaded, stop calling the handler
		if (images.length == 0) {
			window.removeEventListener("DOMContentLoaded", lazyLoadImages);
			window.removeEventListener("load", lazyLoadImages);
			window.removeEventListener("resize", lazyLoadImages);
			window.removeEventListener("scroll", lazyLoadImages);
		}
	}


	// Fixed menu

	$(window).scroll(function() {
		if ($(this).scrollTop() > 50){  
			$('.fixed_top_line').addClass("sticky");
		}
		else{
			$('.fixed_top_line').removeClass("sticky");
		}
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 5){
			$('.opened_top_menu').addClass("sticky_mnu");
		}
		else{
			$('.opened_top_menu').removeClass("sticky_mnu");
		}
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 280){  
			$('.block_logo h3').addClass("animated fadeopen");
		}
		else{
			$('.block_logo h3').removeClass("animated fadeopen");
		}
	});

	$(".contant_header h1, .contant_header h2, .contant_header form, .email_form").animated("bounceTop");

	$(".accordeon dd").hide().prev().click(function() {
		$(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active");
		$(this).next().not(":visible").slideDown().prev().addClass("active");
	});
	$(".accordeon dd").first().show();
	$(".accordeon dt").first().addClass("active");

	$(".tab_item").not(":first").hide();
	$(".our-team-wrapper .tab").click(function() {
		$(".our-team-wrapper .tab").removeClass("activ").eq($(this).index()).addClass("activ");
		$(".tab_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("activ");

	/*
	$('.subscribe-form').on('submit', function(){
		var url   = $(this).attr('action');
		var email = $(this).find('input[name="email"]').val();
		$.post(url,{email:email}, function(){
			window.location = 'https://dao.casino/';
		})
	});
	*/
	
	


})(jQuery);