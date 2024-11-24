const bcryptjs = require("bcryptjs");

const User = require("../models/User.js");

exports.createUser = async (req, res) => {
    const {email, username, password} = req.body;
    
    try{
        const user = new User({ email, username, password: await bcryptjs.hash(password, 10) });
        await user.save();

        res.status(201).json({message: `user created with username ${username}`});
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
        const { userId } = req.params;

        const user = await User.findOne({_id : userId});
        res.status(200).json({message: 'user got', data: user});
    } catch (error) {
        res.status(400).json({message: 'user not got', error: error.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params.username;
        const { username, email, password, role } = req.body;

        const request = {};

        if(email) request.email = email;
        if(username) request.username = username;
        if(password) request.password = await bcryptjs.hash(password, 10);
        if(role) request.role = role;

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { ...request } }, { new : true });
        res.json({ message : `user ${userId} updated`, data: updatedUser});
    } catch (error) {
        res.status(400).json({message: 'user not update', error: error.message});
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
