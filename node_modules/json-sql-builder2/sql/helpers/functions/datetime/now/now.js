'use strict';

class now extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('NOW()')
				}
			},
			Number: {
				syntax: {
					1: this.Syntax('NOW()')
				}
			},
		});
	}
}

module.exports = {
	definition: now,
	description: `Specifies the \`NOW\` function.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_now',
		// TODO: MariaDb implement optional precision param
		MariaDB: 'https://mariadb.com/kb/en/library/now/',
		PostgreSQL: 'https://www.postgresql.org/docs/11/functions-datetime.html',
	},
	examples: {
		Number: {
			1: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$select({
								foo: { $now: 1 }
							});
						},
						expectedResults: {
							sql: 'SELECT NOW() AS foo',
							values: {}
						}
					}
				}
			}
		},
		Boolean: {
			true: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$select({
								foo: { $now: true }
							});
						},
						expectedResults: {
							sql: 'SELECT NOW() AS foo',
							values: {}
						}
					}
				},
				"UPDATE using NOW() function": function(sql) {
					return {
						test: function(){
							return sql.$update({
								$table: 'my_table',
								$set: {
									foo: { $now: true }
								},
								$where: {
									id: 55
								}
							});
						},
						expectedResults: {
							sql: 'UPDATE my_table SET foo = NOW() WHERE id = $1',
							values: {
								$1: 55
							}
						}
					}
				}
			}
		},
	}
}
