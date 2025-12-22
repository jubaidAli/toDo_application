import Note from '../models/Note.js';


export async function getAllNotes(req,res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
    }
}

export const createNote = async (req,res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateNote = (req,res) => {  
    res.status(200).send('Note updated successfully')
}

export const deleteNote = (req,res) => {
    res.status(200).send('Note deleted successfully')
}
