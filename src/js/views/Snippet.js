var SnippetCollection	= require('../collections/Snippet.js'),
	SnippetModel		= require('../models/Snippet.js'),
	View				= require('./View.js'),
	Utils				= require('../Utils.js');

class SnippetV extends View {
	
	constructor() {
		super();
		
		this.templateName	= 'snippet';
		this.collection		= new SnippetCollection();
		this.bindMaps		= {
								'click' : {
									'snippet-edit-button'			: this.addSnippetListener,
									'snippet-showall-button'		: this.showallSnippetListener,
									'snippet-add-button'			: this.addSnippetListener,
									'snippet-change-filetype-btn'	: this.saveSnippetListener
								},
								'focusout' : {
									'snippet-change-filetype-field'	: this.changeFiletypeListener	
								}
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
		this.bindMaps()();
		
		return this;
	}
	
	showallSnippetListener(ev) {
		document.querySelector('.top-container .snippet-list-container').classList.add('hide');
		document.querySelector('.top-container .snippet-add-button').classList.remove('hide');
		
		this.loadData(this.renderList.bind(this, '.main-container'));
		
		return this;	
	}
	
	changeFiletypeListener(ev) {
		let extension	= ev.target.value.replace(/.+(.[a-zA-z0-9]{2,4})$/, "$1"),
			lang		= Utils.getLangByExtension(extension);
		
		this.reloadEditor(lang);
	}
	
	addSnippetListener(ev) {
		document.querySelector('.top-container .snippet-add-button').classList.add('hide');
		document.querySelector('.top-container .snippet-list-container').classList.remove('hide');
		
		document.querySelector('.main-container').innerHTML = '';
		
		this.filecreator();
		
		return this
	}
	
	saveSnippetListener(ev) {
		let fields		= Array.from(ev.target.parentNode.querySelectorAll('input, textarea')),
			newFields	= {};
		
		fields.forEach(item => {
			newFields[item.name] = item.value;
			item.value = "";
		});
		
		this.editor.update("");	
		this.saveSnippet(newFields);
		
		return this
	}
	
	saveSnippet(data) {
		let model = new SnippetModel(data);
		model.save().then(data => alert('Snippet Saved!')).catch(e => alert('Error on Snippet saving. Try again later...'));
		
		return this;
	}
	
	filecreator() {
		this.render(this.templates.createAndUpdateForm(), '.main-container');
		this.reloadEditor();
	
		this.bindFormEvents();
		
		return this;
	}
	
	reloadEditor(lang) {
		lang = lang || 'javascript';
		let textarea;
		
		this.editor = new CodeFlask();
		this.editor.run('.main-container .filecreator .editor', { language: lang, lineNumbers: true });
		textarea = document.querySelector('.main-container .filecreator .editor textarea');
		textarea.name = 'content';
		
		this.editor.onUpdate(code => textarea.value = code);
		
		return this;
	}
}

module.exports = SnippetV;