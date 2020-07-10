'use strict';

class startsWith extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('LIKE <value-param>') }
		});
	}

	preBuild(query, identifier){
		if (this.isString(query)) {
			query += '%';
		}
		return query
	}

	callee(value){
		if (this.isString(value)) {
			value += '%';
			return 'LIKE ' + this.addValue(value);
		}

		throw new Error('Parameter value on using function startsWith must always be a String.');
	}
}

module.exports = {
	definition: startsWith,
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
									first_name: { $startsWith: 'J' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name LIKE $1',
						values: {
							$1: 'J%'
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
									first_name: sql.startsWith('J')
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name LIKE $1',
						values: {
							$1: 'J%'
						}
					}
				}
			}
		}
	}
}
