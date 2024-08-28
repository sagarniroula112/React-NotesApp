import { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  return (
    <div className="app">
      <AddContent notes={notes} setNotes={setNotes} editingNote={editingNote} setEditingNote={setEditingNote} />
      <AllNotes notes={notes} setNotes={setNotes} setEditingNote={setEditingNote} />
    </div>
  );
}

function AddContent({ notes, setNotes, editingNote, setEditingNote }) {
  const [title, setTitle] = useState(editingNote? editingNote.title : "");
  const [description, setDescription] = useState(editingNote ? editingNote.description: "");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    }
  }, [editingNote]);

  function handleAddOrUpdateNote() {
    if(editingNote){
      setNotes((prevNotes)=>
        prevNotes.map(note=>
          note.id === editingNote.id? {...note, title, description}:note
        )  
      );
      setEditingNote(null);
      setTitle("");
      setDescription("");
    }else{
      const note = {
      id: Date.now(),
      title,
      description
    };
    setNotes((prevNotes) => [...prevNotes, note]);
    setTitle("");
    setDescription("");}
  }

  return (
    <div className='add-content-component'>
      <div className="add-content-description">
        <div>
          <input 
            type='text' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
        </div>
      </div>
      <button className="button" onClick={handleAddOrUpdateNote}>{editingNote? "Update Note" : "+ Create a Note"}</button>
    </div>
  );
}

function AllNotes({ notes, setNotes, setEditingNote }) {
  function handleRemoveNote(id){
    setNotes((prevNotes)=> prevNotes.filter(note=>note.id!== id));
  }

  return (
    <div className='note-container'>
      {notes.map((note, index) => (
        <Note key={index} note={note} onRemove={handleRemoveNote} onEdit={()=>setEditingNote(note)} />
      ))}
    </div>
  );
}

function Note({ note, onRemove, onEdit }) {
  return (
    <div className='note'>
      <h3>{note.title}</h3>
      <p className='note-description'>{note.description}</p>
      <div>
      <button className='button1' onClick={()=>onRemove(note.id)}>Remove</button>
      <button className='button2' onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
}

export default App;

