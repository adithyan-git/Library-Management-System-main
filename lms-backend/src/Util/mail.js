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

const sendEmail = (req,res,next)=> new Promise((resolve,reject)=>{

    const email = req.orderBook.email;
    const sub = req.orderBook.subject;
    const books = req.orderBook.bookname;
    const phonenumber = req.orderBook.phonenumber;

    const emailDetails = {
        from:process.env.EMAIL,
        to:email,
        subject:sub,
        text:`phoneNumber:-${phonenumber}`,
        html:`<h2>Books</h2><p>${books}</p> <h2>PhoneNumber</h2> <h6>please give a response to this mail via calling</h6> <p> ${phonenumber}</p>
         `
    }

    transport.sendMail(emailDetails,(err,res)=>{
        if(err){
            reject(err)
        }
            resolve(res)
    })
    
    return res.status(200).json({
        success:true,
        message:'successfully send email'
    })
})

module.exports = sendEmail;
