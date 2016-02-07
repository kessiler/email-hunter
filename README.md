# email-hunter
`email-hunter` is a tiny node wrapper around Email Hunter API (https://emailhunter.co/)

## Installation

The module is distributed through npm (node package manager) and can be
installed using:

```
npm install email-hunter --save
```

The `--save` automatically adds the module to your `package.json` definition.


## Usage

You require the module as any other node.js module:
```js
var EmailHunter = require('email-hunter');
```
Then create a new instance with your API key
```js
var em = new EmailHunter('YOUR API KEY');
```
You can also use that directly
```js
var em = require('email-hunter')('YOUR API KEY');
```

Note: Your secret API key, you can generate it in your dashboard from https://emailhunter.co


## Domain search API
Returns all the email addresses found using one given domain name, with our sources.
```js
em.searchByDomain('stripe.com').then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});
```

## Company search API
Returns all the email addresses found using one given company name, with our sources.
```js
em.searchByCompany('Stripe').then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});
```

## Email Verify API
Allows you to verify the deliverability of an email address.
```js
em.verify('kessiler@hotmail.com').then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});
```

## Email Count API
Allows you to know how many email addresses we have for one domain.
```js
em.count('stripe.com').then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});
```
## Email Finder / Generate by Domain API
Generates the most likely email address from a domain name, a first name and a last name.
```js
em.generateByDomain('stripe.com', 'kessiler', 'rodrigues').then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});
```

## Email Finder / Generate by Company API
Generates the most likely email address from a company name, a first name and a last name.
```js
em.generateByCompany('Stripe', 'kessiler', 'rodrigues').then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});
```

## Account information API
Allows you to get information regarding your Email Hunter account at any time.
```js
em.account().then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});
```

Note: You can also use callbacks, whether you prefer. :)

## License
The email-hunter is released under the MIT License.

## Contributing

1. Fork it ( https://github.com/kessiler/email-hunter/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
