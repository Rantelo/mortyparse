const Morty = require('../index.js');
const fs = require('fs');
const b64_str = require('./multipartB64.js');
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
  let morty;
  beforeAll(() => {
    morty = new Morty(Buffer("------WebKitFormBoundaryaVKetDdeBHAjicUm"));
  });

  it('throws an error when the thing to be parsed is not a Buffer', () => {
    const parseANonBuffer = () => {
      morty.parse(b64_str);
    }

    expect(parseANonBuffer).toThrow('Value is not a Buffer');
  });

  it('parses a multipart/data-form into an array', () => {
    const expected = [
      { name: 'cv', filename: 'testpdf.pdf', content_type: 'application/pdf' },
      { name: 'name', data: 'Test Name' },
      { name: 'email', data: 'test@email.com' },
      { name: 'telephone', data: '0101010101' },
      { name: 'vacant', data: 'Back-End' },
      { name: 'reference', data: 'internet' },
      { name: 'portfolio', data: 'No aplica' }
    ]
    let parsed = morty.parse(Buffer(b64_str, 'base64'));
    expect.arrayContaining([{name: "name", data: "Test Name"}]);
    expect(parsed.length).toBe(7);
  });
});



