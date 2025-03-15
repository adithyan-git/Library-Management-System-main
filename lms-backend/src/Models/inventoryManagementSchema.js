const mongoose = require("mongoose");

const inventoryManagement = new mongoose.Schema({
    booktitle:{
        type:String,
        require:true
    },
    publisher:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    problem:{
        type:String,
        require:true
    }
})

const inventoryManage = mongoose.model('bookinventorymanage',inventoryManagement);
module.exports = inventoryManage;
