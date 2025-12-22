import Note from '../models/Note.js';


export async function getAllNotes(_,res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.error("Error showing up connecting to DB:");
    }
}

export async function getNotesById(req,res) {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Internal server error:", error);
    }
}

export async function createNote(req,res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });

        const savedNote = await note.save();
        res.status(201).json({message: 'Note created successfully', note: savedNote});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.error("Internal server error:", error);
    }
}

export async function updateNote(req,res) {  
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Internal server error:", error);
    }
}

export async function deleteNote (req,res) { 
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Internal server error:", error);
    }
}
