'use strict';

const SYNTAX =
`INSERT INTO{ <$table>}
	{ ([$columns])}
		{ VALUES ([$values])}
		{ VALUES [$records]}
		{ [$select]}
	{[$documents]}

{ ON DUPLICATE KEY UPDATE [$onDuplicateKeyUpdate]}-->(MariaDB,MySQL)
{* ON CONFLICT [$onConflict] *}-->(PostgreSQL)
{ RETURNING [$returning]}-->(PostgreSQL,Oracle,MariaDB)`;

class insert extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE)
			}
		});

		this.$table = new SQLBuilder.SQLPredefined.StringIdentifier(sql);

		this.registerPrivateHelper('columns');
		this.registerPrivateHelper('values');
		this.registerPrivateHelper('records');
		this.registerPrivateHelper('documents');
		this.registerPrivateHelper('onDuplicateKeyUpdate');
		this.registerPrivateHelper('onConflict');
	}
}

module.exports = {
	definition: insert,
 	description: 'Specifies the Operator for the `INSERT` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/insert.html',
		MariaDB: 'https://mariadb.com/kb/en/library/insert/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-insert.html',
		SQLite: 'https://sqlite.org/lang_insert.html',
		Oracle: 'https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people',
							$columns: {
								first_name: true,
								last_name: true,
								age: true
							},
							$values: ['John', 'Doe', 40]
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3)',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: 40
						}
					}
				}
			},
			"Using $documents as shotcut for $columns, $values": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people_history',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people_history (first_name, last_name, age) VALUES ($1, $2, $3)',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: 40
						}
					}
				}
			},
			"Using Keyword DEFAULT": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								age: sql.DEFAULT
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, DEFAULT)',
						values:{
							$1: 'John',
							$2: 'Doe'
						}
					}
				}
			},
			"Using INSERT INTO SELECT": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people_history',
							$columns: {
								first_name: true,
								last_name: true,
								age: true
							},
							$select: {
								first_name: true,
								last_name: true,
								age: true,
								$from: 'people',
								$where: {
									age: { $gte: 40 }
								}
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people_history (first_name, last_name, age) SELECT first_name, last_name, age FROM people WHERE age >= $1',
						values:{
							$1: 40
						}
					}
				}
			}
		}
	}
}
