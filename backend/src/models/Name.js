const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },

    gender: {
        type: String,
        required: true,
    },

    description : {
        type: String,
        required: true, 
    },

    literacy: {
        type: String,
    },

    epigraph: {
        type: String
    },

    image : {
        type: String
    }

}, {timestamps: true});

const Name = mongoose.model('Name', nameSchema);

module.exports = Name;