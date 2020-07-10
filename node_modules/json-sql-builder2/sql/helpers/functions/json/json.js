'use strict';

class json extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Primitive: { syntax: this.Syntax('<value-param>') },
			Array: { syntax: this.Syntax('<value-param>') },
			Object: { syntax: this.Syntax('<value-param>') }
		});
	}

	preBuild(query, identifier) {
		return JSON.stringify(query);
	}
}


module.exports = {
	definition: json,
 	description: 'Specifies a generic JSON Helper that will stringify the current value assigned.',
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		Primitive: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								json_str: { $json: 'Stringvalue' },
								json_bool: { $json: true },
								json_num: { $json: 88}
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, json_str, json_bool, json_num) VALUES ($1, $2, $3, $4, $5)',
						values: {
							$1: 'John',
							$2: 'Doe',
							$3: '"Stringvalue"',
							$4: 'true',
							$5: '88'
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								hobbies: {
									$json: {
										football: 'beginner',
										basketball: 'good',
										swimming: false
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, hobbies) VALUES ($1, $2, $3)',
						values: {
							$1: 'John',
							$2: 'Doe',
							$3: '{"football":"beginner","basketball":"good","swimming":false}'
						}
					}
				}
			}
		},
		Array: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								hobbies: { $json: ['football', 'basketball'] }
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, hobbies) VALUES ($1, $2, $3)',
						values: {
							$1: 'John',
							$2: 'Doe',
							$3: '["football","basketball"]'
						}
					}
				}
			}
		}
	}
}
