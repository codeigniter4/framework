'use strict';

/* From the docs:

MariaDB:
index_type:
    USING {BTREE | HASH | RTREE}

MySQL:
index_type:
    USING {BTREE | HASH}

PostgreSQL:
	The name of the index method to be used.
	Choices are btree, hash, gist, spgist, gin, and brin. The default method is btree.

*/
class using extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		let definedTypes = {
			String: {
				syntax: {
					BTREE: this.Syntax('BTREE'),
					HASH: this.Syntax('HASH')
				}
			}
		};

		this.Keyword('BTREE');
		this.Keyword('HASH');

		if (sql.isMariaDB()) {
			definedTypes.String.syntax.RTREE = this.Syntax('RTREE');
			this.Keyword('RTREE');
		}
		if (sql.isPostgreSQL()) {
			definedTypes.String.syntax.GIST = this.Syntax('GIST');
			this.Keyword('GIST');
			definedTypes.String.syntax.SPGIST = this.Syntax('SPGIST');
			this.Keyword('SPGIST');
			definedTypes.String.syntax.GIN = this.Syntax('GIN');
			this.Keyword('GIN');
			definedTypes.String.syntax.BRIN = this.Syntax('BRIN');
			this.Keyword('BRIN');
		}
		this.Types(definedTypes);
	}

	preBuild(query, identifier){
		if (this.isString(query)) return query;

		// translate symbols to String
		if (query === this.BTREE) return 'BTREE';
		if (query === this.HASH) return 'HASH';

		if (this.isMariaDB()) {
			if (query === this.RTREE) return 'RTREE';
		}
		if (this.isPostgreSQL()) {
			if (query === this.GIST) return 'GIST';
			if (query === this.SPGIST) return 'SPGIST';
			if (query === this.GIN) return 'GIN';
			if (query === this.BRIN) return 'BRIN';
		}
		return query;
	}
}

module.exports = {
	definition: using,
 	description: 'Specifies the `USING` clause for the `CREATE INDEX` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/create-index.html',
		MariaDB: 'https://mariadb.com/kb/en/library/create-index/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-createindex.html',
	},
	examples: {
		String: {
			BTREE: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$createIndex({
								$unique: true,
								$table: 'people',
								$columns: {
									first_name: true,
									last_name: true
								},
								$using: sql.BTREE // or $using: 'BTREE'
							});
						},
						expectedResults: {
							sql: 'CREATE UNIQUE INDEX ON people USING BTREE (first_name ASC, last_name ASC)',
							values: {},
						}
					}
				}
			},
			HASH: {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.$createIndex({
								$unique: true,
								$table: 'people',
								$columns: {
									first_name: true,
									last_name: true
								},
								$using: sql.HASH // or $using: 'HASH'
							});
						},
						expectedResults: {
							sql: 'CREATE UNIQUE INDEX ON people USING HASH (first_name ASC, last_name ASC)',
							values: {},
						}
					}
				}
			},
			RTREE: {
				"Basic Usage": function(sql) {
					return {
						supportedBy: {
							MariaDB: true
						},
						test: function(){
							return sql.$createIndex({
								$unique: true,
								$table: 'people',
								$columns: {
									first_name: true,
									last_name: true
								},
								$using: sql.RTREE // or $using: 'RTREE'
							});
						},
						expectedResults: {
							sql: 'CREATE UNIQUE INDEX ON people USING RTREE (first_name ASC, last_name ASC)',
							values: {},
						}
					}
				}
			},
			GIST: {
				"Basic Usage": function(sql) {
					return {
						supportedBy: {
							PostgreSQL: true
						},
						test: function(){
							return sql.$createIndex({
								$unique: true,
								$table: 'people',
								$columns: {
									first_name: true,
									last_name: true
								},
								$using: sql.GIST // or $using: 'GIST'
							});
						},
						expectedResults: {
							sql: 'CREATE UNIQUE INDEX ON people USING GIST (first_name ASC, last_name ASC)',
							values: {},
						}
					}
				}
			},
			SPGIST: {
				"Basic Usage": function(sql) {
					return {
						supportedBy: {
							PostgreSQL: true
						},
						test: function(){
							return sql.$createIndex({
								$unique: true,
								$table: 'people',
								$columns: {
									first_name: true,
									last_name: true
								},
								$using: sql.SPGIST // or $using: 'SPGIST'
							});
						},
						expectedResults: {
							sql: 'CREATE UNIQUE INDEX ON people USING SPGIST (first_name ASC, last_name ASC)',
							values: {},
						}
					}
				}
			},
			GIN: {
				"Basic Usage": function(sql) {
					return {
						supportedBy: {
							PostgreSQL: true
						},
						test: function(){
							return sql.$createIndex({
								$unique: true,
								$table: 'people',
								$columns: {
									first_name: true,
									last_name: true
								},
								$using: sql.GIN // or $using: 'GIN'
							});
						},
						expectedResults: {
							sql: 'CREATE UNIQUE INDEX ON people USING GIN (first_name ASC, last_name ASC)',
							values: {},
						}
					}
				}
			},
			BRIN: {
				"Basic Usage": function(sql) {
					return {
						supportedBy: {
							PostgreSQL: true
						},
						test: function(){
							return sql.$createIndex({
								$unique: true,
								$table: 'people',
								$columns: {
									first_name: true,
									last_name: true
								},
								$using: sql.BRIN // or $using: 'BRIN'
							});
						},
						expectedResults: {
							sql: 'CREATE UNIQUE INDEX ON people USING BRIN (first_name ASC, last_name ASC)',
							values: {},
						}
					}
				}
			}
		}
	}
}
