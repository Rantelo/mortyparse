const fs = require('fs');
const Morty = require('./index.js');

//use OKTETA for better reading
fs.readFile('./multipart_in_base64.txt', (err, data) => {
  if (err) {
    throw err;
  }

  let b64_str = data.toString();
  let buff = Buffer(b64_str, 'base64');
  let boundary = Buffer('------WebKitFormBoundaryP3g0SzBdyJ5K6WeU');

  const morty = new Morty(boundary);
  const parsed = morty.parse(buff);

  console.log(parsed);

});



