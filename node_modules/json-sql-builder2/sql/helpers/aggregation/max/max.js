'use strict';

const aggregationHelper = require('../aggregationHelper')

class max extends aggregationHelper.definition {
	constructor(sql){
		super(sql, 'MAX');
	}
}

module.exports = {
	definition: max,
	description: 'Specifies the aggregation function `MAX` as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_max',
		MariaDB: 'https://mariadb.com/kb/en/library/max/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-aggregate.html',
		SQLite: 'https://sqlite.org/lang_aggfunc.html#max',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions087.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/max-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							max_age: { $max: 'age' },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT MAX(age) AS max_age FROM people',
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
							max_age: { $max: { $expr: '~~age', $distinct: true } },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT MAX(DISTINCT age) AS max_age FROM people',
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
							max_age: { $max: sql.isNull('~~age', 40) },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT MAX(ISNULL(age, $1)) AS max_age FROM people',
						values:{
							$1: 40
						}
					}
				}
			},
			"Using max callee with DISTINCT parameter": function(sql){
				return {
					test: function(){
						return sql.$select({
							max_age: sql.max(sql.DISTINCT, 'age'),
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT MAX(DISTINCT age) AS max_age FROM people',
						values:{}
					}
				}
			}
		}
	}
}
