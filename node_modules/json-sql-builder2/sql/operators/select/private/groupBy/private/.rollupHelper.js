'use strict';

class rollupHelper extends SQLBuilder.SQLHelper {
	constructor(sql, name){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Number: {
						syntax: {
							1: this.Syntax('<key-ident>[ , ... ]')
						}
					},
					Array: { syntax: this.Syntax('(<value-ident>[ , ... ])') },
					Object: { syntax: this.Syntax('(<key-ident>[ , ... ])') }
				}
			}
		});

		// set the name, otherwise all classes that inherit will named "rollupHelper"
		let helperName = '$' + name;
		this.__name__ = helperName;

		this.link = function(query) {
			/* turn objected rollup definition
			 * into an array-definition because we can't use
			 * the round brackets on an object concat each key:value pair
			 {
			     "$rollup": {
			         "state": 1,
			         "grp1": {
			             "state": 1,
			             "city": 1
			         },
			         "grp2": {
			             "state": 1,
			             "city": 1,
			             "sales_manager": 1
			         }
			     }
			 }

			 so we turn the object for grp1, grp2 above into an array like:
			 {
			     "$rollup": {
			         "state": 1,
			         "grp1": ['state', 'city']
			         "grp2": ['state', 'city', 'sales_manager']
			     }
			 }*/
			 this.forEach(query[helperName], (value, key) => {
				// check for identifier and PlainObject
				if (this.isIdentifier(key) && this.isPlainObject(value)) {
					query[helperName][key] = [];
					this.forEach(value, (active, column) => {
						if (active && (this.isNumber(active) || this.isBoolean(active))) {
							query[helperName][key].push(column)
						}
					});
				}
			 });
		}
	}
}

module.exports = rollupHelper;
