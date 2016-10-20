require('newrelic');

var express = require('express');
var request = require('request');
var fs = require('fs');

var http = require('http');
var https = require('https');

var MailChimpAPI = require('mailchimp').MailChimpAPI;

var app = express();

var ms = require('./email/report_send.js');

app.set('port', (process.env.PORT || 8080));
app.set('https_port', (process.env.HTTPS_PORT || 443));

app.use(express.static(__dirname + '/build'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
     //response.render('pages/index');
     response.redirect('/home.html');
});

app.get('/whitepaper', function(req, res, next) {
     var e = req.query.email;
     if(typeof(e)==='undefined'){
          return next();
     }

     // send to this email
     console.log('Sending whitepaper email: ' + e);

     // TODO: save to DB

     var wpLink = process.env.WHITEPAPER_LINK;
     ms.makeReport(wpLink,function(err,data){
          if(err) 
               return next(err);

          var subjText = 'Dao.Casino Whitepaper';
          var text     = '';
          var textHtml = data;

          // 2 - send email with attachement
          console.log('-->Sending email');
          ms.sendEmail(e,subjText,text,textHtml,function(err,response){
               console.log('-->Mail with attachment sent...');

               res.redirect('/download_complete.html');
          });
     });
});


app.get('/invite', function(req, res) {
     var slackUrl = process.env.SLACK_URL || 'daocasino.slack.com';
     var slacktoken = process.env.SLACK_TOKEN;

     var email = req.query.email;
     if(typeof(email)==='undefined'){
          return next();
     }

     console.log('Slack invite request from: ' + email);

     request.post({
          url: 'https://'+ slackUrl + '/api/users.admin.invite',
          form: {
               email: email,
               token: slacktoken,
               set_active: true
          }
     }, function(err, httpResponse, body) {
          // body looks like:
          //   {"ok":true}
          //       or
          //   {"ok":false,"error":"already_invited"}

          if (err) { return res.send('Error:' + err); }

	  console.log('Response: ');
	  console.log(body);

          body = JSON.parse(body);
          if (body.ok) {
               console.log('Invited to Slack...');     
               res.redirect('/invite_complete.html');
          } else {
               var error = body.error;
               console.log('Error...');     
               res.redirect('/invite_bad.html');
          }
     });
});

/// Start
/*
app.listen(app.get('port'), function() {
     console.log('Node app is running on port', app.get('port'));
});
*/


var ca          = fs.readFileSync( 'cert/dao_casino.ca-bundle', 'utf8');
var certificate = fs.readFileSync( 'cert/dao_casino.crt', 'utf8');
var privateKey  = fs.readFileSync( 'cert/dao_casino.key', 'utf8');
var credentials = {ca: ca, key: privateKey, cert: certificate};

var httpServer  = http.createServer(function(req,res){
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});

var httpsServer = https.createServer(credentials, app);

httpsServer.on('connection', function(sock) {
      console.log('New HTTPS connection: ' + sock.remoteAddress);		
});

httpsServer.on('request', function(req,resp) {
      //console.log('New HTTPS request: ' + req.url);		
});

httpServer.listen(app.get('port'));
httpsServer.listen(app.get('https_port'));


////////////////////////////////////////
////////////////////////////// MAILCHIMP
////////////////////////////////////////
/*
var MailChimpOAuth = require('mailchimp').MailChimpOAuth;
var MailChimpAPI = require('mailchimp').MailChimpAPI;

var options = {
    clientId: process.env.MAILCHIMP_ID,
    clientSecret: process.env.MAILCHIMP_TOKEN,

    redirectUri: '127.0.0.1',
    ownServer: true,
    addPort: true,
    finalUri: '127.0.0.1'
};

var oauth = new MailChimpOAuth(options);

console.log(oauth.getAuthorizeUri()); // The MailChimp login URI the user needs to be sent to
oauth.on('error', function (error) {
    console.log('Mailchimp error: ');
    console.log(error.err);
});

oauth.on('authed', function (data) {
    console.log('Mailchimp auth OK');
    console.log(data);
});

try {
	var api = new MailChimpAPI(options.clientSecret, { version : '1.3', secure : false });

	api.campaigns({ start: 0, limit: 25 }, function (error, data) {
	if (error)
	    console.log(error.message);
	else
	    console.log(JSON.stringify(data)); // Do something with your data!
	});

} catch (error) {
	console.log(error.message);
}
*/
