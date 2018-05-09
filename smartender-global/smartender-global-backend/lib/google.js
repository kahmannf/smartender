const {google} = require('googleapis');

const config = require('../config');

const scopes = [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

const oauth2 = new google.auth.OAuth2(
  config.google.apikey,
  config.google.apisecret,
  config.general.baseurl_server + 'auth/oauthcallback'
);

const getAuthUrl = () => {
  return oauth2.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
}

module.exports = {
  getAuthUrl
}