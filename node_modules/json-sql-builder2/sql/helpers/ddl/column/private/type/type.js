'use strict';

class type extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: {
				syntax: this.Syntax('<value>')
			}
		});

		// some useful standard data types
		// that will be turned to a string on preBuild
		this.Keyword('VARCHAR');
		this.Keyword('CHAR');
		this.Keyword('TEXT');
		this.Keyword('MEDIUMTEXT');
		this.Keyword('LONGTEXT');

		this.Keyword('NUMERIC');
		this.Keyword('DECIMAL');
		this.Keyword('INTEGER');
		this.Keyword('INT');
		this.Keyword('SMALLINT');
		this.Keyword('TINYINT');
		this.Keyword('BIGINT');
		this.Keyword('BIT');
		this.Keyword('BOOLEAN');

		this.Keyword('SINGLE');
		this.Keyword('DOUBLE');
		this.Keyword('REAL');

		this.Keyword('DATE');
		this.Keyword('TIME');
		this.Keyword('DATETIME');
		this.Keyword('TIMESTAMP');
		this.Keyword('TIMESTAMPZ');

		this.Keyword('JSON');
		this.Keyword('JSONB');
	}

	preBuild(query) {
		if (this.isString(query)) return query;

		// checking Keywords and return String
		if (query === this.VARCHAR) return 'VARCHAR';
		if (query === this.CHAR) return 'CHAR';
		if (query === this.TEXT) return 'TEXT';
		if (query === this.MEDIUMTEXT) return 'MEDIUMTEXT';
		if (query === this.LONGTEXT) return 'LONGTEXT';

		if (query === this.NUMERIC) return 'NUMERIC';
		if (query === this.DECIMAL) return 'DECIMAL';
		if (query === this.INTEGER) return 'INTEGER';
		if (query === this.INT) return 'INT';
		if (query === this.SMALLINT) return 'SMALLINT';
		if (query === this.TINYINT) return 'TINYINT';
		if (query === this.BIGINT) return 'BIGINT';
		if (query === this.BIT) return 'BIT';
		if (query === this.BOOLEAN) return 'BOOLEAN';

		if (query === this.SINGLE) return 'SINGLE';
		if (query === this.DOUBLE) return 'DOUBLE';
		if (query === this.REAL) return 'REAL';

		if (query === this.DATE) return 'DATE';
		if (query === this.TIME) return 'TIME';
		if (query === this.DATETIME) return 'DATETIME';
		if (query === this.TIMESTAMP) return 'TIMESTAMP';
		if (query === this.TIMESTAMPZ) return 'TIMESTAMPZ';

		if (query === this.JSON) return 'JSON';
		if (query === this.JSONB) return 'JSONB';

		return null;
	}
}

module.exports = {
	definition: type,
 	description: 'Specifies the Data Type of a single Column to use on `$define` with `$createTable` Operator.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/data-types.html',
		MariaDB: 'https://mariadb.com/kb/en/library/data-types/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/datatype.html',
		SQLite: 'https://www.sqlite.org/datatype3.html',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CNCPT012',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$table: 'my_people_table',
							$define: {
								people_id: { $column: { $type: 'INT', $default: 0 } },
								first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								last_name: { $column: { $type: sql.VARCHAR, $size: 50, $notNull: true } },
								bio: { $column: { $type: sql.TEXT } },
								weight: { $column: { $type: sql.NUMERIC, $size: { $precision: 3, $scale: 2 } } },

								pk_people: { $constraint: { $primary: true, $columns: 'people_id' } }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, weight NUMERIC(3, 2), CONSTRAINT pk_people PRIMARY KEY (people_id))',
						values: {
							$1: 0
						},
						PostgreSQL: {
							sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, weight NUMERIC(3, 2), CONSTRAINT pk_people PRIMARY KEY (people_id))',
							values: {},
						}
					}
				}
			}
		}
	}
}
