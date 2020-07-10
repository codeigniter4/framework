'use strict';

class $ extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax('<value>[  ... ]')
			},
			Function: {
				syntax: this.Syntax('<value>[  ... ]')
			}
		});
	}
}

module.exports = {
	definition: $,
	description: 'Specifies a Helper that builds `any` given object-expression',
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
									$and: [
										{ $: { $sum: 'salary', $gt: 450000 } },
										{ $: { $sum: 'salary', $lt: 990000 } }
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
		},
		Function: {
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
									$and: [
										{ $: { $sum: 'salary', $gt: 450000 } },
										{ $: { $sum: 'salary', $lt: 990000 } }
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
