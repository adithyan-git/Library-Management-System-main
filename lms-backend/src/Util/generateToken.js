const jwt = require("jsonwebtoken");

exports.tokenGenerate = (req,res,next)=>{
    const option = {
        personId : req.person.id,
        role:req.person.role
    }
    
   try {
    const token = jwt.sign(option,process.env.SECRET_KEY,{expiresIn:'1h'});
    
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Logged in Falied'
        });
    }


        const loggedinPerson = {
            id:req.person.id,
            fullname:req.person.fullname,
            email:req.person.email,
            gender:req.person.gender,
            role:req.person.role,
            address:req.person.address,
            phonenumber:req.person.phonenumber,
            dateofbirth:req.person.dateofbirth,
            place:req.person.place,
            image:req.person.image,
            isAuthenticate:true,
            token
        }

        return res.status(200).cookie('token',token,{maxAge: 24 * 60 * 60 * 1000,}).json({
            success:true,
            message:'Login Successfully Completed',
            loggedinPerson
        });
   
   } catch (error) {
       return res.status(500).json({
            success:false,
            message:error.message
        });
   }


}