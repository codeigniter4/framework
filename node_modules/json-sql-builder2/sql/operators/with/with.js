'use strict';

const SYNTAX =
`WITH {RECURSIVE [$recursive]} <$cte>{ <$query>}`;

class $with extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE)
			}
		});

		this.$recursive = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);

		this.registerPrivateHelper('cte');
		this.registerPrivateHelper('query');
	}
}

module.exports = {
	definition: $with,
 	description: 'Specifies the `WITH` Operator for a Common Table Expression (CTE).',
	supportedBy: {
		MariaDB: 'https://mariadb.com/kb/en/library/with/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/queries-with.html',
		SQLite: 'https://sqlite.org/syntax/with-clause.html',
		Oracle: 'https://docs.oracle.com/database/121/SQLRF/statements_10002.htm#SQLRF01702',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$with({
							peoples_after_1999: {
								$select: {
									$from: 'people',
									$where: {
										date_of_birth: { $gte: '2000-01-01' }
									}
								}
							},
							$query: {
								$insert: {
									$table: 'peoples_after_1999_named_doe',
									$columns: ['people_id', 'first_name', 'last_name'],
									$select: {
										$columns: ['people_id', 'first_name', 'last_name'],
										$from: 'peoples_after_1999',
										$where: {
											last_name: 'Doe'
										}
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'WITH peoples_after_1999 AS (SELECT * FROM people WHERE date_of_birth >= $1) INSERT INTO peoples_after_1999_named_doe (people_id, first_name, last_name) SELECT people_id, first_name, last_name FROM peoples_after_1999 WHERE last_name = $2',
						values:{
							$1: '2000-01-01',
							$2: 'Doe'
						}
					}
				}
			},
			"PostgreSQL Example using RETURNING": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function(){
						return sql.$with({
							moved_rows: {
								$delete: {
									$from: 'products',
									$where: {
										$and: [
											{ date: { $gte: '2010-10-01' } },
											{ date: { $lt: '2010-11-01' } }
										]
									},
									$returning: '*'
								}
							},
							$query: {
								$insert: {
									$table: 'products_log',
									$select: {
										$from: 'moved_rows'
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'WITH moved_rows AS (DELETE FROM products WHERE date >= $1 AND date < $2 RETURNING *) INSERT INTO products_log SELECT * FROM moved_rows',
						values:{
							$1: '2010-10-01',
							$2: '2010-11-01'
						}
					}
				}
			},
			"Using RECURSIVE": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true,
						MariaDB: true,
					},
					test: function(){
						return sql.$with({
							$recursive: true,
							$cte: {
								t: {
									$columns: {
										n: true
									},
									$union: {
										$all: [
											{
												$select: {
													1: 'n'
												}
											}, {
												$select: {
													n: { $add: ['n', 1] },
													$from: 't'
												}
											}
										]
									}
								}
							},
							$query: {
								$select: {
									n: true,
									$from: 't',
									$limit: 10
								}
							}
						});
					},
					expectedResults: {
						sql: 'WITH RECURSIVE t(n) AS (((SELECT 1 AS n) UNION ALL (SELECT n + $1 AS n FROM t))) SELECT n FROM t LIMIT $2',
						values:{
							$1: 1,
							$2: 10
						}
					}
				}
			}
		}
	}
}
