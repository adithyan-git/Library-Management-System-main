const express = require("express");
const path = require("path")
const app = express();
const cookieParser = require("cookie-parser")
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const cors = require("cors");
app.use(cors({
    credentials:true,
    origin:true
}))

app.use('/src/Uploads', express.static(path.join(__dirname, 'src', 'Uploads'))); //ask sir

const router = require("./src/Route/allRoute");
app.use(router)
module.exports = app;