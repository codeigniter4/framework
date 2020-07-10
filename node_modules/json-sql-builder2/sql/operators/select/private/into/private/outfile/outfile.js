'use strict';

const SYNTAX =
`<$file>
	{ FIELDS TERMINATED BY [$fieldTerminator]}
	{ ENCLOSED BY [$enclosedBy]}
	{ ESCAPED BY [$escapedBy]}
	{ LINES TERMINATED BY [$lineTerminator]}`;

class outfile extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
			Object: { syntax: this.Syntax(SYNTAX) }
		});

		this.$file = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$fieldTerminator = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$enclosedBy = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$escapedBy = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$lineTerminator = new SQLBuilder.SQLPredefined.StringValueParam(sql)
	}
}

module.exports = {
	definition: outfile,
	description: 'Specifies the `OUTFILE` option for the `SELECT ... INTO` Statement.',
 	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select-into.html',
		MariaDB: 'https://mariadb.com/kb/en/library/selectinto/',
	},
	examples: {
		String: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								$into: { $outfile: '/tmp/peopledata.txt'},
								$from: 'people',
								$limit: 1
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT * INTO OUTFILE $1 FROM people LIMIT $2',
						values: {
							$1: '/tmp/peopledata.txt',
							$2: 1
						}
					}
				}
			}
		},
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								people_id: 1,
								first_name: 1,
								last_name: 1,
								$into: {
									$outfile: {
										$file: '/tmp/peopledata.csv',
										$fieldTerminator: ',',
										$enclosedBy: '"',
										$lineTerminator: '\n'
									}
								},
								$from: 'people'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT people_id, first_name, last_name INTO OUTFILE $1 FIELDS TERMINATED BY $2 ENCLOSED BY $3 LINES TERMINATED BY $4 FROM people',
						values: {
							$1: '/tmp/peopledata.csv',
							$2: ',',
							$3: '"',
							$4: '\n'
						}
					}
				}
			}
		}
	}
}
