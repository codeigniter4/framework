'use strict';

class between extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax('BETWEEN <$min> AND <$max>', SQLBuilder.CALLEE) }
		});

		// add the min, max expressions as private helpers
		// so they can't run in conflict with the public
		// aggregation $min and $max
		this.$min = new SQLBuilder.SQLPredefined.Expression(sql);
		this.$max = new SQLBuilder.SQLPredefined.Expression(sql);
	}
}

module.exports = {
	definition: between,
	description: 'Specifies the comparision `BETWEEN` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/comparison-operators.html#operator_between',
		MariaDB: 'https://mariadb.com/kb/en/library/between-and/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-comparison.html',
		SQLite: 'https://sqlite.org/lang_expr.html#between',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/conditions011.htm#SQLRF52147',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/language-elements/between-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									age: { $between: { $min: 18, $max: 45 } }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE age BETWEEN $1 AND $2',
						values: {
							$1: 18,
							$2: 45
						}
					}
				}
			},
			"Usage as SQL-Function": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									age: sql.between(18, 45)
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE age BETWEEN $1 AND $2',
						values: {
							$1: 18,
							$2: 45
						}
					}
				}
			}
		}
	}
}
