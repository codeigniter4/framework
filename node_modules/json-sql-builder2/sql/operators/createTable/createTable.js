'use strict';

const SYNTAX =
`CREATE
	{ OR REPLACE[$orReplace]}-->(MariaDB)
	{ TEMPORARY[$temp]}
	{ UNLOGGED[$unlogged]}-->(PostgreSQL)
 TABLE {IF NOT EXISTS [$ine] | [$ifNotExists] }<$table> (<$define>)
	{ WITH ([$tableOptions])}-->(PostgreSQL,SQLServer)
	{ [$options]}-->(MariaDB,MySQL)
	{ TABLESPACE [$tablespace]}-->(PostgreSQL)
	`;

class createTable extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE)
			}
		});

		this.$orReplace = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$temp = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$unlogged = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$ine = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		// add a synonym for ine = ifNotExists
		this.$ifNotExists = this.$ine;

		this.$table = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$tablespace = new SQLBuilder.SQLPredefined.StringIdentifier(sql);

		this.registerPrivateHelper('define');

		if (sql.isPostgreSQL() || sql.isSQLServer()) {
			this.registerPrivateHelper('tableOptions');
		}

		if (sql.isMySQL() || sql.isMariaDB()) {
			this.registerPrivateHelper('options');
		}
	}
}

module.exports = {
	definition: createTable,
 	description: 'Specifies the `CREATE TABLE` Statement.',
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
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$temp: true,
							$table: 'my_temp_people_table',
							$define: {
								people_id: { $column: { $type: 'INT', $default: 0 } },
								first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								bio: { $column: { $type: 'TEXT' } }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TEMPORARY TABLE my_temp_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT)',
						values: {
							$1: 0
						},
						PostgreSQL: {
							sql: 'CREATE TEMPORARY TABLE my_temp_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT)',
							values: {}
						}
					}
				}
			}
		}
	}
}
