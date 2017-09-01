var Utils = require('../Utils.js');
var router = require('express').Router();
router.use(require('body-parser').json());

var SC,
SnippetController = SC = {
	Snippet: require('../model/Snippet'),
	
	getRouter : () => {
		return router;
	},
	
	getAll : (req, res) => {
		SC.Snippet.find({}, (err, data) => Utils.defaultRespond(res, err, data));		
		return SC;
	},
	
	persist : (req, res) => {
		let method = req.method,
			snippets, listPromises;
		
		try {
			snippets = SC.parsePersistData(method, req.body);
		} catch (err) {
			Utils.respond(res, 500, err.message);
			return false;
		}
		
		if (method === 'POST')
			listPromises = SC.create(snippets);
		else
			listPromises = SC.update(snippets);
			
		Promise.all(listPromises)
				.then(data => Utils.respond(res, 200, data))
				.catch(err => Utils.respond(res, 500, err.message));
	},
	
	parsePersistData : (method, requestBody) => {
		let data		= requestBody.data;
		
		Utils.defaultValidatePostData(data);
		
		if (method === 'POST')
			return SC.parseCreateData(data);
		
		return SC.parseUpdateData(data);
	},
	
	create : (snippets) => {
		let listPromises = [];
		snippets.forEach(item => listPromises.push(item.save()));
		
		return listPromises;
	},
	
	parseCreateData : (requestBody) => {
		let finalList	= []
		
		requestBody.forEach(item => {
			finalList.push(new SC.Snippet(item));
		});
		
		return finalList;
	},
	
	update : (snippets) => {
		let listPromises = [];
		snippets.forEach(item => listPromises.push(SC.Snippet.update({_id: item.id}, item.data)));
				
		return listPromises;
	},
	
	parseUpdateData : (requestBody) => {
		let finalList	= [],
			deniedProps = ['_id', 'id', '__v'];
		
		requestBody.forEach(item => {
			let newItem = Object.assign({}, item);
			
			deniedProps.forEach(prop => delete newItem[prop]);
			
			finalList.push({
				id		: item._id,
				data	: newItem
			});
		});
		
		return finalList;
	}
	
};

router.get('/', SnippetController.getAll);
router.post('/', SnippetController.persist);
router.put('/', SnippetController.persist);

module.exports = SnippetController;