'use strict';

class columns extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-ident>') },
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') }
				}
			}
		});
	}
}

module.exports = {
	definition: columns,
	description: `Specifies the columns Helper for the \`ON CONFLICT\` clause.`,
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-insert.html#SQL-ON-CONFLICT',
	},
	examples: {
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$insert({ $table: 'people',
							$documents: {
								staff_no: 1,
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							},
							$onConflict: {
								$columns: 'staff_no',
								$doNothing: true
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON CONFLICT (staff_no) DO NOTHING',
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
		Array: {
			eachItemOf: {
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({ $table: 'people',
									$documents: {
										staff_no: 1,
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$onConflict: {
										$columns: ['staff_no', 'last_name'],
										$doNothing: true
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON CONFLICT (staff_no, last_name) DO NOTHING',
								values:{
									$1: 1,
									$2: 'John',
									$3: 'Doe',
									$4: 40
								}
							}
						}
					}
				}
			}
		}
	}
}
