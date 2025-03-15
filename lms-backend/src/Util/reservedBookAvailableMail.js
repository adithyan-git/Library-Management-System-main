const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({path:'config.env'});

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

const sendNotification = (req,res,next)=> new Promise ((resolve,reject)=>{

    const {email,message,deadline} = req.notificationDetails ;
   
    const emailDetails = {
        from:process.env.EMAIL,
        to:email,
        subject:'ReservedBook Details',
        text:`${message},${deadline}`
    }

    transport.sendMail(emailDetails,(err,res)=>{
            if(err){
                reject(err)
            }
                resolve(res)
    })

    return res.status(200).json({
        success:true,
        message:'notification send successfully'
    })
})

module.exports = sendNotification;
