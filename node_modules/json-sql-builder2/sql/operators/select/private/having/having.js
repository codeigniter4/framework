'use strict';

class having extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax('<value>[  ... ]')
			}
		});
	}

	preBuild(query) {
		// by defaut move all conditions to $and
		// if there is no $and / $or defined
		if (!query.$and && !query.$or) {
			let andItems = [];
			this.forEach(query, (value, key)=>{
				if (this.isIdentifier(key)) {
					let o = {}; o[key]=value;
					andItems.push(o);
				}
			});
			if (andItems.length > 0) {
				query.$and = andItems; //_.cloneDeep(andItems);
				this.forEach(query, (value, key)=>{
					if (this.isIdentifier(key)) {
						delete query[key];
					}
				});
			}
		}

		return query;
	}
}

module.exports = {
	definition: having,
	description: 'Specifies the `HAVING` clause for the `SELECT` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-having-transact-sql'
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function(){
						return sql.build({
							$select: {
								city: 1,
								total_salary_by_city: sql.sum('salary'),
								$from: 'people',
								$groupBy: 'city',
								$having: {
									$sum: 'salary', $gt: 450000
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city HAVING SUM(salary) > $1',
						values:{
							$1: 450000
						}
					}
				}
			},
			'Usage with $and': function(sql) {
				return {
					test: function(){
						return sql.build({
							$select: {
								city: 1,
								total_salary_by_city: sql.sum('salary'),
								$from: 'people',
								$groupBy: 'city',
								$having: {
									$and: [
										{ $anyExpr: { $sum: 'salary', $gt: 450000 } },
										{ $anyExpr: { $sum: 'salary', $lt: 990000 } }
									]
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city HAVING SUM(salary) > $1 AND SUM(salary) < $2',
						values:{
							$1: 450000,
							$2: 990000
						}
					}
				}
			}
		}
	}
}
