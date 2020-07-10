'use strict';

class not extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
            Object: { syntax: this.Syntax('NOT <value>', SQLBuilder.CALLEE) }
        });
	}
}

module.exports = {
	definition: not,
	description: 'Specifies the logical `NOT` Operator as Helper.',
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
        Object: {
            "Basic Usage": function(sql) {
                return {
                    test: function(){
                        return sql.build({
                            $select: {
                                $from: 'people',
                                $where: {
                                    first_name: { $not: { $startsWith: 'D' } }
                                }
                            }
                        });
                    },
                    expectedResults: {
                        sql: 'SELECT * FROM people WHERE first_name NOT LIKE $1',
                        values: {
                            $1: 'D%'
                        }
                    }
                }
            }
        },

	}
}
