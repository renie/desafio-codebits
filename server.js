var express = require('express'),
	app		= express(),
	port	= process.env.PORT || 3000,
	http	= require('http');;

require('./api/model/DBStart.js');

app.get('/', (req, res) => res.status(200).send({ data: 'service up' }));
app.all('/', (req, res) => res.status(405).send());

app.use('/snippet', require('./api/controller/Snippet').getRouter());

app.listen(port);

console.log('Listening on: ' + port);

module.exports = app;