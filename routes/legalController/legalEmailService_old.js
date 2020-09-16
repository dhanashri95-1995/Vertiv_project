var config = require("./../../config/config"); // this is for Query execution phase with COnnection   // This is emailing .js
module.exports = {
    //aprname is contain legal name in it when asign send  to legal
    trg_mail_to_legal: function (wid, agrtype, oprtname, aprid, ownremark, owner, aprname, aprremark, headname, headremark, frdname, intimation, flag) {  
        var emails = owner + "@ep.esselgroup.com";
        var inti = "";
        var loginId = headname;  // headname  login uid
        if (intimation != "")
            inti = intimation + "@ep.esselgroup.com";
        var frd = ""
        if (frdname != "")
            frd = frdname + "@ep.esselgroup.com";
        var toemail = '';
        var hdmail = '';
        if (flag === 'assign' || flag === 'Approval' || flag === 'LegalToOwner') {
            toemail = aprname + "@ep.esselgroup.com";   // assigner Mail Id ;
            for (i = 0; i < headname.length; i++) {   // Legal group Mail Id
                hdmail += headname[i].S_REPORTING_NAME + "@ep.esselgroup.com , ";
            }
        } else if (flag === 'create' || flag === 'assignToLegalhead' || flag === 'ApprovarToLegal') {
            for (i = 0; i < aprname.length; i++) {
                toemail += aprname[i].S_REPORTING_NAME + "@ep.esselgroup.com , ";
            }
        }

        /* if(flag === 'Approval'){
        toemail = aprname+"@ep.esselgroup.com , ";
        } */
        var html = "Dear Sir/Madam,<br><br>Kindly approve/review the Legal statement of following details.<p><b>Legal ID:</b>&nbsp;&nbsp;" + wid + " </p><p><b>Type Of Agreement:</b>&nbsp;&nbsp;" + agrtype + " </p><p><b>Other Party Name : &nbsp;&nbsp;</b>" + oprtname + " </p><p><b>Approver Name : &nbsp;&nbsp;</b>" + aprid + " </p><p><b>Initiator Remark : &nbsp;&nbsp;</b>" + ownremark + " </p><p><b>Sender Remark : &nbsp;&nbsp;</b>" + aprremark + " </p><p><b>From : &nbsp;&nbsp;</b>" + loginId + " </p>";
        html += "<br><a href='http://192.168.10.63:9000/task-workflow#/legal-workflow_list'>Click To view Workflow</a>";
        html += "<br><br>With Regards,<br>DMS Support Team<br><br><font color='red'><b>Note:</b>*** This is system generated Email. ***";

        console.log(aprid + "@ep.esselgroup.com," + emails + " ," + hdmail + "  " + inti + " , " + frd)
        config.mailserver.send({
            from: "dms.support1@ep.esselgroup.com",
            to: toemail, //+ "  dms.support1@ep.esselgroup.com",
            cc: aprid + "@ep.esselgroup.com," + emails + " ," + hdmail + " " + inti + " , " + frd,
            subject: " Legal workflow : " + wid,
            attachment:
                [
                    { data: html, alternative: true }
                ]
        },
            function (err, message) {
                console.log(err || message);
                console.log(message);
            });
    },

    trg_mail_on_Execution_workflow: function (body,legalhead) {
        var legal = [];
        var emails = '';
        var uid=legalhead.uid;
        if (body[0].S_OWNER_BY) {
            emails += body[0].S_OWNER_BY + "@ep.esselgroup.com ,"
        }
        if (body[0].S_APPROVAL_ID) {
            emails += body[0].S_APPROVAL_ID + "@ep.esselgroup.com ,"
        }
        // send the message and get a callback with an error or details of the message that was sent
        for (i = 0; i < body.length; i++) {
            if (emails.indexOf(body[i].S_APPROVAL_NAME + "@ep.esselgroup.com") == -1 && body[i].S_APPROVAL_NAME !== "LEGAL-GROUP" ) {
                emails += body[i].S_APPROVAL_NAME + "@ep.esselgroup.com ,";
            }
        }
        var toemail = ''; /// this is for leagl heaad Department
        for (i = 0; i < legalhead.legalhead.length; i++) {
            toemail += legalhead.legalhead[i].S_REPORTING_NAME + "@ep.esselgroup.com , ";
        }

        var html = "Dear Sir/Madam,<br><br><blockquote>Workflow Process is  '" + body[0].N_STATUS + "'.<p><b>Type Of Agreement:</b>&nbsp;&nbsp;" + body[0].S_TYPE_OF_AGREMENT + " </p><p><b>Other Party Name : &nbsp;&nbsp;</b>" + body[0].S_OTHER_PARTY_NAME + " </p><p><b>Approver Name : &nbsp;&nbsp;</b>" + body[0].S_APPROVAL_ID + " </p><p><b>From : &nbsp;&nbsp;</b>"+uid+"</p></blockquote>";
        html += "<br><br>With Regards,<br><br>DMS Support Team.<br><br><font color='red'><b>Note:</b>*** This is system generated Email. ***";
        console.log(emails + "," + toemail)
        config.mailserver.send({
            from: "dms.support1@ep.esselgroup.com",
            to: toemail,// to main legal head
            cc: emails + " " + toemail,
            subject: " Legal workflow : " + body[0].S_WORKFLOW_ID,
            attachment:
                [
                    { data: html, alternative: true }
                ]
        },
            function (err, message) {
                console.log(err || message);
                console.log(message);
            });
    },
}