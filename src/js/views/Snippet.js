var SnippetCollection = require('../collections/Snippet.js');

class SnippetV {
	constructor() {
		this.collection = new SnippetCollection();
		this.collection.fetch().then(this.loadView.bind(this));
	}

	loadView() {
		console.log(this.collection);
	}
}

module.exports = SnippetV;