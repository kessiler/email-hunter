'use strict';
const assert = require('assert');
const apiKey = process.env.API_KEY;
const Em = require('../lib/index.js');

describe('Email Hunter Test Suite', function () {
  describe('Without API key', () => {
    it('throws an error is no API key is found', () => {
      assert.throws(() => new Em(), Error);
    });
  });

  describe('With API key', () => {
    let hunter;
    beforeEach(() => {
      hunter = new Em(apiKey);
    });

    it('calls the account api', () => {
      hunter.account((err, res) => {
        assert(err || res.data, 'It should recive response data');
      });
    });
  });
});
