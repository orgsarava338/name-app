import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export async function register(req, res) {
    const {username, email, password, role = 'USER'} = req.body;
    
    try{
        const hashedPassword = await bycrypt.hash(password, 10);
        const user = new User({username, role,  password: hashedPassword});
        await user.save();

        res.status(201).json({message: `user registered with username as ${username}`});
    } catch(error) {
        console.error(`User not registered. Error : ${error.message}`, error);
        res.status(500).json({message: `user not registered`});
    }

}

export async function login(req, res) {
    try {
        
        const {username, password} = req.body;

        const user = User.findOne({username});
        if(!user) throw new Error('user not found');

        const isMatch = await bycrypt.compare(password, hashedPassword);
        if(!isMatch) return res.status(400).json({message: 'Invalid Credential'});

        const token = jwt.sign(
            { id: user._id, username: username, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({token, message: 'user logged in'});

    } catch (error) {
        console.error(`User not able to login. Error : ${error.message}`, error);
        res.status(500).json({message: `user not logged in`});
    }
}

export async function logoff(req, res) {
    throw new Error(`implement ${this.name}`);
}