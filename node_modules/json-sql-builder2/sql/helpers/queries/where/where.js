'use strict';

class where extends SQLBuilder.SQLHelper {
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
	definition: where,
	description: 'Specifies the `WHERE` clause for the `SELECT` Statement.',
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
					test: function() {
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: 'John'
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = $1',
						values: {
							$1: 'John'
						}
					}
				}
			}
		}
	}
}
