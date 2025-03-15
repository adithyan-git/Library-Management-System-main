const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:[true,'book already exist']
    },
    author:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    publisher:{
        type:String,
        require:true
    },
    publicationyear:{
        type:String,
        require:true
    },
    totalcopies:{
        type:String,
        require:true
    },
    shelflocationnumber:{
        type:String,
        require:true
    },
    bookstatus:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    bookcategory:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    bookimage:{
        type:String,
        require:true
    },
    borrowcount:{
        type:String,
        default:0
    },
    reservedcount:{
        type:String,
        default:0
    },
    summary:{
        type:String,
        require:true
    },
    colorstatus:{
        type:Boolean,
        default:false
    }
});

const books = mongoose.model('book',bookSchema); 
module.exports = books;