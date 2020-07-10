'use strict';

/* Original Syntax of PostgreSQL 9.5

INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
    { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
    [ ON CONFLICT [ conflict_target ] conflict_action ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]

where conflict_target can be one of:

    ( { index_column_name | ( index_expression ) } [ COLLATE collation ] [ opclass ] [, ...] ) [ WHERE index_predicate ]
    ON CONSTRAINT constraint_name

and conflict_action is one of:

    DO NOTHING
    DO UPDATE SET { column_name = { expression | DEFAULT } |
                    ( column_name [, ...] ) = ( { expression | DEFAULT } [, ...] ) |
                    ( column_name [, ...] ) = ( sub-SELECT )
                  } [, ...]
              [ WHERE condition ]
*/
const SYNTAX = ` ON CONFLICT{ ([$columns])}
	{ ON CONSTRAINT [$onConstraint]}
		{ DO NOTHING[$doNothing]}
		{ DO UPDATE SET [$doUpdateSet]}
`;

const SetHelper = require('../../../update/private/set/set.js').definition;

class onConflict extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax(SYNTAX) }
		});

		this.$doNothing = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);
		this.$onConstraint = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$doUpdateSet = new SetHelper(sql);

		this.registerPrivateHelper('columns');
	}
}

module.exports = {
	definition: onConflict,
	description: `Specifies the \`ON CONFLICT\` clause used by the \`INSERT INTO\` Statement.`,
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-insert.html#SQL-ON-CONFLICT',
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$insert({ $table: 'people',
							$documents: {
								staff_no: 1,
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							},
							$onConflict: {
								$columns: ['staff_no'],
								$doNothing: true
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON CONFLICT (staff_no) DO NOTHING',
						values:{
							$1: 1,
							$2: 'John',
							$3: 'Doe',
							$4: 40
						}
					}
				}
			},
			"Basic Usage with ON CONSTRAINT": function(sql) {
				return {
					test: function(){
						return sql.$insert({ $table: 'people',
							$documents: {
								staff_no: 1,
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							},
							$onConflict: {
								$onConstraint: 'pk_people',
								$doNothing: true
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT pk_people DO NOTHING',
						values:{
							$1: 1,
							$2: 'John',
							$3: 'Doe',
							$4: 40
						}
					}
				}
			},
			"Basic Usage with DO UPDATE SET": function(sql) {
				return {
					test: function(){
						return sql.$insert({ $table: 'people',
							$documents: {
								staff_no: 1,
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							},
							$onConflict: {
								$onConstraint: 'pk_people',
								$doUpdateSet: {
									staff_no: sql.select({ new_stuff_no: { $: { $max: 'staff_no', $add: 1 } } }, {
										$from: 'people'
									}),
									first_name: { $excluded: 'first_name' },
									last_name: { $excluded: 'last_name' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (staff_no, first_name, last_name, age) VALUES ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT pk_people DO UPDATE SET staff_no = (SELECT MAX(staff_no) + $5 AS new_stuff_no FROM people), first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name',
						values:{
							$1: 1,
							$2: 'John',
							$3: 'Doe',
							$4: 40,
							$5: 1
						}
					}
				}
			}
		}
	}
}
