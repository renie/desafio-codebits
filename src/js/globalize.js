if (window.autotest) {
	global.Handlebars = require('../libs/handlebars/handlebars.runtime.min.js')
	global._ = require('../libs/underscore/underscore-min.js');
	
	require('intercept-require')((moduleExport, info) => {
		if (info.moduleId === 'underscore')
			return global._;
		return moduleExport;
	});
	
	global.Backbone = require('../libs/backbone/backbone-min.js');
	global.Backbone.ajax = require('../libs/backbone.nativeajax/backbone.nativeajax.js');
}
