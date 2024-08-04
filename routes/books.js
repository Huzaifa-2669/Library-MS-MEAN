const express = require("express");
const router = express.Router();
const cors = require("cors");
const Book = require("../models/Book"); // Adjust the path as necessary
var mongojs = require("mongojs");

router.use(cors());

// Get list of books
router.get("/", (req, res) => {
  Book.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500);
      res.send("Error: Unable to get Books\n" + err.message);
      console.log("Error: Unable to get Books\n", err);
    });
});

//Get a book by id
router.get("/:id", (req, res) => {
  var id = req.params.id;
  Book.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500);
      res.send("Error: Unable to get Book\n" + err.message);
      console.log("Error: Unable to get Book\n", err);
    });
});

//Add a Book
router.post("/addbook", (req, res) => {
  const userData = {
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
    genre: req.body.genre,
  };

  Book.findOne({
    title: req.body.title,
  })
    .then((user) => {
      if (!user) {
        Book.create(userData)
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "Book already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// Update book availability
router.put("/availability", (req, res) => {
  var title = req.body.title;

  Book.findOne({ title })
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          error: "Book not found",
        });
      }
      book.available = !book.available;
      return book.save();
    })
    .then((updatedBook) => {
      res.json(updatedBook);
    })
    .catch((err) => {
      res
        .status(500)
        .send("Error: Unable to update book availability\n" + err.message);
      console.log("Error: Unable to update book availability\n", err);
    });
});
// Update a book
router.put("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var book = req.body;
    var updBook = {};

    if (book.title) updBook.title = book.title;
    if (book.author) updBook.author = book.author;
    if (book.publishedYear) updBook.publishedYear = book.publishedYear;
    if (book.genre) updBook.genre = book.genre;
    if (book.available !== undefined) updBook.available = book.available;

    if (Object.keys(updBook).length === 0) {
      return res.status(400).json({
        error: "Bad Data",
      });
    } else {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { $set: updBook },
        { new: true }
      );
      if (!updatedBook) {
        return res.status(404).json({
          error: "Book not found",
        });
      }
      res.json(updatedBook);
    }
  } catch (err) {
    res.status(500).send("Error: Unable to get Update\n" + err.message);
    console.log("Error: Unable to get Update\n", err);
  }
});

// Delete a book
router.delete("/:id", (req, res) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id)
    .then((result) => {
      res.send(result); //  Send the result (updated course object) back to user
      console.log("Deleted Book: ", result.title);
    })
    .catch((err) => {
      res.status(500);
      res.send("Error: Unable to delete book\n" + err.message);
      console.log("Error: Unable to create book\n", err);
    });
});

module.exports = router;
