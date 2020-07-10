'use strict';

class jsonbObjectAgg extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Primitive: { syntax: this.Syntax('<key-param>, <value-param>[ , ... ]') },
					Object: { syntax: this.Syntax('<key-param>, <value>[ , ... ]') },
				}
			}
		});
	}

	postBuild(result, type, itemType) {
		return 'jsonb_object_agg(' + result + ')';
	}
}


module.exports = {
	definition: jsonbObjectAgg,
 	description: 'Specifies the PostgreSQL `jsonb_object_agg` aggregation Function.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/10/static/functions-aggregate.html',
	},
	examples: {
		Object: {
			eachItemOf: {
				Primitive: {
					"Basic Usage": function(sql) {
						return {
							test: function() {
								return sql.$select({
									services: { $jsonbObjectAgg: { '~~servicedata.key': '~~servicedata.value' } },
									$from: {
										data: {
											$select: {
												services: { $jsonbBuildObject: { '~~users_loginservices.service_id': '~~users_loginservices.data' } },
												$from: 'users_loginservices'
											}
										},
										servicedata: {
											$jsonbEach: '~~data.services'
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT jsonb_object_agg(servicedata.key, servicedata.value) AS services FROM (SELECT jsonb_build_object(users_loginservices.service_id, users_loginservices.data) AS services FROM users_loginservices) AS data, jsonb_each(data.services) AS servicedata',
								values: {}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function() {
								return sql.$select({
									jobj: { $jsonbObjectAgg: { '~~jsondata.key': '~~jsondata.value' } },
									$from: {
										jsondata: {
											$jsonbEach: {
												$jsonbBuildObject: {
													a: 'foo',
													b: 123
												}
											}
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT jsonb_object_agg(jsondata.key, jsondata.value) AS jobj FROM jsonb_each(jsonb_build_object($1, $2, $3, $4)) AS jsondata',
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
	}
}
