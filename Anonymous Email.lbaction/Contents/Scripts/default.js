function run()
{
	// LaunchBar.se
}

function validateEmail(email) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    return filter.test(email);
}

function runWithString(argument)
{
	if (! validateEmail(argument))
	{
		return [{
				title: "Invalid Email Address"
			}];
	}

	var url = 'http://notsharingmy.info/anonymize.js?addresses=' + encodeURIComponent(argument);
	if ( argument.match(/^http:/))
	{
		url = argument;
	}

	var result = HTTP.get(url);

	File.writeJSON(result, "/tmp/blah.txt");

	var emails = result.data.replace(/^.*?\(/, '');
	emails = emails.replace(/\);$/, '');

	var emails = JSON.parse(emails);

	if (argument in emails)
	{
		var email = emails[argument];

		return [
			{
				url: email,
			},
			{
				title: "Results from http://notsharingmy.info",
				url: "http://notsharingmy.info",
			}
		]
	}

	return [{
			title: "Failed =("
		}];

}

// console.log( runWithString("elyknosrac@gmail.com") );
