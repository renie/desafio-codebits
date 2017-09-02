var mongoose	= require('mongoose'),
	dbname		= (ENVTEST ? 'codebits_test' : 'codebits'),
	mongoDB		= 'mongodb://127.0.0.1/' + dbname,
	connection;


mongoose.Promise = global.Promise;
connection = mongoose.connect(mongoDB, { useMongoClient: true });


connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.on('connected', () => {ENVAUTOTEST && connection.db.dropDatabase()});