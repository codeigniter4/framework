'use strict';

class currentUser extends SQLBuilder.SQLHelper {
	constructor(sql) {
		super(sql);

		this.Types({
			Boolean: { syntax: this.Syntax('current_user', SQLBuilder.CALLEE) },
			Number: { syntax: this.Syntax('current_user') }
        });
	}
}

module.exports = {
	definition: currentUser,
	description: 'Specifies the `current_user` function to use with PostgreSQL.',
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
								username: { $currentUser: true }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_user AS username',
						values: {}
					}
				}
			},
			"Usage as Function": function(sql) {
				return {
					test: function() {
						return sql.build({
							$select: {
								username: sql.currentUser()
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_user AS username',
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
								username: { $currentUser: 1 }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT current_user AS username',
						values: {}
					}
				}
			}
		}
	}
}
