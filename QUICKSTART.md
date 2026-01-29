# Quick Start Guide

## Installation
```bash
npm install
```

## Running the Application
```bash
npm start
```
The application will open at http://localhost:3000

## Running Tests
```bash
npm test
```

## Running Tests with Coverage
```bash
npm test -- --coverage --watchAll=false
```

## Building for Production
```bash
npm run build
```

## Test Results
All tests should pass:
- ✅ Renders Notes Application header
- ✅ Renders input fields with correct data-test-id
- ✅ Renders Add Note button with correct data-test-id
- ✅ Renders filter buttons with correct data-test-id
- ✅ Renders table with notesList data-test-id
- ✅ Adds a new note when both title and status are provided
- ✅ Clears input fields after adding a note
- ✅ Does not add note when title is empty
- ✅ Does not add note when status is empty
- ✅ Does not add note when both fields are empty
- ✅ Filters notes by active status
- ✅ Filters notes by completed status
- ✅ Shows all notes when All filter is selected
- ✅ Status is case insensitive
- ✅ All filter displays notes in correct order
- ✅ Active class is applied to selected filter button
