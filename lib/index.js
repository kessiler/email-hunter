'use strict';

var rest = require('restler'),
    Q = require('q'),
    qs = require('qs'),
    BASE_API = 'https://api.emailhunter.co/v1/';

var EmailHunterApi = function (apiKey) {
    if (!(this instanceof EmailHunterApi))
        return new EmailHunterApi(apiKey);

    this.apiKey = apiKey;

    if (!this.apiKey) {
        throw new Error('Missing API key');
    }

    return this;
};

EmailHunterApi.prototype.requestAPI = function (type, attr, callback) {
    var defer = Q.defer();

    attr.api_key = this.apiKey;
    var query = qs.stringify(attr);
    var url = [BASE_API, type, '?', query].join('');

    rest.get(url).on('complete', function (data) {
        if (callback) {
            callback(null, data);
        }
        defer.resolve(data);
    }).on('error', function (err) {
        if (callback) {
            callback(err);
        }
        defer.reject(err);
    });

    return defer.promise;
};

EmailHunterApi.prototype.search = function (domain, callback) {
    return this.requestAPI('search', {domain: domain}, callback);
};

EmailHunterApi.prototype.verify = function (email, callback) {
    return this.requestAPI('verify', {email: email}, callback);
};

EmailHunterApi.prototype.exist = function (email, callback) {
    return this.requestAPI('exist', {email: email}, callback);
};

EmailHunterApi.prototype.generate = function (domain, firstName, lastName, callback) {
    return this.requestAPI('generate', {domain: domain, firstName: firstName, lastName: lastName}, callback);
};

module.exports = EmailHunterApi;