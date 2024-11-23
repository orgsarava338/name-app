const Name = require("../models/Name.js");

exports.createName = async (req, res) => {
    try {
        const _name = new Name(req.body);
        await _name.save();
        res.status(201).json({message: 'name created', data : _name});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Name not created',  error : error.message});
    }
}

exports.getAllNames = async (req, res) => {
    try {
        const names = await Name.find()
            .select(['name', 'nameInEnglish', 'gender', 'description',]);

        res.set('Cache-Control', 'public');
        res.status(200).json({message: 'names are fetched', data: names});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'names not got', error: error.message});
    }
}

exports.getName = async (req, res) => {
    try {
        const _name = await Name.findOne({name: req.params.name})
        res.status(200).json({message: 'name found', data: _name});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'name not got', error : error.message});
    }
}

exports.updateName = async (req, res) => {
    try {
        const { name } = req.params
        const { nameInEnglish, description, gender, literatureEvidence, epigraphEvidence } = req.body;

        const request = {};
        
        if(nameInEnglish) request.nameInEnglish = nameInEnglish;
        if(description) request.description = description;
        if(gender) request.gender = gender;
        if(literatureEvidence) request.literatureEvidence = literatureEvidence;
        if(epigraphEvidence) request.epigraphEvidence = epigraphEvidence;

        const updatedName = await Name.findOneAndUpdate({ name }, { request }, { new: true });
        res.status(200).json({message: 'name updated', data: updatedName});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Name not updated', error: error.message});
    }
}

exports.deleteName = async (req, res) => {
    try {
        await Name.findByIdAndDelete({name: req.params.name});
        res.status(200).json({message: 'name deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Name not deleted', error : error.message});
    }
}
