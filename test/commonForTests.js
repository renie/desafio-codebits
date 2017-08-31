global.REQLIB		= require('app-root-path').require,
global.APP			= REQLIB('server.js'),
global.SUPERTEST	= require('supertest')(APP),
global.ASSERT		= require('assert');