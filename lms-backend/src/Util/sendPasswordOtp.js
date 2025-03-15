const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const userRegister = require("../Models/userSchema");
dotenv.config({path:"config.env"});


const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

const generateOTP = () =>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp
}

const sendPasswordOtp =  (req,res,next)=>  new Promise  ((resolve,reject)=>{

    const email = req.passwordDetails;
    const otp = generateOTP();
    
    const emailDetails = {
        from:process.env.EMAIL,
        to:email,
        subject:"password changing otp",
        text:`your password changing otp is ${otp}` 
    }

    transport.sendMail(emailDetails,(err,res)=>{
        if(err){
            reject(err)
        }
        resolve(res)
    })
       
    return res.status(200).json({
        success:true,
        message:'otp successfully sended to your email',
    })
    
})

module.exports = sendPasswordOtp