var Snippet = require('../models/Snippet');

class SnippetCollection extends Backbone.Collection {

	get url() {
		return '/api/snippet';
	}

	get model() {
		return Snippet;
	}

	construct() {
		this.url	= '/api/snippet';
		this.model	= Snippet;
	}
	
	parse(res) {
		return res.data;
	}
}

module.exports = SnippetCollection;