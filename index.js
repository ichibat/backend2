//initial requirement
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const jwt = require('jsonwebtoken');


// load router in line of other requires
const userRouter = require('./routes/api/user');

//mongoDB options
const options = { useNewUrlParser: true, useUnifiedTopology: true }
//port setting
const port = process.env.PORT || 3000;
//bcrypt setting
const saltRounds = 10;

// app for express
const app = express();



//connect to mongoDB
mongoose.connect('mongodb://tims:Hit135Run@ds019946.mlab.com:19946/ktmethod', options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', () => console.log('database connection successful'));


//importing models
const User = require('./models/User'); 


//Use following middlewares
//Helmet
app.use(helmet());
//express.json()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//Express-session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
//Flash
app.use(flash());
//Cor
app.use(cors());


// use router under middlewares
app.use('/user', userRouter);

//Hello World!
app.get('/', (req, res) => {
  res.send('Hello World!!');
});


// port listening
app.listen(port, () => console.log(`OK, Server started on port ${port}`));