'use strict';

class check extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax(`CHECK ({* AND [$and] *} {* OR [$or] *})`, SQLBuilder.CALLEE) }
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
				query.$and = andItems;
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
	definition: check,
 	description: 'Specifies the `CHECK` clause for a single Column or Constraint.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/constraints.html',
		MariaDB: 'https://mariadb.com/kb/en/library/constraint/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/ddl-constraints.html',
		SQLite: 'https://sqlite.org/lang_createtable.html#constraints',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$table: 'my_people_table',
							$define: {
								people_id: { $column: { $type: 'INT' } },
								first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								age: {
									$column: {
										$type: sql.INTEGER,
										$check: { age: sql.between(0, 150) },
									}
								},

								uk_people: { $constraint: { $unique: { $columns: ['first_name', 'last_name'] } } }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, age INTEGER CHECK (age BETWEEN $1 AND $2), CONSTRAINT uk_people UNIQUE (first_name, last_name))',
						values: {
							$1: 0,
							$2: 150
						},
						PostgreSQL: {
							sql: 'CREATE TABLE my_people_table (people_id INT, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, age INTEGER CHECK (age BETWEEN 0 AND 150), CONSTRAINT uk_people UNIQUE (first_name, last_name))',
							values: {},
						}
					}
				}
			},
			"Usage as Function": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$table: 'my_people_table',
							$define: {
								people_id: { $column: { $type: 'INT' } },
								first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								age: { $column: { $type: sql.INTEGER } },

								uk_people: { $constraint: { $unique: { $columns: ['first_name', 'last_name'] } } },
								check_age: {
									$constraint: sql.check({
										$and: [
											{ age: sql.gt(0) },
									 		{ age: sql.lt(150) }
										]
									})
								}
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, age INTEGER, CONSTRAINT uk_people UNIQUE (first_name, last_name), CONSTRAINT check_age CHECK (age > $1 AND age < $2))',
						values: {
							$1: 0,
							$2: 150
						},
						PostgreSQL: {
							sql: 'CREATE TABLE my_people_table (people_id INT, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, age INTEGER, CONSTRAINT uk_people UNIQUE (first_name, last_name), CONSTRAINT check_age CHECK (age > 0 AND age < 150))',
							values: {},
						}
					}
				}
			}
		}
	}
}
