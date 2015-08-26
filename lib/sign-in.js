/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
var uuid = require('uuid');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var scope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
];
function signIn(config) {
    assert.equal(typeof config, 'object', 'required argument config must be an object');
    var redirectUrl = [
        config.redirectUrl.protocol,
        config.redirectUrl.host,
        config.redirectUrl.uri
    ].join('');
    var oauth2Client = new OAuth2(config.clientId, config.clientSecret, redirectUrl);
    var state = uuid.v4();
    return {
        url: oauth2Client.generateAuthUrl({
            access_type: 'online',
            scope: scope,
            state: state
        }),
        state: state
    };
}
module.exports = signIn;
//# sourceMappingURL=sign-in.js.map