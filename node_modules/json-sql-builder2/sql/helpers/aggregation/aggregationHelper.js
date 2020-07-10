'use strict';

class aggregationHelper extends SQLBuilder.SQLHelper {
	constructor(sql, aggName){
		super(sql);

		// for the internal tests and docs
		// to have a valid aggregation Syntax
		aggName = aggName || '{aggName}';

		this.Types({
			Object: { syntax: this.Syntax(aggName + '({DISTINCT [$distinct]}<$expr>)') },
			String: { syntax: this.Syntax(aggName + '(<value-ident>)') },
			Function: { syntax: this.Syntax(aggName + '(<value>)') }
		});

		this.Keyword('DISTINCT');

		this.$expr = new SQLBuilder.SQLPredefined.Expression(sql);
		this.$distinct = new SQLBuilder.SQLPredefined.AcceptIfTrue(sql);

		this.callee = function (distinct, column) {
			if (this.isString(distinct)) {
				column = distinct;
			}
			if (this.DISTINCT === distinct) {
				return aggName + '(' + (distinct ? 'DISTINCT ':'') + this.quote(column) + ')';
			} else {
				return aggName + '(' + this.quote(column) + ')';
			}
		}
	}
}

module.exports = {
	definition: aggregationHelper,
	description: `Specifies a general aggregation function as template
class to inherit for the real aggregations like \`COUNT\`, \`MIN\`, \`MAX\`.

The constructor needs in addition to the SQLBuilder instance a second argument with the
SQL-name of the aggregation function as String.

**Usage**
\`\`\`javascript
const aggregationHelper = require('../classHelper/aggregationHelper')

class count extends aggregationHelper {
    constructor(sql) {
        super(sql, 'COUNT');
    }
}
\`\`\`
`,
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
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							aggregation: { $aggregationHelper: 'age' },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT {aggName}(age) AS aggregation FROM people',
						values:{}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							aggregation: { $aggregationHelper: { $expr: '~~age', $distinct: true } },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT {aggName}(DISTINCT age) AS aggregation FROM people',
						values:{}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql){
				return {
					supportedBy: {
						SQLServer: true
					},
					test: function(){
						return sql.$select({
							aggregation: { $aggregationHelper: sql.isNull('~~age', 40) },
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT {aggName}(ISNULL(age, $1)) AS aggregation FROM people',
						values:{
							$1: 40
						}
					}
				}
			},
			"Using callee with DISTINCT parameter": function(sql){
				return {
					test: function(){
						return sql.$select({
							aggregation: sql.aggregationHelper(sql.DISTINCT, 'age'),
							$from: 'people'
						});

					},
					expectedResults: {
						sql: 'SELECT {aggName}(DISTINCT age) AS aggregation FROM people',
						values:{}
					}
				}
			}
		}
	}
}
