module.change_code = 1;
'use_strict';

var alexa = require('alexa-app');
var app = new alexa.app('counter');

app.launch(function(request, response) {
		response.say('Welcome to Counting Master. Up to what number should I count?').shouldEndSession(false);
});

app.sessionEnded(function(request, response) {
	
});

app.error = function(exception, request, response) {
	console.log(exception);
	console.log(request);
	console.log(response);
	response.say('Sorry an error occured ' + error.message);
};

app.intent('count',
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
		var fromNumber = request.slots['fromNumber'].value;
		var toNumber = request.slots['toNumber'].value;
		
		if (!toNumber || isNaN(toNumber)) {
			response.say("Please tell me a number to which I should count").shouldEndSession(false);
		} else {
			var toNumberInt = parseInt(toNumber);
			var fromNumberInt = 1;
			
			if (fromNumber) {
				fromNumberInt = parseInt(fromNumber);
			}
			
			if (fromNumberInt > toNumberInt) {
				response.say("Sorry, I can't count backwards").shouldEndSession(false);
			} else {
				var output = "";
				
				for (var i = fromNumberInt; i <= toNumberInt; i++) {
					output += i;
					
					if (i != toNumber) {
						output += ", ";
					}
				}
				
				response.say(output);
			}
		}
	}
);

app.intent('AMAZON.HelpIntent', function(request, response) {
	response.say("I'm Counting Master. Just say count from four to twenty and I will do it.").shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', function(request, response) {
	
});

app.intent('AMAZON.CancelIntent', function(request, response) {
	
});

module.exports = app;