'use strict';

class __ extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value>') }
		});
	}
}

module.exports = {
	definition: __,
	description: `Specifies an Operator for writing INLINE-SQL.`,
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
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							max_age: { __: 'MAX(age) + 1' },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT MAX(age) + 1 AS max_age FROM people',
						values: {}
					}
				}
			},
			"Only INLINE-SQL test": function(sql) {
				return {
					test: function(){
						return sql.build({
							__: 'SELECT MAX(age) FROM people'
						});
					},
					expectedResults: {
						sql: 'SELECT MAX(age) FROM people',
						values: {}
					}
				}
			}
		}
	}
}
