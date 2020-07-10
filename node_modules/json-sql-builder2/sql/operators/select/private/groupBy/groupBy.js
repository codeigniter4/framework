'use strict';

class groupBy extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		let definedTypes = {
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
					}
				}
			},
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
				}
			},
			String: { syntax: this.Syntax('<value-ident>') }
		};

		// the ROLLUP, CUBE and GROUPING SETS option only
		// supported by SQLServer, PostgreSQL and Oracle
		if (sql.isSQLServer() || sql.isPostgreSQL() || sql.isOracle()) {
			definedTypes.Object.eachItemOf.Object = { syntax: this.Syntax('{ROLLUP ([$rollup])}{CUBE ([$cube])}{GROUPING SETS ([$groupingSets])}[ , ... ]') };

			this.registerPrivateHelper('rollup');
			this.registerPrivateHelper('cube');
			this.registerPrivateHelper('groupingSets');
		}

		this.Types(definedTypes);
	}
}

module.exports = {
	definition: groupBy,
	description: `Specifies the \`GROUP BY\` clause for the \`SELECT\` Statement.`,
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql'
	},
	examples: {
		Object: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							supportedBy: {
								SQLServer: true,
								PostgreSQL: true,
								Oracle: true
							},
							test: function(){
								return sql.build({
									$select: {
										state: 1,
										city: 1,
										total_sales: sql.sum('sales'),

										$from: 'sales_pipline',
										$groupBy: {
											myRollupGroup: {
												$rollup: {
													state: 1,
													city: 1
												}
											}
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT state, city, SUM(sales) AS total_sales FROM sales_pipline GROUP BY ROLLUP (state, city)',
								values:{}
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
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: true
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
									values: {}
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
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: true,
												state: false
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
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
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: 1,
												state: 0
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
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
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: 1
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
									values:{}
								}

							}
						}
					}
				},
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
										city: 1,
										state: 1,
										total_salary_by_city: sql.sum('salary'),
										$from: 'people',
										$groupBy: ['city', 'state']
									}
								});
							},
							expectedResults: {
								sql: 'SELECT city, state, SUM(salary) AS total_salary_by_city FROM people GROUP BY city, state',
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
								city: 1,
								total_salary_by_city: sql.sum('salary'),
								$from: 'people',
								$groupBy: 'city'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
						values:{}
					}
				}
			}
		}
	}
}
