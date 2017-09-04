require('../commonForTests.js');

global.APP			= REQLIB('server.js');
global.SUPERTEST	= require('supertest')(APP);
global.URLAPIPATH	= '/api/';