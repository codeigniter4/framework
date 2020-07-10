'use strict';

class dumpfile extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
		});
	}
}

module.exports = {
	definition: dumpfile,
	description: 'Specifies the `DUMPFILE` option for the `SELECT ... INTO` Statement.',
 	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select-into-dumpfile/',
	},
	examples: {
		String: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								photo: 1, $into: { $dumpfile: '/tmp/peoplephoto.jpg'},
								$from: 'people',
								$limit: 1
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT photo INTO DUMPFILE $1 FROM people LIMIT $2',
						values: {
							$1: '/tmp/peoplephoto.jpg',
							$2: 1
						}
					}
				}
			}
		}
	}
}
