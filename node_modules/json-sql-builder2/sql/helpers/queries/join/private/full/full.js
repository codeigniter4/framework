'use strict';

const joinHelper = require('../.joinHelper');

class full extends joinHelper {
	constructor(sql){
		super(sql, 'full');
	}
}

module.exports = {
	definition: full,
	description: 'Specifies the `FULL OUTER JOIN` operator for the `FROM` clause.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql'
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
									people_skills: {
										$full: 'skills',
										$on: {
											'skills.people_id': { $eq: '~~people.people_id' }
										}
									}
								},
								$where: {
									'skills.rate': { $gt: 50 }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people FULL JOIN people_skills AS skills ON skills.people_id = people.people_id WHERE skills.rate > $1',
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
									people_skills: {
										$full: 'skills',
										$on: {
											'skills.people_id': { $eq: '~~people.people_id' }
										}
									}
								},
								$where: {
									'skills.rate': { $gt: 50 }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people FULL JOIN people_skills skills ON skills.people_id = people.people_id WHERE skills.rate > $1',
						values:{
							$1: 50
						}
					}
				}
			}
		},
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
									skills: {
										$right: {
											$select: {
												$from: 'people_skills',
												$where: {
													is_skill: 1
												}
											}
										},
										$on: {
											'skills.people_id': { $eq: '~~people.people_id' }
										}
									}
								},
								$where: {
									'skills.rate': { $gt: 50 }
								}

							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people RIGHT JOIN (SELECT * FROM people_skills WHERE is_skill = $1) AS skills ON skills.people_id = people.people_id WHERE skills.rate > $2',
						values:{
							$1: 1,
							$2: 50
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
									skills: {
										$right: {
											$select: {
												$from: 'people_skills',
												$where: {
													is_skill: 1
												}
											}
										},
										$on: {
											'skills.people_id': { $eq: '~~people.people_id' }
										}
									}
								},
								$where: {
									'skills.rate': { $gt: 50 }
								}

							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people RIGHT JOIN (SELECT * FROM people_skills WHERE is_skill = $1) skills ON skills.people_id = people.people_id WHERE skills.rate > $2',
						values:{
							$1: 1,
							$2: 50
						}
					}
				}
			}
		},
		Function: {
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
									skills: {
										$right: sql.select('*', {
											$from: 'people_skills',
											$where: {
												is_skill: 1
											}
										}),
										$on: {
											'skills.people_id': { $eq: '~~people.people_id' }
										}
									}
								},
								$where: {
									'skills.rate': { $gt: 50 }
								}

							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people RIGHT JOIN (SELECT * FROM people_skills WHERE is_skill = $1) AS skills ON skills.people_id = people.people_id WHERE skills.rate > $2',
						values:{
							$1: 1,
							$2: 50
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
									skills: {
										$right: sql.select('*', {
											$from: 'people_skills',
											$where: {
												is_skill: 1
											}
										}),
										$on: {
											'skills.people_id': { $eq: '~~people.people_id' }
										}
									}
								},
								$where: {
									'skills.rate': { $gt: 50 }
								}

							}
						});
					},
					expectedResults: {
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people RIGHT JOIN (SELECT * FROM people_skills WHERE is_skill = $1) skills ON skills.people_id = people.people_id WHERE skills.rate > $2',
						values:{
							$1: 1,
							$2: 50
						}
					}
				}
			}
		}
	}
}
