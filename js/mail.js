(function($){

	$('.subscribe-form').on('submit',function (e) {
		e.preventDefault();

		var $form  = $(this);
		var $email = $(this).find('[type="email"]');
		var email  = $email.val();

		$form.addClass('form-disabled');
		
		$.post(
			"https://platform.dao.casino/api/landing_subscribe.php",
			{
				email:      email,
				UTM_MEDIUM: utmMedium,
				UTM_SOURCE: utmSource,
				CAMPAIGN:   campaign,
				GAID:       clientId
			},
			function(d){
				$form.removeClass('form-disabled');
				$email.val('');

				$.magnificPopup.open({
					items: {
						src: '#open_thank_mail',
						type: 'inline'
					}
				});

				$.magnificPopup.open({
					items: {
						src: '#modal-thanks',
						type: 'inline'
					}
				});
		
				// console.log('send form 1 ' + $form.serialize());
				
				if (typeof yaCounter42783759 !== 'undefined') {
					yaCounter42783759.reachGoal('EMAIL'); 
				}
				if (typeof ga !== 'undefined') {
					ga('send', {hitType: 'event',eventCategory:'Form',eventAction: 'email', eventLabel: 'top'});
				}
			}
		);
		
		$.post(
			"https://platform.dao.casino/api/landing_subscribe2.php",
			{
				email:      email,
				UTM_MEDIUM: utmMedium,
				UTM_SOURCE: utmSource,
				CAMPAIGN:   campaign,
				GAID:       clientId
			},
			function(d){
				// console.log('send form 2 ' + $form.serialize());
			}
		);

	});

})(jQuery);