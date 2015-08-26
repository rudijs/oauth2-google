/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');

let should:any = chai.should();

import signIn = require('./sign-in');

describe('oauth2-google', () => {

    describe('sign-in', () => {

        let config:OAuth2Config = {
            clientId: 'your-client-id',
            clientSecret: 'your-client-secret',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/google/callback'
            }
        };

        it('should return a valid google sign in url and unique state id', () => {
            should.exist(signIn);

            let googleSignIn:SignIn = signIn(config);

            googleSignIn.state.should.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g);

            /* tslint:disable */
            googleSignIn.url.should.match(/google\.com.*access_type=.*&scope=.*&state=.*&response_type=.*&client_id=.*&redirect_uri=http.*/);

        });

    });

});
