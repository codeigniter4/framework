'use strict';

class isNull extends SQLBuilder.SQLHelper {
	constructor(sql) {
		super(sql);

		// add Boolean syntax for all dialects
		let definedTypes = {
			Boolean: {
				syntax: {
					true: this.Syntax('IS NULL'),
					false: this.Syntax('IS NOT NULL')
				}
			}
		};

		// add special function ISNULL() syntax usage as Object
		// when current dialect is SQLServer
		if (sql.isSQLServer() || sql._options.createDocs) {
			definedTypes.Object = { syntax: this.Syntax('ISNULL(<$expr>, <$replacement>)', SQLBuilder.CALLEE) }

			// private declaration of Helpers
			this.$expr = new SQLBuilder.SQLPredefined.Expression(sql);
			this.$replacement = new SQLBuilder.SQLPredefined.Expression(sql);
		}

		this.Types(definedTypes);
	}
}

module.exports = {
	definition: isNull,
	description: 'Specifies the `ISNULL` function to use with SQLServer. Further it defines the `IS NULL` and `IS NOT NULL` comparision Operators used by any SQL-Dialect.',
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					supportedBy: {
						SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/isnull-transact-sql'
					},
					test: function() {
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $eq: { $isNull: { $expr: '~~nick_name', $replacement: '~~first_name' } } }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = ISNULL(nick_name, first_name)',
						values: {}
					}
				}
			},
			"Usage as Function": function(sql) {
				return {
					supportedBy: {
						SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/isnull-transact-sql'
					},
					test: function() {
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $eq: sql.isNull('~~nick_name', '~~first_name') }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = ISNULL(nick_name, first_name)',
						values: {}
					}
				}
			}
		},
		Boolean: {
			true: {
				"Basic Usage": function(sql) {
					return {
						test: function() {
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										first_name: { $isNull: true }
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE first_name IS NULL',
							values: {}
						}
					}
				}
			},
			false: {
				"Basic Usage": function(sql) {
					return {
						test: function() {
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										first_name: { $isNull: false }
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE first_name IS NOT NULL',
							values: {}
						}
					}
				}
			}
		}
	}
}
