const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db");

const app = express();
const PORT = 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

async function readFile() {
  const data = await readFileAsync(__dirname + "/db/db.json", "UTF-8");
  return JSON.parse(database);
}
// Getand listen to index.html
app.get("/", (req, res) => {
  //   res.json({ data: "hello world" }).status(200);
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// get and listen to notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// reads db file > returns saved notes as json
app
  .route("/api/notes")
  .get(function (req, res) {
    res.json(database);
  })

  // creates new note to the db json file
  .post(function (req, res) {
    let jsonFile = path.join(__dirname, "/db/db.json");
    let newNote = req.body;
    let maxNoteId = 100;

    for (let i = 0; i < database.length; i++) {
      let individualNote = database[i];

      if (individualNote.id > highestNoteId) {
        highestNoteId = individualNote.id;
      }
    }

    newNote.id = highestNoteId + 1;
    database.push(newNote);

    fs.writeFile(jsonFile, JSON.stringify(database), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Note saved!");
    });
    res.json(newNote);
  });

// function to delete notes
app.delete("/api/notes/:id", function (req, res) {
  let jsonFile = path.join(__dirname, "/db/db.json");
  // delete existing note by id
  for (let i = 0; i < database.length; i++) {
    if ((database[i].id = req.params.id)) {
      // Remove 1 existing note via splice.
      database.splice(i, 1);
      break;
    }
  }
  // Add updated notes back to the db.json file via WriteFile:
  fs.writeFile(jsonFile, JSON.stringify(database), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your note has been deleted!");
  });
  res.json(database);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// starts server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}...`);
});
