'use strict';

class top extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Number: { syntax: this.Syntax('TOP(<value-param>)') },
			Object: { syntax: this.Syntax('TOP(<$value>){ PERCENT[$percent]}') }
		});

		this.$value = new SQLBuilder.SQLPredefined.Expression(sql);
		this.$percent = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
	}
}

module.exports = {
	definition: top,
	description: 'Specifies the `TOP` clause for the `SELECT` Statement.',
 	supportedBy: {
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql'
	},
	examples: {
		Number: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								$top: 10,
								$from: 'people'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT TOP($1) * FROM people',
						values: {
							$1: 10
						}
					}
				}
			}
		},
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								$top: { $value: 5, $percent: true},
								$from: 'people'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT TOP($1) PERCENT * FROM people',
						values: {
							$1: 5
						}
					}
				}
			},
			'Usage with variable and $percent: false': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								$top: { $value: '~~@mytop10', $percent: false},
								$from: 'people'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT TOP(@mytop10) * FROM people',
						values: {}
					}
				}
			}
		}
	}
}
