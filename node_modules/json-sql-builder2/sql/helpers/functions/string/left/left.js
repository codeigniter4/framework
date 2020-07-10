'use strict';

// give the new Class the name of the Helper or Operator
class left extends SQLBuilder.SQLHelper {
	constructor(sql){
		// always call the construtor of SQLHelper
		super(sql);

		// declare the possible types that can be used
		this.Types({
			// $select: { first_name: { $left: 1 } }
			// The value of $left is a Number
			// <key-ident> = "first_name"
			// <value-param> = 1
			Number: { syntax: this.Syntax('LEFT(<key-ident>, <value-param>)') },

			// $select: { first_name: { $left: { $str: '~~first_name', $len: 1 } } }
			// The value of $left is an Object: $left: { $str: '~~first_name', $len: 1 }
			// <$str> = "~~first_name"
			// <$len> = 1
			Object: { syntax: this.Syntax('LEFT(<$str>, <$len>)', SQLBuilder.CALLEE) },
		});

		// define or register each Operator or Helper defined in the Syntax
		this.$str = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$len = new SQLBuilder.SQLPredefined.NumberValueParam(sql);

		// if the Helper is more complex you can write the Helper as private helper
        // for this create a folder "private" and a file "private/my-private-helper/my-private-helper.js"
        // and register this new Helper with
        //this.registerPrivateHelper('my-private-helper');
	}
}

// export the new $left Helper
module.exports = {
	// exports the class-definition (this is used by SQLBuilder to setup the new Helper)
	definition: left,

	// add some description for the auto-generation of the docs README.MD
	description: `Specifies the \`LEFT\` function.`,

	// define the SQL-dialects that support this new Helper
	// Each dialect listed by supported by can use this Helper. If you pass a string
	// that starts with 'http://' or 'https://' inside the docs it automatically creates a link
	// to the official docs
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_left',
		MariaDB: 'https://mariadb.com/kb/en/library/left/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.1/static/functions-string.html',
		// SQLite did not support the left() function at this time
		// Oracle did not support the left() function at this time
		// instead we can use SUBSTR( string, start_position [, length ] ) defined as new SQLHelper
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/functions/left-transact-sql'
	},

	// Always add at least "Basic Usage" as test and example for each Type you
	// have declared by the new class using this.Types() inside constructor
	examples: {
		Number: {
			// Basic Usage is the Name of the Test and must always declared as function(sql)
			// Parameter sql will be passed as instance of the SQLBuilder
			"Basic Usage": function(sql) {
				// the function always returns an Object {test: function() {}, expectedResults: {} [, supportedBy: { PostgreSQL: true, MySQL: true, ... }] }
				return {
					// write your test and return always the result
					test: function(){
						return sql.$select({
							first_name: { $left: 1 }
						});
					},
					// define the expected results of the test as Object with
					// sql as String and values as Object. If there are no values generated, so define an empty Object values: {}
					expectedResults: {
						sql: 'SELECT LEFT(first_name, $1) AS first_name',
						values: {
							$1: 1
						}
					}
				}
			}
		},
		Object: {
			// Basic Usage is the Name of the Test and must always declared as function(sql)
			// where sql is the instance of the SQLBuilder
			"Basic Usage": function(sql) {
				// the function always returns an Object {test: function() {}, expectedResults: {} [, supportedBy: { PostgreSQL: true, MySQL: true, ... }] }
				return {
					// write your test and return always the result
					test: function(){
						return sql.$select({
							test: { $left: { $str: 'Hello World', $len: 5 } }
						});
					},
					// define the expected results of the test as Object with
					// sql as String and values as Object. If there are no values generated, so define an empty Object values: {}
					expectedResults: {
						sql: 'SELECT LEFT($1, $2) AS test',
						values: {
							$1: 'Hello World',
							$2: 5
						}
					}
				}
			},
			// Optionally add some more Tests and Examples with a different name:
			"Usage of LEFT as Function": function(sql) {
				return {
					test: function(){
						return sql.$select({
							// The helper can directly used as native js-function because
							// we setup the Syntax for Type "Object" with SQLBuilder.CALLEE parameter as second (see above)
							test: sql.left('Hello World', 5)
						});
					},
					expectedResults: {
						sql: 'SELECT LEFT($1, $2) AS test',
						values:{
							$1: 'Hello World',
							$2: 5
						}
					}
				}
			},
			"A simple playground to show some possibilities around our new left-Helper": function(sql) {
				return {
					test: function(){
						// declare some shortcuts for functions
						// you can archive the same by creating SQLBuilder instance
						// with option "attachGlobals: true", then SQLBuilder will
						// attach each Keyword and Function in UPPERCASE to the globals
						const
							CMP = sql.cmp,
							LEFT = sql.left,
							EQ = sql.eq,
							CONCAT = sql.concat,
							identifier = sql.i;

						return sql.$select({
							// CONCAT(LEFT(first_name, 1), '. ', last_name) AS people_name
							people_name: {
								$concat: [
									{ first_name: { $left: 1 } },
									'. ',
									{ $i: 'last_name' }
								]
							},
							// another way to get the same result... is using functions:
							people_name1: CONCAT(LEFT(identifier('first_name'), 1), '. ', '~~last_name'),
							// or mixing all together
							people_name2: CONCAT({ first_name: { $left: 1 } }, '. ', '~~last_name'),

							$from: 'people',

							$where: {
								$or: [
									{ $: { first_name: { $left: 1 }, $eq: { last_name: { $left: 1 } } } },
									CMP({ first_name: { $left: 1 } }, '=', { $left: { $str: '~~last_name', $len: 1 } }),
									CMP(LEFT('~~first_name', 1), '=', LEFT('~~last_name', 1)),
									EQ(LEFT('~~first_name', 1), LEFT('~~last_name', 1)),
								]
							}
						});
					},
					// define the expected results of the test as Object with
					// sql as String and values as Object. If there are no values generated, so define an empty Object values: {}
					expectedResults: {
						sql: 'SELECT CONCAT(LEFT(first_name, $1), $2, last_name) AS people_name, CONCAT(LEFT(first_name, $3), $4, last_name) AS people_name1, CONCAT(LEFT(first_name, $5), $6, last_name) AS people_name2 FROM people WHERE LEFT(first_name, $7) = LEFT(last_name, $8) OR LEFT(first_name, $9) = LEFT(last_name, $10) OR LEFT(first_name, $11) = LEFT(last_name, $12) OR LEFT(first_name, $13) = LEFT(last_name, $14)',
						values: {
							$1: 1,
							$2: '. ',
							$3: 1,
							$4: '. ',
							$5: 1,
							$6: '. ',

							$7: 1,
							$8: 1,
							$9: 1,
							$10: 1,
							$11: 1,
							$12: 1,
							$13: 1,
							$14: 1,
						}
					}
				}
			},
			"Play a little bit more to show the power of SQLBuilder": function(sql) {
				return {
					test: function(){
						// declare some shortcuts for functions
						// you can archive the same by creating SQLBuilder instance
						// with option "attachGlobals: true", then SQLBuilder will
						// attach each Keyword and Function in UPPERCASE to the globals
						/*const
							CMP = sql.cmp,
							LEFT = sql.left,
							EQ = sql.eq,
							CONCAT = sql.concat;*/

						// create a short wrapper for all your tables
						class Table {
							constructor(tableName, columns, options){
								this.tableName = tableName;

								sql.forEach(columns, (value, key) => {
									this[key] = sql.i(key);
								});

								if (options && options.createIfNotExists) {
									let createQuery = sql.$createTable({
										$table: tableName,
										$ine: true,
										$define: columns
									});

									// ... execute the createQuery here
								}
							}

							// support a select method
							find(where, options) {
								let query = {
									$select: {}
								}

								if (options.fields) query.$select.$columns = options.fields;
								if (options.sort) query.$select.$orderBy = options.sort;

								query.$select.$where = where;
								query.$select.$from = this.tableName;

								// return the sql-query or execute it directly and return the results
								return sql.build(query);
							}

							// add more methods like findOne, insert, update, remove
							// ...
						}

						// adding keywords to show the flexibility
						const NOT_NULL = { $notNull: true };
						const PRIMARY_KEY = { $primary: true };

						// create a instance of our people-Table
						const People = new Table('people', {
							people_id: { $column: { $type: 'INT', ...NOT_NULL, ...PRIMARY_KEY } },
							first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
							last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
							age: { $column: { $type: 'INT', $notNull: true, $default: 0 } }
						}, {
							createIfNotExists: true
						});

						// using the new People-table instance like:

						/* maybe insert some data...
						People.insert([
							{
								people_id: 1,
								first_name: 'John',
								last_name: 'Doe',
								age: 45
							}, {
								people_id: 2,
								first_name: 'Jane',
								last_name: 'Doe',
								age: 36
							} // ...
						])*/

						// find some peoples
						return People.find({
							last_name: { $startsWith: 'Doe' },
							age: { $gt: 18 }
						}, {
							// optional select specific fields if we don't like to use SELECT *
							fields: {
								people_id: 1,
								people_name: sql.concat(sql.left(People.first_name, 1), '. ', People.last_name),
								// or use CONCAT, LEFT if you attach them to the globals
								//people_name: CONCAT(LEFT(People.first_name, 1), '. ', People.last_name),
							},
							// do optional sorting (ORDER BY)
							sort: {
								age: 1 // 1=ASC, 0=DESC or user true | false
							}
						});
					},
					// define the expected results of the test as Object with
					// sql as String and values as Object. If there are no values generated, so define an empty Object values: {}
					expectedResults: {
						sql: 'SELECT people_id, CONCAT(LEFT(first_name, $1), $2, last_name) AS people_name FROM people WHERE last_name LIKE $3 AND age > $4 ORDER BY age ASC',
						values: {
							$1: 1,
							$2: '. ',
							$3: 'Doe%',
							$4: 18
						}
					}
				}
			}
		}
	}
}
