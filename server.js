const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Books = require("./routes/books");

const app = express();
const port = 5000;
const mongooseDatabaseURL =
  "mongodb+srv://admin:admin@library-management-syst.zymeiif.mongodb.net/?retryWrites=true&w=majority&appName=Library-Management-System";

//MiddleWare
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Books);

mongoose
  .connect(mongooseDatabaseURL, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//Basic routes
app.get("/", (req, res) => {
  res.send("Welcome to the Library Management System");
});
