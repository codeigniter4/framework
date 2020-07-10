'use strict';

class desc extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('-->Accepted->Return:')
				}
			}
		});
	}
}

module.exports = {
	definition: desc,
	description: 'Specifies the `DESC` option for the `ORDER BY` clause on each column.',
 	supportedBy: {
		MariaDB: 'https://mariadb.com/kb/en/library/order-by/',
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		Oracle: 'https://docs.oracle.com/javadb/10.8.3.0/ref/rrefsqlj13658.html',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql'
	},
	examples: {
		Boolean: {
			true: {
				'Basic Usage': function(sql) {
					return {
						test: function() {
							let query = sql.build({
								$select: {
									$from: 'people',
									$orderBy: {
										last_name: true,
										first_name: { $asc: true },
										age: { $desc: true }
									}
								}
							});

							return query;
						},
						expectedResults: {
							sql: 'SELECT * FROM people ORDER BY last_name ASC, first_name ASC, age DESC',
							values: {}
						}
					}
				}
			}
		}
	}
}
