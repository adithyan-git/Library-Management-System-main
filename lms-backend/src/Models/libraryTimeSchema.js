const mongoose  = require("mongoose");

const timing = new mongoose.Schema({
    openingtime:{
        type:String,
        require:true
    },
    closingtime:{
        type:String,
        require:true
    },
    workingdays:{
        type:Array,
        require:true
    }
});

const timeDetails = mongoose.model('timedetail',timing);
module.exports = timeDetails