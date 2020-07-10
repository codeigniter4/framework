'use strict';

const aggregationHelper = require('../aggregationHelper')

class count extends aggregationHelper.definition {
	constructor(sql){
		super(sql, 'COUNT');
	}
}

module.exports = {
	definition: count,
	description: 'Specifies the aggregation function `COUNT` as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_count',
		MariaDB: 'https://mariadb.com/kb/en/library/count/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-aggregate.html',
		SQLite: 'https://sqlite.org/lang_aggfunc.html#count',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions032.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/count-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							total: { $count: '*' },
							$from: 'people',
							$where: {
								age: 18
							}
						});
					},
					expectedResults: {
						sql: 'SELECT COUNT(*) AS total FROM people WHERE age = $1',
						values:{
							$1: 18
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							total_age: { $count: { $expr: '~~age', $distinct: true } },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT COUNT(DISTINCT age) AS total_age FROM people',
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
							total_age: { $count: sql.isNull('~~age', 40) },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT COUNT(ISNULL(age, $1)) AS total_age FROM people',
						values:{
							$1: 40
						}
					}
				}
			},
			"Using count callee with DISTINCT parameter": function(sql){
				return {
					test: function(){
						return sql.$select({
							total_age: sql.count(sql.DISTINCT, 'age'),
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT COUNT(DISTINCT age) AS total_age FROM people',
						values:{}
					}
				}
			}
		}
	}
}
