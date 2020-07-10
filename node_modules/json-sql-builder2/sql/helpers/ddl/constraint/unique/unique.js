'use strict';

class unique extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('UNIQUE'),
					false:this.Syntax('')
				}
			},
			Object: { syntax: this.Syntax(`UNIQUE (<$columns>)`, SQLBuilder.CALLEE) }
		});
	}
}

module.exports = {
	definition: unique,
 	description: 'Specifies the `UNIQUE` clause for a single Column or Constraint.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/constraints.html',
		MariaDB: 'https://mariadb.com/kb/en/library/constraint/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/ddl-constraints.html',
		SQLite: 'https://sqlite.org/lang_createtable.html#constraints',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql'
	},
	examples: {
		Boolean: {
			true: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$createTable({
								$table: 'my_people_table',
								$define: {
									people_id: { $column: { $type: 'INT', $notNull: true, $primary: true } },
									first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: true } },
									last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: true } },
									bio: { $column: { $type: 'TEXT' } }
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE my_people_table (people_id INT NOT NULL PRIMARY KEY, first_name VARCHAR(50) NOT NULL UNIQUE, last_name VARCHAR(50) NOT NULL UNIQUE, bio TEXT)',
							values: {}
						}
					}
				}
			},
			false: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$createTable({
								$table: 'my_people_table',
								$define: {
									people_id: { $column: { $type: 'INT', $notNull: true } },
									first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: false } },
									last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: false } },
									bio: { $column: { $type: 'TEXT' } }
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE my_people_table (people_id INT NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT)',
							values: {}
						}
					}
				}
			}
		},
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

								uk_people: { $constraint: { $unique: { $columns: ['first_name', 'last_name'] } } }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT uk_people UNIQUE (first_name, last_name))',
						values: {
							$1: 0
						},
						PostgreSQL: {
							sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT uk_people UNIQUE (first_name, last_name))',
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
								people_id: { $column: { $type: 'INT', $default: 0 } },
								first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								bio: { $column: { $type: 'TEXT' } },

								pk_people: { $constraint: sql.primary('people_id') },
								uk_people: { $constraint: sql.unique(['first_name', 'last_name']) }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id), CONSTRAINT uk_people UNIQUE (first_name, last_name))',
						values: {
							$1: 0
						},
						PostgreSQL: {
							sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id), CONSTRAINT uk_people UNIQUE (first_name, last_name))',
							values: {},
						}
					}
				}
			}
		}
	}
}
