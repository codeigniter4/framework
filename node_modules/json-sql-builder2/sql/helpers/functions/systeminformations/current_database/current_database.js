'use strict';

class currentDatabase extends SQLBuilder.SQLHelper {
	constructor(sql) {
		super(sql);

		this.Types({
			Boolean: { syntax: this.Syntax('current_database()', SQLBuilder.CALLEE) },
			Number: { syntax: this.Syntax('current_database()') }
        });
	}
}

module.exports = {
	definition: currentDatabase,
	description: 'Specifies the `current_database()` function to use with PostgreSQL.',
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
								db: { $currentDatabase: true }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_database() AS db',
						values: {}
					}
				}
			},
			"Usage as Function": function(sql) {
				return {
					test: function() {
						return sql.build({
							$select: {
								db: sql.currentDatabase()
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_database() AS db',
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
								db: { $currentDatabase: 1 }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_database() AS db',
						values: {}
					}
				}
			}
		}
	}
}
