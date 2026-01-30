import React, { useState } from 'react';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([])
  const [noteTitle, setNoteTitle] = useState('')
  const [noteStatus, setNoteStatus] = useState('')
  const [filter, setFilter] = useState('all')

  const handleAddNote = () => {
    if (noteTitle.trim() && noteStatus.trim()) {
      setNotes([ ...notes, {
        id: Date.now(),
        title: noteTitle,
        status: noteStatus.toLowerCase(),
      }])
      
      setNoteTitle('')
      setNoteStatus('')
    }
  }

  const getFilteredNotes = () => {
    if (filter === 'active') {
      return notes.filter((item) => item.status === 'active')
    }
    else if (filter === 'completed') {
      return notes.filter((item) => item.status === 'completed')
    }
    else {
      const activeNotes = notes.filter((item) => item.status === 'active')
      const completedNotes = notes.filter((item) => item.status === 'completed')
      const otherNotes = notes.filter((item) => item.status !== 'active' && item.status !== 'completed')

      return [...activeNotes, ...completedNotes, ...otherNotes]
    }
  }

  return (
<div>
  <header>
    <div>H</div>
    <h1>Notes Application</h1>
  </header>
      
  <div>
    <input 
      value={noteTitle}
      placeholder='Note Title'
      data-testid='input-note-title'
      onChange={(e) => setNoteTitle(e.target.value)}
    />
    <input 
      value={noteStatus}
      placeholder='Note Status'
      data-testid='input-note-status'
      onChange={(e) => setNoteStatus(e.target.value)}
    />
    <button data-testid='submit-button' onClick={handleAddNote}>Add Note</button>
  </div>

  <div>
    <button data-testid='allButton' onClick={() => setFilter('all')}>ALL</button>
    <button data-testid='activeButton' onClick={() => setFilter('active')}>Active</button>
    <button data-testid='completedButton' onClick={() => setFilter('completed')}>Completed</button>
  </div>

  <table>
      <thead>
         <tr>
        <th>Title</th>
        <th>Status</th>
        </tr>
      </thead>
     <tbody data-testid='notesList'>
      { getFilteredNotes().map(note => (<tr key={note.id}>
<td>{note.title}</td>
<td>{note.status}</td>
      </tr>)
      )
      }
     </tbody>
  </table>
</div>
  );
}

export default Notes;

