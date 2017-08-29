GLOBAL.REQLIB		= require('app-root-path').require,
GLOBAL.APP			= REQLIB('server.js'),
GLOBAL.SUPERTEST	= require('supertest')(APP),
GLOBAL.ASSERT		= require('assert');