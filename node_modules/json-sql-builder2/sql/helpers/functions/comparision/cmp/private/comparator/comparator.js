'use strict';

class comparator extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: {
				syntax: {
					'=': this.Syntax('<value>'),
					'!=': this.Syntax('<value>'),
					'>': this.Syntax('<value>'),
					'<': this.Syntax('<value>'),
					'>=': this.Syntax('<value>'),
					'<=': this.Syntax('<value>'),
				}
			}
		});
	}
}

module.exports = {
	definition: comparator,
	description: 'Specifies the comparision Operator to use with `cmp` as Helper.',
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		String: {
			"=": {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										$and: [
											sql.cmp('~~first_name', '=', 'Jane'),
										]
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE first_name = $1',
							values: {
								$1: 'Jane'
							}
						}
					}
				}
			},
			"!=": {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										$and: [
											sql.cmp('~~first_name', '!=', 'Jane'),
										]
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE first_name != $1',
							values: {
								$1: 'Jane'
							}
						}
					}
				}
			},
			">": {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										$and: [
											sql.cmp('~~age', '>', 40),
										]
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE age > $1',
							values: {
								$1: 40
							}
						}
					}
				}
			},
			"<": {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										$and: [
											sql.cmp('~~age', '<', 40),
										]
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE age < $1',
							values: {
								$1: 40
							}
						}
					}
				}
			},
			"<=": {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										$and: [
											sql.cmp('~~age', '<=', 40),
										]
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE age <= $1',
							values: {
								$1: 40
							}
						}
					}
				}
			},
			">=": {
				"Basic Usage": function(sql) {
					return {
						test: function(){
							return sql.build({
								$select: {
									$from: 'people',
									$where: {
										$and: [
											sql.cmp('~~age', '>=', 40),
										]
									}
								}
							});
						},
						expectedResults: {
							sql: 'SELECT * FROM people WHERE age >= $1',
							values: {
								$1: 40
							}
						}
					}
				}
			},
		}
	}
}
