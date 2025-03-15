const mongoose = require("mongoose");

const reserveBooks = new mongoose.Schema({
    registerid:{
        type:String,
        require:true
    },
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    adress:{
        type:String,
        require:true
    },
    place:{
        type:String,
        require:true
    },
    registernumber:{
        type:String,
        require:true
    },
    bookname:{
        type:String,
        require:true
    },
    reserveddate:{
        type:String,
        require:true
    },
    request:{
        type:String,
        default:'pending'
    },
    deadline:{
       type:String,
       default:'0000-00-00' 
    },
    bookimage:{
        type:String,
        default:""
    },
    borrowstatus:{
        type:String,
        default:'not borrowed'
    },
    reservemessage:{
        type:String,
        default:'nothing'
    }
})

const reserveBook = mongoose.model('reservedbook',reserveBooks);
module.exports = reserveBook;