const Morty = require('../index.js');
const fs = require('fs');
//const fs = jest.mock('fs');

describe('Testing constructor', () => {
  it('initializes Morty with boundary provided', () => {
    let bound = Buffer('the boundary');
    let morty = new Morty(bound);
    expect(morty.boundary).toBe(bound);
  });

  it('throws an error when boundary provided is not a Buffer', () => {
    const failingMorty = () => {
      new Morty('not a buffer');
    }

    expect(failingMorty).toThrow('Value is not a Buffer');
  });
});


describe('Testing parser', () => {
  let b64_str;
  let morty;
  beforeAll(() => {
    morty = new Morty(Buffer("I'm a Morty"));
    b64_str = fs.readFileSync('./multipartB64.txt');
    //, (err, data) => {
      // let buff = Buffer(b64_str, 'base64');
      // let boundary = Buffer('------WebKitFormBoundaryP3g0SzBdyJ5K6WeU');

      // const morty = new Morty(boundary);
      // const parsed = morty.parse(buff);

      // console.log(parsed);
    //});
  });

  it('throws an error when the thing to be parsed is not a Buffer', () => {
    const parseANonBuffer = () => {
      morty.parse(b64_str);
    }

    expect(parseANonBuffer).toThrow('Value is not a Buffer');
  });

  it('parses a multipart/data-form into an array', () => {
    let parsed = morty.parse(Buffer(b64_str, 'base64'));
    expect.arrayContaining([{name: "name", data: "Test Name"}]);
  });
});



