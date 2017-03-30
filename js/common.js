$(document).ready(function() {

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

	$(".contant_header h1, .contant_header h2, .contant_header form, .contant_header p").animated("bounceTop");

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

	function heightDetect() {
		$(".header").css("height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

});

		/*
function resize() {
			var foot = document.getElementsByClassName('contant_header')[0];
			var footHeight = foot.offsetHeight;
				//alert(footHeight);
			foot.style.marginTop = footHeight+"px";
			var foot = document.getElementsByClassName('container_logos')[0];
			foot.style.marginTop = -footHeight+"px";
				//document.getElementsByClassName('container_logos').style.paddingTop = footHeight+"px";
		}
		
		window.onload = resize;*/