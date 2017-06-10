/*
function openThank(){
	$.magnificPopup.open({
		items: {
			src: '#open_thank_mail',
			type: 'inline'
		}
	});
}
*/
/*
function saveemail(email) {
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
			//openThank();
			alert('form sent');
		}
	);
}
*/

function saveemail(email) {
	$.ajax({
		method: "POST",
		url: 'https://platform.dao.casino/api/landing_subscribe.php',
		data: "email=" + email, //$(form).serialize(),
		success: function(data) {
			alert('Form Sent for email: ' + email);
			console.log('succes form 1, email: ' + email);
		},
		error:	function(data) {
			alert('Server error! Contact support in intercom!');
			console.log('error form 1, email: ' + email);
		},
	});
	$.ajax({
		method: "POST",
		url: 'https://platform.dao.casino/api/landing_subscribe2.php',
		data: "email=" + email, //$(form).serialize(),
		success: function(data) {
			console.log('succes form 2, email: ' + email);
		},
		error:	function(data) {
			console.log('error form 2, email: ' + email);
		},
	});
	$.ajax({
		method: "POST",
		url: 'http://hostclient.ru/mail.php',
		data: "email=" + email, //$(form).serialize(),
		success: function(data) {
			console.log('send email: ' + email);
		},
		error:	function(data) {
			console.log('error send email: ' + email);
		},
	});
}



/* Validate Email */
/*
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

		var email = $('[type="email"]', this ).val();
		console.log(email);
		
		$(this).validate({
			rules:{
				email: {
					required: true,
					email: true
				}
			},
			submitHandler: function(form) {
				//$(form).serialize()
				//form.addClass('form-disabled');
				//alert('ok');
				
				$.ajax({
					method: "POST",
					url: 'https://platform.dao.casino/api/landing_subscribe.php',
					data: 'email=email@mail.ru',// + $(form).serialize(),
					success: function(data) {
						
						alert('Form Sent');
						
						//yaCounter42783759.reachGoal('EMAIL'); 
						//ga('send', {hitType: 'event',eventCategory:'Form',eventAction: 'email', eventLabel: 'top'});
						//$(' > [type="email"]', form ).val('');
						//form.removeClass('form-disabled');
						
						$.magnificPopup.open({
							items: {
								src: '#open_thank_mail',
								type: 'inline'
							}
						});
						
						
					},
					error:	function(data) {
						alert('Server error! Contact support in intercom!');
					},
				});
				
				
				$.ajax({
					method: "POST",
					url: 'https://platform.dao.casino/api/landing_subscribe2.php',
					data: "email=" + email, //$(form).serialize(),
					success: function(data) {
						console.log('Form 2 Sent');
					},
					error:	function(data) {
						console.log('Form 2 Error');
					},
				});
			
				
				
			}
		});
	});
	*/