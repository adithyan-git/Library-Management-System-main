const mongoose = require("mongoose");

const newBook = new mongoose.Schema({

    librarianName:{
        type:String,
        require:true
    },
    bookName:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    howmanyCopies:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }
})

const newBookRequest = mongoose.model('newbookrequest',newBook);
module.exports = newBookRequest;