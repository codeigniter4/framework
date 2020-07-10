'use strict';

class offset extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Number: { syntax: this.Syntax('<value-param>') },
		});
	}

	link(query){
		// check for LIMIT and OFFSET
		// can't use OFFSET WITHOUT LIMIT
		if (this.isMySQL() || this.isMariaDB()) {
			if (query.$offset && !query.$limit) {
				throw new Error(`Error. Can't use '$offset' without '$limit'.`);
			}
		}
	}
}

module.exports = {
	definition: offset,
	description: 'Specifies the `OFFSET` clause for the `SELECT` Statement.',
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
								$limit: 10,
								$offset: 100
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT * FROM people LIMIT $1 OFFSET $2',
						values: {
							$1: 10,
							$2: 100
						}
					}
				}
			}
		}
	}
}
