var SnippetCollection	= require('../collections/Snippet.js'),
	View				= require('./View.js');

class SnippetV extends View {
	
	constructor() {
		super();
		
		this.templateName	= 'snippet';
		this.collection		= new SnippetCollection();
		this.bindMaps		= {
								'snippet-edit-button': this.addSnippetListener,
								'snippet-showall-button': this.showallSnippetListener,
								'snippet-add-button': this.addSnippetListener
							};
		this.loadData();
		
		return this;
	}

	loadList(targetElement) {
		if (!targetElement)
			throw new Error('A target element is needed.');
		
		return (this.everFetched ? this.renderList(targetElement) : this.addFetchCallback(this.renderList.bind(this, targetElement)));
	}
	
	renderList(targetElement, data) {
		data = data ? data.data : this.collection.toJSON();
		
		this.render(this.templates.list({snippets: data}), targetElement);
		this.bindEvents();
		
		return this;
	}
	
	bindEvents() {
		if (document.querySelector('.main-container .snippets-item')) {
			(new CodeFlask).runAll('.main-container .snippets-item .content', { language: '', lineNumbers: true });
		}
		
		document.body.addEventListener('click', ev => {
			for ( let item in this.bindMaps) {
				if (ev.target.classList.contains(item)) {
					ev.preventDefault();
					this.bindMaps[item].call(this, ev);
					return false;
				}
			}
		});
		return this;
	}
	
	addSnippetListener(ev) {
		document.querySelector('.top-container .snippet-add-button').classList.add('hide');
		document.querySelector('.top-container .snippet-list-container').classList.remove('hide');
		
		document.querySelector('.main-container').innerHTML = '';
		
		return this
	}
	
	showallSnippetListener(ev) {
		document.querySelector('.top-container .snippet-list-container').classList.add('hide');
		document.querySelector('.top-container .snippet-add-button').classList.remove('hide');
		
		this.loadData(this.renderList.bind(this, '.main-container'));
		
		return this;	
	}
}

module.exports = SnippetV;