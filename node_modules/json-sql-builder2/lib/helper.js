'use strict';

const SQLOperator = require('./operator');

class SQLHelper extends SQLOperator {
	constructor(sqlBuilderInstance){
		super(sqlBuilderInstance);

		this.__is__ = 'helper';
	}
}

module.exports = SQLHelper;
