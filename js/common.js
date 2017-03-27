$(document).ready(function() {

	$(window).scroll(function() {
		if ($(this).scrollTop() > 50){  
			$('.fixed_top_line').addClass("sticky");
		}
		else{
			$('.fixed_top_line').removeClass("sticky");
		}
	});

	$(".contant_header h1, .contant_header h2, .form_style, .contant_header p").animated("bounceInUp", "fadeOutUp");

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