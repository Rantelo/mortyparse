let fs = require('fs');

//use OKTETA 
fs.readFile('./multipart_in_base64.txt', (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data);
};
