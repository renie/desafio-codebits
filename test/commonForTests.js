global.ASSERT = require('assert');
global.REQLIB = require('app-root-path').require;

global.CLONEARRAY	= array => {
	let out = [];
	array.forEach(item => out.push(Object.assign({}, item)));
	return out;
};