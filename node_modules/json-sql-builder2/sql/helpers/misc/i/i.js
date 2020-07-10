'use strict';

class i extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-ident>', SQLBuilder.CALLEE) },
		});
	}
}

module.exports = {
	definition: i,
	description: 'Specifies an Identifier for a Table, Column, Index, etc. as Helper where normally a String value was expected.',
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $eq: { $i: 'last_name' } }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = last_name',
						values: {}
					}
				}
			}
		}
	}
}
