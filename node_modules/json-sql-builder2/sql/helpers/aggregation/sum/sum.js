'use strict';

const aggregationHelper = require('../aggregationHelper')

class sum extends aggregationHelper.definition {
	constructor(sql){
		super(sql, 'SUM');
	}
}

module.exports = {
	definition: sum,
	description: 'Specifies the aggregation function `SUM` as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_sum',
		MariaDB: 'https://mariadb.com/kb/en/library/sum/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-aggregate.html',
		SQLite: 'https://sqlite.org/lang_aggfunc.html#sum',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions087.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/sum-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							sum_age: { $sum: 'age' },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT SUM(age) AS sum_age FROM people',
						values:{}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							sum_age: { $sum: { $expr: '~~age', $distinct: true } },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT SUM(DISTINCT age) AS sum_age FROM people',
						values:{}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql){
				return {
					supportedBy: {
						SQLServer: true
					},
					test: function(){
						return sql.$select({
							sum_age: { $sum: sql.isNull('~~age', 40) },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT SUM(ISNULL(age, $1)) AS sum_age FROM people',
						values:{
							$1: 40
						}
					}
				}
			},
			"Using sum callee with DISTINCT parameter": function(sql){
				return {
					test: function(){
						return sql.$select({
							sum_age: sql.sum(sql.DISTINCT, 'age'),
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT SUM(DISTINCT age) AS sum_age FROM people',
						values:{}
					}
				}
			}
		}
	}
}
