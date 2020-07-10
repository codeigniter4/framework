'use strict';

class like extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('LIKE <value-param>', SQLBuilder.CALLEE) }
		});
	}
}

module.exports = {
	definition: like,
	description: 'Specifies the comparision `LIKE` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html#operator_like',
		MariaDB: 'https://mariadb.com/kb/en/library/like/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-matching.html',
		SQLite: 'https://sqlite.org/lang_expr.html#like',
		Oracle: 'https://docs.oracle.com/cd/B13789_01/server.101/b10759/conditions016.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/language-elements/like-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $like: 'J___n%' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name LIKE $1',
						values: {
							$1: 'J___n%'
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
									first_name: sql.like('J___n%')
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name LIKE $1',
						values: {
							$1: 'J___n%'
						}
					}
				}
			}
		}
	}
}
