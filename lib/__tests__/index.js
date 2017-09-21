'use strict';

const APIKEY = '000000';
const assert = require('assert');
const nock = require('nock');
const Em = require('../index.js');

const responses = {
  account: {
    data: {
      first_name: 'Filippo',
      last_name: 'Conti',
      email: 'filippo@codekraft.it'
    }
  },
  domainSearch: {
    data: {
      domain: 'codekraft.it',
      organization: 'Codekraft',
      emails: []
    }
  },
  emailFinder: {
    data: {
      email: 'filippo@codekraft.it',
      score: 100,
      domain: 'codekraft.it'
    }
  },
  emailVerifier: {
    data: {
      result: 'deliverable',
      score: 100,
      sources: []
    }
  },
  emailCount: {
    data: {
      total: 10,
      personal_emails: 4,
      generic_emails: 6
    }
  }
};

describe('Email Hunter Test Suite', function () {
  // When is started without the API key
  describe('without the API key', () => {
    it('throws an error is no API key is found', () => {
      assert.throws(() => new Em(), Error);
    });
  });

  // When is started with the API key
  describe('with the API key', () => {
    let hunter;
    beforeEach(() => {
      hunter = new Em(APIKEY);
    });

    // Account details
    it('calls the account api', done => {
      nock('https://api.hunter.io/v2')
        .get('/account/')
        .query({
          api_key: APIKEY
        })
        .reply(200, responses.account);
      hunter.account((err, res) => {
        assert(res.data, 'It should recive response data');
        done();
      });
    });

    // Domain search
    it('calls the domain search api', done => {
      nock('https://api.hunter.io/v2')
        .get('/domain-search/')
        .query({
          api_key: APIKEY,
          domain: 'codekraft.it'
        })
        .reply(200, responses.domainSearch);
      hunter.domainSearch({
        domain: 'codekraft.it'
      }, (err, res) => {
        assert(res.data, 'It should recive response data');
        assert.equal(res.data.domain, 'codekraft.it', 'It should have the same domain name');
        done();
      });
    });

    // Emails search
    it('calls the email finder api', done => {
      nock('https://api.hunter.io/v2')
        .get('/email-finder/')
        .query({
          api_key: APIKEY,
          domain: 'codekraft.it',
          fullname: 'Filippo Conti'
        })
        .reply(200, responses.emailFinder);
      hunter.emailFinder({
        domain: 'codekraft.it',
        fullname: 'Filippo Conti'
      }, (err, res) => {
        assert(res.data, 'It should recive response data');
        done();
      });
    });

    it('calls the email verifier api', done => {
      nock('https://api.hunter.io/v2')
        .get('/email-verifier/')
        .query({
          api_key: APIKEY,
          email: 'filippo@codekraft.it'
        })
        .reply(200, responses.emailVerifier);
      hunter.emailVerifier({
        email: 'filippo@codekraft.it'
      }, (err, res) => {
        assert(res.data, 'It should recive response data');
        done();
      });
    });

    it('calls the email count api', done => {
      nock('https://api.hunter.io/v2')
        .get('/email-count/')
        .query({
          api_key: APIKEY,
          domain: 'codekraft.it'
        })
        .reply(200, responses.emailCount);
      hunter.emailCount({
        domain: 'codekraft.it'
      }, (err, res) => {
        assert(res.data, 'It should recive response data');
        done();
      });
    });
  });
});
