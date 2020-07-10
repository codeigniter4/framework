'use strict';

module.exports = function(sql) {
	sql.setLanguage('SQLite');

	sql.setQuoteChar('"');

	sql.placeholder = function() {
		return '?';
	}

}
