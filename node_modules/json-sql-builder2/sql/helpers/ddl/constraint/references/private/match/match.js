'use strict';

class match extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: {
				syntax: {
					'MATCH_FULL': this.Syntax('FULL'),
					'MATCH_PARTIAL': this.Syntax('PARTIAL'),
					'MATCH_SIMPLE': this.Syntax('SIMPLE'),
				}
			}
		});

		this.Keyword('MATCH_FULL');
		this.Keyword('MATCH_PARTIAL');
		this.Keyword('MATCH_SIMPLE');
	}

	preBuild(query) {
		if (this.isString(query)) return query;

		// checking Keywords and return a String
		if (query === this.MATCH_FULL) return 'MATCH_FULL';
		if (query === this.MATCH_PARTIAL) return 'MATCH_PARTIAL';
		if (query === this.MATCH_SIMPLE) return 'MATCH_SIMPLE';

		return null;
	}
}

module.exports = {
	definition: match,
 	description: 'Specifies the `MATCH` Parameter for the `ON DELETE | UPDATE` clause.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/ddl-constraints.html',
	},
	examples: {
		String: {
			MATCH_FULL: {
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
													$onUpdate: sql.RESTRICT,
													$match: sql.MATCH_FULL
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) MATCH FULL ON DELETE CASCADE ON UPDATE RESTRICT)',
							values: {}
						}
					}
				}
			},
			MATCH_PARTIAL: {
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
													$onUpdate: sql.RESTRICT,
													$match: sql.MATCH_PARTIAL
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) MATCH PARTIAL ON DELETE CASCADE ON UPDATE RESTRICT)',
							values: {}
						}
					}
				}
			},
			MATCH_SIMPLE: {
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
													$onUpdate: sql.RESTRICT,
													$match: sql.MATCH_SIMPLE
												}
											}
										}
									}
								}
							});
						},
						expectedResults: {
							sql: 'CREATE TABLE people_hobbies (people_id INTEGER, hobby VARCHAR(255), CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby), CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE RESTRICT)',
							values: {}
						}
					}
				}
			}
		}
	}
}
