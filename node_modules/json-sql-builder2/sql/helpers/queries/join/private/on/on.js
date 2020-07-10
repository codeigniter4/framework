'use strict';

class on extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax('{* AND [$and] *} {* OR [$or] *}')
			}
		});
	}

	preBuild(query) {
		// by defaut move all conditions to $and
		// if there is no $and / $or defined
		if (!query.$and && !query.$or) {
			let andItems = [];
			this.forEach(query, (value, key)=>{
				if (this.isIdentifier(key)) {
					let o = {}; o[key]=value;
					andItems.push(o);
				}
			});
			if (andItems.length > 0) {
				query.$and = andItems; //_.cloneDeep(andItems);
				this.forEach(query, (value, key)=>{
					if (this.isIdentifier(key)) {
						delete query[key];
					}
				});
			}
		}

		return query;
	}
}

module.exports = {
	definition: on,
	description: 'Specifies the `ON` clause for the `JOIN` operator.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql'
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
									people_skills: {
										$left: 'skills',
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
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills AS skills ON skills.people_id = people.people_id WHERE skills.rate > $1',
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
										$left: 'skills',
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
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rate FROM people LEFT JOIN people_skills skills ON skills.people_id = people.people_id WHERE skills.rate > $1',
						values:{
							$1: 50
						}
					}
				}
			}
		}
	}
}
