const mongoose = require("mongoose");

const librarian = new mongoose.Schema({
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
    place:{
        type:String,
        require:true
    },
    dateofbirth:{
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
    qualification:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    idproof:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'librarian'
    }
})

const registerdLibrarian = mongoose.model('registerdlibrarian',librarian);
module.exports = registerdLibrarian;