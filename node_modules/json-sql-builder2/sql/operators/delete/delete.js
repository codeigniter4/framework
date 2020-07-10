'use strict';

const SYNTAX =
`DELETE{ [$table]}-->(MariaDB,MySQL,SQLServer)
	{ FROM <$from>}
	{ [$join]}-->(MariaDB,MySQL,SQLServer)
	{ USING [$using]}-->(PostgreSQL)
	{ WHERE [$where]}
{ ORDER BY [$orderBy]}-->(MariaDB,MySQL,SQLite)
{ LIMIT [$limit]}-->(MariaDB,MySQL,SQLite)
{ OFFSET [$offset]}-->(MariaDB,MySQL,SQLite)
{ RETURNING [$returning]}-->(Oracle,PostgreSQL,MariaDB)`;

class $delete extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE)
			}
		});

		this.$table = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$from = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
	}
}

module.exports = {
	definition: $delete,
 	description: 'Specifies the Operator for the `DELETE` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/delete.html',
		MariaDB: 'https://mariadb.com/kb/en/library/delete/',
		PostgreSQL: 'https://www.postgresql.org/docs/10/static/sql-delete.html',
		SQLite: 'https://sqlite.org/lang_insert.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_8005.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/delete-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$delete({
							$from: 'people',
							$where: {
								people_id: 234
							}
						});
					},
					expectedResults: {
						sql: 'DELETE FROM people WHERE people_id = $1',
						values:{
							$1: 234
						}
					}
				}
			},
			"JOIN tables on DELETE Statement": function(sql) {
				return {
					supportedBy: {
						MariaDB: true,
						MySQL: true,
						SQLServer: true
					},
					test: function(){
						return sql.$delete({
							$table: 'hobbies',
							$from: 'people',
							$join: {
								hobbies: { $innerJoin: { $table: 'people_hobbies', $on: { 'people.id': '~~hobbies.people_id' } } }
							},
							$where: {
								'hobbies.hobby': 'Football'
							}
						});
					},
					expectedResults: {
						sql: 'DELETE hobbies FROM people INNER JOIN people_hobbies AS hobbies ON people.id = hobbies.people_id WHERE hobbies.hobby = $1',
						values:{
							$1: 'Football'
						}
					}
				}
			},
			"Using ORDER BY, LIMIT on DELETE Statement": function(sql) {
				return {
					supportedBy: {
						MariaDB: true,
						MySQL: true,
						SQLite: true
					},
					test: function(){
						return sql.$delete({
							$from: 'people',
							$where: {
								'last_name': sql.startsWith('K')
							},
							$orderBy: ['last_name', 'first_name'],
							$limit: 1
						});
					},
					expectedResults: {
						sql: 'DELETE FROM people WHERE last_name LIKE $1 ORDER BY last_name ASC, first_name ASC LIMIT $2',
						values:{
							$1: 'K%',
							$2: 1
						}
					}
				}
			},
			"Using RETURNING clause on DELETE Statement": function(sql) {
				return {
					supportedBy: {
						Orcale: true,
						PostgreSQL: true,
						MariaDB: true
					},
					test: function(){
						return sql.$delete({
							$from: 'people',
							$where: {
								'last_name': sql.startsWith('K')
							},
							$returning: '*'
						});
					},
					expectedResults: {
						sql: 'DELETE FROM people WHERE last_name LIKE $1 RETURNING *',
						values:{
							$1: 'K%'
						}
					}
				}
			},
			"Using USING clause on DELETE Statement": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function(){
						return sql.$delete({
							$from: 'films',
							$using: 'producers',
							$where: {
								'producer_id' : '~~producers.id',
								'producers.name': 'foo'
							}
						});
					},
					expectedResults: {
						sql: 'DELETE FROM films USING producers WHERE producer_id = producers.id AND producers.name = $1',
						values:{
							$1: 'foo'
						}
					}
				}
			}
		}
	}
}
