import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export async function register(req, res) {
    const {username, password, role = 'USER'} = req.body;
    
    try{
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({username, role,  password: hashedPassword});
        await user.save();

        res.status(201).json({message: `user registered with username as ${username}`});
    } catch(error) {
        res.status(400).json({message: 'user not registered', error: error.message});
    }

}

export async function login(req, res) {
    try {
        
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if(!user) throw new Error('user not found');

        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid Credential'});

        const token = jwt.sign(
            { username: username, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({token, message: 'user logged in'});

    } catch (error) {
        res.status(400).json({message: 'user not able to login', error: error.message});
    }
}

export async function logoff(req, res) {
    throw new Error('implement');
}