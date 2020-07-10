'use strict';

class columns extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
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
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') }
				}
			}
		});
	}
}

module.exports = {
	definition: columns,
	description: `Specifies the \`$columns\` Helper for the \`INSERT INTO\` Statement`,
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
			eachItemOf: {
				Boolean: {
					true: {
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
						}
					},
					false: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$columns: {
											first_name: true,
											last_name: false,
											age: false
										},
										$values: ['John']
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name) VALUES ($1)',
									values:{
										$1: 'John'
									}
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
									return sql.$insert({
										$table: 'people',
										$columns: {
											first_name: 1,
											last_name: 0,
											age: 0
										},
										$values: ['John']
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name) VALUES ($1)',
									values:{
										$1: 'John'
									}
								}
							}
						}
					},
					1: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$columns: {
											first_name: 1,
											last_name: 1,
											age: 1
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
						}
					}
				}
			} // eachItemOf
		}, // Object
		Array: {
			eachItemOf: {
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$columns: ['first_name', 'last_name', 'age'],
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
					}
				}
			}
		}
	}
}
