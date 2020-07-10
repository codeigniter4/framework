'use strict';

class jsonbBuildObject extends SQLBuilder.SQLOperator {
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
		return 'jsonb_build_object(' + result + ')';
	}
}


module.exports = {
	definition: jsonbBuildObject,
 	description: 'Specifies the PostgreSQL `jsonb_build_object` Function.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-json.html',
	},
	examples: {
		Object: {
			eachItemOf: {
				Primitive: {
					"Basic Usage": function(sql) {
						return {
							test: function() {
								return sql.$select({
									emails: {
										$select: {
											emails: {
												$jsonAgg: {
													$jsonbBuildObject: {
														address: '~~people_emails.address',
														verified: { $i: 'people_emails.verified' },
														checked: true
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
								sql: 'SELECT (SELECT json_agg(jsonb_build_object($1, people_emails.address, $2, people_emails.verified, $3, $4)) AS emails FROM people_emails WHERE people.id = people_emails.people_id) AS emails FROM people',
								values: {
									$1: 'address',
									$2: 'verified',
									$3: 'checked',
									$4: true
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
									emails: {
										$select: {
											emails: {
												$jsonAgg: {
													$jsonbBuildObject: {
														address: '~~people_emails.address',
														verified: { $i: 'people_emails.verified' },
														checked: true
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
								sql: 'SELECT (SELECT json_agg(jsonb_build_object($1, people_emails.address, $2, people_emails.verified, $3, $4)) AS emails FROM people_emails WHERE people.id = people_emails.people_id) AS emails FROM people',
								values: {
									$1: 'address',
									$2: 'verified',
									$3: 'checked',
									$4: true
								}
							}
						}
					}
				}
			}
		}
	}
}
