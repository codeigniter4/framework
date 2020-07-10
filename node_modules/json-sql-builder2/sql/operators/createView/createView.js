'use strict';

const SYNTAX =
`CREATE
	{ OR REPLACE[$orReplace]}-->(PostgreSQL,MariaDB,MySQL,SQLite,Oracle)
	{ OR ALTER[$orAlter]}-->(SQLServer)
	{ TEMPORARY[$temp]}-->(PostgreSQL,SQLite)
	{ RECURSIVE[$recursive]}-->(PostgreSQL)
 VIEW {IF NOT EXISTS[$ine] }-->(MariaDB,SQLite) <$view> { ([$columns])}
    { WITH (security_barrier)[$securityBarrier]}-->(PostgreSQL)
 AS {[$with]} | {[$select]} | {[$union]} | {[$intersect]} | {[$except]}
	{* WITH (CASCADED or LOCAL) CHECK OPTION [$checkOption] *}-->(PostgreSQL,MariaDB,MySQL,SQLServer,Oracle)
`;

class createView extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE)
			}
		});

		this.$orAlter = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$orReplace = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$temp = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$recursive = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$view = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$ine = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		// add a synonym for ine = ifNotExists
		this.$ifNotExists = this.$ine;
		this.$securityBarrier = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);

		this.registerPrivateHelper('checkOption');
	}
}

module.exports = {
	definition: createView,
 	description: 'Specifies the `CREATE VIEW` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/create-view.html',
		MariaDB: 'https://mariadb.com/kb/en/library/create-view/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.4/static/sql-createview.html',
		SQLite: 'https://sqlite.org/lang_createview.html',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/statements_8004.htm#SQLRF01504',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createView({
							$view: 'my_people_view',
							$select: {
								people_id: true,
								people_name: sql.concat('~~last_name', ' ', '~~first_name'),
								$from: 'people'
							}
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
			"Test $ine (IF NOT EXISTS)": function(sql) {
				return {
					supportedBy: {
						MariaDB: true,
						SQLite: true
					},
					test: function(){
						return sql.$createView({
							$view: 'my_people_view',
							$ine: true,
							$select: {
								people_id: true,
								people_name: sql.concat('~~last_name', ' ', '~~first_name'),
								$from: 'people'
							}
						});
					},
					expectedResults: {
						sql: 'CREATE VIEW IF NOT EXISTS my_people_view AS SELECT people_id, CONCAT(last_name, $1, first_name) AS people_name FROM people',
						values: {
							$1: ' '
						}
					}
				}
			},
			"PostgreSQL usage of RECURSIVE VIEW": function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function(){
						return sql.$createView({
							$recursive: true,
							$view: 'nums1to100',
							$columns: 'n',
							$union: {
								$all: [
									{
										$select: {
											n: { __: '1' }
										}
									}, {
										$select: {
											n: { $add: 1 },
											$from: 'nums1to100',
											$where: {
												n: { $lt: 100 }
											}
										}
									}
								]
							}
						});
					},
					expectedResults: {
						// PostgreSQL does not support parameterized queries on CREATE VIEW statements
						sql: 'CREATE RECURSIVE VIEW nums1to100 (n) AS ((SELECT 1 AS n) UNION ALL (SELECT n + 1 AS n FROM nums1to100 WHERE n < 100))',
						values: {},
					}
				}
			}
		}
	}
}
