global.NODENV		= process.env.NODE_ENV;
global.ENVTEST		= (NODENV.indexOf('test') > -1);
global.ENVAUTOTEST	= (NODENV === 'autotest');
global.ENVDEVTEST	= (NODENV === 'devtest');


var express 	= require('express'),
	app			= express(),
	port		= (process.env.PORT || 3000),
	http		= require('http'),
	urlpath 	= '/api/',
	publicpath	= (ENVDEVTEST ? 'src' : 'public');

require('./api/model/DBStart.js');


app.get(urlpath, (req, res) => res.status(200).send({ data: 'service up' }));
app.all(urlpath, (req, res) => res.status(405).send());

app.use(urlpath + 'snippet/', require('./api/controller/Snippet').getRouter());

app.use('/', express.static(publicpath));
app.listen(port);

console.log('Listening on: ' + port);

module.exports = app;