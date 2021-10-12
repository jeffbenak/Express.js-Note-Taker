const fb = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');



fb.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });


  fb.post('/', (req, res) => {
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

  module.exports = fb;