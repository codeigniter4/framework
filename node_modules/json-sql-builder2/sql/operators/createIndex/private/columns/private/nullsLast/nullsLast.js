'use strict';

class nullsLast extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('LAST')
				}
			}
		});
	}
}

module.exports = {
	definition: nullsLast,
	description: 'Specifies the `NULLS LAST` option for the `ORDER BY` clause on each column.',
 	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		Oracle: 'https://docs.oracle.com/javadb/10.8.3.0/ref/rrefsqlj13658.html',
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
										first_name: { $asc: true, $nullsFirst: true },
										age: { $desc: true, $nullsLast: true }
									}
								}
							});

							return query;
						},
						expectedResults: {
							sql: 'SELECT * FROM people ORDER BY last_name ASC, first_name ASC NULLS FIRST, age DESC NULLS LAST',
							values: {}
						}
					}
				}
			}
		}
	}
}
