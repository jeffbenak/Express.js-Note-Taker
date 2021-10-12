const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');



router.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });


router.post('/', (req, res) => {
    console.info(`${req.method} request received to submit feedback`)
//   });
  
  const { title, text} = req.body;

  if (title && text) {
    const newNote = {
        title,
        text,
        id: uuidv4(),
      };    


  
  
  readAndAppend(newNote, './db/db.json');

  const response = {
     status: 'success',
     body: newNote,
  };

  res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

router.delete("/:id", (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    const notes = JSON.parse(data).filter(note => note.id != req.params.id);
    writeToFile("./db/db.json", notes);
    res.json(notes);
    
  });
});

  module.exports = router;