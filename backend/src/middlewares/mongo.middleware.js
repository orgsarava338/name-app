import mongoose from "mongoose";

export function isValidMongooseId(req, res, next) {
    try{
        if(req.params.id && !mongoose.isValidObjectId(req.params.id)) 
            throw new Error("id not valid");
        
        next();
    } catch(error) {
        res.status(400).json({message: 'parameter id not valid', error: error.message});
    }
}