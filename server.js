const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = express.env.PORT || 3002;

app.uaw(express.urlencoded({ extended: true }));
app.use(express.json());

// Getand listen to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(dirname, "./public/index.html"));
});

// get and listen to notes.html

app.get("/notes", (req, res) => {
  res.sendFile(path.join(dirname, "./public/notes.html"));
});

// starts server
app.listen(3001, () => {
  console.log(`API server now on port 3002!`);
});
