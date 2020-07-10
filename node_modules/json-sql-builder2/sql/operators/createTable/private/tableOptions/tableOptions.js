'use strict';

const SYNTAX =
`{OIDS = [$oids]}-->(PostgreSQL)
{fillfactor = [$fillFactor]}-->(PostgreSQL)
{autovacuum_enabled = [$autovacuumEnabled]}-->(PostgreSQL)
{toast.autovacuum_enabled = [$toastAutovacuumEnabled]}-->(PostgreSQL)
{autovacuum_vacuum_threshold = [$autovacuumVacuumThreshold]}-->(PostgreSQL)
{toast.autovacuum_vacuum_threshold = [$toastAutovacuumVacuumThreshold]}-->(PostgreSQL)
{autovacuum_vacuum_scale_factor = [$autovacuumVacuumScaleFactor]}-->(PostgreSQL)
{toast.autovacuum_vacuum_scale_factor = [$toastAutovacuumVacuumScaleFactor]}-->(PostgreSQL)
{autovacuum_analyze_threshold = [$autovacuumAnalyzeThreshold]}-->(PostgreSQL)
{autovacuum_analyze_scale_factor = [$autovacuumAnalyzeScaleFactor]}-->(PostgreSQL)
{autovacuum_vacuum_cost_delay = [$autovacuumVacuumCostDelay]}-->(PostgreSQL)
{toast.autovacuum_vacuum_cost_delay = [$toastAutovacuumVacuumCostDelay]}-->(PostgreSQL)
{autovacuum_vacuum_cost_limit = [$autovacuumVacuumCostLimit]}-->(PostgreSQL)
{toast.autovacuum_vacuum_cost_limit = [$toastAutovacuumVacuumCostLimit]}-->(PostgreSQL)
{autovacuum_freeze_min_age = [$autovacuumFreezeMinAge]}-->(PostgreSQL)
{toast.autovacuum_freeze_min_age = [$toastAutovacuumFreezeMinAge]}-->(PostgreSQL)
{autovacuum_freeze_max_age = [$autovacuumFreezeMaxAge]}-->(PostgreSQL)
{toast.autovacuum_freeze_max_age = [$toastAutovacuumFreezeMaxAge]}-->(PostgreSQL)
{autovacuum_freeze_table_age = [$autovacuumFreezeTableAge]}-->(PostgreSQL)
{toast.autovacuum_freeze_table_age = [$toastAutovacuumFreezeTableAge]}-->(PostgreSQL)

[ , ... ]`;

class tableOptions extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Boolean: { syntax: this.Syntax('<key-ident> = <value-param>[ , ... ]') },
					Number: { syntax: this.Syntax('<key-ident> = <value-param>[ , ... ]') }
				}
			},
			Array: {
				eachItemOf: {
					Object: { syntax: this.Syntax(SYNTAX) }
				}
			}
		});

		if (sql.isPostgreSQL()) {
			this.$fillFactor = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumEnabled = new SQLBuilder.SQLPredefined.BooleanValue(sql);
			this.$toastAutovacuumEnabled = new SQLBuilder.SQLPredefined.BooleanValue(sql);
			this.$autovacuumVacuumThreshold = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$toastAutovacuumVacuumThreshold = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumVacuumScaleFactor = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$toastAutovacuumVacuumScaleFactor = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumAnalyzeThreshold = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumAnalyzeScaleFactor = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumVacuumCostDelay = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$toastAutovacuumVacuumCostDelay = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumVacuumCostLimit = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$toastAutovacuumVacuumCostLimit = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumFreezeMinAge = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$toastAutovacuumFreezeMinAge = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumFreezeMaxAge = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$toastAutovacuumFreezeMaxAge = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$autovacuumFreezeTableAge = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$toastAutovacuumFreezeTableAge = new SQLBuilder.SQLPredefined.NumberValue(sql);
		}
	}
}

module.exports = {
	definition: tableOptions,
 	description: 'Specifies the `WITH` clause of the `CREATE TABLE` Statement to place table Options.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-createtable.html',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql'
	},
	examples: {
		Object: {
			eachItemOf: {
				Boolean: {
					"Basic Usage": function(sql) {
						return {
							supportedBy: {
								PostgreSQL: true
							},
							test: function(){
								return sql.$createTable({
									$table: 'my_people_table',
									$define: {
										people_id: { $column: { $type: 'INT', $default: 0 } },
										first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										bio: { $column: { $type: 'TEXT' } }
									},
									$tableOptions: {
										OIDS: true,
										fillfactor: 70,
										autovacuum_enabled: true,
										autovacuum_vacuum_threshold: 100
									}
								});
							},
							expectedResults: {
								sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) WITH (OIDS = TRUE, fillfactor = 70, autovacuum_enabled = TRUE, autovacuum_vacuum_threshold = 100)',
								values: {
									$1: 0
								},
								PostgreSQL: {
									sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) WITH (OIDS = TRUE, fillfactor = 70, autovacuum_enabled = TRUE, autovacuum_vacuum_threshold = 100)',
									values: {}
								}
							}
						}
					}
				},
				Number: {
					"Basic Usage": function(sql) {
						return {
							supportedBy: {
								PostgreSQL: true
							},
							test: function(){
								return sql.$createTable({
									$table: 'my_people_table',
									$define: {
										people_id: { $column: { $type: 'INT', $default: 0 } },
										first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										bio: { $column: { $type: 'TEXT' } }
									},
									$tableOptions: {
										fillfactor: 70,
										autovacuum_enabled: true,
										autovacuum_vacuum_threshold: 100
									}
								});
							},
							expectedResults: {
								sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) WITH (fillfactor = 70, autovacuum_enabled = TRUE, autovacuum_vacuum_threshold = 100)',
								values: {
									$1: 0
								},
								PostgreSQL: {
									sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) WITH (fillfactor = 70, autovacuum_enabled = TRUE, autovacuum_vacuum_threshold = 100)',
									values: {}
								}
							}
						}
					}
				}
			}
		},
		Array: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							supportedBy: {
								PostgreSQL: true
							},
							test: function(){
								return sql.$createTable({
									$table: 'my_people_table',
									$define: {
										people_id: { $column: { $type: 'INT', $default: 0 } },
										first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										bio: { $column: { $type: 'TEXT' } }
									},
									$tableOptions: [
										{ $fillFactor: 70 },
										{ $autovacuumEnabled: true },
										{ $autovacuumVacuumThreshold: 100 }
									]
								});
							},
							expectedResults: {
								sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) WITH (fillfactor = 70, autovacuum_enabled = true, autovacuum_vacuum_threshold = 100)',
								values: {
									$1: 0
								},
								PostgreSQL: {
									sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) WITH (fillfactor = 70, autovacuum_enabled = true, autovacuum_vacuum_threshold = 100)',
									values: {}
								}
							}
						}
					}
				}
			}

		}
	}
}
