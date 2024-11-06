const bcryptjs = require("bcryptjs");

const User = require("../models/User.js");

exports.createUser = async (req, res) => {
    const {username, password, role = 'USER'} = req.body;
    
    try{
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({username, role,  password: hashedPassword});
        await user.save();

        res.status(201).json({message: `user created with username as ${username}`});
    } catch(error) {
        res.status(400).json({message: 'user not created', error: error.message});
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({message: 'users got', data: users});
    } catch (error) {
        res.status(400).json({message: 'users not got', error: error.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({username : req.params.username});
        res.status(200).json({message: 'user got', data: user});
    } catch (error) {
        res.status(400).json({message: 'user not got', error: error.message});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({username: req.params.username});
        res.status(200).json({message: 'user deleted'});
    } catch (error) {
        res.status(400).json({message: 'user not deleted', error: error.message});
    }
}