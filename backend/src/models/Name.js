import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },

    description : {
        type: String,
    },
    
    gender: {
        type: String,
    },

    origin: {
        type: String,
    },

    image : {
        type: String
    }

}, {timestamps: true});

const Name = mongoose.model('Name', nameSchema);

export default Name;