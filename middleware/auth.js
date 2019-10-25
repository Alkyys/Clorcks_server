 const GoTrue = require('gotrue-js') ;

auth = new GoTrue({
  APIUrl: process.env.APIUrl,
  audience: "",
  setCookie: true
});

module.exports = auth