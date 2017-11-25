const fs = require('fs');
const Morty = require('./index.js');


//use OKTETA 
fs.readFile('./multipart_in_base64.txt', (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data);
});
