/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');
import Q = require('q');
import google = require('googleapis');
let OAuth2:any = google.auth.OAuth2;

function getAccessToken(config:OAuth2Config, code:string):any {

    assert.equal(typeof config, 'object', 'required argument config must be an object');
    assert.equal(typeof code, 'string', 'required argument code must be a string');

    let redirectUrl:string = [
        config.redirectUrl.protocol,
        config.redirectUrl.host,
        config.redirectUrl.uri
    ].join('');

    let oauth2Client:any = new OAuth2(config.clientId, config.clientSecret, redirectUrl);

    return Q.ninvoke(oauth2Client, 'getToken', code).then(function (res:any):any {
        // oauth2Client.getToken callback is:
        // done(err, tokens, response);
        // so res will be an array [tokens, response]
        // return tokens
        return res[0];
    });

}

export = getAccessToken;
