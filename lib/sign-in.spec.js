/// <reference path="../typings/tsd.d.ts" />
'use strict';
var chai = require('chai');
var should = chai.should();
var signIn = require('./sign-in');
describe('oauth2-google', function () {
    describe('sign-in', function () {
        var config = {
            clientId: 'your-client-id',
            clientSecret: 'your-client-secret',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/google/callback'
            }
        };
        it('should return a valid google sign in url and unique state id', function () {
            should.exist(signIn);
            var googleSignIn = signIn(config);
            googleSignIn.state.should.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g);
            googleSignIn.url.should.match(/google\.com.*access_type=.*&scope=.*&state=.*&response_type=.*&client_id=.*&redirect_uri=http.*/);
        });
    });
});
//# sourceMappingURL=sign-in.spec.js.map