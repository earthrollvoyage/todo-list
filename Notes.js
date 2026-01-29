import React, { useState } from 'react';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteStatus, setNoteStatus] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddNote = () => {
    if (noteTitle.trim() && noteStatus.trim()) {
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        status: noteStatus.toLowerCase()
      };
      setNotes([...notes, newNote]);
      setNoteTitle('');
      setNoteStatus('');
    }
  };

  const handleClearInputs = () => {
    setNoteTitle('');
    setNoteStatus('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleClearAll = () => {
    const filteredCount = getFilteredNotes().length;
    if (filteredCount === 0) return;
    
    const message = filter === 'all' 
      ? `Are you sure you want to delete all ${notes.length} notes?`
      : `Are you sure you want to delete all ${filteredCount} ${filter} notes?`;
    
    if (window.confirm(message)) {
      if (filter === 'all') {
        setNotes([]);
      } else {
        setNotes(notes.filter(note => note.status !== filter));
      }
    }
  };

  const getFilteredNotes = () => {
    if (filter === 'active') {
      return notes.filter(note => note.status === 'active');
    }
    if (filter === 'completed') {
      return notes.filter(note => note.status === 'completed');
    }
    // For 'all', sort by active first, then completed, then others
    const activeNotes = notes.filter(note => note.status === 'active');
    const completedNotes = notes.filter(note => note.status === 'completed');
    const otherNotes = notes.filter(note => note.status !== 'active' && note.status !== 'completed');
    return [...activeNotes, ...completedNotes, ...otherNotes];
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="notes-container">
      <header className="header">
        <div className="logo">H</div>
        <h1>Notes Application</h1>
      </header>

      <div className="container">
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Note Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="input-field"
              data-testid="input-note-title"
            />
            {noteTitle && (
              <button 
                className="clear-input-btn" 
                onClick={() => setNoteTitle('')}
                title="Clear title"
              >
                ✕
              </button>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Note Status"
              value={noteStatus}
              onChange={(e) => setNoteStatus(e.target.value)}
              className="input-field"
              data-testid="input-note-status"
            />
            {noteStatus && (
              <button 
                className="clear-input-btn" 
                onClick={() => setNoteStatus('')}
                title="Clear status"
              >
                ✕
              </button>
            )}
          </div>
          <button 
            onClick={handleAddNote} 
            className="add-button"
            data-testid="submit-button"
          >
            ➕ Add Note
          </button>
          {(noteTitle || noteStatus) && (
            <button 
              onClick={handleClearInputs} 
              className="clear-button"
              data-testid="clear-inputs-button"
            >
              🗑️ Clear
            </button>
          )}
        </div>

        <div className="filter-section">
          <div className="filter-tabs">
            <button
              className={`tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              data-testid="allButton"
            >
              All {notes.length > 0 && <span className="badge">{notes.length}</span>}
            </button>
            <button
              className={`tab ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
              data-testid="activeButton"
            >
              Active {notes.filter(n => n.status === 'active').length > 0 && 
                <span className="badge">{notes.filter(n => n.status === 'active').length}</span>}
            </button>
            <button
              className={`tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
              data-testid="completedButton"
            >
              Completed {notes.filter(n => n.status === 'completed').length > 0 && 
                <span className="badge">{notes.filter(n => n.status === 'completed').length}</span>}
            </button>
          </div>
          {filteredNotes.length > 0 && (
            <button 
              onClick={handleClearAll} 
              className="clear-all-button"
              data-testid="clear-all-button"
            >
              🗑️ Clear {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          )}
        </div>

        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No notes yet</h3>
            <p>
              {filter === 'all' 
                ? 'Add your first note to get started!' 
                : `No ${filter} notes found.`}
            </p>
          </div>
        ) : (
          <table className="notes-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody data-testid="notesList">
              {filteredNotes.map(note => (
                <tr key={note.id}>
                  <td>{note.title}</td>
                  <td>
                    <span className={`status-badge ${note.status}`}>
                      {note.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="delete-button"
                      data-testid={`delete-button-${note.id}`}
                      title="Delete note"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Notes;
