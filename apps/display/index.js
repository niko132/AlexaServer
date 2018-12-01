module.change_code = 1;
'use_strict';

var alexa = require('alexa-app');
var app = new alexa.app('display');

app.launch(function(request, response) {
//		response.say('Welcome to Display. Up to what number should I count?').shouldEndSession(false);
//	response.say('Welcome to Display. What color do you want to see?').shouldEndSession(false);
	
	response.directive({
		"type" : "Display.RenderTemplate",
		"template" : {
			"type" : "BodyTemplate6",
			"backButton" : "HIDDEN",
			"backgroundImage" : {
				"contentDescription" : "title",
				"sources" : [{
					"url" : "https://niko132-alexa.herokuapp.com/title.png"
				}]
			},
			"textContent" : {
				"primaryText" : {
					"text" : "Colors",
					"type" : "PlainText"
				},
				"secondaryText" : {
					"text" : "Name a color!",
					"type" : "PlainText"
				}
			}
		}
	}).say('Welcome to Display. What color do you want to see?').shouldEndSession(false);
});

app.sessionEnded(function(request, response) {
	
});

app.error = function(exception, request, response) {
	console.log(exception);
	console.log(request);
	console.log(response);
	response.say('Sorry an error occured ' + error.message);
};

app.intent('color',
	{
		"slots": {
			"fromNumber": "AMAZON.NUMBER",
			"toNumber":"AMAZON.NUMBER"
		},
		"utterances":[
			"count from {-|fromNumber} to {-|toNumber}",
			"count to {-|toNumber}",
			"tell me the numbers between {-|fromNumber} and {-|toNumber}",
			"tell me the numbers to {-|toNumber}",
			"say the numbers from {-|fromNumber} to {-|toNumber}",
			"say the numbers to {-|toNumber}"
		]
	},
	function(request, response) {
		var color = request.slots['color_slot'].value;
		
		if (!color) {
			response.say("Please give me a valid color").shouldEndSession(false);
		} else {
			response.directive({
				"type" : "Display.RenderTemplate",
				"template" : {
					"type" : "BodyTemplate6",
					"backButton" : "HIDDEN",
					"backgroundImage" : {
						"contentDescription" : "",
						"sources" : [{
							"url" : "https://niko132-alexa.herokuapp.com/" + color + ".png"
						}]
					},
					"textContent" : {
						"primaryText" : {
							"text" : color,
							"type" : "PlainText"
						}
					}
				}
			}).say("Here is " + color).shouldEndSession(false);
		}
	}
);

app.intent('AMAZON.HelpIntent', function(request, response) {
	response.say("I'm the Counter. Just say \"count from five to twenty\" and I will do it.").shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', function(request, response) {
	
});

app.intent('AMAZON.CancelIntent', function(request, response) {
	
});

module.exports = app;