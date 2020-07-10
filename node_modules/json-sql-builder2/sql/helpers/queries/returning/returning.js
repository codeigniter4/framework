'use strict';

class returning extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax('<$columns>{ INTO [$into]}') },
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
					Object: { syntax: this.Syntax('<value> AS <key-ident>[ , ... ]') }
				}
			},
			String: { syntax: this.Syntax('<value-ident>') }
		});

		this.registerPrivateHelper('columns');
		this.registerPrivateHelper('into');
	}

	link(query) {
		// add a shortcut for columns and move each
		// identifier - directly listed by $returning - to $columns
		if (this.isPlainObject(query.$returning) && !query.$returning.$columns) {
			query.$returning.$columns = {};
			this.forEach(query.$returning, (value, ident) =>{
				if (this.isIdentifier(ident)) {
					query.$returning.$columns[ident] = value;
					delete query.$returning[ident];
				}
			});
		}
	}
}

module.exports = {
	definition: returning,
	description: 'Specifies the `RETURNING` clause to use with any `INSERT`, `UPDATE` or `DELETE` Statement.',
 	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/dml-returning.html',
		MariaDB: '',
		Oracle: ''
	},
	examples: {
		Object: {
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
								total_likes: sql.coalesce('~~total_likes', 0)
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, COALESCE(total_likes, $4) AS total_likes',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: 40,
							$4: 0
						}
					}
				}
			},
			"Using optional INTO clause": function(sql) {
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
								total_likes: { $coalesce: ['~~total_likes', 0] },
								$into: {
									myid_var: 1,
									mytotal_likes_var: 1
								}
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, COALESCE(total_likes, $4) AS total_likes INTO myid_var, mytotal_likes_var',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: 40,
							$4: 0
						}
					}
				}
			}
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
									$returning: ['people_id', 'first_name', 'last_name']
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, first_name, last_name',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40
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
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$returning: [
										{ people_id: { $coalesce: ['~~people_id', 0] } },
										{ total_likes: { $coalesce: ['~~total_likes', 0] } },
									]
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING COALESCE(people_id, $4) AS people_id, COALESCE(total_likes, $5) AS total_likes',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40,
									$4: 0,
									$5: 0
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
							$returning: '*'
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
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
