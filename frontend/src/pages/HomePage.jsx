import React from 'react';
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useEffect } from 'react';
import api from '../../lib/axios.js';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';

// import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
  const fetchNotes = async () => {
    try {
      // Use relative path so Vite proxy forwards to backend over HTTP
      const res = await api.get('/notes');
      console.log('Fetched notes:', res.data);
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      console.error('Axios error response:', error.response);

      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else if (!error.response) {
        toast.error('Network error: Could not reach API. Is backend running?');
      } else {
        toast.error('Failed to load notes');
      }
    } finally {
      setLoading(false);
    }
  };

  fetchNotes();
}, []);



  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
