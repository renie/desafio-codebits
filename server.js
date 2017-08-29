var express = require('express'),
	app		= express(),
	port	= process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send({ data: "service up" });
});

app.listen(port);

console.log('Listening on: ' + port);

module.exports = app;