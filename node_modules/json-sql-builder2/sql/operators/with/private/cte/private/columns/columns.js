'use strict';

class columns extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Boolean: {
						syntax: {
							true: this.Syntax('<key-ident>[ , ... ]'),
							false: this.Syntax('')
						}
					},
					Number: {
						syntax: {
							1: this.Syntax('<key-ident>[ , ... ]'),
							0: this.Syntax('')
						}
					},
					String: { syntax: this.Syntax('<key-ident> AS <value-ident>[ , ... ]') },
					Object: { syntax: this.Syntax('<value> AS <identifier>[ , ... ]') },
					Function: { syntax: this.Syntax('<value> AS <key-ident>[ , ... ]') }
				}
			},
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
					Object: { syntax: this.Syntax('<value> AS <key-ident>[ , ... ]') }
				}
			},
			String: { syntax: this.Syntax('<value-ident>') }
		});
	}
}

module.exports = {
	definition: columns,
	description: `Specifies the \`$columns\` Helper for the \`CTE, WITH\` clause.

> :bulb: **Shortcut**
>
> Another way to define your column-list is to write all column-identifiers directly inside the \`$cte: { ... }\` Helper like:
>
> \`\`\`javascript
> $cte: {
>     my_col_1: 1,
>     my_col_2: 1,
>     $into: ['myvar1', 'myvar2'],
>     ...
> }
> \`\`\`
>
`,
	supportedBy: {
		MariaDB: 'https://mariadb.com/kb/en/library/with/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/queries-with.html',
		SQLite: 'https://sqlite.org/syntax/with-clause.html',
		Oracle: 'https://docs.oracle.com/database/121/SQLRF/statements_10002.htm#SQLRF01702',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql'
	},
	examples: {
		Object: {
			eachItemOf: {
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$columns: {
											first_name: true,
											last_name: true,
											total_skills: sql.select({ total: { $count: 'skillname' } }, {
												$from: 'people_skills',
												$where: {
													'people.people_id': '~~people_skills.people_id'
												}
											})
										},
										$from: 'people',
										$where: {
											age: { $gte: 18 }
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT first_name, last_name, (SELECT COUNT(skillname) AS total FROM people_skills WHERE people.people_id = people_skills.people_id) AS total_skills FROM people WHERE age >= $1',
								values: {
									$1: 18
								}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$columns: {
											first_name: true,
											last_name: true,
											top_skill: {
												$select: { skill: 'top_skill',
													$from: 'people_skills',
													$where: {
														'people.people_id': '~~people_skills.people_id',
														'people_skills.is_top': 1
													}
												}
											}
										},
										$from: 'people',
										$where: {
											age: { $gte: 18 }
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT first_name, last_name, (SELECT skill AS top_skill FROM people_skills WHERE people.people_id = people_skills.people_id AND people_skills.is_top = $1) AS top_skill FROM people WHERE age >= $2',
								values: {
									$1: 1,
									$2: 18
								}
							}
						}
					}
				},
				Boolean: {
					true: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$columns: {
												first_name: true,
												last_name: true
											},
											$from: 'people'
										}
									});
								},
								expectedResults: {
									sql: 'SELECT first_name, last_name FROM people',
									values:{}
								}
							}
						}
					},
					false: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$columns: {
												people_id: true,
												first_name: false,
												last_name: false
											},
											$from: 'people'
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people_id FROM people',
									values:{}
								}
							}
						}
					}
				},
				Number: {
					0: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$columns: {
												first_name: 1,
												last_name: 1
											},
											$from: 'people'
										}
									});
								},
								expectedResults: {
									sql: 'SELECT first_name, last_name FROM people',
									values:{}
								}
							}
						}
					},
					1: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$columns: {
												people_id: 1,
												first_name: 0,
												last_name: 0
											},
											$from: 'people'
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people_id FROM people',
									values:{}
								}
							}
						}
					}
				},
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$columns: {
											first_name: 'fn',
											last_name: 'ln'
										},
										$from: 'people'
									}
								});
							},
							expectedResults: {
								sql: 'SELECT first_name AS fn, last_name AS ln FROM people',
								values:{}
							}
						}
					}
				}
			} // eachItemOf
		}, // Object
		Array: {
			eachItemOf: {
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$columns: ['first_name', 'last_name'],
										$from: 'people'
									}
								});
							},
							expectedResults: {
								sql: 'SELECT first_name, last_name FROM people',
								values:{}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$columns: [
											{ total_people: { $count: '*' } },
										],
										$from: 'people'
									}
								});
							},
							expectedResults: {
								sql: 'SELECT COUNT(*) AS total_people FROM people',
								values:{}
							}
						}
					}
				}
			}
		},
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.build({
							$select: {
								$columns: 'id',
								$from: 'people'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT id FROM people',
						values:{}
					}
				}
			}
		}
	}
}
