const mongoose = require("mongoose");

const returnBook = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    bookname:{
        type:String,
        require:true
    },
    registernumber:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    bookname:{
        type:String,
        require:true
    },
    returndate:{
        type:String,
        require:true
    },
    duedate:{
        type:String,
        require:true
    }
})

const returnDetail = mongoose.model('returnBookDetail',returnBook);
module.exports = returnDetail;