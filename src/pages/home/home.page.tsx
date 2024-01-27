import { useEffect, useState } from 'react';
import Header from './components/Header';
import NoteCard from '../../components/NoteCard';
import { Note } from '../../types/note';

function HomePage() {

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/notes.json");
      const noteData = (await res.json()).notes;
      return noteData;
    }
    fetchNotes().then((data) => setNotes(data)).catch((error) => console.log(error));
  }, []);

  function addNote({ title, text, date }: { title: string; text: string; date: string }) {
    const note = {
      id: notes.length + 1,
      title,
      text,
      date,
    };
    // Update the notes array by making a copy and adding the new note to the end of the array 
    setNotes([...notes, note]);
  }

  function deleteNote(id: number) {  
    // Update the notes array by making a copy without the note to be deleted 
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <main>
      <Header addNote={addNote} />
      <div className="note-list">
        {
          notes.map(note => (
            // Spreading the props for easy prop passing without typing everything out
            <NoteCard {...note} deleteNote={deleteNote} />
          ))
        }
      </div>
    </main>
  )
}

export default HomePage
