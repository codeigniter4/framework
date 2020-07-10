'use strict';

class lte extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Primitive: { syntax: this.Syntax('<= <value-param>', SQLBuilder.CALLEE) },
			Object: { syntax: this.Syntax('<= <value>') },
			Function: { syntax: this.Syntax('<= <value>') }
		});
	}
}

module.exports = {
	definition: lte,
	description: 'Specifies the comparision **less than or equal** `<=` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/func-op-summary-ref.html',
		MariaDB: 'https://mariadb.com/kb/en/library/less-than-or-equal/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-comparison.html',
		SQLite: 'https://sqlite.org/lang_expr.html',
		Oracle: 'https://docs.oracle.com/html/A95915_01/sqopr.htm#sthref149',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/language-elements/less-than-transact-sql'
	},
	examples: {
		Primitive: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									age: { $lte: 18 }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE age <= $1',
						values: {
							$1: 18
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
									age: sql.lte(averageAge)
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE age <= $1',
						values: {
							$1: 45
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						let avgerageAge = {
							$select: {
								age: { $avg: 'age' },
								$from: 'people'
							}
						};

						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									age: { $lte: avgerageAge }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE age <= (SELECT AVG(age) AS age FROM people)',
						values: {}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						let myAvarageAgeFunction = sql.select({ age: { $avg: 'age' } }, {
							$from: 'people'
						});

						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									age: { $lte: myAvarageAgeFunction }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE age <= (SELECT AVG(age) AS age FROM people)',
						values: {}
					}
				}
			}
		}
	}
}
