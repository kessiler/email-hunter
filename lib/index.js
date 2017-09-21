'use strict';

// Hunter.io API Endopoint V2
const API_ENDPOINT = 'https://api.hunter.io/v2';

// Script dependencies
const request = require('request');
const qs = require('querystring');

// Clear object from properties with empty values
const clean = object => {
  return Object.keys(object).reduce((r, e) => {
    if (object[e] !== null && object[e] !== '') {
      r[e] = object[e];
    }
    return r;
  }, {});
};

// Hunter class
const EmailHunter = function (apiKey) {
  // Ensure is a singleton
  if (!(this instanceof EmailHunter)) {
    return new EmailHunter(apiKey);
  }

  // Set the API key
  this.apiKey = apiKey;

  if (!this.apiKey) {
    throw new Error('Missing API key');
  }

  return this;
};

// Call the API directly
EmailHunter.prototype.callAPI = function (type, params, callback) {
  // Set the api key parameter
  params.api_key = this.apiKey;

  // Clean null values and empty strings
  params = clean(params);

  // Build the request url
  const query = qs.stringify(params);
  const url = `${API_ENDPOINT}/${type}/?${query}`;

  // Perform the request
  request(url, (err, response, body) => {
    // Parse response body
    const responseBody = JSON.parse(body);
    // If something went wrong send the full error
    if (err || response.statusCode !== 200) {
      callback(responseBody);
      return;
    }

    // Send the api response
    callback(null, responseBody);
  });
};

/**
 * This API endpoint generates the most likely email address from a domain name, a first name and a last name.
 * @see https://hunter.io/api/v2/docs#email-finder
 */
EmailHunter.prototype.emailFinder = function (options = {}, callback) {
  return this.callAPI('email-finder', options, callback);
};

/**
* This API endpoint allows you to verify the deliverability of an email address.
* @see https://hunter.io/api/v2/docs#email-verifier
*/
EmailHunter.prototype.emailVerifier = function (email, callback) {
  const opts = typeof email === 'object' ? email : {email};
  return this.callAPI('email-verifier', opts, callback);
};

/**
 * This API endpoint allows you to know how many email addresses we have for one domain. It's free and doesn't require authentication.
 * @see https://hunter.io/api/v2/docs#email-count
 */
EmailHunter.prototype.emailCount = function (domain, callback) {
  const opts = typeof domain === 'object' ? domain : {domain};
  return this.callAPI('email-count', opts, callback);
};

/**
 * One key feature of Hunter is to search all the email addresses corresponding to one website.
 * You give one domain name and it returns all the email addresses using this domain name found on the internet.
 * @see https://hunter.io/api/v2/docs#domain-search
 */
EmailHunter.prototype.domainSearch = function (options = {}, callback) {
  return this.callAPI('domain-search', options, callback);
};

/**
 * This API endpoint enables you to get information regarding your Hunter account at any time.
 * @see https://hunter.io/api/v2/docs#account
 */
EmailHunter.prototype.account = function (callback) {
  return this.callAPI('account', {}, callback);
};

// Export module
module.exports = EmailHunter;
