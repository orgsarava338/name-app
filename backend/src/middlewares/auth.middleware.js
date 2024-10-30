import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
    let token;
    const authHeader = req.headers.Auth0rization || req.headers.authorization;
    
    if(authHeader && authHeader.startsWith('Bearer')) 
        token = authHeader.split(' ')[1];
    
    if(!token) return res.status(401).json({message: 'No Token. Autherization denied.'});
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'token not valid'});
    }
}

export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) return res.status(403).json({message: 'Access Denied.'});
        next();
    }
}