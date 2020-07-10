'use strict';

const SYNTAX =
`CREATE{ UNIQUE[$unique]} INDEX
	{ CONCURRENTLY[$concurrently]}-->(PostgreSQL)
	{ IF NOT EXISTS [$ine] | [$ifNotExists]}
	{ [$name]} ON <$table>
	{ USING [$using]}-->(PostgreSQL,MariaDB,MySQL)
	 (<$columns>)
	{ WITH ([$storageParameters])}
	{ TABLESPACE [$tablespace]}-->(PostgreSQL)
	{ WHERE [$where]}
`;

class createIndex extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE)
			}
		});

		this.$unique = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$concurrently = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$ine = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		// add a synonym for ine = ifNotExists
		this.$ifNotExists = this.$ine;
		this.$name = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$table = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$tablespace = new SQLBuilder.SQLPredefined.StringIdentifier(sql);

		this.registerPrivateHelper('using');
		this.registerPrivateHelper('columns');
		this.registerPrivateHelper('storageParameters');
	}
}

module.exports = {
	definition: createIndex,
 	description: 'Specifies the `CREATE INDEX` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/create-index.html',
		MariaDB: 'https://mariadb.com/kb/en/library/create-index/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-createindex.html',
		SQLite: 'https://sqlite.org/lang_createview.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_5010.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/create-index-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createIndex({
							$unique: true,
							$table: 'people',
							$columns: {
								first_name: true,
								last_name: true
							}
						});
					},
					expectedResults: {
						sql: 'CREATE UNIQUE INDEX ON people (first_name ASC, last_name ASC)',
						values: {},
					}
				}
			}
		}
	}
}
