'use strict';

var rest = require('restler'),
    Q = require('q'),
    qs = require('qs'),
    extend = require('extend'),
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

EmailHunterApi.prototype.search = function (domain, company, extraParams, callback) {
    var params = {};
    domain && (params.domain = domain);
    company && (params.company = company);
    params = extend(params, extraParams);
    return this.requestAPI('search', params, callback);
};

EmailHunterApi.prototype.generate = function (domain, company, firstName, lastName, callback) {
    var params = {
        first_name: firstName,
        last_name: lastName
    };
    domain && (params.domain = domain);
    company && (params.company = company);
    return this.requestAPI('generate', params, callback);
};

EmailHunterApi.prototype.searchByDomain = function (domain, params, callback) {
    return this.search(domain, null, params, callback);
};

EmailHunterApi.prototype.searchByCompany = function (company, params, callback) {
    return this.search(null, company, params, callback);
};

EmailHunterApi.prototype.verify = function (email, callback) {
    return this.requestAPI('verify', {email: email}, callback);
};

EmailHunterApi.prototype.exist = function (email, callback) {
    return this.requestAPI('exist', {email: email}, callback);
};

EmailHunterApi.prototype.count = function (domain, callback) {
    return this.requestAPI('count', {domain: domain}, callback);
};

EmailHunterApi.prototype.account = function (callback) {
    return this.requestAPI('count', {}, callback);
};

EmailHunterApi.prototype.generateByDomain = function (domain, firstName, lastName, callback) {
    return this.generate(domain, null, firstName, lastName, callback);
};

EmailHunterApi.prototype.generateByCompany = function (company, firstName, lastName, callback) {
    return this.generate(null, company, firstName, lastName, callback);
};

module.exports = EmailHunterApi;