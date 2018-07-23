/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/* eslint-env node, es6 */

const express = require('express');
const app = express();
const watson = require('watson-developer-cloud');
const vcapServices = require('vcap_services');
const cors = require('cors');
// const expressBrowserify = require('express-browserify');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config');

// allows environment properties to be set in a file named .env
// require('dotenv').load({ silent: true });

// on bluemix, enable rate-limiting and force https
if (process.env.VCAP_SERVICES) {
  // enable rate-limiting
  const RateLimit = require('express-rate-limit');
  app.enable('trust proxy'); // required to work properly behind Bluemix's reverse proxy

  const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  });

  //  apply to /api/*
  app.use('/api/', limiter);

  // force https - microphone access requires https in Chrome and possibly other browsers
  // (*.mybluemix.net domains all have built-in https support)
  const secure = require('express-secure-only');
  app.use(secure());
}

app.use(express.static(__dirname + '/static'));
app.use(cors());

// set up express-browserify to serve browserify bundles for examples
// const isDev = app.get('env') === 'development';
// app.get(
//   '/browserify-bundle.js',
//   expressBrowserify('static/browserify-app.js', {
//     watch: isDev,
//     debug: isDev
//   })
// );
// app.get(
//   '/audio-video-deprecated/bundle.js',
//   expressBrowserify('static/audio-video-deprecated/audio-video-app.js', {
//     watch: isDev,
//     debug: isDev
//   })
// );

// set up webpack-dev-middleware to serve Webpack bundles for examples
// const compiler = webpack(webpackConfig);
// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: '/' // Same as `output.publicPath` in most cases.
//   })
// );

// token endpoints
// **Warning**: these endpoints should probably be guarded with additional authentication & authorization for production use

// speech to text token endpoint
// process.env.SPEECH_TO_TEXT_USERNAME
// process.env.SPEECH_TO_TEXT_PASSWORD
var sttAuthService = new watson.AuthorizationV1(
  Object.assign(
    {
      username: "b44e313f-39dc-46d3-aaf9-2af253b0e994", // or hard-code credentials here
      password: "SVkD6NxU4I3y"
    },
    vcapServices.getCredentials('speech_to_text') // pulls credentials from environment in bluemix, otherwise returns {}
  )
);
app.use('/api/speech-to-text/token', function(req, res) {
  sttAuthService.getToken(
    {
      url: watson.SpeechToTextV1.URL
    },
    function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    }
  );
});

// text to speech token endpoint
// username: process.env.TEXT_TO_SPEECH_USERNAME, 
// password: process.env.TEXT_TO_SPEECH_PASSWORD
var ttsAuthService = new watson.AuthorizationV1(
  Object.assign(
    {
      username: "f4a6513b-9a36-4dab-a60d-6834ff9f0a89", // or hard-code credentials here
      password: "DfL3ZiKjzr72"
    },
    vcapServices.getCredentials('text_to_speech') // pulls credentials from environment in bluemix, otherwise returns {}
  )
);
app.use('/api/text-to-speech/token', function(req, res) {
  ttsAuthService.getToken(
    {
      url: watson.TextToSpeechV1.URL
    },
    function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    }
  );
});

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3002;
app.listen(port, function() {
  console.log('Example IBM Watson Speech JS SDK client app & token server live at http://localhost:%s/', port);
});

// Chrome requires https to access the user's microphone unless it's a localhost url so
// this sets up a basic server on port 3001 using an included self-signed certificate
// note: this is not suitable for production use
// however bluemix automatically adds https support at https://<myapp>.mybluemix.net
if (!process.env.VCAP_SERVICES) {
  const fs = require('fs');
  const https = require('https');
  const HTTPS_PORT = 3001;

  const options = {
    key: fs.readFileSync(__dirname + '/keys/localhost.pem'),
    cert: fs.readFileSync(__dirname + '/keys/localhost.cert')
  };
  https.createServer(options, app).listen(HTTPS_PORT, function() {
    console.log('Secure server live at https://localhost:%s/', HTTPS_PORT);
  });
}