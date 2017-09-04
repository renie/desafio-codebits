'use strict';

require('./globalize.js');

var SnippetsView = require('./views/Snippet');

(function(){
	(new SnippetsView()).loadList('.top-container .snippet-list-container');
})();