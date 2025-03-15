const mongoose = require("mongoose");

const libraryFeedbackSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:[true,'email already exist']
    },
    registernumber:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true 
    }
})

const libraryServiceFeedback = mongoose.model('libraryservicefeedback',libraryFeedbackSchema);
module.exports = libraryServiceFeedback;