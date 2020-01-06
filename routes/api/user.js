
// ./routes/user.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../../models/User');


//bcrypt setting
const saltRounds = 10;

// in order to receive data from client
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

//GET request for finding all users
router.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});



// GET request for individual user under GET request for finding all users.  Note that ':' in ':userID' is removed.
router.get('/:userID',(req, res)=>{
    User.findById(req.params.userID,(err,user)=>{
        if (err) console.log('error');
        res.send(user);
    });
});

// POST request in ./routes/user.js under router.get
// This router might have problem in asynchronization
router.post('/', (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    bcrypt.hash(user.password, saltRounds, (err, hash) =>{
        user.password = hash;
        user.save();
        res.json(user);
    });
});


//DELETE request under POST request in user.js
router.delete('/:userID', async (req, res) => {
    const user = await User.deleteOne({ _id: req.params.userID });
    res.send(user);
  });


//PATCH request under DELET request in user.js
router.patch('/:userID', async (req,res) => {
    console.log(req.body.age);
    const user = await User.updateOne({_id: req.params.userID}, {$set:{email:req.body.email}});
    res.send(user);
  });


  //login authentication with email and password
  router.post('/login',(req,res) => {
    User.findOne({ email : req.body.email }, (err, user) => {
      if (err) {
        return res.status(400).json({"error":err.message});
      }
      if(!user){
        return res.json({"message": "email not found"})
      }
      bcrypt.compare(req.body.password, user.password, (err,result) => {
        if (err) {
          return res.status(400).json({"error":err.message});
        }
        if (!result) {
          return res.json({"message" : "password is not correct"})
        }
        return res.json({"message" : "password is correct"})
      })
    })
  })
  

module.exports = router;