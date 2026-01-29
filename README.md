# Notes Application

A React-based Notes Application with filtering capabilities and comprehensive unit testing.

## Features

- ✅ Add notes with title and status
- ✅ Filter notes by All, Active, and Completed
- ✅ Case-insensitive status handling
- ✅ Smart ordering (Active → Completed → Others)
- ✅ Responsive design
- ✅ Comprehensive unit tests with Jest

## Environment

- React: 18.x
- Node Version: v14+ (LTS)
- Default Port: 3000
- Testing: Jest & React Testing Library

## Application Demo

The application includes:
- Input fields for Note Title and Note Status
- Add Note button to create new notes
- Three filter buttons: All, Active, and Completed
- A table displaying notes based on the selected filter

## Functionality Requirements

### Adding Notes
- Input box for **Note Title** - User types the title of the note
- Input box for **Note Status** - User types the status (active, completed, pending, etc.)
- Status is **case insensitive** - "ACTIVE" becomes "active"
- Click **Add Note** button to add the note
- Both title and status are **required** to add a note
- Input fields are **cleared** after adding a note

### Filtering Notes
The app has 3 filter buttons:

1. **All** (Default) - Displays all notes in this order:
   - All notes with status "active" (in order added)
   - All notes with status "completed" (in order added)
   - All other notes (in order added)

2. **Active** - Displays only notes with status "active"

3. **Completed** - Displays only notes with status "completed"

## Testing Requirements

All components have the following `data-test-id` attributes for testing:

- Title input: `input-note-title`
- Status input: `input-note-status`
- Add Note button: `submit-button`
- All button: `allButton`
- Active button: `activeButton`
- Completed button: `completedButton`
- Table body: `notesList`

## Installation

```bash
npm install
```

## Available Scripts

### Start Development Server
```bash
npm start
```
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Run Tests
```bash
npm test
```
Launches the test runner in interactive watch mode

### Build for Production
```bash
npm run build
```
Builds the app for production to the `build` folder

### Run Tests with Coverage
```bash
npm test -- --coverage
```
Shows test coverage report

## Project Structure

```
notes-application/
├── public/
├── src/
│   ├── Notes.js          # Main Notes component
│   ├── Notes.css         # Styles for Notes component
│   ├── Notes.test.js     # Unit tests
│   ├── App.js            # Root component
│   ├── App.css           # App styles
│   └── index.js          # Entry point
├── package.json
└── README.md
```

## Test Coverage

The application includes comprehensive unit tests covering:

✅ Component rendering  
✅ Input field functionality  
✅ Adding notes with validation  
✅ Filtering by status (All, Active, Completed)  
✅ Case insensitivity  
✅ Correct ordering in All view  
✅ Empty field validation  
✅ Input clearing after submission  
✅ Active button state management  

## Technical Details

- **Framework**: React 18 with Hooks (useState)
- **Testing**: Jest + React Testing Library
- **Styling**: CSS3 with responsive design
- **Data Management**: Component state (no external state management)

## Design Features

- Modern, clean UI with gradient header
- Responsive layout for mobile and desktop
- Smooth transitions and hover effects
- Accessible form inputs
- Professional table design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Created as a React implementation of the Notes Application requirements
