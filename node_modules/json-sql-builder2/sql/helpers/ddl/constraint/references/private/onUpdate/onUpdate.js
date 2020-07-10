'use strict';

class onDelete extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: {
				syntax: {
					'NO ACTION': this.Syntax('NO ACTION'),
					'SET DEFAULT': this.Syntax('SET DEFAULT'),
					'SET NULL': this.Syntax('SET NULL'),
					'RESTRICT': this.Syntax('RESTRICT'),
					'CASCADE': this.Syntax('CASCADE')
				}
			}
		});

		this.Keyword('NO_ACTION');
		this.Keyword('SET_DEFAULT');
		this.Keyword('SET_NULL');
		this.Keyword('RESTRICT');
		this.Keyword('CASCADE');
	}

	preBuild(query) {
		if (this.isString(query)) return query;

		// checking Keywords and return a String
		if (query === this.NO_ACTION) return 'NO ACTION';
		if (query === this.SET_DEFAULT) return 'SET DEFAULT';
		if (query === this.SET_NULL) return 'SET NULL';
		if (query === this.RESTRICT) return 'RESTRICT';
		if (query === this.CASCADE) return 'CASCADE';

		return null;
	}
}

module.exports = {
	definition: onDelete,
 	description: 'Specifies the `Action` Parameter for the `ON DELETE` clause.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/constraints.html',
		MariaDB: 'https://mariadb.com/kb/en/library/constraint/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/ddl-constraints.html',
		SQLite: 'https://sqlite.org/lang_createtable.html#constraints',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql'
	},
	examples: {
		String: {
			'NO ACTION': {
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
													$onDelete: 'NO ACTION',
													$onUpdate: sql.NO_ACTION
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE NO ACTION ON UPDATE NO ACTION)',
							values: {}
						}
					}
				}
			},
			'SET DEFAULT': {
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
													$onDelete: 'SET DEFAULT',
													$onUpdate: sql.SET_DEFAULT
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT)',
							values: {}
						}
					}
				}
			},
			'SET NULL': {
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
													$onDelete: 'SET NULL',
													$onUpdate: sql.SET_NULL
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE SET NULL ON UPDATE SET NULL)',
							values: {}
						}
					}
				}
			},
			'RESTRICT': {
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
													$onDelete: 'RESTRICT',
													$onUpdate: sql.RESTRICT
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE RESTRICT ON UPDATE RESTRICT)',
							values: {}
						}
					}
				}
			},
			'CASCADE': {
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
													$onDelete: 'CASCADE',
													$onUpdate: sql.CASCADE
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE CASCADE)',
							values: {}
						}
					}
				}
			}
		}
	}
}
