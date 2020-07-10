'use strict';

const ArithmeticHelper = require('../.arithmeticHelper');

class mul extends ArithmeticHelper {
	constructor(sql){
		super(sql, 'mul', '*');
	}
}

module.exports = {
	definition: mul,
	description: `Specifies the multiply \`*\` Operator as Helper.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/arithmetic-functions.html',
		MariaDB: 'https://mariadb.com/kb/en/library/multiplication-operator/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-math.html',
		SQLite: 'https://sqlite.org/lang_expr.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/operators002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/language-elements/arithmetic-operators-transact-sql'
	},
	examples: {
		Number: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							test: { $: { __: '(5 + 2)', $mul: 2 } }
						});
					},
					expectedResults: {
						sql: 'SELECT (5 + 2) * $1 AS test',
						values:{
							$1: 2
						}
					}
				}
			}
		},
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							age_test: { $: { $max: 'age', $mul: 'age' } },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT MAX(age) * age AS age_test FROM people',
						values: {}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$update({
							$table: 'people',
							$set: {
								salary: { $mul: sql.coalesce('~~bonus', 1.02) }
							},
							$where: {
								salary: { $lt: 2000 }
							}
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET salary = salary * COALESCE(bonus, $1) WHERE salary < $2',
						values:{
							$1: 1.02,
							$2: 2000
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$update({
							$table: 'people',
							$set: {
								salary: { $mul: { $select: { bonus:true, $from: 'bonus_terms', $where: { year: 2018 } } } }
							},
							$where: {
								salary: { $lt: 2000 }
							}
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET salary = salary * (SELECT bonus FROM bonus_terms WHERE year = $1) WHERE salary < $2',
						values:{
							$1: 2018,
							$2: 2000
						}
					}
				}
			}
		},
		Array: {
			eachItemOf: {
				Number: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$update({
									$table: 'people',
									$set: {
										salary: { $mul: [ 'salary', 1.1 ] }
									},
									$where: {
										salary: { $lt: 2000 }
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET salary = salary * $1 WHERE salary < $2',
								values:{
									$1: 1.1,
									$2: 2000
								}
							}
						}
					}
				},
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$update({
									$table: 'people',
									$set: {
										salary: { $mul: ['salary', 'bonus'] }
									},
									$where: {
										salary: { $lt: 2000 }
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET salary = salary * bonus WHERE salary < $1',
								values:{
									$1: 2000
								}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$update({
									$table: 'people',
									$set: {
										salary: {
											$mul: [
												'salary',
												{
													$select: {
														bonus: { $avg: 'bonus' },
														$from: 'people_bonus',
														$where: {
															'people_bonus.people_id': '~~people.people_id'
														}
													}
												}
											]
										}
									},
									$where: {
										salary: { $lt: 2000 }
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET salary = salary * (SELECT AVG(bonus) AS bonus FROM people_bonus WHERE people_bonus.people_id = people.people_id) WHERE salary < $1',
								values:{
									$1: 2000
								}
							}
						}
					}
				},
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$update({
									$table: 'people',
									$set: {
										salary: { $mul: [ 'salary', sql.coalesce('~~bonus', 1.02) ] }
									},
									$where: {
										salary: { $lt: 2000 }
									}
								});
							},
							expectedResults: {
								sql: 'UPDATE people SET salary = salary * COALESCE(bonus, $1) WHERE salary < $2',
								values:{
									$1: 1.02,
									$2: 2000
								}
							}
						}
					}
				}
			}
		}
	}
}
