const mongoose = require("mongoose");

const user = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:[true,'email already exist']
    },
    password:{
        type:String,
        require:true 
    },
    dateofbirth:{
        type:String,
        require:true
    },
    place:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    phonenumber:{
        type:String,
        require:true
    },
    profileimage:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'user'
    },
    status:{
        type:String,
        default:"active"
        
    }
})

const userRegister = mongoose.model('userregister',user);
module.exports = userRegister;