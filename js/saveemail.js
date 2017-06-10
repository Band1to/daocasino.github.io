(function($){

/* Validate Email */

	$('[type="email"]').on('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z0-9._@-]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			event.preventDefault();
			return false;
		}
	});
	
	$('[type="email"]').bind('paste', function (e) {
		e.preventDefault();
	});

	$('.subscribe-form').each(function () {
		
		$(this).validate({
			rules:{
				email: {
					required: true,
					email: true
				}
			},
			submitHandler: function(form) {
				
				var email = $(' [type="email"]', form ).val();
				//console.log(email);
				
				$.post(
					"https://platform.dao.casino/api/landing_subscribe.php",
					{
						email: email,
						UTM_MEDIUM: utmMedium,
						UTM_SOURCE: utmSource,
						CAMPAGIN: campagin,
						GAID: clientId
					},
					function(d){
						yaCounter42783759.reachGoal('EMAIL'); 
						ga('send', {hitType: 'event',eventCategory:'Form',eventAction: 'email', eventLabel: 'top'});
						$.magnificPopup.open({
							items: {
								src: '#open_thank_mail',
								type: 'inline'
							}
						});
						console.log('send form 1');
					}
				);
				
				$.post(
					"https://platform.dao.casino/api/landing_subscribe2.php",
					{
						email: email,
						UTM_MEDIUM: utmMedium,
						UTM_SOURCE: utmSource,
						CAMPAGIN: campagin,
						GAID: clientId
					},
					function(d){
						console.log('send form 2');
					}
				);
				
				
			}
		});
	});

})(jQuery);