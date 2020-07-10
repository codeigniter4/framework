'use strict';

class jsonObjectAgg extends SQLBuilder.SQLOperator {
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
		return 'json_object_agg(' + result + ')';
	}
}


module.exports = {
	definition: jsonObjectAgg,
 	description: 'Specifies the PostgreSQL `json_object_agg` aggregation Function.',
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
									services: { $jsonObjectAgg: { '~~servicedata.key': '~~servicedata.value' } },
									$from: {
										data: {
											$select: {
												services: { $jsonBuildObject: { '~~users_loginservices.service_id': '~~users_loginservices.data' } },
												$from: 'users_loginservices'
											}
										},
										servicedata: {
											$jsonEach: '~~data.services'
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT json_object_agg(servicedata.key, servicedata.value) AS services FROM (SELECT json_build_object(users_loginservices.service_id, users_loginservices.data) AS services FROM users_loginservices) AS data, json_each(data.services) AS servicedata',
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
									jobj: { $jsonObjectAgg: { '~~jsondata.key': '~~jsondata.value' } },
									$from: {
										jsondata: {
											$jsonEach: {
												$jsonBuildObject: {
													a: 'foo',
													b: 123
												}
											}
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT json_object_agg(jsondata.key, jsondata.value) AS jobj FROM json_each(json_build_object($1, $2, $3, $4)) AS jsondata',
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
