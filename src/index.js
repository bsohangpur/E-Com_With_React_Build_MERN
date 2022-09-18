// import all stufs
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();

//connect Database
const Database = require('./Database/connection')

// import multer for image file
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './uploads');
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname);
    }
})

const upload = multer({ storage })
module.exports = upload;

// define port
const port = process.env.PORT

// define static path
const staticpath = path.join(__dirname, "../public");


// middleware
app.use(express.json());
app.use(express.static(staticpath));
app.use(cors());
app.use('/uploads', express.static('./uploads'));


//Blog Routes
const Blog = require('./routes/Blog');
app.use('/blog', Blog);


//Product Routes
const Product = require('./routes/Product');
app.use('/product', Product);

//Registeration Routes
const Register = require('./routes/Register');
app.use('/register', Register);

//Login Routes
const Login = require('./routes/Login');
app.use('/login', Login);

app.listen(port, console.log("live"))


