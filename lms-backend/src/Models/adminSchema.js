const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    fullname:{
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
    address:{
        type:String,
        require:true 
    },
    phonenumber:{
        type:String,
        require:true
    },
    place:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    profileimage:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:'admin'
    }
})

const adminRegister = mongoose.model('adminregister',admin);
module.exports = adminRegister;