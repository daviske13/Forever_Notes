const fs = require('fs');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    newNote.id = notes.length.toString();
    notes.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json(newNote);
});

module.exports = router;
