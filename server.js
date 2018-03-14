'use strict';

var AlexaAppServer = require('alexa-app-server');

var server = new AlexaAppServer({
	httpsEnabled: true,
	port: process.env.PORT || 443,
	debug: false,
	verify: true
});

server.start();