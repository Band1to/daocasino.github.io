var express = require('express');
var app = express();

var ms = require('./email/report_send.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/build'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
     //response.render('pages/index');
     response.redirect('/home.html');
});

app.listen(app.get('port'), function() {
     console.log('Node app is running on port', app.get('port'));
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


