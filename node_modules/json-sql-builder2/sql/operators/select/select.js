'use strict';

const SYNTAX_SELECT =
`SELECT
	{ [$top]}-->(SQLServer)	{ DISTINCT[$distinct]}
	{ SQL_CALC_FOUND_ROWS[$calcFoundRows]}-->(MySQL,MariaDB)

	{ <$columns>}
		{ [$into]}-->(MySQL,MariaDB,SQLServer)

	{ FROM [$from]}	{ [$join]}
	{ WHERE [$where]}
	{ GROUP BY [$groupBy]}
		{ WITH ROLLUP[$withRollup]}-->(MariaDB,MySQL)
	{ HAVING [$having]}
	{ ORDER BY [$orderBy]}
	{ LIMIT [$limit]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
	{ OFFSET [$offset]}-->(MariaDB,MySQL,PostgreSQL,SQLite)`;

// Define select Operator
class select extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX_SELECT, SQLBuilder.CALLEE)
			}
		});

		this.$distinct = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);

		if (sql.isMySQL() || sql.isMariaDB()) {
			this.$calcFoundRows = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
			this.$withRollup = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		}

		// Add private ANSI helpers
		//this.registerPrivateHelper('top');
		this.registerPrivateHelper('into');
		//this.registerPrivateHelper('from');
		this.registerPrivateHelper('join');
		this.registerPrivateHelper('columns');
		//this.registerPrivateHelper('where');
		this.registerPrivateHelper('groupBy');
		this.registerPrivateHelper('having');
		//this.registerPrivateHelper('orderBy');

		// Add specific Helpers depending on the current SQL-Language dialect
		if (sql.isPostgreSQL() ||
			sql.isMySQL() ||
			sql.isMariaDB() ||
			sql.isSQLite()
		) {
			//this.registerPrivateHelper('limit');
			//this.registerPrivateHelper('offset');
		}
	}

	preBuild(query, identifier) {
		if (!query.$columns){
			// add a shortcut for $columns
			// so that all properties declared directly in $select object
			// that are no operators or helpers will become a column!
			query.$columns = {};
			this.forEach(query, (value, key) => {
				// skip all operators and helpers
				if (this.isIdentifier(key)) {
					query.$columns[key] = value;
					delete query[key];
				}
			});
			// if there is no column, we add '*' for ALL --> SELECT * FROM ...
			if (Object.keys(query.$columns).length == 0) {
				query.$columns['*'] = true;
			}
		}

		return query;
	}

	postBuild(result, type, itemType){
		// check for a type of union or a subquery and use round bracket on sub-selects
		// TODO: think about a more generic way to force round brackets
		// instead of checking each situation
		if (this.isCurrent('$union') ||
			this.isCurrent('$intersect') ||
			this.isCurrent('$except') ||
			this.isCurrent('$set') || // using SELECT within the UPDATE... SET column = (SELECT...)
			this.isCurrent('$onDuplicateKeyUpdate') ||
			this.isCurrent('$doUpdateSet') ||
			(this.isCurrent('$select') && !this.isPreviousHelper('$in') && !this.isPreviousHelper('$nin'))
		) {
			result = '(' + result + ')';
		}
		return result;
	}
}

module.exports = {
	definition: select,
 	description: 'Specifies the Operator for the `SELECT` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql'
	},
	examples: {
		Operator: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.$select(['first_name', 'last_name'], {
							$from: 'people',
							$where: {
								last_name: 'Doe'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT first_name, last_name FROM people WHERE last_name = $1',
						values: {
							$1: 'Doe'
						}
					}
				}
			}
		},
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.build({
							$select: {
								$from: 'people'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people',
						values: {}
					}
				}
			},
			'Usage as Operator-Function': function(sql) {
				return {
					test: function() {
						return sql.$select({
							$from: 'people',
							$where: {
								last_name: 'Doe'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE last_name = $1',
						values: {
							$1: 'Doe'
						}
					}
				}
			},
			'Usage as Function': function(sql) {
				return {
					test: function() {
						let peopleLikes = sql.select({ total_likes: sql.count('*') }, {
							$from: 'people_likes',
							$where: {
								'people_likes.people_id': { $eq: '~~people.people_id' }
							}
						});

						return sql.$select({
							first_name: 1,
							last_name: 1,
							total_likes: peopleLikes,
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT first_name, last_name, (SELECT COUNT(*) AS total_likes FROM people_likes WHERE people_likes.people_id = people.people_id) AS total_likes FROM people',
						values: {}
					}
				}
			},
			'Usage as inline-Function': function(sql) {
				return {
					test: function() {
						return sql.$select({
							first_name: 1,
							last_name: 1,
							total_likes: sql.select({ total_likes: { $count: '*' } }, {
								$from: 'people_likes',
								$where: {
									'people_likes.people_id': '~~people.people_id'
								}
							}),
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT first_name, last_name, (SELECT COUNT(*) AS total_likes FROM people_likes WHERE people_likes.people_id = people.people_id) AS total_likes FROM people',
						values: {}
					}
				}
			},

			'Usage with DISTINCT': function(sql) {
				return {
					test: function() {
						return sql.$select({
							$distinct: true,
							job_title: true,
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT DISTINCT job_title FROM people',
						values: {}
					}
				}
			},

			'Usage for SQL_CALC_FOUND_ROWS': function(sql) {
				return {
					supportedBy: {
						MySQL: true,
						MariaDB: true
					},
					test: function() {
						return sql.$select({
							$calcFoundRows: true,
							$from: 'people',
							$where: {
								people_id: { $gt: 100 }
							},
							$limit: 10
						});
					},
					expectedResults: {
						sql: 'SELECT SQL_CALC_FOUND_ROWS * FROM people WHERE people_id > $1 LIMIT $2',
						values: {
							$1: 100,
							$2: 10
						}
					}
				}
			},

			'Usage WITH ROLLUP option': function(sql) {
				return {
					supportedBy: {
						MySQL: true,
						MariaDB: true
					},
					test: function() {
						return sql.$select({
							state: true,
							city: true,
							total_sales: { $sum: 'sales' },
							$from: 'sales_pipline',
							$groupBy: {
								state: true,
								city: true
							},
							$withRollup: true
						});
					},
					expectedResults: {
						sql: 'SELECT state, city, SUM(sales) AS total_sales FROM sales_pipline GROUP BY state, city WITH ROLLUP',
						values: {}
					}
				}
			}
		}
	}
}
