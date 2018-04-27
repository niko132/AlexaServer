module.change_code = 1;
'use_strict';

var alexa = require('alexa-app');
var app = new alexa.app('temp');

app.launch(function(request, response) {
		response.say('Welcome to Temp Master. Which temperature should I convert?').shouldEndSession(false);
});

app.sessionEnded(function(request, response) {
	
});

app.error = function(exception, request, response) {
	console.log(exception);
	console.log(request);
	console.log(response);
	response.say('Sorry an error occured ' + error.message);
};

app.intent('toFahrenheit',
	{
		"slots": {
			"celsius":"AMAZON.NUMBER"
		},
		"utterances":[
			"tell me what is {-|celsius} degree in fahrenheit",
			"tell me what is {-|celsius} in fahrenheit",
			"convert {-|celsius} degree to fahrenheit",
			"convert {-|celsius} to fahrenheit",
			"convert {-|celsius} degree",
			"convert {-|celsius}",
			"{-|celsius} degree in fahrenheit",
			"{-|celsius} in fahrenheit",
			"{-|celsius} degree to fahrenheit",
			"{-|celsius} to fahrenheit"
		]
	},
	function(request, response) {
		var celsius = request.slots['celsius'].value;
		
		if (!celsius || isNaN(celsius)) {
			response.say("Please tell me a temperature in degree celsius to convert").shouldEndSession(false);
		} else {
			var celsiusFloat = parseFloat(celsius);
			var fahrenheitFloat = celsiusFloat * 1.8f + 32.0f;
			
			var output = celsiusFloat + " degree celsius are equal to " + fahrenheitFloat + "degree fahrenheit";
			response.say(output);
		}
	}
);

app.intent('AMAZON.HelpIntent', function(request, response) {
	response.say("I'm Temp Master. Just ask me to convert a temperature in degree celsius to fahrenheit.").shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', function(request, response) {
	
});

app.intent('AMAZON.CancelIntent', function(request, response) {
	
});

module.exports = app;