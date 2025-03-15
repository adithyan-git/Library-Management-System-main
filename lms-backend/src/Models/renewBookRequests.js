const mongoose = require('mongoose')

const renewBookRequests = new mongoose.Schema({
    bookid:{
        type:String,
        require:true
    },
    registerid:{
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
    borrowdate:{
        type:String,
        require:true
    },
    duedate:{
        type:String,
        require:true
    },
    extendingdate:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:'pending'
    }
})

const renewRequests = mongoose.model('renewRequest',renewBookRequests);
module.exports = renewRequests