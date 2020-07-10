'use strict';

const joinHelper = require('../.joinhelper');

class crossJoin extends joinHelper.definition {
	constructor(sql){
		super(sql, 'CROSS JOIN');
	}
}

module.exports = {
	definition: crossJoin,
	description: 'Specifies the `CROSS JOIN` operator for the `FROM` clause.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql'
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					supportedBy: {
						MySQL: true,
						MariaDB: true,
						PostgreSQL: true,
						SQLite: true,
						SQLServer: true
					},
					test: function(){
						return sql.build({
							$select: {
								$columns: {
									'people.first_name': true,
									'people.last_name': true,
									'skills.description': true,
									'skills.rate': true
								},
								$from: 'people',
								$join: {
									skills: { $crossJoin: { $table: 'people_skills' } }

								},
								$where: {
									'skills.rate': { $gt: 50 }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people CROSS JOIN people_skills AS skills WHERE skills.rate > $1',
						values:{
							$1: 50
						}
					}
				}
			},
			'Oracle Basic Usage': function(sql) {
				return {
					supportedBy: {
						Oracle: true,
					},
					test: function(){
						return sql.build({
							$select: {
								$columns: {
									'people.first_name': true,
									'people.last_name': true,
									'skills.description': true,
									'skills.rate': true
								},
								$from: 'people',
								$join: {
									skills: { $crossJoin: { $table: 'people_skills' } }

								},
								$where: {
									'skills.rate': { $gt: 50 }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people CROSS JOIN people_skills skills WHERE skills.rate > $1',
						values:{
							$1: 50
						}
					}
				}
			},
			'Usage as Function': function(sql) {
				return {
					supportedBy: {
						MySQL: true,
						MariaDB: true,
						PostgreSQL: true,
						SQLite: true,
						SQLServer: true
					},
					test: function(){
						return sql.build({
							$select: {
								$columns: {
									'people.first_name': true,
									'people.last_name': true,
									'skills.description': true,
									'skills.rate': true
								},
								$from: 'people',
								$join: {
									skills: sql.crossJoin('people_skills')
								},
								$where: {
									'skills.rate': { $gt: 50 }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people CROSS JOIN people_skills AS skills WHERE skills.rate > $1',
						values:{
							$1: 50
						}
					}
				}
			}
		},
		'Oracle Usage as Function': function(sql) {
			return {
				supportedBy: {
					Oracle: true,
				},
				test: function(){
					return sql.build({
						$select: {
							$columns: {
								'people.first_name': true,
								'people.last_name': true,
								'skills.description': true,
								'skills.rate': true
							},
							$from: 'people',
							$join: {
								skills: sql.crossJoin('people_skills')
							},
							$where: {
								'skills.rate': { $gt: 50 }
							}
						}
					});
				},
				expectedResults: {
					sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people CROSS JOIN people_skills skills WHERE skills.rate > $1',
					values:{
						$1: 50
					}
				}
			}
		}
	}
}
