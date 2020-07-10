'use strict';

module.exports = function(sql) {
	sql.setLanguage('PostgreSQL');

	sql.setQuoteChar('"');

	sql.placeholder = function() {
		return '$' + sql._values.length;
	}

}
