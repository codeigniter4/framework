'use strict';

const cross = require('../cross/cross');
const inner = require('../inner/inner');
const left = require('../left/left');
const right = require('../right/right');
const full = require('../full/full');
const on = require('../on/on');
//const using = require('../using/using');

class lateral extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		let SYNTAX = `
{CROSS JOIN LATERAL [$cross]}
{INNER JOIN LATERAL [$inner]}
{LEFT OUTER JOIN LATERAL [$left]}
{RIGHT OUTER JOIN LATERAL [$right]}
{FULL OUTER JOIN LATERAL [$full]}
	{ ON [$on]}
	{ USING ([$using])}`;

		// option to use OUTER or not
		if (!sql._options.useOuterKeywordOnJoin) {
			SYNTAX = SYNTAX.split('OUTER ').join('');
		}

		this.Types({
			Object: { syntax: this.Syntax(SYNTAX) }
		});

		this.$cross = new cross.definition(sql);
		this.$inner = new inner.definition(sql);
		this.$left = new left.definition(sql);
		this.$right = new right.definition(sql);
		this.$full = new full.definition(sql);

		this.$on = new on.definition(sql);
		//this.$using = new using.definition(sql);
	}
}

module.exports = {
	definition: lateral,
	description: `Specifies the \`LATERAL\` operator for the \`JOIN\` clause.`,
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/queries-table-expressions.html#QUERIES-LATERAL'
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
									'skills.rating': true,
								},
								$from: 'people',
								$join: {
									people_skills: {
										$lateral: {
											$inner: 'skills',
											$on: {
												'skills.people_id': { $eq: '~~people.people_id' }
											}
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
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rating FROM people INNER JOIN LATERAL people_skills AS skills ON skills.people_id = people.people_id WHERE skills.rate > $1',
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
									'skills.rating': true,
								},
								$from: 'people',
								$join: {
									people_skills: {
										$lateral: {
											$inner: 'skills',
											$on: {
												'skills.people_id': { $eq: '~~people.people_id' }
											}
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
						sql: 'SELECT people.first_name, people.last_name, skills.description, skills.rating FROM people INNER JOIN LATERAL people_skills skills ON skills.people_id = people.people_id WHERE skills.rate > $1',
						values:{
							$1: 50
						}
					}
				}
			}
		}
	}
}
