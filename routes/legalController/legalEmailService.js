var config = require("./../../config/config"); // this is for Query execution phase with COnnection   // This is emailing .js
module.exports = {
    mail_to_user_pass: function (body) {
        var legal = [];
        var emails = '';
       
// var pass=rand(8) ;
var digits = '0123456789'; 
let OTP = ''; 
for (let i = 0; i < 6; i++ ) { 
    OTP += digits[Math.floor(Math.random() * 10)]; 
}
        // var html = "Dear Sir/Madam,<br><br><blockquote>Workflow Process is  '" + body[0].N_STATUS + "'.<p><b>Type Of Agreement:</b>&nbsp;&nbsp;" + body[0].S_TYPE_OF_AGREMENT + " </p><p><b>Other Party Name : &nbsp;&nbsp;</b>" + body[0].S_OTHER_PARTY_NAME + " </p><p><b>Approver Name : &nbsp;&nbsp;</b>" + body[0].S_APPROVAL_ID + " </p><p><b>From : &nbsp;&nbsp;</b>"+uid+"</p></blockquote>";
        // html += "<br><br>With Regards,<br><br>DMS Support Team.<br><br><font color='red'><b>Note:</b>*** This is system generated Email. ***";
       var  html= "Your Username to Login Vertiv(Ulams) is: <b>"+body.rows[0].s_email+"<br></b> and password is <b>"+OTP+"</b>";

        // console.log(emails + "," + toemail)
        // body.rows[0].s_email
        config.mailserver.send({
            from: "apponextit@gmail.com",

            to:"pednekardhanashri@gmail.com" ,// to main legal head
            // cc: emails + " " + toemail,
            subject: "Vertiv Password",
            attachment:
                [
                    { data: html,
                         alternative: true }
                ]
        },
            function (err, message) {
                console.log(err || message);
                console.log(message);
            });
    },

}