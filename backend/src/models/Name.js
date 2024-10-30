import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    description : {
        type: String,
        required : true
    },
    
    gender: {
        type: String,
        required: true
    },

    origin: {
        type: String,
        required: true
    },

    image : {
        type: String
    }

}, {timestamps: true});

const Name = mongoose.model('Name', nameSchema);

export default Name;