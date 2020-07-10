'use strict';

module.exports = function(sql) {
	sql.setLanguage('MySQL');

	sql.setQuoteChar('`');

	sql.placeholder = function() {
		return '?';
	}

}
