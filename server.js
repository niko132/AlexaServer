'use strict';

var AlexaAppServer = require('alexa-app-server');

var server = new AlexaAppServer({
	httpsEnabled: true,
	port: process.env.PORT || 443,
/*	debug: true, */
	verify: true
});

server.start();