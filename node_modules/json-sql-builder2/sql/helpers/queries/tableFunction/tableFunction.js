'use strict';

class tableFunction extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax('<$name>([$args])', SQLBuilder.CALLEE) },
			String: { syntax: this.Syntax('<value-ident>()') }
		});

		this.$name = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$args = new SQLBuilder.SQLPredefined.ArrayValueParam(sql);
	}
}

module.exports = {
	definition: tableFunction,
	description: 'Specifies a helper to call a table-valued-function from inside the `FROM` clause.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/11/sql-createfunction.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/sql/linq/how-to-use-table-valued-user-defined-functions'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function(){
						return sql.build({
							$select: {
								$from: {
									test: {
										$tableFunction: { $name: 'my_table_valued_function', $args: ['Param1', 2, 'Param3', 4] }
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM my_table_valued_function($1, $2, $3, $4) AS test',
						values: {
							$1: 'Param1',
							$2: 2,
							$3: 'Param3',
							$4: 4
						}
					}
				}
			},
			"Usage as Function without args": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function(){
						return sql.build({
							$select: {
								$from: {
									test: sql.tableFunction('my_table_valued_function')
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM my_table_valued_function() AS test',
						values: {}
					}
				}
			},
			"Usage as Function with args": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function(){
						return sql.build({
							$select: {
								$from: {
									test: sql.tableFunction('my_table_valued_function', { $args: ['Param1', 2, 'Param3', 4] })
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM my_table_valued_function($1, $2, $3, $4) AS test',
						values: {
							$1: 'Param1',
							$2: 2,
							$3: 'Param3',
							$4: 4
						}
					}
				}
			},
		}, // Object
		String: {
			"Basic Usage": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function(){
						return sql.build({
							$select: {
								$from: {
									test: { $tableFunction: 'my_table_valued_function' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM my_table_valued_function() AS test',
						values: {}
					}
				}
			}
		}
	}
}
