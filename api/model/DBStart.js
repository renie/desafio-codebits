var mongoose = require('mongoose'),
	test = process.env.NODE_ENV === 'test',
	dbname = test ? 'codebits_test' : 'codebits',
	mongoDB = 'mongodb://127.0.0.1/' + dbname,
	connection;

mongoose.Promise = global.Promise;
connection = mongoose.connect(mongoDB, { useMongoClient: true });


connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.on('connected', () => {test && connection.db.dropDatabase()});