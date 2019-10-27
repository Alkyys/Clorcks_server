import GoTrue from 'gotrue-js';

let auth = new GoTrue({
  APIUrl: process.env.APIUrl,
  audience: "",
  setCookie: true
});

module.exports = auth