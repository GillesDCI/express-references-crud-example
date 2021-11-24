const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req,res) => {

    const users = await User.find({}).select('firstname lastname');
    return res.status(200).json(users);
});

//POST route 
router.post('/add',async (req, res) => {
    try {
        const userToAdd = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username
        })

        const resultUser = await userToAdd.save();

        return res.status(200).json({message:'User was created', createdUser:resultUser})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
});


module.exports = router;