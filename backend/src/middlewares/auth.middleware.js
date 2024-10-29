import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
    let token;
    const authHeader = req.headers.Autherization || req.headers.Autherization;
    
    if(authHeader && authHeader.startsWith('Bearer')) 
        token = authHeader.split(' ')[1];
    
    if(!token) return res.status(401).json({message: 'No Token. Autherization denied.'});
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        console.log('decoded user : ', user);
        next();

    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'token not valid'});
    }
}

export async function authorizeRoles(...roles) {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) return res.status(403).json({message: 'Access Denied.'});
        next();
    }
}