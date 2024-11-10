const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },

    nameInEnglish: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true,
    },

    description : {
        type: String,
        required: true, 
    },

    literatureEvidence: {
        type: String,
    },

    epigraphEvidence: {
        type: String
    },

    image : {
        type: String
    }

}, {timestamps: true});

const Name = mongoose.model('Name', nameSchema);

module.exports = Name;