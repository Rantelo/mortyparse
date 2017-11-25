'use strict';
const bsplit = require('buffer-split');

class Morty {
  constructor(boundary) {
    this.boundary = boundary;
  }

  parse(buff) {
    let formdata = [];
    return bsplit(buff, this.boundary);
  }

}

module.exports = Morty;
