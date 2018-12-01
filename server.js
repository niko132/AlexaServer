'use strict';

var AlexaAppServer = require('alexa-app-server');

var server = new AlexaAppServer({
	httpsEnabled: false,
	port: process.env.PORT || 80,
	debug: false,
	verify: true
});

var express = require('express');
var port = process.env.PORT || 80;

var app = express();
app.use(express.static('public'));
app.listen(port);

server.start();

var Canvas = require('canvas'),
	Image = Canvas.Image,
	canvas = new Canvas(200, 200),
	ctx = canvas.getContext('2d'),
	fs = require('fs');
 
ctx.font = '30px Impact';
ctx.rotate(.1);
ctx.fillText("Awesome!", 50, 100);
 
var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();
 
console.log('<img src="' + canvas.toDataURL() + '" />');

var pngfile = fs.createWriteStream('test.png'),
	stream = canvas.pngStream();
stream.on('data', function(chunk) {
	pngfile.write(chunk);
});
stream.on('end', function() {
	console.log('saved png');
});