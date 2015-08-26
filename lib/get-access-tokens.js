/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
var Q = require('q');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
function getAccessToken(config, code) {
    assert.equal(typeof config, 'object', 'required argument config must be an object');
    assert.equal(typeof code, 'string', 'required argument code must be a string');
    var redirectUrl = [
        config.redirectUrl.protocol,
        config.redirectUrl.host,
        config.redirectUrl.uri
    ].join('');
    var oauth2Client = new OAuth2(config.clientId, config.clientSecret, redirectUrl);
    return Q.ninvoke(oauth2Client, 'getToken', code).then(function (res) {
        return res[0];
    });
}
module.exports = getAccessToken;
//# sourceMappingURL=get-access-tokens.js.map