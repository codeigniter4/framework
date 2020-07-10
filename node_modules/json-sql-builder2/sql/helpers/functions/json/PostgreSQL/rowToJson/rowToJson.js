'use strict';

class rowToJson extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('row_to_json(<value-ident>)', SQLBuilder.CALLEE) },
		});
	}
}


module.exports = {
	definition: rowToJson,
 	description: 'Specifies the PostgreSQL `row_to_json` Function.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-json.html',
	},
	examples: {
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.$select({
							profile: { $rowToJson: 'people' },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT row_to_json(people) AS profile FROM people',
						values: {}
					}
				}
			}
		}
	}
}
