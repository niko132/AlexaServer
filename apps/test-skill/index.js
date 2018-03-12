module.change_code = 1;
'use_strict';

var alexa = require('alexa-app');
var app = new alexa.app('test-skill');

app.launch(function(request, response) {
		response.say('Welcome to your test skill').reprompt('Way to go. You got it to run. Bad ass.').shouldEndSession(false);
});

app.error = function(exception, request, response) {
	console.log(exception);
	console.log(request);
	console.log(response);
	response.say('Sorry an error occured ' + error.message);
};

app.intent('sayNumber',
	{
		"slots":{"number":"NUMBER"},
		"utterances":[
			"say the number {1-100|number}",
			"give me the number {1-100|number}",
			"tell me the number {1-100|number}",
			"I want to hear you say the number {1-100|number}"]
	},
	function(request, response) {
		var number = request.slot('number');
		response.say("You asked for the number " + number);
	}
);

app.intent('count',
	{
		"slots":{"fromNumber":"AMAZON.NUMBER", "toNumber":"AMAZON.NUMBER"},
		"utterances":[
			"count from {fromNumber} to {toNumber}",
			"count to {toNumber}",
			"tell me the numbers between {fromNumber} and {toNumber}",
			"tell me the numbers to {toNumber}",
			"say the numbers from {fromNumber} to {toNumber}",
			"say the numbers to {toNumber}"]
	},
	function(request, response) {
		var fromNumber = request.slot('fromNumber');
		var toNumber = request.slot('toNumber');
		
		if (!toNumber) {
			response.say("Please tell me a number to which I count");
		} else {
			var toNumberInt = parseInt(toNumber);
			var fromNumberInt = 1;
			
			if (fromNumber) {
				fromNumberInt = parseInt(fromNumber);
			}
			
			if (fromNumberInt > toNumberInt) {
				response.say("I can't count backwards");
			} else {
				var output = "";
				
				for (var i = fromNumberInt; i <= toNumberInt; i++) {
					output += i + ", ";
				}
				
				response.say(output);
			}
		}
	}
);

module.exports = app;