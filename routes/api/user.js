
// ./routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// in order to receive data from client
router.use(express.json());

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
router.post('/', async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const savedUser = await user.save();
    res.json(savedUser);

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


module.exports = router;