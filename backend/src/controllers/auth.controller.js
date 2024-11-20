const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.js');

exports.register = async (req, res) => {
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

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expiresIn: 24 * 60 * 60 * 1000, 
        });

        res.status(201).json({
            message: `user registered with username as ${username}`, 
            data: {email, username, isAdmin: false}
        });
        
    } catch(error) {
        res.status(400).json({message: 'user not registered', error: error.message});
    }

}

exports.login = async (req, res) => {
    try {
        
        const {emailOrUsername, password} = req.body;
        
        if(!emailOrUsername) throw new Error('username / email any one was required to login');
        if(!password) throw new Error('password required to login');

        const user = await User.findOne({$or: [{username: emailOrUsername}, {email: emailOrUsername}]});

        if(!user) throw new Error('user not exist');

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid Credential'});

        const token = jwt.sign(
            { username: user.username, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expiresIn: 24 * 60 * 60 * 1000, 
        });
        res.status(200).json({
            message: 'user logged in',
            data: {email: user.email, username: user.username, isAdmin: user.role === 'admin'}
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'user not able to login', error: error.message});
    }
}

exports.logoff = async (req, res) => {
    try {
        res.clearCookie('auth_token');
        res.status(200).json({message: 'user logged off'});
    } catch (error) {
        res.status(400).json({message: 'user not able to logoff', error: error.message});
    }
}