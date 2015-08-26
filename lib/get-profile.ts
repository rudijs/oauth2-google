/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');
import Q = require('q');
import google = require('googleapis');
let OAuth2:any = google.auth.OAuth2;

function getProfile(config:OAuth2Config, tokens:any):any {

    assert.equal(typeof config, 'object', 'required argument config must be an object');
    assert.equal(typeof tokens, 'object', 'required argument tokens must be an object');

    let redirectUrl:string = [
        config.redirectUrl.protocol,
        config.redirectUrl.host,
        config.redirectUrl.uri
    ].join('');

    let oauth2Client:any = new OAuth2(config.clientId, config.clientSecret, redirectUrl);

    oauth2Client.setCredentials(tokens);

    let plus:any = google.plus('v1');

    return Q.ninvoke(plus.people, 'get', {userId: 'me', auth: oauth2Client}).then(function(res:any):any {
        // res will be an array of the [userprofile, response object]
        // return the userprofile
        return res[0];
    });

}

export = getProfile;
