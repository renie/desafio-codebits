'use strict';

require('./globalize.js');

var SnippetsView = require('./views/Snippet');

(function(){
	(new SnippetsView()).loadList('#snippet_list');
})();