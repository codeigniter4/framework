'use strict';

const sqlJoin = {
	left: 'LEFT JOIN'
}
class joinHelper extends SQLBuilder.SQLHelper {
	constructor(sql, name){
		super(sql);
		let aliasKeyword = sql.isOracle() ? ' ' : ' AS ';
		this.Types({
			String: { syntax: this.Syntax('<key-ident>' + aliasKeyword + '<value-ident>') },
			Object: { syntax: this.Syntax('<value>' + aliasKeyword + '<identifier>') },
			Function: { syntax: this.Syntax('<value>' + aliasKeyword + '<key-ident>') },
		});

		// set the name, otherwise all classes that inherit will named "joinHelper"
		let helperName = '$' + name;
		this.__name__ = helperName;
	}
}

module.exports = joinHelper;
