'use strict';
var assert = require("assert");
var apiKey = process.env.API_KEY;
var em = require('../index.js')(apiKey);

describe('Email Hunter Test Suite', function () {

    it('search API by domain expect status success', function (done) {
        em.searchByDomain('stripe.com').then(function (result) {
            assert.equal(result.status, 'success');
            done();
        });
    });

    it('search API by domain with extra params', function (done) {
        em.searchByDomain('google.com', {offset: 10}).then(function (result) {
            assert.equal(result.status, 'success');
            done();
        });
    });

    it('search API by company name expect status success', function (done) {
        em.searchByCompany('Stripe').then(function (result) {
            assert.equal(result.status, 'success');
            done();
        });
    });

    it('verify API expect status success', function (done) {
        em.verify('keessiler@hotmail.com').then(function (result) {
            assert.notEqual(result.score, 0);
            done();
        });
    });

    it('search API expect first email type == generic with stripe.com domain', function (done) {
        em.search('stripe.com').then(function (result) {
            assert.equal(result.status, 'success');
            done();
        });
    });

    it('expect keessiler@hotmail.com API generate email by domain', function (done) {
        em.generateByDomain('hotmail.com', 'Kessiler', 'Rodrigues').then(function (result) {
            assert.equal(result.email, 'kessiler_rodrigues@hotmail.com');
            done();
        });
    });

    it('expect krodrigues@testd.com API generate email by company', function (done) {
        em.generateByCompany('test', 'Kessiler', 'Rodrigues').then(function (result) {
            assert.equal(result.email, 'krodrigues@tested.com');
            done();
        });
    });

});