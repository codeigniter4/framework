'use strict';

class jsonbAgg extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('jsonb_agg(<value-ident>)', SQLBuilder.CALLEE) },
			Object: { syntax: this.Syntax('jsonb_agg(<value>)') },
		});
	}
}


module.exports = {
	definition: jsonbAgg,
 	description: 'Specifies the PostgreSQL `jsonb_agg` aggregation Function.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/10/static/functions-aggregate.html',
	},
	examples: {
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.$select({
							people_id: 1,
							emails: { $jsonbAgg: 'address' },
							$from: 'people_emails',
							$groupBy: 'people_id'
						});
					},
					expectedResults: {
						sql: 'SELECT people_id, jsonb_agg(address) AS emails FROM people_emails GROUP BY people_id',
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
							emails: {
								$select: {
									emails: {
										$jsonbAgg: {
											$jsonbBuildObject: {
												address: '~~people_emails.address'
											}
										}
									},
									$from: 'people_emails',
									$where: {
										'people.id': '~~people_emails.people_id'
									}
								}
							},
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT (SELECT jsonb_agg(jsonb_build_object($1, people_emails.address)) AS emails FROM people_emails WHERE people.id = people_emails.people_id) AS emails FROM people',
						values: {
							$1: 'address'
						}
					}
				}
			}
		}
	}
}
