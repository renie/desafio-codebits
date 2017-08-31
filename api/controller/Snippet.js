var Utils = require('../Utils.js');
var router = require('express').Router();
router.use(require('body-parser').json());


var SnippetController = {
	Snippet: require('../model/Snippet'),
	
	getRouter : () => {
		return router;
	},
	
	getAll : (req, res) => {
		SnippetController.Snippet.find({}, (err, data) => Utils.defaultRespond(res, err, data));		
		return SnippetController;
	},
	
	create : (req, res) => {
		let listPromises = [],
			snippets;
		
		try {
			snippets = SnippetController.parseCreateData(req.body);
		} catch (err) {
			Utils.respond(res, 500, err.message);
			return false;
		}
		
		snippets.forEach(item => listPromises.push(item.save()));
		
		Promise.all(listPromises)
				.then(data => Utils.respond(res, 200, data))
				.catch(err => Utils.respond(res, 500, err.message));
		
		
		return SnippetController;
	},
	
	parseCreateData : (requestBody) => {
		let data		= requestBody.data,
			finalList	= [];
		
		Utils.defaultValidatePostData(data);
		
		data.forEach(item => {
			finalList.push(new SnippetController.Snippet(item));
		});
		
		return finalList;
	}
};


router.get('/', SnippetController.getAll);
router.post('/', SnippetController.create);

module.exports = SnippetController;