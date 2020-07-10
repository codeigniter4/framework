'use strict';

class join extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		let SYNTAX = `
{*INNER JOIN [$innerJoin]*}
{*LEFT OUTER JOIN [$leftJoin]*}
{*RIGHT OUTER JOIN [$rightJoin]*}
{*FULL OUTER JOIN [$fullOuterJoin]*}
{*CROSS JOIN [$crossJoin]*}
{CROSS APPLY [$crossApply]}-->(SQLServer)
{*INNER|LEFT|RIGHT|FULL JOIN LATERAL [$lateral]*}-->(PostgreSQL)
{CROSS JOIN [$cross]}
{INNER JOIN [$inner]}
{LEFT OUTER JOIN [$left]}
{RIGHT OUTER JOIN [$right]}
{FULL OUTER JOIN [$full]}
	{ ON [$on]}
	{ USING ([$using])}

[  ... ]`;

		// option to use OUTER or not
		if (!sql._options.useOuterKeywordOnJoin) {
			SYNTAX = SYNTAX.split('OUTER ').join('');
		}

		this.Types({
			Object: {
				eachItemOf: {
					Object: { syntax: this.Syntax(SYNTAX) },
					Function: { syntax: this.Syntax('<value>[  ... ]') }
				}
			}
		});

		this.registerPrivateHelper('lateral');
		this.registerPrivateHelper('cross');
		this.registerPrivateHelper('inner');
		this.registerPrivateHelper('left');
		this.registerPrivateHelper('right');
		this.registerPrivateHelper('full');

		this.registerPrivateHelper('on');
		this.registerPrivateHelper('using');
	}
}

module.exports = {
	definition: join,
	description: `Specifies the \`JOIN\` operator for the \`FROM\` clause.

> **NOTE**
>
> The keyword \`OUTER\` is an optional keyword for most SQL-dialects. By default it is deactivated. If you need, you can activate this using the option \`useOuterKeywordOnJoin\`.
>
> \`\`\`javascript
> var sql = new SQLBuilder('PostgreSQL', {
>     useOuterKeywordOnJoin: true
> });
> \`\`\`
>`,
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
			eachItemOf: {
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
											'ratings.description': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$inner: 'skills',
												$on: {
													'skills.people_id': { $eq: '~~people.people_id' }
												}
											},
											ratings: {
												$leftJoin: {
													$table: 'skill_ratings',
													$on: { 'skills.rate_id': '~~ratings.rate_id' }
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
								sql: 'SELECT people.first_name, people.last_name, skills.description, ratings.description FROM people INNER JOIN people_skills AS skills ON skills.people_id = people.people_id LEFT JOIN skill_ratings AS ratings ON skills.rate_id = ratings.rate_id WHERE skills.rate > $1',
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
											'ratings.description': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$inner: 'skills',
												$on: {
													'skills.people_id': { $eq: '~~people.people_id' }
												}
											},
											ratings: {
												$leftJoin: {
													$table: 'skill_ratings',
													$on: { 'skills.rate_id': '~~ratings.rate_id' }
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
								sql: 'SELECT people.first_name, people.last_name, skills.description, ratings.description FROM people INNER JOIN people_skills skills ON skills.people_id = people.people_id LEFT JOIN skill_ratings ratings ON skills.rate_id = ratings.rate_id WHERE skills.rate > $1',
								values:{
									$1: 50
								}
							}
						}
					},
					'Join using sub-selects': function(sql) {
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
											'ratings.description': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$inner: 'skills',
												$on: {
													'skills.people_id': { $eq: '~~people.people_id' }
												}
											},
											ratings: {
												$leftJoin: {
													$select: {
														$from: 'skill_ratings',
														$where: {
															'is_people_skill': 1
														}
													},
													$on: { 'skills.rate_id': '~~ratings.rate_id' }
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
								sql: 'SELECT people.first_name, people.last_name, skills.description, ratings.description FROM people INNER JOIN people_skills AS skills ON skills.people_id = people.people_id LEFT JOIN (SELECT * FROM skill_ratings WHERE is_people_skill = $1) AS ratings ON skills.rate_id = ratings.rate_id WHERE skills.rate > $2',
								values:{
									$1: 1,
									$2: 50
								}
							}
						}
					},
					'Oracle Join using sub-selects': function(sql) {
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
											'ratings.description': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$inner: 'skills',
												$on: {
													'skills.people_id': { $eq: '~~people.people_id' }
												}
											},
											ratings: {
												$leftJoin: {
													$select: {
														$from: 'skill_ratings',
														$where: {
															'is_people_skill': 1
														}
													},
													$on: { 'skills.rate_id': '~~ratings.rate_id' }
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
								sql: 'SELECT people.first_name, people.last_name, skills.description, ratings.description FROM people INNER JOIN people_skills skills ON skills.people_id = people.people_id LEFT JOIN (SELECT * FROM skill_ratings WHERE is_people_skill = $1) ratings ON skills.rate_id = ratings.rate_id WHERE skills.rate > $2',
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
											'ratings.description': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$inner: 'skills',
												$on: {
													'skills.people_id': { $eq: '~~people.people_id' }
												}
											},
											ratings: sql.leftJoin('skill_ratings', { $on: { 'skills.rate_id': '~~ratings.rate_id' } })
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}

									}
								});
							},
							expectedResults: {
								sql: 'SELECT people.first_name, people.last_name, skills.description, ratings.description FROM people INNER JOIN people_skills AS skills ON skills.people_id = people.people_id LEFT JOIN skill_ratings AS ratings ON skills.rate_id = ratings.rate_id WHERE skills.rate > $1',
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
											'ratings.description': true
										},
										$from: 'people',
										$join: {
											people_skills: {
												$inner: 'skills',
												$on: {
													'skills.people_id': { $eq: '~~people.people_id' }
												}
											},
											ratings: sql.leftJoin('skill_ratings', { $on: { 'skills.rate_id': '~~ratings.rate_id' } })
										},
										$where: {
											'skills.rate': { $gt: 50 }
										}

									}
								});
							},
							expectedResults: {
								sql: 'SELECT people.first_name, people.last_name, skills.description, ratings.description FROM people INNER JOIN people_skills skills ON skills.people_id = people.people_id LEFT JOIN skill_ratings ratings ON skills.rate_id = ratings.rate_id WHERE skills.rate > $1',
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
