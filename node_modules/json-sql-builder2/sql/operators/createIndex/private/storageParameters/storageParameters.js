'use strict';

const SYNTAX = `
{fillfactor = [$fillFactor]}-->(PostgreSQL,SQLServer)
{buffering = [$buffering]}-->(PostgreSQL)
{fastupdate = [$fastupdate]}-->(PostgreSQL)
{gin_pending_list_limit = [$ginPendingListLimit]}-->(PostgreSQL)
{pages_per_range = [$pagesPerRange]}-->(PostgreSQL)

{PAD_INDEX = [$padIndex]}-->(SQLServer)
{SORT_IN_TEMPDB = [$sortInTempDB]}-->(SQLServer)
{IGNORE_DUP_KEY = [$ignoreDupKey]}-->(SQLServer)
{STATISTICS_NORECOMPUTE = [$statisticsNoreCompute]}-->(SQLServer)
{STATISTICS_INCREMENTAL = [$statisticsIncremental]}-->(SQLServer)
{DROP_EXISTING = [$dropExisting]}-->(SQLServer)
{ONLINE = [$online]}-->(SQLServer)
{ALLOW_ROW_LOCKS = [$allowRowLocks]}-->(SQLServer)
{ALLOW_PAGE_LOCKS = [$allowPageLocks]}-->(SQLServer)
{MAXDOP = [$maxdop]}-->(SQLServer)

[ , ... ]`;

class storageParameters extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: {
				eachItemOf: {
					Object: { syntax: this.Syntax(SYNTAX) }
				}
			}
		});

		if (sql.isPostgreSQL()) {
			this.$fillFactor = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$buffering = new SQLBuilder.SQLPredefined.OnOffAuto(sql); // ON, OFF, AUTO
			this.$fastupdate = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$ginPendingListLimit = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$pagesPerRange = new SQLBuilder.SQLPredefined.NumberValue(sql);
		}
		if (sql.isSQLServer()) {
			this.$fillFactor = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$padIndex = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$sortInTempDB = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$ignoreDupKey = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$statisticsNoreCompute = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$statisticsIncremental = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$dropExisting = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$online = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$allowRowLocks = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$allowPageLocks = new SQLBuilder.SQLPredefined.OnOff(sql); // ON, OFF
			this.$maxdop = new SQLBuilder.SQLPredefined.NumberValue(sql);
		}
	}

	preBuild(query, identifier) {
		/* check if query is an object, so we turn the query to an array of objects
		 * like this example:
		$storageParameters: {
			fillfactor: 70,
			buffering: sql.OFF
		}

		 * after turning the object into an arry it looks like:
		$storageParameters: [
 			{ $fillfactor: 70 },
 			{ $buffering: sql.OFF }
 		]
		*/

		if (this.isPlainObject(query)) {
			let storageParameters = [];
			this.forEach(query, (value, key) => {
				storageParameters.push({
					['$' + key]: value
				});
			});

			return storageParameters;
		}

		return query;
	}
}

module.exports = {
	definition: storageParameters,
 	description: 'Specifies the `WITH` clause of the `CREATE INDEX` Statement to place the storage Parameters and additional Options.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-createtable.html',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql'
	},
	examples: {
		Array: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							supportedBy: {
								PostgreSQL: true
							},
							test: function(){
								return sql.$createIndex({
									$name: 'idx_people_name',
									$table: 'people',
									$columns: {
										first_name: true,
										last_name: true
									},
									$storageParameters: [
										{ $fillFactor: 70 },
										{ $fastupdate: sql.OFF }
									]
								});
							},
							expectedResults: {
								sql: 'CREATE INDEX idx_people_name ON people (first_name ASC, last_name ASC) WITH (fillfactor = 70, fastupdate = OFF)',
								values: {}
							}
						}
					},
					"Shortcut using an Object to define parameters": function(sql) {
						return {
							supportedBy: {
								PostgreSQL: true
							},
							test: function(){
								return sql.$createIndex({
									$name: 'idx_people_name',
									$table: 'people',
									$columns: {
										first_name: true,
										last_name: true
									},
									$storageParameters: {
										fillFactor: 70,
										fastupdate: sql.OFF
									}
								});
							},
							expectedResults: {
								sql: 'CREATE INDEX idx_people_name ON people (first_name ASC, last_name ASC) WITH (fillfactor = 70, fastupdate = OFF)',
								values: {}
							}
						}
					},
					"Usage for SQLServer": function(sql) {
						return {
							supportedBy: {
								SQLServer: true
							},
							test: function(){
								return sql.$createIndex({
									$name: 'idx_people_name',
									$table: 'people',
									$columns: {
										first_name: true,
										last_name: true
									},
									$storageParameters: {
										dropExisting: true,
										padIndex: sql.ON
									}
								});
							},
							expectedResults: {
								sql: 'CREATE INDEX idx_people_name ON people (first_name ASC, last_name ASC) WITH (DROP_EXISTING = ON, PAD_INDEX = ON)',
								values: {}
							}
						}
					}
				}
			}
		}
	}
}
