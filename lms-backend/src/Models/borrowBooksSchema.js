const mongoose = require("mongoose");

const borrowBooks = new mongoose.Schema({
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
    address:{
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
    requestsendeddate:{
        type:String,
        require:true
    },
    borroweddate:{
        type:String,
        require:true,
        default:'yyyy-mm-dd'
    },
    borrowstatus:{
        type:String,
        default:'nothing'
    },
    duedate:{
        type:String,
        default:'yyyy-mm-dd'
    },
    request:{
        type:String,
        default:'pending'
    },
    expirestatus:{
        type:String,
        default:'nothing'
    },
    image:{
        type:String,
        default:null
    },
    return:{
        type:String,
        default:'nothing'
    },
    renewstatus:{
        type:String,
        default:'nothing'
    },
    messagestatus:{
        type:String,
        default:'nothing'
    }
   

})

const borrowBook = mongoose.model('borrowbook',borrowBooks);
module.exports = borrowBook;