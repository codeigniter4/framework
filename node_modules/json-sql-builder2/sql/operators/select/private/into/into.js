'use strict';

class into extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		// valid syntax as String for all dialects
		let typeDefinition = {
			String: { syntax: this.Syntax('INTO <value-ident>') }
		};

		// only supported by MariaDB, MySQL
		if (sql.isMariaDB() || sql.isMySQL()){
			typeDefinition.Array = { syntax: this.Syntax('INTO <value-ident>[ , ... ]') },
			typeDefinition.Object = { syntax: this.Syntax('INTO{ OUTFILE [$outfile]}{ DUMPFILE [$dumpfile]}') }

			this.registerPrivateHelper('outfile');
			this.registerPrivateHelper('dumpfile');
		}
		this.Types(typeDefinition);
	}
}

module.exports = {
	definition: into,
	description: 'Specifies the `INTO` clause for the `SELECT` Statement.',
 	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select-into.html',
		MariaDB: 'https://mariadb.com/kb/en/library/selectinto/',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-into-clause-transact-sql'
	},
	examples: {
		String: {
			'Basic Usage': function(sql) {
				return {
					supportedBy: {
						MariaDB: true,
						MySQL: true
					},
					test: function() {
						let query = sql.build({
							$select: {
								people_id: 1, $into: '@people_id',
								$from: 'people',
								$limit: 1
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT people_id INTO @people_id FROM people LIMIT $1',
						values: {
							$1: 1
						}
					}
				}
			},
			'Basic Usage for SQLServer': function(sql) {
				return {
					supportedBy: {
						SQLServer: true
					},
					test: function() {
						let query = sql.build({
							$select: {
								$into: 'tmp_people_table',
								$from: 'people'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT * INTO tmp_people_table FROM people',
						values: {}
					}
				}
			}
		},
		Array: {
			'Basic Usage': function(sql) {
				return {
					supportedBy: {
						MariaDB: true,
						MySQL: true
					},
					test: function() {
						let query = sql.build({
							$select: {
								$columns: ['people_id', 'first_name', 'last_name'],
								$into: ['@people_id', '@first_name', '@last_name'],
								$from: 'people',
								$limit: 1
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT people_id, first_name, last_name INTO @people_id, @first_name, @last_name FROM people LIMIT $1',
						values: {
							$1: 1
						}
					}
				}
			}
		},
		Object: {
			'Basic Usage': function(sql) {
				return {
					supportedBy: {
						MariaDB: true,
						MySQL: true
					},
					test: function() {
						let query = sql.build({
							$select: {
								people_id: 1,
								first_name: 1,
								last_name: 1,
								$into: { $outfile: '/tmp/peopledata.csv' },
								$from: 'people'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT people_id, first_name, last_name INTO OUTFILE $1 FROM people',
						values: {
							$1: '/tmp/peopledata.csv'
						}
					}
				}
			}
		}
	}
}
