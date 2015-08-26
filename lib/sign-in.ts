/// <reference path="../typings/tsd.d.ts" />
'use strict';

import assert = require('assert');
import uuid = require('uuid');
import google = require('googleapis');

let OAuth2:any = google.auth.OAuth2;

let scope:string[] = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
];

function signIn(config:OAuth2Config):SignIn {

    assert.equal(typeof config, 'object', 'required argument config must be an object');

    let redirectUrl:string = [
        config.redirectUrl.protocol,
        config.redirectUrl.host,
        config.redirectUrl.uri
    ].join('');

    let oauth2Client:any = new OAuth2(config.clientId, config.clientSecret, redirectUrl);

    let state:string = uuid.v4();

    return {
        url: oauth2Client.generateAuthUrl({
            access_type: 'online', // 'online' (default) or 'offline' (gets refresh_token)
            scope: scope, // if you only need one scope you can pass it as string
            state: state
        }),
        state: state
    };

}

export = signIn;
