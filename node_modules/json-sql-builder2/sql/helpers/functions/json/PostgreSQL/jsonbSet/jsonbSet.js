'use strict';

class jsonbSet extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax('jsonb_set(<$target>, <$path>, <$value>{, [$createMissing]})', SQLBuilder.CALLEE)
			}
		});

		//this.$target = new SQLBuilder.SQLPredefined.Expression(sql);
		this.$path = new SQLBuilder.SQLPredefined.StringValueParam(sql);

		this.registerPrivateHelper('target');
		this.registerPrivateHelper('value');
	}
}


module.exports = {
	definition: jsonbSet,
 	description: 'Specifies the `jsonb_set` function.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-json.html#FUNCTIONS-JSON-PROCESSING-TABLE',
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.$update({
							$table: 'people',
							$set: {
								data: {
									$jsonbSet: {
										$target: '~~data',
										$path: '{profile,firstName}',
										$value: 'John'
									}
								}
							},
							$where: {
								people_id: 456
							}
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET data = jsonb_set(data, $1, $2) WHERE people_id = $3',
						values: {
							$1: '{profile,firstName}',
							$2: '"John"',
							$3: 456
						}
					}
				}
			}
		}
	}
}
