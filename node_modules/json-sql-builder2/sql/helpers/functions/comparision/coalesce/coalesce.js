'use strict';

// COALESCE(mycol, 'foo')
// COALESCE(mycol1, mycol2, 'foo')

class coalesce extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: { syntax: this.Syntax('COALESCE(<value-param>[ , ... ])') },
			Object: {
				eachItemOf: {
					Primitive: { syntax: this.Syntax('COALESCE(<key-ident>, <value-param>)') },
				}
			}
		});
	}

	callee(...args){
		let argResults = [],
			maxArgs = args.length;
		this.forEach(args, (arg, index) => {
			if (index + 1 == maxArgs) return;

			if (this.isPrimitive(arg)) {
				argResults.push(this.addValue(arg));
			}
		});
		return 'COALESCE(' + argResults.join(', ') + ')';
	}
}

module.exports = {
	definition: coalesce,
	description: `Specifies the \`COALESCE\` function.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/insert.html',
		MariaDB: 'https://mariadb.com/kb/en/library/insert/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-conditional.html'
	},
	examples: {
		Array: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							description: { $coalesce: ['~~first_name', '~~last_name', 'Unknown'] },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT COALESCE(first_name, last_name, $1) AS description FROM people',
						values:{
							$1: 'Unknown',
						}
					}
				}
			},
			"Usage with INLINE-SQL": function(sql) {
				return {
					test: function(){
						return sql.$select({
							description: { $coalesce: ["__:CONCAT(first_name, ' ', last_name)", '~~last_name', 'People without Name'] },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT COALESCE(CONCAT(first_name, \' \', last_name), last_name, $1) AS description FROM people',
						values:{
							$1: 'People without Name',
						}
					}
				}
			}
		},
		Object: {
			eachItemOf: {
				Primitive: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$select({
									people_name: { $coalesce: { last_name: 'Unknown' } },
									$from: 'people'
								});
							},
							expectedResults: {
								sql: 'SELECT COALESCE(last_name, $1) AS people_name FROM people',
								values:{
									$1: 'Unknown',
								}
							}
						}
					},
					"Usage as Object with INLINE-SQL": function(sql) {
						return {
							test: function(){
								return sql.$select({
									people_name: { $coalesce: { "__:CONCAT(last_name, ' ', first_name)": 'Unknown' } },
									$from: 'people'
								});
							},
							expectedResults: {
								sql: 'SELECT COALESCE(CONCAT(last_name, \' \', first_name), $1) AS people_name FROM people',
								values:{
									$1: 'Unknown',
								}
							}
						}
					}
				}
			}
		}
	}
}
