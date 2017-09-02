class SnippetM extends Backbone.Model {
	get urlRoot() {
		return '/api/snippet';
	}

	get idAttribute() {
		return '_id';
	}

	parse(res) {
		return res.data;
	}

	construct() {
	}
}

module.exports = SnippetM;