var ms = require('../email/report_send.js');

var fs = require('fs');
var assert = require('assert');

describe('Mail sender',function(){

     it('should send e-mail',function(done){
          var someLink = 'http://cool-whitepaper.html';
          ms.makeReport(someLink,function(err,data){
               if(err) 
                    return done(err);

               assert.notEqual(data.length,0);

               // ...  
               var sendTo = 'tony@chain.cloud';

               var subjText = 'Dao.Casino Whitepaper';
               var text     = 'Dao.Casino Whitepaper';
               var textHtml = data;

               // 2 - send email with attachement
               console.log('-->Sending email');
               ms.sendEmail(sendTo,subjText,text,textHtml,function(err,response){
                    assert.equal(err,null);

                    console.log('-->Mail with attachment sent...');
                    done();
               });
          });
     })

})

