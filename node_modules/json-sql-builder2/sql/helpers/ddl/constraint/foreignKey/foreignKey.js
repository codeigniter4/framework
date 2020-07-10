'use strict';

class foreignKey extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('FOREIGN KEY')
				}
			},
			Object: { syntax: this.Syntax(`FOREIGN KEY (<$columns>) <$references>`, SQLBuilder.CALLEE) }
		});
	}
}

module.exports = {
	definition: foreignKey,
 	description: 'Specifies the `FOEREIGN KEY` clause for a Constraint.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/constraints.html',
		MariaDB: 'https://mariadb.com/kb/en/library/constraint/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/ddl-constraints.html',
		SQLite: 'https://sqlite.org/lang_createtable.html#constraints',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql'
	},
	examples: {
		Boolean: {
			true: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$createTable({
								$table: 'people_hobbies',
								$define: {
									people_id: { $column: { $type: sql.INTEGER } },
									hobby: { $column: { $type: sql.VARCHAR, $size: 255 } },

									uk_people_hobbies: { $constraint: { $unique: { $columns: ['people_id', 'hobby'] } } },

									fk_people: {
										$constraint: {
											$foreignKey: true,
											$columns: 'people_id',
											$references: {
												$table: 'people',
												$columns: 'people_id',
												$onDelete: sql.CASCADE,
												$onUpdate: sql.RESTRICT
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE RESTRICT)',
							values: {}
						}
					}
				},
			}
		},
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$table: 'people_hobbies',
							$define: {
								people_id: { $column: { $type: sql.INTEGER } },
								hobby: { $column: { $type: sql.VARCHAR, $size: 255 } },

								uk_people_hobbies: { $constraint: { $unique: { $columns: ['people_id', 'hobby'] } } },

								fk_people: {
									$constraint: {
										$foreignKey: {
											$columns: 'people_id',
											$references: {
												$table: 'people',
												$columns: 'people_id',
												$onDelete: sql.CASCADE,
												$onUpdate: sql.RESTRICT
											}
										}
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE RESTRICT)',
						values: {}
					}
				}
			},
			"Usage as Function": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$table: 'people_hobbies',
							$define: {
								people_id: { $column: { $type: sql.INTEGER } },
								hobby: { $column: { $type: sql.VARCHAR, $size: 255 } },

								uk_people_hobbies: { $constraint: { $unique: { $columns: ['people_id', 'hobby'] } } },

								fk_people: {
									$constraint: sql.foreignKey('people_id', {
										$table: 'people',
										$columns: 'people_id',
										$onDelete: sql.CASCADE,
										$onUpdate: sql.RESTRICT
									})
								}
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE RESTRICT)',
						values: {}
					}
				}
			}
		}
	}
}
