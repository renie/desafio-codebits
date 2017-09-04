var Utils = require('../Utils.js');

class SnippetModel extends Backbone.Model {
	get urlRoot() {
		return '/api/snippet';
	}

	get idAttribute() {
		return '_id';
	}

	parse(res) {
		if (res.data && res.data.length)
			res = res.data[0];
		
		res.extension	= res.filename.replace(/.+(\.[a-zA-z0-9]{2,4})$/, "$1");
		res.lang		= Utils.getLangByExtension(res.extension);
		
		return res;
	}
	
	save(attrs, options) {
		options = options || {};
		attrs = attrs || _.clone(this.attributes);

		delete attrs.lang;
		delete attrs.extension;

		let newData = {data:[]};
		newData.data.push(attrs);

		options.data = JSON.stringify(newData);
		
		options.contentType = 'application/json';

		return Backbone.Model.prototype.save.call(this, attrs, options);
    }

	construct() {
	}
}

module.exports = SnippetModel;