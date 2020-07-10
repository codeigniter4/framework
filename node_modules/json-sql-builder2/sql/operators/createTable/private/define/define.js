'use strict';

const SYNTAX = `
[$column]
[$constraint]

[ , ... ]`;

class define extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Object: { syntax: this.Syntax(SYNTAX) },
					Function: { syntax: this.Syntax(`<value>[ , ... ]`) },
				}
			}
		});
	}
}

module.exports = {
	definition: define,
 	description: 'Specifies the Definition of columns and constraints for the `$createTable` Operator.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/create-table.html',
		MariaDB: 'https://mariadb.com/kb/en/library/create-table/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-createtable.html',
		SQLite: 'https://sqlite.org/lang_createtable.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_7002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql'
	},
	examples: {
		Object: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$createTable({
									$table: 'my_people_table',
									$define: {
										people_id: { $column: { $type: 'INT', $default: 0 } },
										first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										bio: { $column: { $type: 'TEXT' } },

										pk_people: { $constraint: { $primary: true, $columns: 'people_id' } }
									}
								});
							},
							expectedResults: {
								sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id))',
								values: {
									$1: 0
								},
								PostgreSQL: {
									// PostgreSQL did'nt support parameterized queries for CREATE TABLE ...
									sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id))',
									values: {},
								}
							}
						}
					}
				},
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$createTable({
									$table: 'my_people_table',
									$define: {
										people_id: sql.column(sql.INTEGER, { $default: 0 }),
										first_name: sql.column(sql.VARCHAR, { $size: 50, $notNull: true }),
										last_name: sql.column(sql.VARCHAR, { $size: 50, $notNull: true }),
										bio: sql.column(sql.TEXT),

										pk_people: sql.constraint({
											$primary: true,
											$columns: 'people_id'
										})
									}
								});
							},
							expectedResults: {
								sql: 'CREATE TABLE my_people_table (people_id INTEGER DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id))',
								values: {
									$1: 0
								},
								PostgreSQL: {
									// PostgreSQL did'nt support parameterized queries for CREATE TABLE ...
									sql: 'CREATE TABLE my_people_table (people_id INTEGER DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id))',
									values: {},
								}
							}
						}
					}
				}
			}
		}
	}
}
