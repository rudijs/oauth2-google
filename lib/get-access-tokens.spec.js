/// <reference path="../typings/tsd.d.ts" />
'use strict';
var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var getAccessToken = require('./get-access-tokens');
describe('oauth2-google', function () {
    describe('get-access-token', function () {
        var config = {
            clientId: 'your-client-id',
            clientSecret: 'your-client-secret',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/google/callback'
            }
        };
        var fixtureGetTokens = [{
                access_token: 'ya29.cgBOAwcobnnB_iEAAACkeFP2kwCfkDjdefR0Utqn4ln0dNgWO546IatEMyFui3KNgeCg6gBWr8yKomYkT_X',
                token_type: 'Bearer',
                id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmNGNmZGQzMmYwYmI4Zjg4N2EwNDBhMGJhYTdjODUxYjhmOTViMzcifQ.eyJpc3MiOiJhY2NvdW5' +
                    '0cy5nb29nbGUuY29tIiwiaWQiOiIxMDk1MTE5NjI3MjY3MTk1NTM2MTIiLCJzdWIiOiIxMDk1MTE5NjI3MjY3MTk1NTM2MTIiLCJhenAiOiIxMDE1OTc' +
                    '4ODI5OTA5LWRqYzJsamZtZTVyNG1ucWQ0Y28zODBtbm1uODlhZnBtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJvb2x5Lm1lQGd' +
                    'tYWlsLmNvbSIsImF0X2hhc2giOiJ2cFBpWDljZ1NwNzJoUG5fZFhlbEhBIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF1ZCI6IjEwMTU5Nzg4Mjk5MDk' +
                    'tZGpjMmxqZm1lNXI0bW5xZDRjbzM4MG1ubW44OWFmcG0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJ0b2tlbl9oYXNoIjoidnBQaVg5Y2dTcDc' +
                    'yaFBuX2RYZWxIQSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJjaWQiOiIxMDE1OTc4ODI5OTA5LWRqYzJsamZtZTVyNG1ucWQ0Y28zODBtbm1uODlhZnB' +
                    'tLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiaWF0IjoxNDA5NDk3OTY1LCJleHAiOjE0MDk1MDE4NjV9.DjT7VxG-2rU7GQ1ycobvl3hp19AP9d' +
                    'S8uqqKHWAtvKdnhQfT3mK5PCYwrFsLgBpbtf_vR3fa1c0t9ZnFrkGgPUrH7kiSg0s9e7PoBsN2z39gbn9X4Blc4Y0NvS-CWFINJuxl3KYURIY2u1n2bM' +
                    'FcJFD2kFi34re8a4FKY9YV_rs',
                expiry_date: 1409501865230
            }];
        afterEach(function () {
            if (OAuth2.prototype.getToken.restore) {
                OAuth2.prototype.getToken.restore();
            }
        });
        it('should get an access token', function (done) {
            should.exist(getAccessToken);
            sinon.stub(OAuth2.prototype, 'getToken', function (code, callback) {
                callback(null, fixtureGetTokens);
            });
            getAccessToken(config, 'abc123').then(function (res) {
                res.access_token.should.equal(fixtureGetTokens[0].access_token);
            })
                .then(done, done);
        });
        it('should handle error responses', function (done) {
            sinon.stub(OAuth2.prototype, 'getToken', function (code, callback) {
                callback(new Error('invalid_grant'));
            });
            getAccessToken(config, 'abc123').catch(function (err) {
                err.message.should.equal('invalid_grant');
            })
                .then(done, done);
        });
    });
});
//# sourceMappingURL=get-access-tokens.spec.js.map