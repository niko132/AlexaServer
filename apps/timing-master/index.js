module.change_code = 1;
'use_strict';

var alexa = require('alexa-app');
var app = new alexa.app('counter');

app.launch(function(request, response) {
		response.say('Welcome to Timing Master. What time should I tell you?').shouldEndSession(false);
});

app.sessionEnded(function(request, response) {
	
});

app.error = function(exception, request, response) {
	console.log(exception);
	console.log(request);
	console.log(response);
	response.say('Sorry an error occured ' + error.message);
};

app.intent('timeIntent',
	{
		"slots": {
			"timeDelay": "AMAZON.DURATION"
		},
		"utterances":[
			"tell me the time in {-|timeDelay}",
			"tell me the current time",
			"tell me the time",
			"what time is it in {-|timeDelay}",
			"what time is it now",
			"what time is it"
		]
	},
	function(request, response) {
		var timeDelay = request.slots['timeDelay'].value;
		
		var timeDelayInt = 1;
		
		if (timeDelay && !isNaN(timeDelay)) {
			timeDelayInt = parseInt(timeDelay);
		}
		
		var output = "";
		
		for (var i = fromNumberInt; i <= toNumberInt; i++) {
			output += i;
			
			if (i != toNumber) {
				output += ", ";
			}
		}
		
		response.say(output);
	}
);

app.intent('AMAZON.HelpIntent', function(request, response) {
	response.say("I'm Timing Master. Just say \"what time is it in ten minutes\" and I will tell you.").shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', function(request, response) {
	
});

app.intent('AMAZON.CancelIntent', function(request, response) {
	
});

module.exports = app;