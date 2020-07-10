'use strict';

const aggregationHelper = require('../aggregationHelper')

class min extends aggregationHelper.definition {
	constructor(sql){
		super(sql, 'MIN');
	}
}

module.exports = {
	definition: min,
	description: 'Specifies the aggregation function `MIN` as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_min',
		MariaDB: 'https://mariadb.com/kb/en/library/min/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-aggregate.html',
		SQLite: 'https://sqlite.org/lang_aggfunc.html#min',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions087.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/min-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							min_age: { $min: 'age' },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT MIN(age) AS min_age FROM people',
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
							min_age: { $min: { $expr: '~~age', $distinct: true } },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT MIN(DISTINCT age) AS min_age FROM people',
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
							min_age: { $min: sql.isNull('~~age', 40) },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT MIN(ISNULL(age, $1)) AS min_age FROM people',
						values:{
							$1: 40
						}
					}
				}
			},
			"Using min callee with DISTINCT parameter": function(sql){
				return {
					test: function(){
						return sql.$select({
							min_age: sql.min(sql.DISTINCT, 'age'),
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT MIN(DISTINCT age) AS min_age FROM people',
						values:{}
					}
				}
			}
		}
	}
}
