const jwt = require("jsonwebtoken");

exports.authentication = (req,res,next) => {
    
    const {token} = req.cookies

    
    if(!token){
        return res.status(401).json({
            success:false,
            message:'unauthorized person,please login'
        });
    }
    
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(404).json({
                success:false,
                message:err.message
            })
        }
        
        req.Id = decode.personId;
        req.role = decode.role;
        next();
    })
}

exports.authorization = (...roles)=>{


    return (req,res,next)=>{
        const personRole = req.role;

        if(!roles.includes(personRole)){
            return res.status(403).json({
                success:false,
                messagee:'un authorized person'
            });
        }
        next()
    }   


}