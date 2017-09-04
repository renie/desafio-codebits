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
		
		document.querySelector(targetElement).innerHTML = "Loading...";
		return (this.everFetched ? this.renderList(targetElement) : this.addFetchCallback(this.renderList.bind(this, targetElement)));
	}
	
	renderList(targetElement, data) {
		data = data ? data.data : this.collection.toJSON();
		
		this.render(this.templates.list({snippets: data}), targetElement);
		this.bindEventMaps();
		this.reloadHighlights();
		
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
		let model = null;
		
		if (ev.target.dataset.id) {
			model = this.collection.get(ev.target.dataset.id);
		}
			
		document.querySelector('.top-container .snippet-add-button').classList.add('hide');
		document.querySelector('.top-container .snippet-list-container').classList.remove('hide');
		
		document.querySelector('.main-container').innerHTML = '';
		
		this.filecreator(model);
		
		return this;
	}
	
	saveSnippetListener(ev) {
		let fields		= Array.from(ev.target.parentNode.querySelectorAll('input, textarea')),
			newFields	= {};
		
		fields.forEach(item => {
			newFields[item.name] = item.value;
			item.value = "";
		});
		
		if (newFields.id) {
			newFields._id = newFields.id;
			delete newFields.id;
		}
		
		this.editor.update("");	
		this.saveSnippet(newFields);
		
		return this
	}
	
	saveSnippet(data) {
		let model = new SnippetModel(data);
		model.save().then(data => {
							alert('Snippet Saved!');
							this.loadData(() => this.loadList('.top-container .snippet-list-container'));
						}).catch(e => alert('Error on Snippet saving. Try again later...'));
		
		return this;
	}
	
	filecreator(model) {
		let id = model ? model.get('_id') : null ;
		this.render(this.templates.createAndUpdateForm({id: id}), '.main-container');
		this.reloadEditor(model);
	
		return this;
	}
	
	reloadEditor(model) {
		let lang;
		
		if (model instanceof SnippetModel) {
			lang = model.get('lang');
		} else {
			lang = model || 'javascript';
			model = null;
		}
		
		let textarea;
		
		this.editor = new CodeFlask();
		this.editor.run('.main-container .filecreator .editor', { language: lang, lineNumbers: true });
		textarea = document.querySelector('.main-container .filecreator .editor textarea');
		textarea.name = 'content';
		
		this.editor.onUpdate(code => textarea.value = code);
		this.populateForm(model)
				
		return this;
	}
	
	reloadHighlights() {
		(new CodeFlask()).runAll('.main-container .snippets-item .content', { language: '', lineNumbers: true });
	}
	
	populateForm(model) {
		if (!model)
			return this;
		
		this.editor.update(model.get('content'));
		
		Array.from(document.querySelectorAll('.main-container form input')).forEach(item => {
			let attr = item.name;
			if (item.name == 'id')
				attr = '_id';
			
			item.value = model.attributes[attr];
		});
		
		return this
	}
}

module.exports = SnippetV;