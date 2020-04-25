const {transporter}=require('../startup/email_sender')
const {Threshold}=require('../models/ag_threshold')
const {User}=require('../models/user')

async function email_sender(array){
    const res = await User.find({})

    var i=0;
    for(i=0;i<res.length;i++)
    {
        console.log(res[i].email)
        let info=transporter.sendMail({
            from: '"Progetto Diana" <progetto-diana@libero.it>', 
            to: res[i].email, 
            subject: "Attenzione", 
            text: "Attenzione", 
            html: "<body><h1> Livello critico raggiunto:</h1><br> Raggiunto livello di "+ 
                    array.type+" pari a "+array.value+" in data "+array.date+" presso il sensore "
                    +array.sensore+ "("+array.lat+", "+array.lon+")</body>", 
        })

        function sleep(s){
            var now = new Date().getTime();
            while(new Date().getTime() < now + (s*1000)){ /* non faccio niente */ } 
        }

        sleep(1)
        
    }

}

exports.email_sender = email_sender




