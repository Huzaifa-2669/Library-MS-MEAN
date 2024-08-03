const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Define routes for books
// Get list of books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Add a new book
router.post("/add", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
    genre: req.body.genre,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
