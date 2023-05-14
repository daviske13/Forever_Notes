const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        return res.status(500).json({ error: 'Failed to read notes' });
        }

    const notes = JSON.parse(data);
    res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) =>
    
            {

    if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to read notes' });
    }

    const notes = JSON.parse(data);

    notes.push(newNote);

    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => 
        {
            if (err) {
                console.log(err);
            return res.status(500).json({ error: 'Failed to write note' });
            }

    res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        return res.status(500).json({ error: 'Failed to read notes' });
        }

    let notes = [];
        try {
            notes = JSON.parse(data);
        } 

        catch (err) {
            console.error(err);
        return res.status(500).json({ error: 'Failed to parse notes' });
        }

    const newNotes = notes.filter((note) => note.id !== id);

    fs.writeFile(
        path.join(__dirname, 'db', 'db.json'),
        JSON.stringify(newNotes),
        (err) => {
            if (err) {
                console.error(err);
            return res.status(500).json({ error: 'Failed to delete note' });
            }

            return res.status(200).json({ message: 'Note deleted successfully' });
        }
    );
    });
});
