const Name = require("../models/Name.js");

exports.createName = async (req, res) => {
    try {
        const _name = new Name(req.body);
        await _name.save();
        res.status(201).json({message: 'name created', data : _name});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Name not created',  error : error.message});
    }
}

exports.getAllNames = async (req, res) => {
    try {
        const names = await Name.aggregate([
            {$match : {}},
            { $sort: { name: 1} },
            { $project: { _id: 0, __v: 0, startsWithSearchText: 0 } }
            
          ]).collation({locale: 'ta', strength: 1})

        res.status(200).json({message: 'names are fetched', data: names});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'names not got', error: error.message});
    }
}

exports.getName = async (req, res) => {
    try {
        const _name = await Name.findById({_id: req.params.id});
        res.status(200).json({message: 'name found', data: _name});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'name not got', error : error.message});
    }
}

exports.updateName = async (req, res) => {
    try {

        const {name, ...request} = req.body;

        if(name) throw new Error('name field not allowed to be modified. If required, Please try to create a new name');

        await Name.findByIdAndUpdate({_id: req.params.id}, request);
        res.status(200).json({message: 'name updated'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Name not updated', error: error.message});
    }
}

exports.deleteName = async (req, res) => {
    try {
        await Name.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({message: 'name deleted'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Name not deleted', error : error.message});
    }
}
