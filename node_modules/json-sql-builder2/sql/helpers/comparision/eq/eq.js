'use strict';

class eq extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Primitive: { syntax: this.Syntax('= <value-param>')}, //SQLBuilder.CALLEE) },
			Object: { syntax: this.Syntax('= <value>') },
			Function: { syntax: this.Syntax('= <value>') }
		});
	}

	callee(...args){
		if (args.length === 3){
			return this._queryUnknown({
				$cmp: {
					$value: args[0],
					$comparator: '=',
					$other: args[1]
				}
			});
		}
		if (args.length === 2){
			return '= ' + this.addValue(args[0]);
		}
	}
}

module.exports = {
	definition: eq,
	description: 'Specifies the comparision **equal to** `=` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/func-op-summary-ref.html',
		MariaDB: 'https://mariadb.com/kb/en/library/equal/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-comparison.html',
		SQLite: 'https://sqlite.org/lang_expr.html',
		Oracle: 'https://docs.oracle.com/html/A95915_01/sqopr.htm#sthref149',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/language-elements/equals-transact-sql'
	},
	examples: {
		Primitive: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $eq: 'John' },
									last_name: { $eq: 'Doe' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = $1 AND last_name = $2',
						values: {
							$1: 'John',
							$2: 'Doe'
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql){
				return {
					supportedBy: {
						PostgreSQL: true,
						MariaDB: true,
						MySQL: true,
						SQLite: true
					},
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: {
										$eq: {
											$select: {
												first_name: 1,
												$from: 'people',
												$where: {
													age: 100
												},
												$limit: 1
											}
										}
									},
									last_name: { $eq: 'Doe' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = (SELECT first_name FROM people WHERE age = $1 LIMIT $2) AND last_name = $3',
						values: {
							$1: 100,
							$2: 1,
							$3: 'Doe'
						}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql){
				return {
					supportedBy: {
						PostgreSQL: true,
						MariaDB: true,
						MySQL: true,
						SQLite: true
					},
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: {
										$eq: sql.select({ first_name: 1 }, {
											$from: 'people',
											$where: {
												age: 100
											},
											$limit: 1
										})
									},
									last_name: { $eq: 'Doe' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = (SELECT first_name FROM people WHERE age = $1 LIMIT $2) AND last_name = $3',
						values: {
							$1: 100,
							$2: 1,
							$3: 'Doe'
						}
					}
				}
			}
		}
	}
}
