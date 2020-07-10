'use strict';

class onDuplicateKeyUpdate extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Primitive: { syntax: this.Syntax('<key-ident> = <value-param>[ , ... ]') },
					Object: { syntax: this.Syntax('<key-ident> = [$values][$select][ , ... ]') },
					Function: { syntax: this.Syntax('<key-ident> = <value>[ , ... ]') }
				}
			}
		});

		this.registerPrivateHelper('values');
	}
}

module.exports = {
	definition: onDuplicateKeyUpdate,
	description: `Specifies the Helper for the \`ON DUPLICATE KEY UPDATE\` clause used by the \`INSERT INTO\` Statement.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/insert.html',
		MariaDB: 'https://mariadb.com/kb/en/library/insert/',
	},
	examples: {
		Object: {
			eachItemOf: {
				Primitive: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										staff_no: 1,
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$onDuplicateKeyUpdate: {
										first_name: 'John',
										last_name: 'Doe',
										age: 99
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON DUPLICATE KEY UPDATE first_name = $5, last_name = $6, age = $7',
								values:{
									$1: 1,
									$2: 'John',
									$3: 'Doe',
									$4: 40,
									$5: 'John',
									$6: 'Doe',
									$7: 99
								}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										staff_no: 1,
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$onDuplicateKeyUpdate: {
										first_name: { $values: 'first_name' },
										last_name: { $values: 'last_name' },
										age: { $values: 'age' }
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON DUPLICATE KEY UPDATE first_name = VALUES(first_name), last_name = VALUES(last_name), age = VALUES(age)',
								values:{
									$1: 1,
									$2: 'John',
									$3: 'Doe',
									$4: 40
								}
							}
						}
					}
				},
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										staff_no: 1,
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$onDuplicateKeyUpdate: {
										staff_no: sql.select({ new_stuff_no: { $: { $max: 'staff_no', $add: 1 } } }, {
											$from: 'people'
										}),
										first_name: { $values: { $coalesce: { first_name: '"Unknown"' } } },
										last_name: { $values: 'last_name' },
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON DUPLICATE KEY UPDATE staff_no = (SELECT MAX(staff_no) + $5 AS new_stuff_no FROM people), first_name = VALUES(COALESCE(first_name, $6)), last_name = VALUES(last_name)',
								values:{
									$1: 1,
									$2: 'John',
									$3: 'Doe',
									$4: 40,
									$5: 1,
									$6: '"Unknown"'
								}
							}
						}
					}
				}
			}
		}
	}
}
