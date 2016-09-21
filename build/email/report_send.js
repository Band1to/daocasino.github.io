var nodemailer = require('nodemailer');
var fs = require('fs');

String.prototype.replaceAll = function(character,replaceChar){
     var word = this.valueOf();

     while(word.indexOf(character) != -1){
          word = word.replace(character,replaceChar);
     }

     return word;
}

function changeTemplateVar(data,oldVal,newVal){
     if(!data)
          throw new Error('Bad object');

     return data.replaceAll(oldVal,newVal);
}

function getTemplateName(){
     var template_file = 'email/templates/whitepaper_download.html';
     return template_file;
}

function makeReport(whitepaperLink,cb){
     // 1 - open file 
     var template_file = getTemplateName();

     fs.readFile(template_file, 'utf8', function (err, data) {
          if (err) {
               return cb(err);
          }

          // 2 - substitute parameters
          data = changeTemplateVar(
               data,
               '*|WP_LINK|*',
               whitepaperLink 
          );
     
          cb(err,data);
     });
}

function getMailOpts(){
     var opts = {};
     opts = {
          service: 'yandex',
          auth: {
               user: process.env.MAIL_USER,
               pass: process.env.MAIL_PASS
          }
     };

     console.log('OPTS: ');
     console.log(opts);

     return opts;
}

function sendEmail(sendTo,subjText,text,textHtml,cb){
     var opts = {};
     
     var opts = getMailOpts();
     var transport = nodemailer.createTransport("SMTP", opts);

     var from = process.env.MAIL_FROM;
     var bcc = process.env.MAIL_BCC;

     // setup e-mail data with unicode symbols
     var mailOptions = {
           from: from,
           to: sendTo,                     // list of receivers
           bcc: bcc,

           attachments: [
           ],

           subject: subjText,              // Subject line
           text: text,                     // plaintext body
           html: textHtml                  // html body
     }

     // send mail with defined transport object
     transport.sendMail(mailOptions, function(error, response){
          console.log('-->E: ');
          console.log(error);

          console.log('-->R: ');
          console.log(response);

          if(error){
               return cb(error,response);
          }else{
               console.log("Message sent: " + response.message);
          }

          // if you don't want to use this transport object anymore, uncomment following line
          transport.close(); // shut down the connection pool, no more messages

          cb(error,response);
     });
};

exports.makeReport = makeReport;
exports.sendEmail = sendEmail;

