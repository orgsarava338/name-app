const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies['auth_token'];

    if(!token) return res.status(401).json({message: 'No Token. Authorization denied.'});
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Token not verified', error: error.message});
    }
}

exports.authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        if(!roles.includes(req.user.role)) return res.status(403).json({message: "Access Denied. you don't have access"});
        next();
    }
}