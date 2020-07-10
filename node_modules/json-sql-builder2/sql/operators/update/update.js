'use strict';

/*
--> Postgres:
---------------------------------------------------------------------
UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    SET { column_name = { expression | DEFAULT } |
          ( column_name [, ...] ) = ( { expression | DEFAULT } [, ...] ) |
          ( column_name [, ...] ) = ( sub-SELECT )
        } [, ...]
    [ FROM from_list ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]

--> SQL-Server:
---------------------------------------------------------------------
UPDATE
    [ TOP ( expression ) [ PERCENT ] ]
    { { table_alias | <object> | rowset_function_limited
         [ WITH ( <Table_Hint_Limited> [ ...n ] ) ]
      }
      | @table_variable
    }
    SET
        { column_name = { expression | DEFAULT | NULL }
          | { udt_column_name.{ { property_name = expression
                                | field_name = expression }
                                | method_name ( argument [ ,...n ] )
                              }
          }
          | column_name { .WRITE ( expression , @Offset , @Length ) }
          | @variable = expression
          | @variable = column = expression
          | column_name { += | -= | *= | /= | %= | &= | ^= | |= } expression
          | @variable { += | -= | *= | /= | %= | &= | ^= | |= } expression
          | @variable = column { += | -= | *= | /= | %= | &= | ^= | |= } expression
        } [ ,...n ]

    [ <OUTPUT Clause> ]
    [ FROM{ <table_source> } [ ,...n ] ]
    [ WHERE { <search_condition>
            | { [ CURRENT OF
                  { { [ GLOBAL ] cursor_name }
                      | cursor_variable_name
                  }
                ]
              }
            }
    ]
    [ OPTION ( <query_hint> [ ,...n ] ) ]
[ ; ]
*/
const SYNTAX =
`UPDATE	{ [$top]}-->(SQLServer){ <$table>}
	{ SET [$set]}
	{ FROM [$from]}	{ [$join]}
	{ WHERE [$where]}
	{ ORDER BY [$orderBy]}-->(MariaDB,MySQL,SQLite)
	{ LIMIT [$limit]}-->(MariaDB,MySQL,SQLite)
	{ OFFSET [$offset]}-->(MariaDB,MySQL,SQLite)
	{ RETURNING [$returning]}-->(PostgreSQL,Oracle,MariaDB)`;

class update extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE)
			}
		});

		this.$table = new SQLBuilder.SQLPredefined.StringIdentifier(sql);

		this.registerPrivateHelper('set');
	}
}

module.exports = {
	definition: update,
 	description: 'Specifies the Operator for the `UPDATE` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/update.html',
		MariaDB: 'https://mariadb.com/kb/en/library/update/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-update.html',
		SQLite: 'https://sqlite.org/lang_update.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10007.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/queries/update-transact-sql'
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.$update({
							$table: 'people',
							$set: {
								first_name: 'John',
								last_name: 'Doe'
							},
							$where: {
								people_id: 456
							}
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET first_name = $1, last_name = $2 WHERE people_id = $3',
						values: {
							$1: 'John',
							$2: 'Doe',
							$3: 456
						}
					}
				}
			},
			'Using ORDER BY and LIMIT': function(sql) {
				return {
					supportedBy: {
						MariaDB: true,
						MySQL: true,
						SQLite: true
					},
					test: function() {
						return sql.$update({
							$table: 'people',
							$set: {
								salary: 6000
							},
							$where: {
								first_name: 'John'
							},
							$orderBy: 'last_name',
							$limit: 1
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET salary = $1 WHERE first_name = $2 ORDER BY last_name ASC LIMIT $3',
						values: {
							$1: 6000,
							$2: 'John',
							$3: 1
						}
					}
				}
			},
			'Using RETURNING': function(sql) {
				return {
					supportedBy: {
						PostgreSQL: true
					},
					test: function() {
						return sql.$update({
							$table: 'people',
							$set: {
								salary: { $mul: 1.1 }
							},
							$returning: {
								people_id: 1,
								salary: 'new_salary'
							}
						});
					},
					expectedResults: {
						sql: 'UPDATE people SET salary = salary * $1 RETURNING people_id, salary AS new_salary',
						values: {
							$1: 1.1
						}
					}
				}
			}
		}
	}
}
