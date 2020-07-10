'use strict';

const SQLOperator 	= require('./operator');
const SQLHelper 	= require('./helper');

class StringIdentifier extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-ident>') }
		});
	}
}
module.exports.StringIdentifier = StringIdentifier;

class ArrayValueParam extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: { syntax: this.Syntax('<value-param>[ , ... ]') }
		});
	}
}
module.exports.ArrayValueParam = ArrayValueParam;

class PrimitiveValueParam extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
			Number: { syntax: this.Syntax('<value-param>') },
			Function: { syntax: this.Syntax('<value>') },
		});
	}
}
module.exports.PrimitiveValueParam = PrimitiveValueParam;

class StringValueParam extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
			Object: { syntax: this.Syntax('<value>') },
			Function: { syntax: this.Syntax('<value>') }
		});
	}
}
module.exports.StringValueParam = StringValueParam;

class NumberValueParam extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Number: { syntax: this.Syntax('<value-param>') },
		});
	}
}
module.exports.NumberValueParam = NumberValueParam;

class OnOff extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('ON'),
					false: this.Syntax('OFF')
				}
			},
			Number: {
				syntax: {
					0: this.Syntax('OFF'),
					1: this.Syntax('ON'),
				}
			},
			String: {
				syntax: {
					OFF: this.Syntax('OFF'),
					ON: this.Syntax('ON'),
				}
			}
		});

		this.Keyword('ON');
		this.Keyword('OFF');
	}

	preBuild(query, identifier) {
		if (this.isString(query)) return query;

		if (query === this.ON) return 'ON';
		if (query === this.OFF) return 'OFF';

		return query;
	}
}
module.exports.OnOff = OnOff;

class OnOffAuto extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('ON'),
					false: this.Syntax('OFF')
				}
			},
			Number: {
				syntax: {
					0: this.Syntax('OFF'),
					1: this.Syntax('ON'),
					2: this.Syntax('AUTO')
				}
			},
			String: {
				syntax: {
					OFF: this.Syntax('OFF'),
					ON: this.Syntax('ON'),
					AUTO: this.Syntax('AUTO')
				}
			}
		});

		this.Keyword('ON');
		this.Keyword('OFF');
		this.Keyword('AUTO');
	}

	preBuild(query, identifier) {
		if (this.isString(query)) return query;

		if (query === this.ON) return 'ON';
		if (query === this.OFF) return 'OFF';
		if (query === this.AUTO) return 'AUTO';

		return query;
	}
}
module.exports.OnOffAuto = OnOffAuto;

class NumberValue extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Number: { syntax: this.Syntax('<value>') },
		});
	}
}
module.exports.NumberValue = NumberValue;

class BooleanValue extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: { syntax: this.Syntax('<value>') },
		});
	}
}
module.exports.BooleanValue = BooleanValue;

class Default01 extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: {
				syntax: {
					DEFAULT: this.Syntax('DEFAULT')
				}
			},
			Number: {
				syntax: {
					0: this.Syntax('0'),
					1: this.Syntax('1')
				}
			}
		});
	}
}
module.exports.Default01 = Default01;


class Expression extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
			Number: { syntax: this.Syntax('<value-param>') },
		});
	}
}
module.exports.Expression = Expression;

class AcceptIfTrue extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('-->Accepted->Return:'),
					false: this.Syntax('')
				}
			}
		});
	}
}
module.exports.AcceptIfTrue = AcceptIfTrue;
