'use strict';

const rollupHelper = require('../.rollupHelper');

class rollup extends rollupHelper {
	constructor(sql){
		super(sql, 'rollup');

		/*this.Types({
			Object: {
				eachItemOf: {
					Number: {
						syntax: {
							1: this.Syntax('<key-ident>[ , ... ]')
						}
					},
					Array: { syntax: this.Syntax('(<value-ident>[ , ... ])') },
					Object: { syntax: this.Syntax('(<key-ident>[ , ... ])') }
				}
			}
		});*/
	}

	//link(query) {
		/* turn objected rollup definition
		 * into an array-definition because we can't use
		 * the round brackets on an object concat each key:value pair
		 {
		     "$rollup": {
		         "state": 1,
		         "grp1": {
		             "state": 1,
		             "city": 1
		         },
		         "grp2": {
		             "state": 1,
		             "city": 1,
		             "sales_manager": 1
		         }
		     }
		 }

		 so we turn the object for grp1, grp2 above into an array like:
		 {
		     "$rollup": {
		         "state": 1,
		         "grp1": ['state', 'city']
		         "grp2": ['state', 'city', 'sales_manager']
		     }
		 }*/
	/*	 this.forEach(query.$rollup, (value, key) => {
			// check for identifier and PlainObject
			if (this.isIdentifier(key) && this.isPlainObject(value)) {
				query.$rollup[key] = [];
				this.forEach(value, (active, column) => {
					if (active && (this.isNumeric(active) || this.isBoolean(active))) {
						query.$rollup[key].push(column)
					}
				});
			}
		 });
	}*/
}

module.exports = {
	definition: rollup,
	description: 'Specifies the `ROLLUP` option for the `GROUP BY` clause.',
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
												myRollupGroup: {
													$rollup: {
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
									sql: 'SELECT state, city, sales_manager, SUM(sales) AS total_sales FROM sales_pipline GROUP BY ROLLUP (state, city, sales_manager)',
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
											myRollupGroup: {
												$rollup: {
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
								sql: 'SELECT state, city, sales_manager, SUM(sales) AS total_sales FROM sales_pipline GROUP BY ROLLUP (state, (state, city), (state, city, sales_manager))',
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
											myRollupGroup: {
												$rollup: {
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
								sql: 'SELECT state, city, sales_manager, SUM(sales) AS total_sales FROM sales_pipline GROUP BY ROLLUP (state, (state, city), (state, city, sales_manager))',
								values: {}
							}
						}
					}
				}
			}

		}
	}
}
