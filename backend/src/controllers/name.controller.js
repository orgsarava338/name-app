import Name from "../models/Name.js";

export async function createName(req, res) {
    const { name, description, origin, gender } = req.body;

    const slug = name.split(' ').join('_');

    try {
        const name = new Name({name, slug, description, origin, gender});
        name.save();
        
        res.status(201).json({message:`name created ${name}`});
    } catch (error) {
        console.error('Name not created. Error : ', error);
        res.status(400).json({message: `Name not created. Error ${error.message}`});
    }
}

export async function getAllNames(req, res) {
    try {
        const names = await Name.find({});
        if(!names.length) return res.staus(404).json({message: 'no name found'});
        
        res.status(200).json({message: 'names are fetched', data: names});
    } catch (error) {
        console.error('no names got. Error : ', error);
        res.status(400).json({message: `no nae found. Error ${error.message}`});
    }
}

export async function getName(req, res) {
    try {
        const slug = req.params.slug;

        const name = await Name.findOne({slug});
        if(!name) return res.staus(404).json({message: 'name not found'});

        res.status(200).json({message: 'name found', data: name});
    } catch (error) {
        console.error('Name not got. Error : ', error);
        res.status(400).json({message: `Name not created. Error ${error.message}`});
    }
}

export async function updateName(req, res) {
    try {
        const slug = req.params.slug;
        
        Name.updateOne({slug}, req.body);
        res.status(200).json({message: 'name updated'});
    } catch (error) {
        console.error('Name not updated. Error : ', error);
        res.status(400).json({message: `Name not created. Error ${error.message}`});
    }
}

export async function deleteName(req, res) {
    try {
        const slug = req.params.slug;
        
        Name.deleteOne({slug}, req.body);
        res.status(200).json({message: 'name deleted'});
    } catch (error) {
        console.error('Name not deleted. Error : ', error);
        res.status(400).json({message: `Name not created. Error ${error.message}`});
    }
}
