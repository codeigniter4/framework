'use strict';

const rollupHelper = require('../.rollupHelper');

class cube extends rollupHelper {
	constructor(sql){
		super(sql, 'cube');
	}
}

module.exports = {
	definition: cube,
	description: 'Specifies the `CUBE` option for the `GROUP BY` clause.',
 	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/devel/static/queries-table-expressions.html#QUERIES-GROUPING-SETS',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14223/aggreg.htm#i1007434',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql'
	},
	examples: {
		Object: {
			eachItemOf: {
				Number: {
					1: {
						'Basic Usage': function(sql) {
							return {
								test: function() {
									let query = sql.build({
										$select: {
											state: 1,
											city: 1,
											sales_manager: 1,
											total_sales: sql.sum('sales'),

											$from: 'sales_pipline',
											$groupBy: {
												myCube: {
													$cube: {
														state: 1,
														city: 1,
														sales_manager: 1
													}
												}
											}
										}
									});

									return query;
								},
								expectedResults: {
									sql: 'SELECT state, city, sales_manager, SUM(sales) AS total_sales FROM sales_pipline GROUP BY CUBE (state, city, sales_manager)',
									values: {}
								}
							}
						}
					}
				},
				Array: {
					"Basic Usage": function(sql) {
						return {
							test: function() {
								let query = sql.build({
									$select: {
										state: 1,
										city: 1,
										sales_manager: 1,
										total_sales: sql.sum('sales'),

										$from: 'sales_pipline',
										$groupBy: {
											myCube: {
												$cube: {
													state: 1,
													grp1: ['state', 'city'],
													grp2: ['state', 'city', 'sales_manager']
												}
											}
										}
									}
								});

								return query;
							},
							expectedResults: {
								sql: 'SELECT state, city, sales_manager, SUM(sales) AS total_sales FROM sales_pipline GROUP BY CUBE (state, (state, city), (state, city, sales_manager))',
								values: {}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function() {
								let query = sql.build({
									$select: {
										state: 1,
										city: 1,
										sales_manager: 1,
										total_sales: sql.sum('sales'),

										$from: 'sales_pipline',
										$groupBy: {
											myCube: {
												$cube: {
													state: 1,
													grp1: {
														state: 1,
														city: 1
													},
													grp2: {
														state: 1,
														city: 1,
														sales_manager: 1
													}
												}
											}
										}
									}
								});

								return query;
							},
							expectedResults: {
								sql: 'SELECT state, city, sales_manager, SUM(sales) AS total_sales FROM sales_pipline GROUP BY CUBE (state, (state, city), (state, city, sales_manager))',
								values: {}
							}
						}
					}
				}
			}

		}
	}
}
