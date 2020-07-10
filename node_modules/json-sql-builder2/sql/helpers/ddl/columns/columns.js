'use strict';

class columns extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Boolean: {
						syntax: {
							true: this.Syntax('<key-ident>[ , ... ]'),
							false: this.Syntax('')
						}
					},
					Number: {
						syntax: {
							1: this.Syntax('<key-ident>[ , ... ]'),
							0: this.Syntax('')
						}
					}
				}
			},
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
				}
			},
			String: { syntax: this.Syntax('<value-ident>') }
		});
	}
}

module.exports = {
	definition: columns,
	description: 'Specifies a collection of Columns for the `$constraint` Helper.',
	supportedBy: {
		PostgreSQL: '',
		MySQL: '',
		MariaDB: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		Object: {
			eachItemOf: {
				Boolean: {
					true: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: true
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
									values: {}
								}
							}
						}
					},
					false: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: true,
												state: false
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
									values:{}
								}
							}
						}
					}
				},
				Number: {
					0: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: 1,
												state: 0
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
									values:{}
								}
							}
						}
					},
					1: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											city: 1,
											total_salary_by_city: sql.sum('salary'),
											$from: 'people',
											$groupBy: {
												city: 1
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
									values:{}
								}

							}
						}
					}
				},
			} // eachItemOf
		}, // Object
		Array: {
			eachItemOf: {
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										city: 1,
										state: 1,
										total_salary_by_city: sql.sum('salary'),
										$from: 'people',
										$groupBy: ['city', 'state']
									}
								});
							},
							expectedResults: {
								sql: 'SELECT city, state, SUM(salary) AS total_salary_by_city FROM people GROUP BY city, state',
								values:{}
							}
						}
					}
				}
			}
		},
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.build({
							$select: {
								city: 1,
								total_salary_by_city: sql.sum('salary'),
								$from: 'people',
								$groupBy: 'city'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT city, SUM(salary) AS total_salary_by_city FROM people GROUP BY city',
						values:{}
					}
				}
			}
		}
	}
}
