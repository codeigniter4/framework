'use strict';

class query extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax('<value>')
			}
		});
	}
}

module.exports = {
	definition: query,
 	description: 'Specifies the `$query` part of the Common Table Expression (CTE).',
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
			"Basic Usage": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true,
						MariaDB: true
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
