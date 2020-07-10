'use strict';

class currentSchema extends SQLBuilder.SQLHelper {
	constructor(sql) {
		super(sql);

		this.Types({
			Boolean: { syntax: this.Syntax('current_schema', SQLBuilder.CALLEE) },
			Number: { syntax: this.Syntax('current_schema') }
        });
	}
}

module.exports = {
	definition: currentSchema,
	description: 'Specifies the `current_schema` function to use with PostgreSQL.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/11/functions-info.html',
	},
	examples: {
		Boolean: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.build({
							$select: {
								schema: { $currentSchema: true }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_schema AS schema',
						values: {}
					}
				}
			},
			"Usage as Function": function(sql) {
				return {
					test: function() {
						return sql.build({
							$select: {
								schema: sql.currentSchema()
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_schema AS schema',
						values: {}
					}
				}
			}
		},
		Number: {
			"Basic Usage": function(sql) {
				return {
					test: function() {
						return sql.build({
							$select: {
								schema: { $currentSchema: 1 }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_schema AS schema',
						values: {}
					}
				}
			}
		}
	}
}
