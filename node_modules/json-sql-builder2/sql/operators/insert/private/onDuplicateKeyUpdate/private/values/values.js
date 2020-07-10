'use strict';

class values extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('VALUES(<value-ident>)') },
			Object: { syntax: this.Syntax('VALUES(<value>)') },
			Function: { syntax: this.Syntax('VALUES(<value>)') }
		});
	}
}

module.exports = {
	definition: values,
	description: `Specifies the \`VALUES\` function for the \`ON DUPLICATE KEY UPDATE\` clause.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/insert.html',
		MariaDB: 'https://mariadb.com/kb/en/library/insert/',
	},
	examples: {
		String: {
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
								staff_no: {
									$select: {
										new_stuff_no: { $: { $max: 'staff_no', $add: 1 } },
										$from: 'people'
									}
								},
								first_name: { $values: sql.coalesce('~~first_name', '"Unknown"') },
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
