# email-hunter
[![Build Status](http://img.shields.io/travis/kessiler/email-hunter.svg?style=flat)](https://travis-ci.org/kessiler/email-hunter)
[![DevDependencies Status](http://img.shields.io/david/dev/kessiler/email-hunter.svg?style=flat)](https://david-dm.org/kessiler/email-hunter#info=devDependencies)

`email-hunter` is a tiny node wrapper around Email Hunter API (https://emailhunter.co/)

[![NPM](https://nodei.co/npm/email-hunter.png)](https://npmjs.org/package/email-hunter)


## Installation

The module is distributed through npm (node package manager) and can be
installed using:

```
npm install email-hunter --save
```

## How to use it

You require the module as any other node.js module:
```js
const EmailHunter = require('email-hunter');
```
Then create a new instance with your API key
```js
const hunter = new EmailHunter('YOUR API KEY');
```
You can also use that directly
```js
const hunter = require('email-hunter')('YOUR API KEY');
```

Note: Your secret API key, you can generate it in your dashboard from https://hunter.io/api_keys

## Upgrade
If you are upgrading from the __v1.0.0__ to __v2.0.0__ check if the methods you used from the first version __still exists__ and if they are ensure to change the call structure from this, which is based on Promises:
```js
em.searchByDomain(input).then().catch();
```
to this new structure that __does not return a Promise but instead accepts a callback__ that gets excuted once the call has complete:
```js
em.domainSearch(input, callback);
em.domainSearch(input, (err, res) => { });
```

## Methods
* __domainSearch__: You give one domain name and it returns all the email addresses using this domain name found on the internet.
* __emailFinder__: This API endpoint generates the most likely email address from a domain name, a first name and a last name.
* __emailVerifier__: This API endpoint allows you to verify the deliverability of an email address.
* __emailCount__: This API endpoint allows you to know how many email addresses we have for one domain.
* __account__: This API endpoint enables you to get information regarding your Hunter account at any time.

---

### Domain Search
Returns all the email addresses found using one given company name, with our sources.
```js
hunter.domainSearch({
  domain: 'example.com',
  company: 'Example Company'
}, (err, result) => { });
```

### Email Finder
It find the most likely email address from a domain name, a first name and a last.
```js
hunter.emailFinder({
  full_name: 'John Doe',
  domain: 'example.com',
  company: 'Example Company'
}, (err, result) => { });
```

### Email Verifier
Allows you to verify the deliverability of an email address.
```js
hunter.emailVerifier('test@mail.com', (err, result) => { });

hunter.emailVerifier({
  email: 'test@mail.com'
}, (err, result) => { });
```

### Email Count
Allows you to know how many email addresses we have for one domain.
```js
hunter.emailCount('example.com', (err, result) => { });

hunter.emailCount({
  domain: 'example.com'
}, (err, result) => { });
```

### Account information
Allows you to get information regarding your Email Hunter account at any time.
```js
hunter.account((err, result) => { });
```

## License
The __email-hunter__ is released under the MIT License.

## Contributing

1. Fork it ( https://github.com/kessiler/email-hunter/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
