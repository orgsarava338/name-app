import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },

    description : {
        type: String,
        required : true
    },

    image : {
        type: String
    },
    
    gender: {
        type: String
    },

    origin: {
        type: String
    }

}, {timestamps: true});

const Name = mongoose.model('Name', nameSchema);

export default Name;