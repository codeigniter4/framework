'use strict';

class ArithmeticHelper extends SQLBuilder.SQLHelper {
	constructor(sql, helperName, arithmeticOperator){
		super(sql);

		this.__name__ = helperName;

		this.Types({
			Number: { syntax: this.Syntax(`${arithmeticOperator} <value-param>`) },
			String: { syntax: this.Syntax(`${arithmeticOperator} <value-ident>`) },
			Object: { syntax: this.Syntax(`${arithmeticOperator} <value>`) },
			Function: { syntax: this.Syntax(`${arithmeticOperator} <value>`) },
			Array: {
				eachItemOf: {
					Number: { syntax: this.Syntax(`<value-param>[  ${arithmeticOperator} ... ]`) },
					String: { syntax: this.Syntax(`<value-ident>[  ${arithmeticOperator} ... ]`) },
					Object: { syntax: this.Syntax(`<value>[  ${arithmeticOperator} ... ]`) },
					Function: { syntax: this.Syntax(`<value>[  ${arithmeticOperator} ... ]`) }
				}
			}
		});

		this.callee = function(...args) {
			let identifier = args.pop();
			return this._callHelper('$' + helperName, args, identifier);
		}
	}

	preBuild(query, identifier){
		// add a shortcut for UPDATE ... SET mycol = mycol + 1
		// --> {
		// 		$update: {
		// 			$set: {
		// 				mycol: { $add: 1 }
		// 			}
		// 		}
		// 	}
		//
		// we turn this into an array notation immediatly before building the result:
		// 		$update: {
		// 			$set: {
		// 				mycol: { $add: ['mycol', 1] }
		// 			}
		// 		}
		if ((this.isPreviousHelper('$set') || this.isPreviousHelper('$columns')) && (
				this.isNumber(query) ||
				this.isString(query) ||
				this.isPlainObject(query) ||
				this.isFunction(query)
			)
		) {
			query = [ identifier, query ];
		}
		return query;
	}
}

module.exports = ArithmeticHelper;
