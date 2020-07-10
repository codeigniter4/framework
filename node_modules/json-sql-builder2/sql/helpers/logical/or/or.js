'use strict';

const and = require('../and/and.js').definition;

class or extends and {
	constructor(sql){
		super(sql);

		this.Types({
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value>[  OR ... ]') },
					Object: { syntax: this.Syntax('<key-ident> <value>[  OR ... ]') },
					Function: { syntax: this.Syntax('<value>[  OR ... ]') }
				}
			}
		});
	}
}

module.exports = {
	definition: or,
	description: 'Specifies the logical `AND` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/logical-operators.html#operator_or',
		MariaDB: 'https://mariadb.com/kb/en/library/or/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-logical.html',
		SQLite: 'https://sqlite.org/lang_expr.html',
		Oracle: 'https://docs.oracle.com/cd/B13789_01/server.101/b10759/conditions004.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/language-elements/or-transact-sql'
	},
	examples: {
		Array: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: 'people',
										$where: {
											$or: [
												{ first_name: { $eq: 'Jane' } },
												{ last_name: { $eq: 'Doe' } }
											]
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM people WHERE first_name = $1 OR last_name = $2',
								values: {
									$1: 'Jane',
									$2: 'Doe'
								}
							}
						}
					},
					"Combine AND/OR": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: 'people',
										$where: {
											$and: [
												{ people_id: 456725 },
												{ $or: [
													{ first_name: { $eq: 'Jane' } },
													{ last_name: { $eq: 'Doe' } }
												]}
											]
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM people WHERE people_id = $1 AND (first_name = $2 OR last_name = $3)',
								values: {
									$1: 456725,
									$2: 'Jane',
									$3: 'Doe'
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
										$from: 'people',
										$where: {
											$or: [
												"COALESCE(gender, 'male') = 'male'",
												{ last_name: { $eq: 'Doe' } }
											]
										}
									}
								});
							},
							expectedResults: {
								sql: "SELECT * FROM people WHERE COALESCE(gender, 'male') = 'male' OR last_name = $1",
								values: {
									$1: 'Doe'
								}
							}
						}
					}
				},
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: 'people',
										$where: {
											$or: [
												sql.cmp('~~first_name', '=', 'Jane'),
												{ last_name: { $eq: 'Doe' } }
											]
										}
									}
								});
							},
							expectedResults: {
								sql: "SELECT * FROM people WHERE first_name = $1 OR last_name = $2",
								values: {
									$1: 'Jane',
									$2: 'Doe'
								}
							}
						}
					}
				}
			}
		}
	}
}
