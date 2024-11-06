import Name from "../models/Name.js";

export async function createName(req, res) {
    try {
        const _name = new Name(req.body);
        await _name.save();
        res.status(201).json({message: 'name created', data : _name});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Name not created',  error : error.message});
    }
}

export async function getAllNames(req, res) {
    try {
        const names = await Name.find({});
        res.status(200).json({message: 'names are fetched', data: names});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'names not got', error: error.message});
    }
}

export async function getName(req, res) {
    try {
        const _name = await Name.findById({_id: req.params.id});
        res.status(200).json({message: 'name found', data: _name});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'name not got', error : error.message});
    }
}

export async function updateName(req, res) {
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

export async function deleteName(req, res) {
    try {
        await Name.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({message: 'name deleted'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Name not deleted', error : error.message});
    }
}
