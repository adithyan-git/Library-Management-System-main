const mongoose = require("mongoose");

const missing = new mongoose.Schema({
    bookname:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    numberofmissingcopies:{
        type:String,
        require:true
    }
})

const missingDetails = mongoose.model('missingdetail',missing);
module.exports = missingDetails;