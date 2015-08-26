# oauth2-google

[![Build Status](https://travis-ci.org/rudijs/oauth2-google.svg?branch=master)](https://travis-ci.org/rudijs/oauth2-google)
[![Coverage Status](https://coveralls.io/repos/rudijs/oauth2-google/badge.svg?branch=master&service=github)](https://coveralls.io/github/rudijs/oauth2-google?branch=master)
[![Dependencies Status](https://david-dm.org/rudijs/oauth2-google.svg)](https://david-dm.org/rudijs/oauth2-google.svg)

## Overview

Node.js oauth2 Google sign in module.

If you want or need to roll-your-own Google oauth2 login this module with help with the user sign in and subsequent get user profile.
 
Once you have the user's profile (in JSON format) saving it to your database of choice is then up to you.

## Requirements

Needs node v12.x or > iojs-v1.x

This module uses Promises and Generators. The author's intended case use is within KoaJS.

The source code is written in [Typescript](http://www.typescriptlang.org/) but only the javascript code is published at NPM.

## API

signIn => Returns an object with a Google Oauth sign in URL to send the user to and a unique string for state.
 
getAccessToken => With the code returned from signIn, request a Google API access token.
 
getProfile => With the access token returned from getAccessToken, request the user profile.

## Usage

Use `signIn` in your routes to send the user to sign in with google.com.

Use `getAccessToken` and `getProfile` in your controller to retrieve the user profile from google's API.

Also review the test code, `*.spec.ts`, files in the github.com source repo.

Code review, suggestions and pull requests are welcome - thanks.
