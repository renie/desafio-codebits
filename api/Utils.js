var Utils = {
	formatReturnData : (code, data) => {
		let newData = {
			'data'	: null,
			'errors': null
		};
		
		data = (data instanceof Array) ? data : [data];
		
		code.toString().match(/^2/) ? newData.data = data : newData.errors = data;
		
		return newData;
	},
	
	respond : (response, code, data) => {
		return response.status(code).send(Utils.formatReturnData(code, data));
	},
	
	defaultRespond : (response, err, data) => {
		let code	= err ? 500 : 200,
			newData = code == 200 ? data : err;
		
		if (err)
			console.trace();
		
		return Utils.respond(response, code, data);
	},
	
	defaultValidatePostData : (data) => {
		if (!data || !(data instanceof Array))
			throw new Error('Your data parameter must be an Array.');
		
		return true;
	}
};

module.exports = Utils;