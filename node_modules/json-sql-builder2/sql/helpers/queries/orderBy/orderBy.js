'use strict';

class orderBy extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		const OBJECT_SYNTAX =
`<key-ident>{ ASC[$asc]}{ DESC[$desc]}
	{ NULLS [$nullsFirst]}-->(Oracle,PostgreSQL)
	{ NULLS [$nullsLast]}-->(Oracle,PostgreSQL)
	[ , ... ]`;
		this.Types({
			Object: {
				eachItemOf: {
					Boolean: {
						syntax: {
							true: this.Syntax('<key-ident> ASC[ , ... ]'),
							false: this.Syntax('<key-ident> DESC[ , ... ]')
						}
					},
					Number: {
						syntax: {
							1: this.Syntax('<key-ident> ASC[ , ... ]'),
							[-1]: this.Syntax('<key-ident> DESC[ , ... ]'),
							0: this.Syntax('')
						}
					},
					String: {
						syntax: {
							ASC: this.Syntax('<key-ident> ASC[ , ... ]'),
							DESC: this.Syntax('<key-ident> DESC[ , ... ]'),
						}
					},
					Object: { syntax: this.Syntax(OBJECT_SYNTAX) },
				}
			},
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident> ASC[ , ... ]') },
				}
			},
			String: { syntax: this.Syntax('<value-ident> ASC') }
		});

		this.registerPrivateHelper('asc');
		this.registerPrivateHelper('desc');
		this.registerPrivateHelper('nullsFirst');
		this.registerPrivateHelper('nullsLast');
	}
}

module.exports = {
	definition: orderBy,
	description: `Specifies the \`ORDER BY\` clause for the \`SELECT\` Statement.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql'
	},
	examples: {
		Object: {
			eachItemOf: {
				Boolean: {
					true: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: 'people',
											$orderBy: {
												last_name: true,
												age: false
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people ORDER BY last_name ASC, age DESC',
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
											$from: 'people',
											$orderBy: {
												last_name: true,
												age: false
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people ORDER BY last_name ASC, age DESC',
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
											$from: 'people',
											$orderBy: {
												last_name: 1,
												age: 0
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people ORDER BY last_name ASC',
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
											$from: 'people',
											$orderBy: {
												last_name: 1,
												age: -1
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people ORDER BY last_name ASC, age DESC',
									values:{}
								}
							}
						}
					},
					[-1]: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: 'people',
											$orderBy: {
												last_name: 1,
												age: -1
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people ORDER BY last_name ASC, age DESC',
									values:{}
								}
							}
						}
					}
				},
				String: {
					ASC: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: 'people',
											$orderBy: {
												last_name: 'ASC',
												age: 'DESC'
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people ORDER BY last_name ASC, age DESC',
									values:{}
								}
							}
						}
					},
					DESC: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: 'people',
											$orderBy: {
												last_name: 'ASC',
												age: 'DESC'
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people ORDER BY last_name ASC, age DESC',
									values:{}
								}
							}
						}
					}
				},
				Object: {
					'Basic Usage': function(sql) {
						return {
							supportedBy: {
								Oracle: true,
								PostgreSQL: true,
							},
							test: function() {
								let query = sql.build({
									$select: {
										$from: 'people',
										$orderBy: {
											last_name: true,
											first_name: { $asc: true, $nullsFirst: true },
											age: { $desc: true, $nullsLast: true }
										}
									}
								});

								return query;
							},
							expectedResults: {
								sql: 'SELECT * FROM people ORDER BY last_name ASC, first_name ASC NULLS FIRST, age DESC NULLS LAST',
								values: {}
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
										$from: 'people',
										$orderBy: ['last_name', 'first_name']
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM people ORDER BY last_name ASC, first_name ASC',
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
								$from: 'people',
								$orderBy: 'last_name'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people ORDER BY last_name ASC',
						values:{}
					}
				}
			}
		}
	}
}
