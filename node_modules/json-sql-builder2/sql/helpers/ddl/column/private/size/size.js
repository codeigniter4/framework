'use strict';

class size extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Number: { syntax: this.Syntax('<value>') },
			Object: { syntax: this.Syntax('<$precision>	{, [$scale]}') },
		});

		this.$precision = new SQLBuilder.SQLPredefined.NumberValue(sql);
		this.$scale = new SQLBuilder.SQLPredefined.NumberValue(sql);
	}
}

module.exports = {
	definition: size,
 	description: 'Specifies the Size of a single Column-Type to use on `$define` with `$createTable` Operator.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/create-table.html',
		MariaDB: 'https://mariadb.com/kb/en/library/create-table/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-createtable.html',
		SQLite: 'https://sqlite.org/lang_createtable.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_7002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql'
	},
	examples: {
		Number: {
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
								weight: { $column: {$type: sql.NUMERIC, $size: { $precision: 3, $scale: 2 } } }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, weight NUMERIC(3, 2))',
						values: {
							$1: 0
						},
						PostgreSQL: {
							sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, weight NUMERIC(3, 2))',
							values: {},
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
								weight: { $column: {$type: sql.NUMERIC, $size: { $precision: 3, $scale: 2 } } }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, weight NUMERIC(3, 2))',
						values: {
							$1: 0
						},
						PostgreSQL: {
							sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, weight NUMERIC(3, 2))',
							values: {},
						}
					}
				}
			}
		}
	}
}
