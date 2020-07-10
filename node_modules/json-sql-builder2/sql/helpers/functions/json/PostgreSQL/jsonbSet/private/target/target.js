'use strict';

class target extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Primitive: { syntax: this.Syntax('<value-param>') },
			Object: { syntax: this.Syntax('<value>') },
			Function: { syntax: this.Syntax('<value>') }
		});
	}

	link(query) {
		if (this.isFunction(query.$target)) return query;

		if (query.$target){
			let operatorDetected = false;
			// check if we got an object without an operator or helper
			// so we will turn the object also to a stringified object
			if (this.isPlainObject(query.$target)) {
				// check for operators or helpers
				this.forEach(query.$target, (value, key) => {
					if (this.isOperator(key)) {
						operatorDetected = true;
					}
				});
			}
			if (operatorDetected) return query;

			// turn each parameter to a String with JSON.stringify
			// excepted the queries started with ~~
			if (! (this.isString(query.$target) && query.$target.startsWith('~~'))) {
				query.$target = JSON.stringify(query.$target);
				// convert always to string, because Numeric data is a string.
				// and a "real" String will be quoted by the stringify in double quotes
				if (!this.isString(query.$target)) {
					query.$target = '' + query.$target;
				}
			}
		}
		return query;
	}
}


module.exports = {
	definition: target,
 	description: 'Specifies the `target` Parameter for the `jsonb_set` function.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-json.html#FUNCTIONS-JSON-PROCESSING-TABLE',
	},
	examples: {
		Primitive: {
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
		},
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.$update({
							$table: 'people',
							$set: {
								data: {
									$jsonbSet: {
										$target: {
											profile: {}
										},
										$path: '{profile}',
										$value: {
											firstName: 'John',
											lastName: 'Doe'
										}
									}
								}
							},
							$where: {
								people_id: 456
							}
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET data = jsonb_set($1, $2, $3) WHERE people_id = $4',
						values: {
							$1: '{"profile":{}}',
							$2: '{profile}',
							$3: '{"firstName":"John","lastName":"Doe"}',
							$4: 456
						}
					}
				}
			}
		},
		Function: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.$update({
							$table: 'people',
							$set: {
								data: {
									$jsonbSet: {
										$target: '~~data',
										$path: '{profile}',
										$value: sql.jsonbSet('~~data', '{profile,firstName}', 'John')
									}
								}
							},
							$where: {
								people_id: 456
							}
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET data = jsonb_set(data, $1, jsonb_set(data, $2, $3)) WHERE people_id = $4',
						values: {
							$1: '{profile}',
							$2: '{profile,firstName}',
							$3: '"John"',
							$4: 456
						}
					}
				}
			}
		}
	}
}
