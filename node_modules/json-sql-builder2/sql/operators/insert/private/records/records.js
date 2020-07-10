'use strict';

const ValuesHelper = require('../values/values.js').definition;

class records extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Object: { syntax: this.Syntax('(<$values>)[ , ... ]') }
				}
			},
			Array: {
				eachItemOf: {
					Object: { syntax: this.Syntax('(<$values>)[ , ... ]') }
				}
			}
		});

		this.$values = new ValuesHelper(sql);
	}
}

module.exports = {
	definition: records,
	description: `Specifies the \`VALUES\` clause for the \`INSERT INTO\` Statement to insert multiple records at the same time.`,
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
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$columns: ['first_name', 'last_name', 'age'],
									$records: {
										1: { $values: ['John', 'Doe', 27] },
										2: { $values: ['Jane', 'Doe', 29] },
										3: { $values: ['Michael', 'Goodman', 65] },
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9)',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 27,
									$4: 'Jane',
									$5: 'Doe',
									$6: 29,
									$7: 'Michael',
									$8: 'Goodman',
									$9: 65,
								}
							}
						}
					}
				}
			}
		},
		Array: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$columns: ['first_name', 'last_name', 'age'],
									$records: [
										{ $values: ['John', 'Doe', 27] },
										{ $values: ['Jane', 'Doe', 29] },
										{ $values: ['Michael', 'Goodman', 65] },
									]
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9)',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 27,
									$4: 'Jane',
									$5: 'Doe',
									$6: 29,
									$7: 'Michael',
									$8: 'Goodman',
									$9: 65,
								}
							}
						}
					}
				}
			}
		}
	}
}
