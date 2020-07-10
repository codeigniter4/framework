'use strict';

class joinHelper extends SQLBuilder.SQLHelper {
	constructor(sql, joinType){
		super(sql);
		let aliasKeyword = sql.isOracle() ? ' ' : ' AS ';
		let joinSyntax = joinType + '{ LATERAL[$lateral]}-->(PostgreSQL){ [$table]}{ [$select]}' + aliasKeyword + '<key-ident>{ ON [$on]}{ USING [$using]}';
		if (!sql._options.useOuterKeywordOnJoin) {
			joinSyntax = joinSyntax.split('OUTER ').join('');
		}

		this.Types({
			Object: { syntax: this.Syntax(joinSyntax) },
		});

		this.Keyword('LATERAL');

		this.registerPrivateHelper('on', '../');

		this.$table = new SQLBuilder.SQLPredefined.StringIdentifier(sql);
		this.$lateral = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);

		let self = this;
		// calling conventions are (example using leftJoin):
		// sql.leftJoin(<lateral>, <string:table>, [options])
		// sql.leftJoin(<lateral>, <object:$select>, [options])
		// sql.leftJoin(<string:table>, [options])
		// sql.leftJoin(<object:$select>, [options])
		this.callee = function(lateral, tableOrSelect, options) {
			let __identifier__ = arguments[arguments.length-1];

			let query = {};

			if (lateral === this.LATERAL) {
				query.$lateral = true;
				if (this.isString(tableOrSelect)) {
					query.$table = tableOrSelect;
				} else if(this.isPlainObject(tableOrSelect)) {
					query.$select = tableOrSelect;
				}
			} else if (this.isString(lateral)) {
				query.$table = lateral;
				options = tableOrSelect;
			} else if (this.isPlainObject(lateral)) {
				query.$select = lateral;
				options = tableOrSelect;
			}

			if (options && options.$on) query.$on = options.$on;
			if (options && options.$using) query.$using = options.$using;

			return self.__build__(query, __identifier__);
		}
	}
}

module.exports = {
	definition: joinHelper,
	description: 'Generic Helper for left, right, full outer and cross join operators.',
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
									skills: {
										$leftJoin: {
											$table: 'people_skills',
											$on: { 'skills.people_id': { $eq: '~~people.people_id' } },
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
									skills: {
										$leftJoin: {
											$table: 'people_skills',
											$on: { 'skills.people_id': { $eq: '~~people.people_id' } },
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
									skills: sql.leftJoin('people_skills', {
										$on: { 'skills.people_id': { $eq: '~~people.people_id' } }
									})
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
			'Oracle usage as Function': function(sql) {
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
									skills: sql.leftJoin('people_skills', {
										$on: { 'skills.people_id': { $eq: '~~people.people_id' } }
									})
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
