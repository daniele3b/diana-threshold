const {transporter}=require('../startup/email_sender')
const {Threshold}=require('../models/ag_threshold')

async function email_sender(){
    //const res=await User.find({})
    /*
    var i=0;
    for(i=0;i<1;i++)
    {
        
        let info=transporter.sendMail({
            from: '"Progetto Diana" <progetto-diana@libero.it>', // sender address
            to: "mariocavaiola@libero.it",//res[i].email+','+res[i].email, // list of receivers
            subject: "Announcement", // Subject line
            text: "This is an announcemente", // plain text body
            html: "<body><h1> Luigi:</h1><br> Zone: <b>"+"aa"+"</b><br> Date: <b> ->"+" </b><br><span>Description: <b> </b></span></body>", // html body
        })
    }
*/
}

exports.email = email_sender




