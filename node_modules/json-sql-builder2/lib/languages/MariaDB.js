'use strict';

module.exports = function(sql) {
	sql.setLanguage('MariaDB');

	sql.setQuoteChar('`');

	sql.placeholder = function() {
		return '?';
	}

}
