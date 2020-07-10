'use strict';

class values extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: {
				eachItemOf: {
					Primitive: { syntax: this.Syntax('<value-param>[ , ... ]') },
					Object: { syntax: this.Syntax('<value>[ , ... ]') },
					Function: { syntax: this.Syntax('<value>[ , ... ]') }
				}
			}
		});

		this.Keyword('DEFAULT');
	}

	preBuild(query, identifier){
		// check for the Keyword default
		// $insert: {
		// 		$table: 'people',
		// 		$documents: {
		// 			first_name: 'foo',
		// 			last_name: 'bar',
		// 			age: sql.DEFAULT,
		// 			...
		//		}
		// 	}
		//
		// INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, DEFAULT);
		//
		this.forEach(query, (value, index) => {
			if (value === this.DEFAULT) {
				query[index] = '__:DEFAULT';
			}
		});

		return query;
	}
}

module.exports = {
	definition: values,
	description: `Specifies the \`VALUES\` clause for the \`INSERT INTO\` Statement`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/insert.html',
		MariaDB: 'https://mariadb.com/kb/en/library/insert/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-insert.html',
		SQLite: 'https://sqlite.org/lang_insert.html',
		Oracle: 'https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql'
	},
	examples: {
		Array: {
			eachItemOf: {
				Primitive: {
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
					},
					"Using Keyword DEFAULT": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$columns: ['first_name', 'last_name', 'age'],
									$values: ['John', 'Doe', sql.DEFAULT]
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
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function() {
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										hobbies: { $json: ['football', 'basketball'] }
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, hobbies) VALUES ($1, $2, $3)',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: '["football","basketball"]'
								}
							}
						}
					}
				},
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function() {
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										foo: sql.concat('Hello ', 'John!')
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, foo) VALUES ($1, $2, CONCAT($3, $4))',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 'Hello ',
									$4: 'John!'
								}
							}
						}
					}
				}
			}
		}
	}
}
