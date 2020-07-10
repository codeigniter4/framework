'use strict';

class limit extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Number: { syntax: this.Syntax('<value-param>') },
			String: {
				syntax: {
					ALL: this.Syntax('<value>', this.syntaxHook)
				}
			}
		});
	}

	syntaxHook(query, idententifier) {
		// pg is the only rdbms which knowns
		// the keyword ALL for LIMIT
		if (this.isPostgreSQL()) return query;

		if (query === 'ALL') {
			if (this.isMySQL() || this.isMariaDB()) {
				query = Number.MAX_SAFE_INTEGER; //from the mysqldoc's 18446744073709552000
			} else if (this.isSQLite()) {
				query = -1;
			}
		}
		return query;
	}
}

module.exports = {
	definition: limit,
	description: 'Specifies the `LIMIT` clause for the `SELECT` Statement.',
 	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/limit/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html#SQL-LIMIT',
		SQLite: 'https://sqlite.org/lang_select.html#limitoffset'
	},
	examples: {
		Number: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								$from: 'people',
								$limit: 10
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT * FROM people LIMIT $1',
						values: {
							$1: 10
						}
					}
				}
			}
		},
		String: {
			ALL: {
				"Basic Usage": function(sql){
					return {
						supportedBy: {
							PostgreSQL: true
						},
						test: function(){
							let query = sql.build({
								$select: {
									$from: 'people',
									$limit: 'ALL'
								}
							});
							return query;
						},
						expectedResults: {
							sql: 'SELECT * FROM people LIMIT ALL',
							values: {}
						}
					}
				},
				"MySQL turns $limit: 'ALL' to LIMIT 9007199254740991": function(sql) {
					return {
						supportedBy: {
							MySQL: true,
							MariaDB: true
						},
						test: function(){
							let query = sql.build({
								$select: {
									$from: 'people',
									$limit: 'ALL'
								}
							});
							return query;
						},
						expectedResults: {
							sql: 'SELECT * FROM people LIMIT 9007199254740991',
							values: {}
						}
					}
				},
				"SQLite turns $limit: 'ALL' to LIMIT -1": function(sql) {
					return {
						supportedBy: {
							SQLite: true
						},
						test: function(){
							let query = sql.build({
								$select: {
									$from: 'people',
									$limit: 'ALL'
								}
							});
							return query;
						},
						expectedResults: {
							sql: 'SELECT * FROM people LIMIT -1',
							values: {}
						}
					}
				}
			}
		}
	}
}
