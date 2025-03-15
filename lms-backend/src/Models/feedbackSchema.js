const mongooose = require("mongoose");

const feedback = new mongooose.Schema({
    bookname:{
        type:String,
        require:true
    },
    fullname:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    feedback:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }
})

const userFeedback = mongooose.model('userfeedback',feedback);
module.exports = userFeedback;