'use strict';

class checkOption extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		let definedTypes = {
			Boolean: {
				syntax: {
					true: this.Syntax(' WITH CHECK OPTION'),
					false: this.Syntax('')
				}
			}
		};

		if (sql.isPostgreSQL() || sql.isMariaDB() || sql.isMySQL()) {
			definedTypes.String = {
				syntax: {
					CASCADED: this.Syntax(' WITH CASCADED CHECK OPTION'),
					LOCAL: this.Syntax(' WITH LOCAL CHECK OPTION'),
				}
			}

			this.Keyword('CASCADED');
			this.Keyword('LOCAL');
		}
		this.Types(definedTypes);
	}

	preBuild(query, identifier){
		if (this.isPostgreSQL() || this.isMariaDB() || this.isMySQL()) {
			// switch the keywords/symbols to a string as defined
			// by syntax above
			if (query === this.CASCADED) return 'CASCADED';
			if (query === this.LOCAL) return 'LOCAL';
		}
		return query;
	}
}

module.exports = {
	definition: checkOption,
 	description: 'Specifies the `CHECK OPTION` clause for the `CREATE VIEW` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/create-view.html',
		MariaDB: 'https://mariadb.com/kb/en/library/create-view/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.4/static/sql-createview.html',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/statements_8004.htm#SQLRF01504',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql'
	},
	examples: {
		Boolean: {
			true: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$createView({
								$view: 'my_people_view',
								$select: {
									people_id: true,
									people_name: sql.concat('~~last_name', ' ', '~~first_name'),
									$from: 'people'
								},
								$checkOption: true
							});
						},
						expectedResults: {
							sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, $1, first_name) AS people_name FROM people WITH CHECK OPTION',
							values: {
								$1: ' '
							},
							PostgreSQL: {
								// PostgreSQL does not support parameterized queries on CREATE VIEW statements
								sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, \' \', first_name) AS people_name FROM people WITH CHECK OPTION',
								values: {}
							}
						}
					}
				}
			},
			false: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$createView({
								$view: 'my_people_view',
								$select: {
									people_id: true,
									people_name: sql.concat('~~last_name', ' ', '~~first_name'),
									$from: 'people'
								},
								$checkOption: false
							});
						},
						expectedResults: {
							sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, $1, first_name) AS people_name FROM people',
							values: {
								$1: ' '
							},
							PostgreSQL: {
								// PostgreSQL does not support parameterized queries on CREATE VIEW statements
								sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, \' \', first_name) AS people_name FROM people',
								values: {}
							}
						}
					}
				},
			}
		},
		String: {
			CASCADED: {
				"Basic Usage": function(sql) {
					return {
						supportBy: {
							PostgreSQL: true,
							MariaDB: true,
							MySQL: true
						},
						test: function(){
							return sql.$createView({
								$view: 'my_people_view',
								$select: {
									people_id: true,
									people_name: sql.concat('~~last_name', ' ', '~~first_name'),
									$from: 'people'
								},
								$checkOption: 'CASCADED' // or better using Keywords $checkOption: sql.CASCADED
							});
						},
						expectedResults: {
							sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, $1, first_name) AS people_name FROM people WITH CASCADED CHECK OPTION',
							values: {
								$1: ' '
							},
							PostgreSQL: {
								// PostgreSQL does not support parameterized queries on CREATE VIEW statements
								sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, \' \', first_name) AS people_name FROM people WITH CASCADED CHECK OPTION',
								values: {}
							}
						}
					}
				}
			},
			LOCAL: {
				"Basic Usage": function(sql) {
					return {
						supportBy: {
							PostgreSQL: true,
							MariaDB: true,
							MySQL: true
						},
						test: function(){
							return sql.$createView({
								$view: 'my_people_view',
								$select: {
									people_id: true,
									people_name: sql.concat('~~last_name', ' ', '~~first_name'),
									$from: 'people'
								},
								$checkOption: 'LOCAL' // or better using Keywords $checkOption: sql.LOCAL
							});
						},
						expectedResults: {
							sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, $1, first_name) AS people_name FROM people WITH LOCAL CHECK OPTION',
							values: {
								$1: ' '
							},
							PostgreSQL: {
								// PostgreSQL does not support parameterized queries on CREATE VIEW statements
								sql: 'CREATE VIEW my_people_view AS SELECT people_id, CONCAT(last_name, \' \', first_name) AS people_name FROM people WITH LOCAL CHECK OPTION',
								values: {}
							}
						}
					}
				}
			}
		}
	}
}
