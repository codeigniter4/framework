'use strict';

const expect     = require('chai').expect;
const SQLBuilder = require('../index');

describe('SQLBuilder internal Tests', function() {

	describe('Quoted identifiers', function() {
		describe('Option quoteIdentifiers', function() {
			it('should always quote each identifier', function() {
				let sql = new SQLBuilder('PostgreSQL', {
					quoteIdentifiers: true
				});
				let myQuery = sql.$select({
					first_name: { $left: 1 },
					$from: 'people'
				});

				expect(myQuery.sql).to.equal('SELECT LEFT("first_name", $1) AS "first_name" FROM "people"');
			});
		});

		describe('Reserved words', function() {
			it('should quote identifiers that are reserved Words', function() {
				let sql = new SQLBuilder('PostgreSQL');
				let myQuery = sql.$select({
					when: { $left: { $str: '~~first_name', $len: 1 } },
					$from: 'people'
				});

				expect(myQuery.sql).to.equal('SELECT LEFT(first_name, $1) AS "when" FROM people');
			});
		});

	})
})
