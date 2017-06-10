function openThank(){
	$.magnificPopup.open({
		items: {
			src: '#open_thank_mail',
			type: 'inline'
		}
	});
}
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
		url: 'https://platform.dao.casino/api/landing_subscribe.php',
		data: "email=" + email, //$(form).serialize(),
		success: function(data) {
			alert(data);
		},
		error:	function(data) {
			alert('Server error! Contact support in intercom!');
		},
	});
	$.ajax({
		url: 'https://platform.dao.casino/api/landing_subscribe2.php',
		data: "email=" + email, //$(form).serialize(),
		success: function(data) {
			console.log(data + ' succes form 2');
		},
		error:	function(data) {
			console.log(data + ' error form 2');
		},
	});
}