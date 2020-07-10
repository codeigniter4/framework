'use strict';

class except extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		const ARRAY_SYNTAX = `
[$select]
	{[$union]}
	{[$intersect]}
	{[$except]}
[  EXCEPT ... ]`;

		const OBJECT_SYNTAX = `
{*EXCEPT [$distinct]*}
{*EXCEPT ALL [$all]*}
	{ ORDER BY [$orderBy]}
	{ LIMIT [$limit]}
	{ OFFSET [$offset]}`;

		this.Types({
			Object: { syntax: this.Syntax(OBJECT_SYNTAX) },
			Array: {
				eachItemOf: {
					Object: { syntax: this.Syntax(ARRAY_SYNTAX) }
				}
			}
		});

		this.registerPrivateHelper('distinct');
		this.registerPrivateHelper('all');
	}
}

module.exports = {
	definition: except,
 	description: 'Specifies the `EXCEPT` Operator.',
	supportedBy: {
		MariaDB: 'https://mariadb.com/kb/en/library/except/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/queries-union.html',
		SQLite: 'https://sqlite.org/syntax/compound-select-stmt.html',
		//Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/queries004.htm', Oracle uses "MINUS"
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql'
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.$union({
							$distinct: [
								{ $select: { first_name: true, $from: 'people' } },
								{ $except: {
									$all: [
										{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('K') } } },
										{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('A') } } }
									]
								}},
							],
							$orderBy: 'first_name'
						});
					},
					expectedResults: {
						sql: '((SELECT first_name FROM people) UNION ((SELECT last_name FROM people WHERE last_name LIKE $1) EXCEPT ALL (SELECT last_name FROM people WHERE last_name LIKE $2))) ORDER BY first_name ASC',
						values: {
							$1: 'K%',
							$2: 'A%'
						}
					}
				}
			}
		},
		Array: {
			eachItemOf: {
				Object: {
					'Basic Usage': function(sql) {
						return {
							test: function() {
								return sql.$except([
									{ $select: { first_name: true, $from: 'people' } },
									{ $select: { last_name: true, $from: 'people' } }
								]);
							},
							expectedResults: {
								sql: '(SELECT first_name FROM people) EXCEPT (SELECT last_name FROM people)',
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
