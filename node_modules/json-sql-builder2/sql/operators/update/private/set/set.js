'use strict';

class set extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					String: { syntax: this.Syntax('<key-ident> = <value-param>[ , ... ]') },
					Number: { syntax: this.Syntax('<key-ident> = <value-param>[ , ... ]') },
					Boolean: { syntax: this.Syntax('<key-ident> = <value-param>[ , ... ]') },
					Object: { syntax: this.Syntax('<identifier> = <value>[ , ... ]') },
					Function: { syntax: this.Syntax('<key-ident> = <value>[ , ... ]') },
				}
			}
		});
	}

	link(query) {
		// only for postgreSQL !!!
		if (this.isPostgreSQL()){
			// advanced Syntax for update jsonb data like
			/*
				$set: {
					'data->myobj->a': 'hello World',
					'data->myobj->b': 'foo'
				}

				this will turn to nested $jsonbSet object structure
				$set: {
					data: {
						$jsonbSet: {
							$jsonbTarget: {
								$jsonbSet: {
									$jsonbTarget: '~~data',
									$jsonbPath: '{myobj, b}',
									$jsonbValue: 'foo'
								},
							},
							$jsonbPath: '{myobj,a}',
							$text: 'hello World'
						}
					}
				}

				finally sql output:
				UPDATE ...
				SET
					data = jsonb_set(jsonb_set(data, '{myobj,b}', $1), '{myobj,a}', $2)

			}
			*/

			// now iterate each key and merge all identifiers with the same main parent (like data)
			let mainColumns = {};
			this.forEach(query.$set, (value, key) => {
				// check if we have a json-column with "->"
				if (key.indexOf('->') > -1) {
					let colName = key.substring(0, key.indexOf('->'));

					// check if this column arrives twice
					if (!mainColumns[colName]) {
						mainColumns[colName] = {
							originalKey: key,
							data: []
						};
					}

					mainColumns[colName].data.push({
						originalKey: key,
						path: '{' + key.split('->').slice(1).join(',') + '}',
						value: value
					});
				}
			});

			// after iterating each key
			// rebuild the new $set-object
			this.forEach(mainColumns, (colDef, colName) => {
				let lastOperator = {}

				this.forEach(colDef.data, (jsonCol, index) => {
					let jsonOperator = {};
					jsonOperator.$target = index ? { $jsonbSet: lastOperator } : '~~' + colName;
					jsonOperator.$path = jsonCol.path;
					jsonOperator.$value = jsonCol.value;

					lastOperator = jsonOperator;

					delete query.$set[jsonCol.originalKey];
				});

				query.$set[colName] = {
					$jsonbSet: lastOperator
				};
			});
		}

		return query;
	}
}

module.exports = {
	definition: set,
 	description: 'Specifies the `SET` clause for the `UPDATE` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/update.html',
		MariaDB: 'https://mariadb.com/kb/en/library/update/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-update.html',
		SQLite: 'https://sqlite.org/lang_update.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10007.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/queries/update-transact-sql'
	},
	examples: {
		Object: {
			eachItemOf: {
				Boolean: {
					'Basic Usage': function(sql) {
						return {
							test: function() {
								return sql.$update({
									$table: 'people',
									$set: {
										first_name: 'John',
										last_name: 'Doe',
										is_adult: true
									},
									$where: {
										people_id: 456
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET first_name = $1, last_name = $2, is_adult = $3 WHERE people_id = $4',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: true,
									$4: 456
								}
							}
						}
					}
				},
				Number: {
					'Basic Usage': function(sql) {
						return {
							test: function() {
								return sql.$update({
									$table: 'people',
									$set: {
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$where: {
										people_id: 456
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET first_name = $1, last_name = $2, age = $3 WHERE people_id = $4',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 40,
									$4: 456
								}
							}
						}
					}
				},
				String: {
					'Basic Usage': function(sql) {
						return {
							test: function() {
								return sql.$update({
									$table: 'people',
									$set: {
										first_name: 'John',
										last_name: 'Doe'
									},
									$where: {
										people_id: 456
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET first_name = $1, last_name = $2 WHERE people_id = $3',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 456
								}
							}
						}
					}
				},
				Object: {
					'Basic Usage': function(sql) {
						return {
							test: function() {
								return sql.$update({
									$table: 'people',
									$set: {
										first_name: 'John',
										last_name: 'Doe',
										total_likes: {
											$select: {
												total_likes: { $count: '*' },
												$from: 'people_likes',
												$where: {
													people_id: 456
												}
											}
										}
									},
									$where: {
										people_id: 456
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET first_name = $1, last_name = $2, total_likes = (SELECT COUNT(*) AS total_likes FROM people_likes WHERE people_id = $3) WHERE people_id = $4',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 456,
									$4: 456
								}
							}
						}
					},
					'Advanced PostgreSQL json-Usage': function(sql) {
						return {
							supportedBy: {
								PostgreSQL: true
							},
							test: function() {
								return sql.$update({
									$table: 'people',
									$set: {
										'data->profile->firstName': 'John',
										'data->profile->lastName': 'Doe'
									},
									$where: {
										people_id: 456
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET data = jsonb_set(jsonb_set(data, $1, $2), $3, $4) WHERE people_id = $5',
								values: {
									$1: '{profile,firstName}',
									$2: '"John"',
									$3: '{profile,lastName}',
									$4: '"Doe"',
									$5: 456
								}
							}
						}
					},
				},
				Function: {
					'Basic Usage': function(sql) {
						return {
							test: function() {
								return sql.$update({
									$table: 'people',
									$set: {
										first_name: 'John',
										last_name: 'Doe',
										total_likes: sql.select({ total_likes: { $count: '*' } }, {
											$from: 'people_likes',
											$where: {
												people_id: 456
											}
										})
									},
									$where: {
										people_id: 456
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET first_name = $1, last_name = $2, total_likes = (SELECT COUNT(*) AS total_likes FROM people_likes WHERE people_id = $3) WHERE people_id = $4',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 456,
									$4: 456
								}
							}
						}
					}
				}
			}
		}
	}
}
