'use strict';

class distinct extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		const ARRAY_SYNTAX = `
[$select]
	{[$union]}
	{[$intersect]}
	{[$except]}
[  EXCEPT ... ]`;

		this.Types({
			Array: {
				eachItemOf: {
					Object: { syntax: this.Syntax(ARRAY_SYNTAX) }
				}
			}
		});
	}

	postBuild(result) {
		return '(' + result + ')';
	}
}

module.exports = {
	definition: distinct,
 	description: 'Specifies the `EXCEPT [DISTINCT]` Operator.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/union.html',
		MariaDB: 'https://mariadb.com/kb/en/library/union',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/queries-union.html',
		SQLite: 'https://sqlite.org/syntax/compound-select-stmt.html',
		//Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/queries004.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-union-transact-sql'
	},
	examples: {
		Array: {
			eachItemOf: {
				Object: {
					'Basic Usage': function(sql) {
						return {
							test: function() {
								return sql.$except({
									$distinct: [
										{ $select: { first_name: true, $from: 'people' } },
										{ $select: { last_name: true, $from: 'people' } }
									]
								});
							},
							expectedResults: {
								sql: '((SELECT first_name FROM people) EXCEPT (SELECT last_name FROM people))',
								values: {}
							}
						}
					},
					'Nested unions': function(sql) {
						return {
							test: function() {
								return sql.$union([
									{ $select: { first_name: true, $from: 'people' } },
									{ $except: {
										$distinct: [
											{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('K') } } },
											{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('A') } } }
										]
									}}
								]);
							},
							expectedResults: {
								sql: '(SELECT first_name FROM people) UNION ((SELECT last_name FROM people WHERE last_name LIKE $1) EXCEPT (SELECT last_name FROM people WHERE last_name LIKE $2))',
								values: {
									$1: 'K%',
									$2: 'A%'
								}
							}
						}
					}
				}
			}
		}
	}
}
