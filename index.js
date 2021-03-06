'use strict';
const bsplit = require('buffer-split');

const inBuffer = (buff, buffSearch) => buff.indexOf(buffSearch) > -1;

const NotABuffer = () => new Error('Value is not a Buffer');

class Morty {
  constructor(boundary) {
    if (!(boundary instanceof Buffer)) {
      throw NotABuffer();
    }
    this.boundary = boundary;
  }

  _hasFile(buff) {
    return inBuffer(buff, Buffer('filename'));
  }

  extractFromBuffer(buff_chunk, border_left, border_right) {
    if (!inBuffer(buff_chunk, border_left)) return '';
    let index_left = buff_chunk.indexOf(Buffer(border_left));
    let chunk = buff_chunk.slice(index_left + border_left.length);
    return border_right ? chunk.slice(0, chunk.indexOf(Buffer(border_right))) : chunk;
  }

  parse(buff) {
    if (!(buff instanceof Buffer)) {
      throw NotABuffer();
    }
    let parts = bsplit(buff, this.boundary);

    let parsed = parts.map(e => {
      let response = {};

      response.name = this.extractFromBuffer(e, 'name="', '"').toString();
      response.data = this.extractFromBuffer(e, '\r\n\r\n');

      if (this._hasFile(e)) {
        response.filename = this.extractFromBuffer(e, 'filename="', '"').toString();
        response.content_type = this.extractFromBuffer(e, 'Content-Type: ', '\r\n').toString();
      } else {
        response.data = response.data.toString().trim();
      }

      return response;

    });

    return parsed.filter(e => e.name !== '');
  }
}

module.exports = Morty;
