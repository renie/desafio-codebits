global.REQLIB		= require('app-root-path').require,
global.APP			= REQLIB('server.js'),
global.SUPERTEST	= require('supertest')(APP),
global.ASSERT		= require('assert');

global.CLONEARRAY	= array => {
	let out = [];
	array.forEach(item => out.push(Object.assign({}, item)));
	return out;
};