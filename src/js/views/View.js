var templates = require('../templates.js');

class View {
	constructor() {
		templates.call(this, Handlebars);
		
		this.everFetched	= false;
		this.fetchCallbacks = [];
	}
	
	render(data, target) {
		document.querySelector(target).innerHTML = data;
		
		return this;
	}
	
	loadData(callback) {
		this.addFetchCallback(callback);
		this.collection.fetch().then(data => this.runFetchCallbacks(data));
		
		return this;
	}
	
	addFetchCallback(fn) {
		if(!fn)
			return this;
		
		if (!(fn instanceof Function))
			throw new Error('Invalid function.');
		
		this.fetchCallbacks.push(fn);
		
		return this;
	}
	
	runFetchCallbacks(data) {
		this.everFetched	= true;
		
		this.fetchCallbacks.forEach(fn => fn(data));
		this.fetchCallbacks = [];
		
		return this;
	}
	
	get templates() {
		if (!this.templateName)
			throw new Error('No templateName was defined.');
		
		return this._templates[this.templateName];
	}
}

module.exports = View;