'use strict';

const aggregationHelper = require('../aggregationHelper')

class avg extends aggregationHelper.definition {
	constructor(sql){
		super(sql, 'AVG');
	}
}

module.exports = {
	definition: avg,
	description: 'Specifies the aggregation function `AVG` as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_avg',
		MariaDB: 'https://mariadb.com/kb/en/library/avg/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-aggregate.html',
		SQLite: 'https://sqlite.org/lang_aggfunc.html#avg',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions011.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/avg-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							average_age: { $avg: 'age' },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT AVG(age) AS average_age FROM people',
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
							average_age: { $avg: { $expr: '~~age', $distinct: true } },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT AVG(DISTINCT age) AS average_age FROM people',
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
							average_age: { $avg: sql.isNull('~~age', 40) },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT AVG(ISNULL(age, $1)) AS average_age FROM people',
						values:{
							$1: 40
						}
					}
				}
			},
			"Using avg callee with DISTINCT parameter": function(sql){
				return {
					test: function(){
						return sql.$select({
							average_age: sql.avg(sql.DISTINCT, 'age'),
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT AVG(DISTINCT age) AS average_age FROM people',
						values:{}
					}
				}
			}
		}
	}
}
