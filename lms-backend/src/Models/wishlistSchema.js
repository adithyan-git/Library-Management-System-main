const mongoose  = require("mongoose");

const list = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    bookId:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    bookimage:{
        type:String,
        require:true
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
    bookstatus:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    summary:{
        type:String,
        require:true
    }
})


const wishlistSchema = mongoose.model('whishlist',list);
module.exports = wishlistSchema