'use strict';

const SYNTAX =
`{AUTO_INCREMENT = [$autoInc]}
{AVG_ROW_LENGTH = [$avgRowLength]}
{CHARACTER SET = [$characterSet]}
{CHECKSUM = [$checksum]}
{COLLATE = [$collation]}
{COMMENT = [$comment]}
{COMPRESSION = [$compression]}
{CONNECTION = [$connection]}
{DATA DIRECTORY = [$dataDirectory]}
{INDEX DIRECTORY = [$indexDirectory]}
{DELAY_KEY_WRITE = [$delayKeyWrite]}
{ENCRYPTION = [$encryption]}
{ENGINE = [$engine]}
{INSERT_METHOD = [$insetMethod]}
{KEY_BLOCK_SIZE = [$keyBlockSize]}
{MAX_ROWS = [$maxRows]}
{MIN_ROWS = [$minRows]}
{PACK_KEYS = [$packKeys]}
{PASSWORD = [$password]}
{ROW_FORMAT = [$rowFormat]}
{STATS_AUTO_RECALC = [$statsAutoRecalc]}
{STATS_PERSISTENT = [$statsPersistent]}
{STATS_SAMPLE_PAGES = [$statsSamplePages]}
{TABLESPACE = [$tablespace]}
{STORAGE = [$storage]}

[ , ... ]`;

class options extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Primitive: { syntax: this.Syntax('<key-ident> = <value-param>[ , ... ]') }
				}
			},
			Array: {
				eachItemOf: {
					Object: { syntax: this.Syntax(SYNTAX) }
				}
			}
		});

		if (sql.isMariaDB() || sql.isMySQL()) {
			this.$autoInc = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$avgRowLength = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$characterSet = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$checksum = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$collation = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$comment = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$compression = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$connection = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$dataDirectory = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$indexDirectory = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$delayKeyWrite = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$encryption = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$engine = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$insetMethod = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$keyBlockSize = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$maxRows = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$minRows = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$packKeys = new SQLBuilder.SQLPredefined.Default01(sql);
			this.$password = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$rowFormat = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$statsAutoRecalc = new SQLBuilder.SQLPredefined.Default01(sql);
			this.$statsPersistent = new SQLBuilder.SQLPredefined.Default01(sql);
			this.$statsSamplePages = new SQLBuilder.SQLPredefined.NumberValue(sql);
			this.$tablespace = new SQLBuilder.SQLPredefined.StringValueParam(sql);
			this.$storage = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		}
	}
}

module.exports = {
	definition: options,
 	description: 'Specifies the `options` of the `CREATE TABLE` Statement to place table Options.',
	supportedBy: {
		MariaDB: 'https://mariadb.com/kb/en/library/create-table/#table-options',
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/create-table.html'
	},
	examples: {
		Object: {
			eachItemOf: {
				Primitive: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$createTable({
									$table: 'my_people_table',
									$define: {
										people_id: { $column: { $type: 'INT', $default: 0 } },
										first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										bio: { $column: { $type: 'TEXT' } }
									},
									$options: {
										AUTO_INCREMENT: 100,
										ENGINE: 'InnoDb',
										MAX_ROWS: 1000,
										TABLESPACE: 'ts1'
									}
								});
							},
							expectedResults: {
								sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) AUTO_INCREMENT = $2, ENGINE = $3, MAX_ROWS = $4, TABLESPACE = $5',
								values: {
									$1: 0,
									$2: 100,
									$3: 'InnoDb',
									$4: 1000,
									$5: 'ts1'
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
							test: function(){
								return sql.$createTable({
									$table: 'my_people_table',
									$define: {
										people_id: { $column: { $type: 'INT', $default: 0 } },
										first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
										bio: { $column: { $type: 'TEXT' } }
									},
									$options: [
										{ $autoInc: 100 },
										{ $engine: 'InnoDb' },
										{ $maxRows: 1000 },
										{ $tablespace: 'ts1' }
									]
								});
							},
							expectedResults: {
								sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT $1, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT) AUTO_INCREMENT = 100, ENGINE = $2, MAX_ROWS = 1000, TABLESPACE = $3',
								values: {
									$1: 0,
									$2: 'InnoDb',
									$3: 'ts1'
								}
							}
						}
					}
				}
			}
		}
	}
}
