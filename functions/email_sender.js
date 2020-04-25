const {transporter}=require('../startup/email_sender')
const {Threshold}=require('../models/ag_threshold')
const {User}=require('../models/user')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function email_sender(array){
    const res = await User.find({})

    var i=0;
    for(i=0;i<res.length;i++)
    {
        await sleep(2000).then(() => {
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
        })
        
    }

}

exports.email_sender = email_sender




