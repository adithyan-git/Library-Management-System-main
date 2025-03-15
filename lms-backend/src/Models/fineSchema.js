const mongoose = require("mongoose");

const fine = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    duedate:{
        type:String,
        require:true
    },
    numberofoverduedays:{
        type:String,
        require:true
    },
    fineperday:{
        type:String,
        require:true
    },
    totalfineamount:{
        type:String,
        require:true
    },
    bookname:{
        type:String,
        require:true
    },
    borroweddate:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:'Not Recieved'
    }
});

const fineDetails = mongoose.model('finedetail',fine);
module.exports = fineDetails;
