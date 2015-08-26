/// <reference path="../typings/tsd.d.ts" />
'use strict';

import chai = require('chai');
let should:any = chai.should();
import sinon = require('sinon');
import google = require('googleapis');

import getProfile = require('./get-profile');

describe('oauth2-google', () => {

    describe('get-profile', () => {

        afterEach(() => {
            if (google.plus.restore) {
                google.plus.restore();
            }
        });

        let config:OAuth2Config = {
            clientId: 'your-client-id',
            clientSecret: 'your-client-secret',
            redirectUrl: {
                protocol: 'http://',
                host: 'example.com',
                uri: '/auth/google/callback'
            }
        };

        // google Oauth response for code/token exchange request
        let fixtureGetTokens:any = {
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
        };

        it('should return a valid google plus user profile', (done:any):any => {

            should.exist(getProfile);

            // google plus user
            let user:any = {
                kind: 'plus#person',
                etag: '"pNz5TVTpPz2Rn5Xw8UrubkkbOJ0/8wII0zxjh6EMZTkJA--p6DSI-wX"',
                gender: 'male',
                emails: [{value: 'net@citizen.com', type: 'account'}],
                objectType: 'person',
                id: '109515962716719253613',
                displayName: 'Net Citizen',
                name: {familyName: 'Citizen', givenName: 'Net'},
                url: 'https://plus.google.com/109511962727719553613',
                image: {
                    url: 'https://lh3.googleusercontent.com/-eLAFwuSEM2x/AAAAAAAAAAI/AAAAAAAAACg/dWlcwoWU533/photo.jpg?sz=50',
                    isDefault: false
                },
                isPlusUser: true,
                circledByCount: 8,
                verified: false
            };

            sinon.stub(google, 'plus').returns({
                people: {
                    get: function (obj:any, callback:any):any {
                        callback(null, [user]);
                    }
                }
            });

            getProfile(config, fixtureGetTokens).then(function (res:any):any {
                res.displayName.should.equal(user.displayName);
            })
                .then(done, done);

        });

        it('should handle get Google Plus User errors', (done:any):any => {

            // google error response
            let googleErrorResponse:any = {
                errors: [
                    {
                        domain: 'global',
                        reason: 'authError',
                        message: 'Invalid Credentials',
                        locationType: 'header',
                        location: 'Authorization'
                    }],
                code: 401,
                message: 'Invalid Credentials'
            };

            sinon.stub(google, 'plus').returns({
                people: {
                    get: function (obj:any, callback:any):any {
                        callback(googleErrorResponse);
                    }
                }
            });

            getProfile(config, fixtureGetTokens).catch(function (err:any):any {
                err.should.equal(googleErrorResponse);
            })
                .then(done, done);

        });

    });

});
