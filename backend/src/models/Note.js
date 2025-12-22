import mongoose from 'mongoose';


// Define the Note schema
// Create a schema for notes with title and content fields



const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Note = mongoose.model('Note', noteSchema);

export default Note;
