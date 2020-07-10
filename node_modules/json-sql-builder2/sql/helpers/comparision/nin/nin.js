'use strict';

class nin extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: { syntax: this.Syntax('NOT IN (<value-param>[ , ... ])', SQLBuilder.CALLEE) },
			Object: { syntax: this.Syntax('NOT IN (<value>)') },
			Function: { syntax: this.Syntax('NOT IN (<value>)') }
		});
	}
}

module.exports = {
	definition: nin,
	description: 'Specifies the comparision `NOT IN` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/comparison-operators.html#function_not-in',
		MariaDB: 'https://mariadb.com/kb/en/library/not-in/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-comparisons.html',
		SQLite: 'https://sqlite.org/lang_expr.html#in_op',
		Oracle: 'https://docs.oracle.com/html/A95915_01/sqopr.htm#sthref149',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/language-elements/in-transact-sql'
	},
	examples: {
		Array: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $nin: ['John', 'Jane', 'Joe'] }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name NOT IN ($1, $2, $3)',
						values: {
							$1: 'John',
							$2: 'Jane',
							$3: 'Joe'
						}
					}
				}
			},
			"Usage as SQL-Function": function(sql){
				return {
					test: function(){
						let averageAge = 45;

						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: sql.nin(['John', 'Jane', 'Joe'])
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name NOT IN ($1, $2, $3)',
						values: {
							$1: 'John',
							$2: 'Jane',
							$3: 'Joe'
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									people_id: {
										$nin: {
											$select: {
												people_id: 1,
												$from: 'people_skills',
												$where: {
													skill_points: { $gt: 100 }
												}
											}
										}
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE people_id NOT IN (SELECT people_id FROM people_skills WHERE skill_points > $1)',
						values: {
							$1: 100
						}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									people_id: {
										$nin: sql.select('people_id', {
											$from: 'people_skills',
											$where: {
												skill_points: { $gt: 100 }
											}
										})
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE people_id NOT IN (SELECT people_id FROM people_skills WHERE skill_points > $1)',
						values: {
							$1: 100
						}
					}
				}
			}
		}
	}
}
