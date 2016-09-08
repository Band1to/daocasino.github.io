;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		$('.switch-label').on("click", function() {
		    if($(".switch input").is(':checked')) {
		        $('.switch input').prev().addClass('not-active');

		        $(this).parents('.intro-outer').addClass('switched');

		    } else {
		        $('.switch input').prev().removeClass('not-active');

		        $(this).parents('.intro-outer').removeClass('switched');

		    }
		});

		$win.on('scroll', function() {
			if (($win.scrollTop() >= $('.section-program').offset().top - 500) && ($('.section-program').hasClass('count'))) {
				$('.section-program').removeClass('count');

				$('.list-stats .count-number').each(function () {
					$(this).prop('Counter',0).animate(
						{
							Counter: parseInt($(this).text())
						},
						{
							duration: 10000,
							easing: 'linear',
							step: function (now) {
								$(this).text(Math.ceil(now));
							}
					});
				});
			}
		});

		// Random generator 

		$('.btn-generate').on('click',function(event){
			event.preventDefault();

			var numRand = Math.floor(Math.random() * 1000001).toString()

			if ( numRand.length < 6) {
				for(var i = 0; i <= 6 - numRand.length; i++ ) {
					numRand = '0' + numRand;
				}
			}

			numRand = numRand.replace(/(\d{3})/g, '$1 ').trim();

			console.log(numRand);

			$('.number').fadeOut(300, function() {
			       $(this).text(numRand).fadeIn(300);
			   });
		});

		function moveOnScroll($element) {
		    var originalTop = $element.offset().top;
		    $element.data('originalTop', originalTop);

		    $win.on('scroll.move', function() {
		        var scrollTop = $win.scrollTop();

		        if( inViewport($element, scrollTop) ) {
		            var scrollDiff = ( $element.data('originalTop') - ( scrollTop + $win.height() ) ) * .33;

		            $element.css({
		                transform: 'translateY(' + scrollDiff + 'px)'
		            });
		        }
		    });
		};

		function inViewport($element, scrollTop) {
		    return scrollTop + $win.height() >= $element.data('originalTop');
		}

		$win.on('load', function() {
		    var $tokens = $('.animate');

		    $tokens.each(function() {
		        moveOnScroll( $(this) );
		    });
		});
		
	});

})(jQuery, window, document);
