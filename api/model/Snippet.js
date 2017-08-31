var mongoose = require('mongoose');

var Snippet = mongoose.model('Snippet', new mongoose.Schema({  
	'description'	: String,
	'filename'		: String,
	'content'		: String
}));

module.exports = Snippet;