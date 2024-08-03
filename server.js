const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const booksRoute = require("./routes/books");

const app = express();
const port = 5000;
const mongooseDatabaseURL =
  "mongodb+srv://admin:admin@library-management-syst.zymeiif.mongodb.net/?retryWrites=true&w=majority&appName=Library-Management-System";

//MiddleWare
app.use("/books", booksRoute);
app.use(bodyParser.json());

mongoose.connect(mongooseDatabaseURL, {
  //useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected Successfully");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//Basic routes
app.get("/", (req, res) => {
  res.send("Welcome to the Library Management System");
});
