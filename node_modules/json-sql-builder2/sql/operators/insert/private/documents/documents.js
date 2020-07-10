'use strict';

class documents extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax('<value>')
			},
			Array: {
				eachItemOf: {
					Object: { syntax: this.Syntax('<value>') }
				}
			}
		});
	}

	link(query/* is the outer query! */) {
		if (!query.$documents) return;

		// check if we dont have $columns and $values helper
		// at this time
		if (query.$columns || query.$values || query.$records) {
			throw new Error (`Try to link query. Can't use '$documents' Helper together with '$columns', '$values' or '$records' Helper. Query is: '${JSON.stringify(query)}'`);
		}

		// check $documents must be Object or Array of Objects
		if (!(this.isPlainObject(query.$documents) || (this.isArray(query.$documents) && this.isPlainObject(query.$documents[0])))) {
			throw new Error (`Try to link query. Helper '$documents' must be an Object or an Array of Objects. Query is: '${JSON.stringify(query)}'`);
		}

		query.$columns = [];
		if (this.isArray(query.$documents)) {
			query.$records = {};
		} else {
			query.$values = [];
		}

		let refColumnObj = this.isArray(query.$documents) ? query.$documents[0] : query.$documents;
		this.forEach(refColumnObj, (value, key) => {
			query.$columns.push(key);
			if (!this.isArray(query.$documents)){
				query.$values.push(value);
			}
		});

		if (this.isArray(query.$documents)){
			this.forEach(query.$documents, (record, index) => {
				let values = [];
				this.forEach(record, (value, key) => {
					values.push(value);
				});
				query.$records[index] = { $values: values };
			});
		}

		delete query.$documents;
	}
}

module.exports = {
	definition: documents,
	description: `Specifies the special Helper for the \`columns\` and \`VALUES\` clause for the \`INSERT INTO\` Statement.

**Note** This Helper turns each document to $columns and $values properties inside the query.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/insert.html',
		MariaDB: 'https://mariadb.com/kb/en/library/insert/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-insert.html',
		SQLite: 'https://sqlite.org/lang_insert.html',
		Oracle: 'https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3)',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: 40
						}
					}
				}
			},
			"Using Keyword DEFAULT": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								age: sql.DEFAULT
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, DEFAULT)',
						values:{
							$1: 'John',
							$2: 'Doe'
						}
					}
				}
			},
			"Using a NULL value and Date": function(sql) {
				let createdAt = new Date();
				return {
					test: function(){
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								age: null,
								created_at: createdAt
							}
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age, created_at) VALUES ($1, $2, $3, $4)',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: null,
							$4: createdAt //.toISOString()
						}
					}
				}
			}
		},
		Array: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: [
										{
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										}, {
											first_name: 'Jane',
											last_name: 'Dan',
											age: 35
										}
									]
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3), ($4, $5, $6)',
								values: {
									$1: 'John',
									$2: 'Doe',
									$3: 40,
									$4: 'Jane',
									$5: 'Dan',
									$6: 35
								}
							}
						}
					}
				}
			}
		}
	}
}
