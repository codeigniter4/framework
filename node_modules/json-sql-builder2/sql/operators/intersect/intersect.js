'use strict';

class intersect extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		const ARRAY_SYNTAX = `
[$select]
	{[$union]}
	{[$intersect]}
	{[$except]}
[  INTERSECT ... ]`;

		const OBJECT_SYNTAX = `
{*INTERSECT [$distinct]*}
{*INTERSECT ALL [$all]*}
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
	definition: intersect,
 	description: 'Specifies the `INTERSECT` Operator.',
	supportedBy: {
		MariaDB: 'https://mariadb.com/kb/en/library/intersect/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/queries-union.html',
		SQLite: 'https://sqlite.org/syntax/compound-select-stmt.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/queries004.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql'
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.$intersect([
							{ $select: { first_name: true, $from: 'people' } },
							{ $union: { $all: [
								{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('K') } } },
								{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('A') } } }
							]}}
						]);
					},
					expectedResults: {
						sql: '(SELECT first_name FROM people) INTERSECT ((SELECT last_name FROM people WHERE last_name LIKE $1) UNION ALL (SELECT last_name FROM people WHERE last_name LIKE $2))',
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
								return sql.$intersect([
									{ $select: { first_name: true, $from: 'people' } },
									{ $select: { last_name: true, $from: 'people' } }
								]);
							},
							expectedResults: {
								sql: '(SELECT first_name FROM people) INTERSECT (SELECT last_name FROM people)',
								values: {}
							}
						}
					},
					'Nested unions': function(sql) {
						return {
							test: function() {
								return sql.$intersect([
									{ $select: { first_name: true, $from: 'people' } },
									{ $union: {
										$distinct: [
											{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('K') } } },
											{ $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('A') } } }
										]
									}}
								]);
							},
							expectedResults: {
								sql: '(SELECT first_name FROM people) INTERSECT ((SELECT last_name FROM people WHERE last_name LIKE $1) UNION (SELECT last_name FROM people WHERE last_name LIKE $2))',
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
