const mongoose = require("mongoose");

const registration = new mongoose.Schema({

    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
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
    status:{
        type:String,
        require:true,
        default:'active'
    },
    role:{
        type:String,
        default:'user'
    }   
})

const registrationDetails = mongoose.model('registrationDetail',registration);
module.exports = registrationDetails