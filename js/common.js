// $(window).on("load", function() {
//   $('.contant_header h1').addClass('bounceTop');
//   $('.contant_header h2').addClass('bounceTop2');
//   //$('.contant_header h1, .contant_header h2').css("display", "block");
//   //$('.contant_header h1, .contant_header h2').css("opacity", "1");
// });

$(document).ready(function() {

	/*$(window).scroll(function() {
		if ($(this).width() < 992) {
			if ($(this).height() <= 768) {
				if ($(this).scrollTop() < 500) {
					//
				}
				if($(this).scrollTop() > 1000) {
					//
				}
			}
		}
	});*/

$('#openInfo').click(function(){
	$('.open_info_block').toggleClass("activ");
});
// $(document).mouseup(function (e) {
// 	var container = $(".open_info_block");
// 	if (container.has(e.target).length === 0){
// 		$('.open_info_block').removeClass("activ");
// 	}
// 	else if (".open_info_block.activ"){
// 	$('#openInfo').click(function(){
// 		$('.open_info_block').toggleClass("activ");
// 	});
// }
// });

$(document).on('click', function(e) {
  if (!$(e.target).closest(".info_block").length) {
    $('.open_info_block').removeClass("activ");
  }
  e.stopPropagation();
});


	// fixed menu
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50){  
			$('.fixed_top_line').addClass("sticky");
		}
		else{
			$('.fixed_top_line').removeClass("sticky");
		}
	});

	$(".contant_header h1, .contant_header h2, .contant_header form, .contant_header p").animated("bounceTop");

	// $(".block").waypoint(function(direction) {
	// 	if (direction === "down") {
	// 		$(".class").addClass("active");
	// 	} else if (direction === "up") {
	// 		$(".class").removeClass("deactive");
	// 	};
	// }, {offset: 100});

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