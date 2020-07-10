'use strict';

// CONCAT(mycol, 'foo')
// CONCAT(mycol1, mycol2, 'foo')

class concat extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		if (sql.isSQLite()) {
			this.Types({
				Array: { syntax: this.Syntax('<value-param>[  || ... ]') },
			});
		} else {
			this.Types({
				Array: { syntax: this.Syntax('CONCAT(<value-param>[ , ... ])') },
			});
		}
	}

	callee(...args){
		let argResults = [],
			// the last arg is always the identifier injected by the builder itself
			identifier = args.pop();
		this.forEach(args, (arg, index) => {
			if (this.isPrimitive(arg)) {
				argResults.push(this.addValue(arg));
			}
			if (this.isFunction(arg)) {
				argResults.push(arg(identifier));
			}
			if (this.isPlainObject(arg)) {
				argResults.push(this._queryUnknown({ $: arg }));
			}
		});
		return 'CONCAT(' + argResults.join(', ') + ')';
	}
}

module.exports = {
	definition: concat,
	description: `Specifies the \`CONCAT\` function.`,
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		Array: {
			"Basic Usage": function(sql) {
				return {
					supportedBy: {
						MySQL: true,
						MariaDB: true,
						PostgreSQL: true,
						Oracle: true,
						SQLServer: true
					},
					test: function(){
						return sql.$select({
							people_name: { $concat: ['~~first_name', ' ', '~~last_name'] },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT CONCAT(first_name, $1, last_name) AS people_name FROM people',
						values:{
							$1: ' ',
						}
					}
				}
			},
			"Usage of CONCAT as Function": function(sql) {
				return {
					supportedBy: {
						MySQL: true,
						MariaDB: true,
						PostgreSQL: true,
						Oracle: true,
						SQLServer: true
					},
					test: function(){
						return sql.$select({
							people_name: sql.concat('~~first_name', ' ', '~~last_name'),
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT CONCAT(first_name, $1, last_name) AS people_name FROM people',
						values:{
							$1: ' ',
						}
					}
				}
			},
			"Usage with INLINE-SQL": function(sql) {
				return {
					supportedBy: {
						MySQL: true,
						MariaDB: true,
						PostgreSQL: true,
						Oracle: true,
						SQLServer: true
					},
					test: function(){
						return sql.$select({
							people_name: { $concat: ["__:COALESCE(first_name, '')", ' ', '~~last_name'] },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT CONCAT(COALESCE(first_name, \'\'), $1, last_name) AS people_name FROM people',
						values:{
							$1: ' ',
						}
					}
				}
			},
			"Support for SQLLite": function(sql) {
				return {
					supportedBy: {
						SQLite: true
					},
					test: function(){
						return sql.$select({
							greeting: { $concat: ['Hello', ' ', '~~first_name'] },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT $1 || $2 || first_name AS greeting FROM people',
						values:{
							$1: 'Hello',
							$2: ' ',
						}
					}
				}
			}
		}
	}
}
