import bcryptjs from "bcryptjs";

import User from "../models/User.js";

export async function createUser(req, res) {
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

export async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json({message: 'users got', data: users});
    } catch (error) {
        res.status(400).json({message: 'users not got', error: error.message});
    }
}

export async function getUser(req, res) {
    try {
        const user = await User.findOne({username : req.params.username});
        res.status(200).json({message: 'user got', data: user});
    } catch (error) {
        res.status(400).json({message: 'user not got', error: error.message});
    }
}

export async function updateUser(req, res) {
    try {
        const {password, role, ...request} = req.body;

        await User.findOneAndUpdate({username: req.params.username}, request);
        res.status(200).json({message: 'user updated'});
    } catch (error) {
        res.status(400).json({message: 'user not updated', error: error.message});
    }
}

export async function deleteUser(req, res) {
    try {
        await User.findOneAndDelete({username: req.params.username});
        res.status(200).json({message: 'user deleted'});
    } catch (error) {
        res.status(400).json({message: 'user not deleted', error: error.message});
    }
}