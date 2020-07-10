'use strict';

class using extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-ident>') },
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
				}
			},
			Object: {
				eachItemOf: {
					Boolean: {
						syntax: {
							true: this.Syntax('<key-ident>[ , ... ]'),
							false: this.Syntax(''),
						}
					},
					Number: {
						syntax: {
							1: this.Syntax('<key-ident>[ , ... ]'),
							0: this.Syntax(''),
						}
					}
				}
			}
		});
	}
}

module.exports = {
	definition: using,
	description: 'Specifies the `USING` clause for the `JOIN` operator.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql'
	},
	examples: {
		String: {
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
						return sql.$select({
							$columns: {
								'people.first_name': true,
								'people.last_name': true,
								'skills.description': true,
								'skills.rate': true
							},
							$from: 'people',
							$join: {
								people_skills: { $left: 'skills', $using: 'people_id' }
							},
							$where: {
								'skills.rate': { $gt: 50 }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills AS skills USING (people_id) WHERE skills.rate > $1',
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
						return sql.$select({
							$columns: {
								'people.first_name': true,
								'people.last_name': true,
								'skills.description': true,
								'skills.rate': true
							},
							$from: 'people',
							$join: {
								people_skills: { $left: 'skills', $using: 'people_id' }
							},
							$where: {
								'skills.rate': { $gt: 50 }
							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills skills USING (people_id) WHERE skills.rate > $1',
						values:{
							$1: 50
						}
					}
				}
			}
		},
		Array: {
			eachItemOf: {
				String: {
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
								return sql.$select({
									$columns: {
										'people.first_name': true,
										'people.last_name': true,
										'skills.description': true,
										'skills.rate': true
									},
									$from: 'people',
									$join: {
										people_skills: { $left: 'skills', $using: ['people_id', 'skill_id'] }
									},
									$where: {
										'skills.rate': { $gt: 50 }
									}
								});
							},
							expectedResults: {
								sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills AS skills USING (people_id, skill_id) WHERE skills.rate > $1',
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
								return sql.$select({
									$columns: {
										'people.first_name': true,
										'people.last_name': true,
										'skills.description': true,
										'skills.rate': true
									},
									$from: 'people',
									$join: {
										people_skills: { $left: 'skills', $using: ['people_id', 'skill_id'] }
									},
									$where: {
										'skills.rate': { $gt: 50 }
									}
								});
							},
							expectedResults: {
								sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills skills USING (people_id, skill_id) WHERE skills.rate > $1',
								values:{
									$1: 50
								}
							}
						}
					}
				}
			}
		},
		Object: {
			eachItemOf: {
				Number: {
					1: {
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: 1,
													skill_id: 0
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills AS skills USING (people_id) WHERE skills.rate > $1',
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: 1,
													skill_id: 0
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills skills USING (people_id) WHERE skills.rate > $1',
									values:{
										$1: 50
									}
								}
							}
						}
					},
					0: {
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: 1,
													skill_id: 0
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills AS skills USING (people_id) WHERE skills.rate > $1',
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: 1,
													skill_id: 0
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills skills USING (people_id) WHERE skills.rate > $1',
									values:{
										$1: 50
									}
								}
							}
						}
					}
				},
				Boolean: {
					true: {
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: true,
													skill_id: false
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills AS skills USING (people_id) WHERE skills.rate > $1',
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: true,
													skill_id: false
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills skills USING (people_id) WHERE skills.rate > $1',
									values:{
										$1: 50
									}
								}
							}
						}
					},
					false: {
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: true,
													skill_id: false
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills AS skills USING (people_id) WHERE skills.rate > $1',
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
									return sql.$select({
										$columns: {
											'people.first_name': true,
											'people.last_name': true,
											'skills.description': true,
											'skills.rate': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$left: 'skills',
												$using: {
													people_id: true,
													skill_id: false
												}
											}
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills skills USING (people_id) WHERE skills.rate > $1',
									values:{
										$1: 50
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
