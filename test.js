const fs = require('fs');
const Morty = require('./index.js');

//use OKTETA 
fs.readFile('./multipart_in_base64.txt', (err, data) => {
  if (err) {
    throw err;
  }

  //Fucking boundary not working
  let morty = new Morty(Buffer('----WebKitFormBoundarycknRrYwHG15UXgO3'));
  let parsed = morty.parse(data)
  console.log(parsed);
});
