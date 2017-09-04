var Utils = {
	getLangByExtension: extension => {
		let lang;
		
		for (let item in Extensions) {
			let na = Extensions[item].extensions.filter(item => item.toLowerCase() === extension.toLowerCase()); 
			 
			if (na.length > 0) {
				lang = item.toLowerCase();
				break;
			} 
		}
		
		return lang
	}
};

module.exports = Utils;