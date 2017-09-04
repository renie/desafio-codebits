global.NODENV		= process.env.NODE_ENV;
global.ENVTEST		= (NODENV && NODENV.indexOf('test') > -1);
global.ENVAUTOTEST	= (NODENV && NODENV === 'autotest');


var express 	= require('express'),
	app			= express(),
	port		= (process.env.PORT || 3000),
	http		= require('http'),
	urlpath 	= '/api/';

require('./api/model/DBStart.js');


app.get(urlpath, (req, res) => res.status(200).send({ data: 'service up' }));
app.all(urlpath, (req, res) => res.status(405).send());

app.use(urlpath + 'snippet/', require('./api/controller/Snippet').getRouter());

app.use('/', express.static('public'));
app.listen(port);

console.log('Listening on: ' + port);

module.exports = app;