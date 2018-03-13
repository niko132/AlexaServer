'use strict';

var AlexaAppServer = require('alexa-app-server');

var server = new AlexaAppServer({
	httpsEnabled: false,
	port: process.env.PORT || 80,
	verify: true
});

server.start();