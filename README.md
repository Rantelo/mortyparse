# Mortyparse

Parse a Buffer containing a multipart/data-form

### Usage

Grab the `boundary` from the content-type in the POST request and create and instance of Mortyparse.

Then, with the base64 string from the `body-json`, use the Mortyparse instance to parse the form-data into a readable format.

```js
const Morty = require('mortyparse');                                           
const b64_str = '<base64 string>'; //containing the multipart/form-data as received in the server

morty = new Morty(Buffer("------WebKitFormBoundaryaVKetDdeBHAjicUm"));
let parsed = morty.parse(Buffer(b64_str, 'base64'));

console.log(parsed); // =>
// [
//   {
//     "content_type": "application/pdf",
//     "data": Buffer <37 80 68 . . . 33 13 10>,
//     "filename": "testpdf.pdf",
//     "name": "cv"
//   },
//   { "name": "name", "data": "Test Name"},
//   { "name": "email", "data": "test@email.com"},     
//   { "name": "telephone", "data": "0101010101"},
//   { "name": "vacant", "data": "Back-End"}
//   { "name": "reference", "data": "internet"},
//   { "name": "portfolio", "data": "No aplica"}
// ]
```

### Output format

The parser returns an array containing an object per input in the form.

All inputs in the parsed data will have:
- `name`: with a String representing the name of the input field
- `data`: with a String|Buffer representing the content of the input
  - `Buffer` in the case of file inputs
  - `String` in the case of other inputs

File type inputs will also have:
- `content_type`: with a String representing the file format type
- `filename`: with a String containing the file name
