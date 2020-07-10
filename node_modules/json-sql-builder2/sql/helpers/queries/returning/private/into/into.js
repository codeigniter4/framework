'use strict';

class into extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Boolean: {
						syntax: {
							true: this.Syntax('<key-ident>[ , ... ]'),
							false: this.Syntax('')
						}
					},
					Number: {
						syntax: {
							1: this.Syntax('<key-ident>[ , ... ]'),
							0: this.Syntax('')
						}
					}
				}
			},
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
				}
			},
			String: { syntax: this.Syntax('<value-ident>') }
		});
	}
}

module.exports = {
	definition: into,
	description: 'Specifies the `INTO` clause to use with `RETURNING` clause.',
 	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/dml-returning.html',
		Oracle: '',
		MariaDB: ''
	},
	examples: {
		Object: {
			eachItemOf: {
				Boolean: {
					true: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: true,
											$into: {
												myid: true
											}
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id INTO myid',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					},
					false: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: true,
											first_name: false,
											last_name: false,
											age: false,
											$into: {
												var_people_id: true,
												var_first_name: false,
												var_last_name: false,
												var_age: false
											}
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id INTO var_people_id',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					}
				},
				Number: {
					0: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: 1,
											first_name: 0,
											last_name: 0,
											age: 0,
											$into: {
												var_people_id: 1,
												var_first_name: 0
											}
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id INTO var_people_id',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					},
					1: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: 1,
											first_name: 1,
											last_name: 1,
											age: 1,
											$into: {
												var_people_id: 1,
												var_first_name: 1,
												var_last_name: 1,
												var_age: 1
											}
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, first_name, last_name, age INTO var_people_id, var_first_name, var_last_name, var_age',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					}
				}
			} // eachItemOf
		}, // Object
		Array: {
			eachItemOf: {
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$returning: {
										$columns: ['people_id', 'first_name', 'last_name'],
										$into: ['var_people_id', 'var_first_name', 'var_last_name']
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, first_name, last_name INTO var_people_id, var_first_name, var_last_name',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40
								}
							}
						}
					}
				}
			}
		},
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							},
							$returning: { people_id: 1, $into: 'myid' }
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id INTO myid',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: 40
						}
					}
				}
			}
		}
	}
}
