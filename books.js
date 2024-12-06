const express = require('express');
const router = express.Router();

let books = []; // Temporary in-memory storage for books

// GET all books
router.get('/', (req, res) => {
    res.json(books);
});

// POST a new book
router.post('/', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).json({ message: "Book added!", book });
});

// PUT (update) a book by ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    let book = books.find(b => b.id === id);
    if (book) {
        Object.assign(book, updatedBook);
        res.json({ message: "Book updated!", book });
    } else {
        res.status(404).json({ error: "Book not found!" });
    }
});

// DELETE a book by ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(b => b.id !== id);
    if (books.length < initialLength) {
        res.json({ message: "Book deleted!" });
    } else {
        res.status(404).json({ error: "Book not found!" });
    }
});

module.exports = router;
