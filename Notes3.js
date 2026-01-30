import React, { useState } from 'react';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteStatus, setNoteStatus] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddNote = () => {
    if (noteTitle.trim() && noteStatus.trim()) {
      setNotes([...notes, {
        id: Date.now(),
        title: noteTitle,
        status: noteStatus.toLowerCase(),
      }]);
      
      setNoteTitle('');
      setNoteStatus('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleClearAll = () => {
    const filteredCount = getFilteredNotes().length;
    if (filteredCount === 0) return;
    
    const message = filter === 'all' 
      ? `คุณแน่ใจหรือไม่ที่จะลบบันทึกทั้งหมด ${notes.length} รายการ?`
      : `คุณแน่ใจหรือไม่ที่จะลบบันทึก ${filter} ทั้งหมด ${filteredCount} รายการ?`;
    
    if (window.confirm(message)) {
      if (filter === 'all') {
        setNotes([]);
      } else {
        setNotes(notes.filter(note => note.status !== filter));
      }
    }
  };

  const handleClearInputs = () => {
    setNoteTitle('');
    setNoteStatus('');
  };

  const getFilteredNotes = () => {
    if (filter === 'active') {
      return notes.filter((item) => item.status === 'active');
    }
    else if (filter === 'completed') {
      return notes.filter((item) => item.status === 'completed');
    }
    else {
      const activeNotes = notes.filter((item) => item.status === 'active');
      const completedNotes = notes.filter((item) => item.status === 'completed');
      const otherNotes = notes.filter((item) => item.status !== 'active' && item.status !== 'completed');

      return [...activeNotes, ...completedNotes, ...otherNotes];
    }
  };

  return (
    <div>
      <div>
        <input 
          value={noteTitle}
          placeholder='Note Title'
          data-testid='input-note-title'
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        {noteTitle && (
          <button 
            onClick={() => setNoteTitle('')}
            className="clear-x-btn"
          >
            ✕
          </button>
        )}
        <input 
          value={noteStatus}
          placeholder='Note Status'
          data-testid='input-note-status'
          onChange={(e) => setNoteStatus(e.target.value)}
        />
        {noteStatus && (
          <button 
            onClick={() => setNoteStatus('')}
            className="clear-x-btn"
          >
            ✕
          </button>
        )}
        <button data-testid='submit-button' onClick={handleAddNote}>Add Note</button>
        {(noteTitle || noteStatus) && (
          <button 
            onClick={handleClearInputs}
            data-testid="clear-inputs-button"
            className="clear-inputs-btn"
          >
            Clear
          </button>
        )}
      </div>

      <div>
        <button 
          data-testid='allButton' 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          ALL
        </button>
        <button 
          data-testid='activeButton' 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          data-testid='completedButton' 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
        {getFilteredNotes().length > 0 && (
          <button 
            onClick={handleClearAll}
            data-testid="clear-all-button"
            className="clear-all-btn"
          >
            Clear All
          </button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody data-testid='notesList'>
          {getFilteredNotes().map(note => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>{note.status}</td>
              <td>
                <button 
                  onClick={() => handleDeleteNote(note.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notes;
