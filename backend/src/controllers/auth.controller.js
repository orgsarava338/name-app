import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export async function register(req, res) {
    const {username, email, password, role = 'USER'} = req.body;
    
    try{
        if(!username) throw new Error('username was required');
        if(!email) throw new Error('email was required');
        if(!password) throw new Error('password was required');

        let user = await User.findOne({$or : [{email}, {username}]});
        if(user) throw new Error('username / email already exists');

        const hashedPassword = await bcryptjs.hash(password, 10);

        user = new User({username, email, role, password: hashedPassword});
        await user.save();

        res.cookie('auth_token', token, {expiresIn: 24 * 60 * 60 * 1000, httpOnly: true});
        res.status(201).json({message: `user registered with username as ${username}`});
        
    } catch(error) {
        res.status(400).json({message: 'user not registered', error: error.message});
    }

}

export async function login(req, res) {
    try {
        
        const {usernameOrEmail, password} = req.body;
        
        if(!usernameOrEmail) throw new Error('username / email any one was required to login');
        if(!password) throw new Error('password required to login');

        const user = await User.findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]});

        if(!user) throw new Error('user not exist');

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid Credential'});

        const token = jwt.sign(
            { username: user.username, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('auth_token', token, {expiresIn: 24 * 60 * 60 * 1000, httpOnly: true});
        res.status(200).json({message: 'user logged in'});

    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'user not able to login', error: error.message});
    }
}

export async function logoff(req, res) {
    try {
        res.clearCookie('auth_token');
        res.status(200).json({message: 'user logged off'});
    } catch (error) {
        res.status(400).json({message: 'user not able to logoff', error: error.message});
    }
}