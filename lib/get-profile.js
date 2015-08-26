/// <reference path="../typings/tsd.d.ts" />
'use strict';
var assert = require('assert');
var Q = require('q');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
function getProfile(config, tokens) {
    assert.equal(typeof config, 'object', 'required argument config must be an object');
    assert.equal(typeof tokens, 'object', 'required argument tokens must be an object');
    var redirectUrl = [
        config.redirectUrl.protocol,
        config.redirectUrl.host,
        config.redirectUrl.uri
    ].join('');
    var oauth2Client = new OAuth2(config.clientId, config.clientSecret, redirectUrl);
    oauth2Client.setCredentials(tokens);
    var plus = google.plus('v1');
    return Q.ninvoke(plus.people, 'get', { userId: 'me', auth: oauth2Client }).then(function (res) {
        return res[0];
    });
}
module.exports = getProfile;
//# sourceMappingURL=get-profile.js.map