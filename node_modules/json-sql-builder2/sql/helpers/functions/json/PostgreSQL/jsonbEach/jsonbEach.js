'use strict';

class jsonbEach extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('jsonb_each(<value-param>)', SQLBuilder.CALLEE) },
			Object: { syntax: this.Syntax('jsonb_each(<value>)') },
		});
	}
}


module.exports = {
	definition: jsonbEach,
 	description: 'Specifies the PostgreSQL `jsonb_each` Function.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-json.html',
	},
	examples: {
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.$select({
							$from: {
								jsondata: {
									$jsonbEach: JSON.stringify({
										a: 'foo',
										b: 'bar'
									})
								}
							},
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM jsonb_each($1) AS jsondata',
						values: {
							$1: '{"a":"foo","b":"bar"}'
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.$select({
							$from: {
								jsondata: {
									$jsonbEach: {
										$jsonbBuildObject: {
											a: 'foo',
											b: 123
										}
									}
								}
							},
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM jsonb_each(jsonb_build_object($1, $2, $3, $4)) AS jsondata',
						values: {
							$1: 'a',
							$2: 'foo',
							$3: 'b',
							$4: 123
						}
					}
				}
			}
		}
	}
}
