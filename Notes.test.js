import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notes from './Notes';

// Mock window.confirm
global.confirm = jest.fn(() => true);

describe('Notes Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Notes Application header', () => {
    render(<Notes />);
    const headerElement = screen.getByText(/Notes Application/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders input fields with correct data-testid', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    expect(titleInput).toBeInTheDocument();
    expect(statusInput).toBeInTheDocument();
  });

  test('renders Add Note button with correct data-testid', () => {
    render(<Notes />);
    const addButton = screen.getByTestId('submit-button');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('Add Note');
  });

  test('renders filter buttons with correct data-testid', () => {
    render(<Notes />);
    const allButton = screen.getByTestId('allButton');
    const activeButton = screen.getByTestId('activeButton');
    const completedButton = screen.getByTestId('completedButton');
    
    expect(allButton).toBeInTheDocument();
    expect(activeButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
  });

  test('renders table with notesList data-testid', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    // Add a note first to see the table
    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    const notesList = screen.getByTestId('notesList');
    expect(notesList).toBeInTheDocument();
  });

  test('adds a new note when both title and status are provided', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(titleInput, { target: { value: 'Test Note' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  test('clears input fields after adding a note', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(titleInput, { target: { value: 'Test Note' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    expect(titleInput.value).toBe('');
    expect(statusInput.value).toBe('');
  });

  test('does not add note when title is empty', () => {
    render(<Notes />);
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('active')).not.toBeInTheDocument();
  });

  test('does not add note when status is empty', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(titleInput, { target: { value: 'Test Note' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('Test Note')).not.toBeInTheDocument();
  });

  test('does not add note when both fields are empty', () => {
    render(<Notes />);
    const addButton = screen.getByTestId('submit-button');

    fireEvent.click(addButton);

    expect(screen.getByText(/No notes yet/i)).toBeInTheDocument();
  });

  test('filters notes by active status', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    // Add active note
    fireEvent.change(titleInput, { target: { value: 'Active Note' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    // Add completed note
    fireEvent.change(titleInput, { target: { value: 'Completed Note' } });
    fireEvent.change(statusInput, { target: { value: 'completed' } });
    fireEvent.click(addButton);

    // Click Active filter
    const activeButton = screen.getByTestId('activeButton');
    fireEvent.click(activeButton);

    expect(screen.getByText('Active Note')).toBeInTheDocument();
    expect(screen.queryByText('Completed Note')).not.toBeInTheDocument();
  });

  test('filters notes by completed status', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    // Add active note
    fireEvent.change(titleInput, { target: { value: 'Active Note' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    // Add completed note
    fireEvent.change(titleInput, { target: { value: 'Completed Note' } });
    fireEvent.change(statusInput, { target: { value: 'completed' } });
    fireEvent.click(addButton);

    // Click Completed filter
    const completedButton = screen.getByTestId('completedButton');
    fireEvent.click(completedButton);

    expect(screen.getByText('Completed Note')).toBeInTheDocument();
    expect(screen.queryByText('Active Note')).not.toBeInTheDocument();
  });

  test('shows all notes when All filter is selected', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    // Add notes with different statuses
    fireEvent.change(titleInput, { target: { value: 'Active Note' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    fireEvent.change(titleInput, { target: { value: 'Completed Note' } });
    fireEvent.change(statusInput, { target: { value: 'completed' } });
    fireEvent.click(addButton);

    fireEvent.change(titleInput, { target: { value: 'Pending Note' } });
    fireEvent.change(statusInput, { target: { value: 'pending' } });
    fireEvent.click(addButton);

    // Click All filter
    const allButton = screen.getByTestId('allButton');
    fireEvent.click(allButton);

    expect(screen.getByText('Active Note')).toBeInTheDocument();
    expect(screen.getByText('Completed Note')).toBeInTheDocument();
    expect(screen.getByText('Pending Note')).toBeInTheDocument();
  });

  test('status is case insensitive', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(titleInput, { target: { value: 'Test Note' } });
    fireEvent.change(statusInput, { target: { value: 'ACTIVE' } });
    fireEvent.click(addButton);

    expect(screen.getByText('active')).toBeInTheDocument();
  });

  test('All filter displays notes in correct order (active, completed, others)', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');
    
    // Add notes in mixed order
    fireEvent.change(titleInput, { target: { value: 'Pending Note' } });
    fireEvent.change(statusInput, { target: { value: 'pending' } });
    fireEvent.click(addButton);

    fireEvent.change(titleInput, { target: { value: 'Active Note 1' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    fireEvent.change(titleInput, { target: { value: 'Completed Note' } });
    fireEvent.change(statusInput, { target: { value: 'completed' } });
    fireEvent.click(addButton);

    fireEvent.change(titleInput, { target: { value: 'Active Note 2' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    // Check order in All view
    const notesList = screen.getByTestId('notesList');
    const rows = notesList.querySelectorAll('tr');
    const titles = Array.from(rows).map(row => row.cells[0]?.textContent);

    expect(titles[0]).toBe('Active Note 1');
    expect(titles[1]).toBe('Active Note 2');
    expect(titles[2]).toBe('Completed Note');
    expect(titles[3]).toBe('Pending Note');
  });

  test('active class is applied to selected filter button', () => {
    render(<Notes />);
    const allButton = screen.getByTestId('allButton');
    const activeButton = screen.getByTestId('activeButton');

    // All should be active by default
    expect(allButton).toHaveClass('active');

    // Click Active button
    fireEvent.click(activeButton);
    expect(activeButton).toHaveClass('active');
    expect(allButton).not.toHaveClass('active');
  });

  test('deletes a note when delete button is clicked', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(titleInput, { target: { value: 'Test Note' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test Note')).toBeInTheDocument();

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Note')).not.toBeInTheDocument();
  });

  test('clears all notes when clear all button is clicked', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    // Add multiple notes
    fireEvent.change(titleInput, { target: { value: 'Note 1' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    fireEvent.change(titleInput, { target: { value: 'Note 2' } });
    fireEvent.change(statusInput, { target: { value: 'completed' } });
    fireEvent.click(addButton);

    const clearAllButton = screen.getByTestId('clear-all-button');
    fireEvent.click(clearAllButton);

    expect(confirmSpy).toHaveBeenCalled();
    expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Note 2')).not.toBeInTheDocument();
    
    confirmSpy.mockRestore();
  });

  test('shows clear inputs button when fields have values', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');

    fireEvent.change(titleInput, { target: { value: 'Test' } });

    const clearButton = screen.getByTestId('clear-inputs-button');
    expect(clearButton).toBeInTheDocument();
  });

  test('clears input fields when clear button is clicked', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(statusInput, { target: { value: 'Test Status' } });

    const clearButton = screen.getByTestId('clear-inputs-button');
    fireEvent.click(clearButton);

    expect(titleInput.value).toBe('');
    expect(statusInput.value).toBe('');
  });

  test('shows empty state when no notes exist', () => {
    render(<Notes />);
    expect(screen.getByText(/No notes yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Add your first note to get started!/i)).toBeInTheDocument();
  });

  test('shows badge with count on filter tabs', () => {
    render(<Notes />);
    const titleInput = screen.getByTestId('input-note-title');
    const statusInput = screen.getByTestId('input-note-status');
    const addButton = screen.getByTestId('submit-button');

    fireEvent.change(titleInput, { target: { value: 'Active Note' } });
    fireEvent.change(statusInput, { target: { value: 'active' } });
    fireEvent.click(addButton);

    const allButton = screen.getByTestId('allButton');
    expect(allButton).toHaveTextContent('1');
  });
});
