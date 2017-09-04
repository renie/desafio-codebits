class SnippetM extends Backbone.Model {
	get urlRoot() {
		return '/api/snippet';
	}

	get idAttribute() {
		return '_id';
	}

	parse(res) {
		res.extension = res.filename.replace(/.+(.[a-zA-z0-9]{2,4})$/, "$1");
		
		for (let item in Extensions) {
			let na = Extensions[item].extensions.filter(item => item === res.extension); 
			 
			if (na.length > 0) {
				res.lang = item.toLowerCase();
				break;
			} 
		}
		
		return res;
	}
	
	save(attrs, options) {
		options = options || {};
		attrs = attrs || _.clone(this.attributes);

		delete attrs.lang;
		delete attrs.extension;

		options.data = JSON.stringify(attrs);

		return Backbone.Model.prototype.save.call(this, attrs, options);
    }

	construct() {
	}
}

module.exports = SnippetM;