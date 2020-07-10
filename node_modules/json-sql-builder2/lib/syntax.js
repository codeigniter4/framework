'use strict';

const _ = require('lodash');

module.exports = class Syntax {
	constructor(builderInstance, helperInstance, syntax, createFunction, preBuildHook){
		this.__builderInstance__ = builderInstance;
		this.__helperInstance__ = helperInstance;
		this.__syntax__ = syntax;
		this.__createFunction__ = createFunction;
		this.__preBuildHook__ = preBuildHook;

		this.__compiledSyntax__ = '';
		this.__registeredHelpers__ = null;
		this.__helpersByToken__ = {};
		this.__joinedWith__ = null;
		this.__uniqueHelperID__ = 0;

		this.__compileSyntax__();

		if (this.__createFunction__) {
			this.__createFunctionCallee__();
		}
	}

	// __getHelperName__
	//
	// Returns the cleaned Name of the Helper
	//
	__cleanupHelperName__(helper) {
		return helper.replace('[', '')
			.replace(']', '')
			.replace('<', '')
			.replace('>', '');
	};

	// __callHelper__
	//
	// Calls a registered Helper or Operator. It takes notice
	// of private signed Helpers or Operators of the current
	// helperInstance from this Syntax. If there is a private signed
	// one, this will be called, otherwise the Helper or Operator
	// from the current builderInstance will be called.
	//
	__callHelper__(helperName, query, identifier) {
		return this.__helperInstance__.__callHelper__(helperName, query, identifier);
		/*if (_.isFunction(this.__helperInstance__[helperName])) {
			return this.__helperInstance__[helperName].call(this.__builderInstance__, query, identifier);
		}
		return this.__builderInstance__._callHelper(helperName, query, identifier);*/
	};

	// __isHelperRequired__
	//
	// Returns true or false weather the given helper is required by
	// syntax or not.
	//
	__isHelperRequired__(helper) {
		return helper.startsWith('<');
	}

	// __getHelperNameByToken__
	//
	// Returns the name of the helper (object) from the registered helpers given
	// by arg that matches the token
	//
	// @return {String} helper name from the registered helpers
	//
	__getHelperNameByToken__(token, registeredHelpers) {
		return this.__helpersByToken__[token];
	}

	// __getHelperByToken__
	//
	// Returns the helper object from the registered helpers
	//
	// @return {Object} helper object from the registered helpers
	//
	__getHelperByToken__(token, registeredHelpers) {
		if (this.__helpersByToken__[token]) {
			return this.__registeredHelpers__[this.__helpersByToken__[token]];
		}
	}

	// __removeHelperByToken__
	//
	// Remove the helper from the list of registeredHelpers given
	// by arg which matches the token.
	//
	__removeHelperByToken__(token) {
		let name = this.__helpersByToken__[token];

		delete this.__registeredHelpers__[name];
		delete this.__helpersByToken__[token];
	}

	// __registerHelper__
	//
	// Register the given helper object as new helper
	// and register it's by token too.
	//
	__registerHelper__(name, helper) {
		if (!this.__registeredHelpers__) {
			this.__registeredHelpers__ = {};
		}

		if (!this.__registeredHelpers__[name]) {
			helper.name = name;
			// create a unique id for the new helper
			helper.uid = ++this.__uniqueHelperID__;
			// and add the unique token
			helper.token = '>->->' + helper.uid + '<-<-<';

			// now register...
			this.__registeredHelpers__[name] = helper;
			this.__helpersByToken__[helper.token] = name;
		}
	}

	// __compileSyntax__
	//
	// Translate the Syntax from __syntax__ with a cleaned, compieled
	// Syntax and all registered helpers and operators.
	//
	// @param syntax {string}	Specifies the Syntax as String like 'SELECT <$columns> { FROM [$from]}...'
	//
	__compileSyntax__() {
		this.__compiledSyntax__ = this.__syntax__;

		// first of all get a possible joiner
		// the notation of this is [ <joiner>... ]
		let joiner = this.__compiledSyntax__.match(/\[ (.*)\.\.\.\ \]/g);
		this.__joinedWith__ = joiner && joiner.length > 0 ? joiner[0].substring(2, joiner[0].length - 5) : null;
		if (this.__joinedWith__) {
			// remove the joiner
			this.__compiledSyntax__ = this.__compiledSyntax__.replace(/\[ (.*)\.\.\.\ \]/g, '');
		}

		// get all required and optional helpers and operators
		// defined by "<...>" and "[...]"
		var helpers = this.__compiledSyntax__.match(/(<\$\w+>)|(\[\$\w+\])/g);
		_.forEach(helpers, (helper) => {
			let helperName = this.__cleanupHelperName__(helper);

			this.__registerHelper__(helperName, {
				definition: helper, // store original helper definition for a later replacement
				required: this.__isHelperRequired__(helper),
				supportedBy: {
					// list of all rdbms that support the current helper
				}
			});

			// replace the original helper defined with a unique ID by it's token
			this.__compiledSyntax__ = this.__compiledSyntax__.replace(helper, this.__registeredHelpers__[helperName].token);
		});

		// cleanup of all tabs, newlines and carrige return's
		this.__compiledSyntax__ = this.__compiledSyntax__.replace(/(\t|\n|\r)/g, '');

		// remove all white-spaces between the tokens
		this.__compiledSyntax__ = this.__compiledSyntax__.replace(/<-<-<\s+>->->/g, '<-<-<>->->');

		// remove every "or" defined with "|" between two tokens
		// example: { ORDER BY [$sort] | [$orderBy] }
		this.__compiledSyntax__ = this.__compiledSyntax__.replace(/<-<-< \| >->->/g, '<-<-<>->->');

		// get all items located in curly braces like "{ FROM >->->1<-<-< }"
		// and register the subsyntax
		var curlyItems = this.__compiledSyntax__.match(/\{([^}]+)\}/g);
		_.forEach(curlyItems, (curlyItem) => {
			// get all optional and required operators and helpers
			var tokens = curlyItem.match(/(>->->[0-9]+<-<-<)/g);
			_.forEach(tokens, (token) => {
				let name = this.__getHelperNameByToken__(token);

				// ignore sub-syntax for {* ... *}
				// example: {* INNER | LEFT OUTER | RIGHT OUTER JOIN [$joins] *}
				// This is only for a better understanding of the total syntax,
				// but the INNER JOIN, etc. will defined in the helper '$innerJoin'
				if (! (curlyItem.startsWith('{*') && curlyItem.endsWith('*}'))) {
					this.__registeredHelpers__[name].subSyntax = curlyItem.substring(1, curlyItem.length - 1); // remove outer curly braces
				}

				// replace the curly braces optional helper with the
				// 'real'Helper to get a very clean syntax
				// curlyItem = "{ FROM [ $from ] }"
				// item = "[ $ from ]"
				this.__compiledSyntax__ = this.__compiledSyntax__.split(curlyItem).join(token);
			});
		});

		// Example-Syntax after main cleanup:
		// SELECT >->->1<-<-<-->(MySQL,MariaDB,PostgreSQL) >->->2<-<-< >->->3<-<-<-->(mysql) >->->4<-<-<>->->5<-<-<>->->6<-<-<>->->7<-<-<>->->8<-<-<>->->9<-<-<>->->10<-<-<>->->11<-<-<>->->13<-<-<-->(mysql,postsgreSQL)>->->14<-<-<-->(mysql,postsgreSQL
		// Now check for language specific helpers and operaotrs
		// and remove them if they are not equal to the current
		// sql dialect
		var dialectHelpers = this.__compiledSyntax__.match(/(>->->[0-9]+<-<-<)-->\([\w,]+\)/g)
		_.forEach(dialectHelpers, (helper) => {
			let token = helper.substring(0, helper.indexOf('-->('));

			if (helper.indexOf(this.__builderInstance__._currentLanguage) == -1) {
				// remove only if we are not on a test-run oder building the docs
				if (this.__builderInstance__._options.test || this.__builderInstance__._options.createDocs) {
					// test-run or building the docs
					// our helper var looks like: >->->1<-<-<-->(MySQL,MariaDB,PostgreSQL)
					let hl = this.__getHelperByToken__(token);
					// remove the token, then remove -->( then remove )
					// the result will be: MySQL,MariaDB,PostgreSQL
					let supportedBy = helper.replace(token, '').replace('-->(', '').replace(')', '').split(',');
					_.forEach(supportedBy, (supportedDialect) => {
						hl.supportedBy[supportedDialect] = true;
					});

					// finally cleanup the syntax
					this.__compiledSyntax__ = this.__compiledSyntax__.replace(helper, '');
				} else {
					this.__removeHelperByToken__(token);
					this.__compiledSyntax__ = this.__compiledSyntax__.replace(helper, '');
				}
			} else {
				// remove the dialect-info "-->(mysql,postgreSQL)"
				let dialectInfo =  helper.substring(helper.indexOf('-->('), helper.length);

				// if we are on a test-run or building the docs, save the supported by-informations
				if (this.__builderInstance__._options.test || this.__builderInstance__._options.createDocs) {
					// test-run or building the docs
					// our helper var looks like: >->->1<-<-<-->(MySQL,MariaDB,PostgreSQL)
					let hl = this.__getHelperByToken__(token);
					// remove the token, then remove -->( then remove )
					// the result will be: MySQL,MariaDB,PostgreSQL
					let supportedBy = helper.replace(token, '').replace('-->(', '').replace(')', '').split(',');
					_.forEach(supportedBy, (supportedDialect) => {
						hl.supportedBy[supportedDialect] = true;
					});
				}

				this.__compiledSyntax__ = this.__compiledSyntax__.replace(dialectInfo, '');
			}
		});

		// remove every "or" defined with "|" between two tokens
		// example: { ORDER BY [$sort] | [$orderBy] }
		this.__compiledSyntax__ = this.__compiledSyntax__.replace(/<-<-< \| >->->/g, '<-<-<>->->');

		// remove all white-spaces between the tokens
		this.__compiledSyntax__ = this.__compiledSyntax__.replace(/<-<-<\s+>->->/g, '<-<-<>->->');
		// remove all white-spaces if there are more then one
		// and replace with ' '
		this.__compiledSyntax__ = this.__compiledSyntax__.replace(/\s+/g, ' ');
	}

	// __createFunctionCallee__
	//
	// Creating the callee to use this syntax as function
	//
	__createFunctionCallee__(){
		let builder = this.__builderInstance__,
			operatorName = this.__helperInstance__.__name__;

		if (this.__helperInstance__.callee) {
			throw new Error(`The method 'callee' for the operator '${operatorName}' already exists. Please make sure that only one Syntax has singed to Operator.CALLEE.`);
		}

		this.__helperInstance__.callee = (...args) => {
			let query = {},
				argIndex = 0,
				options = args[args.length - 2/*we always pass identifier*/],
				requiredHelpers = 0;
			if (this.__registeredHelpers__) {
				// Build callee query with registered Helpers and Operators
				query[operatorName] = {};
				_.forEach(this.__registeredHelpers__, (helper, helperName) => {
					if (helper.required) {
						query[operatorName][helperName] = args[argIndex++];
						requiredHelpers++;
					}
				});

				// check if we have an options parameter with the optional arguments
				// this is true, if the count of args equals the required arguments + 1 (options)
				if (args.length - 1/*we always pass identifier*/ == (requiredHelpers + 1) && _.isPlainObject(options)) {
					// we have some options
					// check the options if they are allowed
					_.forEach(options, (option, optionName) => {
						if (!this.__registeredHelpers__[optionName] || this.__registeredHelpers__[optionName].required) {
							throw new Error(`The option '${optionName}' is not suported by calling the function '${operatorName}'. Please refer the Docs and Syntax.`);
						}
					});

					_.extend(query[operatorName], options || {});
				}

				return builder._queryUnknown(query, args[args.length -1] /*identifier*/);
			}

			// we got no helpers
			// but, check the type for an iterateable type
			// we cant support by a simple replace
			//if (_.isArray(args[0]) || _.isPlainObject(args[0])) {

			//}
			//query[operatorName] = args[0];
			//return builder._queryUnknown(query);

			// okay, we got no Helpers and operators - we have
			// a plain Syntax like "<key-ident> AS <value-ident>"
			// so get all <....>
			let calleeArgs = this.__compiledSyntax__.match(/<(\w+|\w+-\w+)>/g) || []; // get all <key>, <key-ident> <value> <value-param> ...
			// check if we got all arguments as described in the syntax
			if (calleeArgs.length != args.length - 1/*we always got identifier passed on top*/) {
				throw new Error(`Using Function '${operatorName.replace('$', '')}' expected ${calleeArgs.length} arguments but got ${args.length - 1}.`);
			}
			// each of the <....> is an argument in the function
			let rplv = {};
			_.forEach(calleeArgs, (argName, argIndex) => {
				if (argName.indexOf('key') > -1) { // check for <key>, <key-param> and <key-ident>
					rplv.key = args[argIndex];
				}
				if (argName.indexOf('value') > -1) { // check for <value>, <value-param> and <value-ident>
					rplv.value = args[argIndex];
				}
				if (argName.indexOf('identifier') > -1) { // check for <identifier>
					rplv.identifier = args[argIndex];
				}
			});

			return this.__replaceSyntaxWithValues__(this.__compiledSyntax__, rplv);
		}
	}

	// __buildArrayValue__
	//
	// concatenates each value of the given array with
	// the method quote, addValue, etc. and returned
	// the result as String.
	//
	// @param arrayOfValues {Array}	Specifies the aray to iterate
	// @param method {function}	Specifies the concatenate function
	//
	// @return {String} concatenated values
	//
	__buildArrayValue__(arrayOfValues, method) {
		let rplvValue = '';
		_.forEach(arrayOfValues, (value, index)=>{
			if (rplvValue != '') {
				rplvValue += this.__joinedWith__;
			}
			rplvValue += method(value);
		});
		return rplvValue;
	}

	// __replaceRequiredPlaceholder__
	//
	// Replace a placeholder in the given template with value and the
	// given method to use on replace.
	//
	// @param template 		{String}	Specifies the template/syntax to use on replace like "<key-ident> AS <value-ident>"
	// @param placeholder 	{String}	Specifies the placeholder like "<key-ident>"
	// @param valueToReplace	{Any}	Specifies the value to replace the placeholder
	// @param replaceMethod	{Function}	Function used on replace
	//
	// @return {Sting} template with replaced values
	//
	__replaceRequiredPlaceholder__(template, placeholder, valueToReplace, replaceMethod){
		if (template.indexOf(placeholder) > -1) {
			if (_.isArray(valueToReplace)){
				template = template.replace(placeholder, this.__buildArrayValue__(valueToReplace, replaceMethod));
			} else {
				/* some wired situation ends up in wired code...
				 * we have a syntax like for $and operator: "<key-ident> <value>[ , ... ]"
				 * --> in the following example the key-ident will be the "$or"
				 * and the value is the build result of the array
				 * --> this would end up in a query string like : "WHERE people_id = $1 AND ($or first_name = $2 OR last_name = $3)"
				 * $where: {
					 $and: [
						 { people_id: 456725 },
						 { $or: [
							 { first_name: { $eq: 'Jane' } },
							 { last_name: { $eq: 'Doe' } }
						 ]}
					 ]
				 }
				 --> so, if the valueToReplace starts with $ we will replace it with an empty String!!!!
				*/
				if (placeholder.indexOf('key') > -1 && valueToReplace.startsWith('$')) {
					template = template.replace(placeholder + ' ', '');
					template = template.replace(placeholder, '');
				} else {
					// Standard-Replace situation
					template = template.replace(placeholder, replaceMethod(valueToReplace));
				}
			}
		}
		return template;
	}

	// __replaceSyntaxWithValues__
	//
	// Replacing the syntax with the given values
	// and return the replaced String.
	//
	// @param syntax			{String | Number}	Specifies the compiled syntax to replace
	// @param rplv				{Object}	Specifies the values to use on replace
	// @param rplv[key]			{Primitiv}	**Optional** Specifies the key or index
	// 										used on Child-Type-Based syntax to use
	// 										on replace
	// @param rplv[value]		{Primitiv}	**Optional** Specifies the value of a
	// 										primitiv or Array, Object Proerty value
	// 										to use on replace
	// @param rplv[identifier]	{String}	**Optional** Specifies the value of a
	// 										primitiv or Array, Object Proerty value
	// 										to use on replace
	// @return {String} replaced String
	//
	__replaceSyntaxWithValues__(syntax, rplv) {
		_.forEach(['key', 'value', 'identifier'], (placeholder) => {
			// change undefined to a null value
			// for the database undefined means "NULL"
			if (typeof rplv[placeholder] === typeof undefined) {
				rplv[placeholder] = null;
			}

			syntax = this.__replaceRequiredPlaceholder__(syntax, `<${placeholder}>`, rplv[placeholder], placeholder == 'identifier' ? this.__builderInstance__.quote.bind(this.__builderInstance__) : function(value){
				if (_.isFunction(value)) {
					return value(rplv.identifier || rplv.key);
				}
				return value;
			});
			syntax = this.__replaceRequiredPlaceholder__(syntax, `<${placeholder}-param>`, rplv[placeholder], this.__builderInstance__.addValue.bind(this.__builderInstance__));
			syntax = this.__replaceRequiredPlaceholder__(syntax, `<${placeholder}-ident>`, rplv[placeholder], this.__builderInstance__.quote.bind(this.__builderInstance__));
		});

		return syntax;
	}

	__replaceSyntaxByHelpers__(query, key) {
		var result = this.__compiledSyntax__;

		// check if we got an helper, that is not registered
		// we have to report this as Error
		_.forEach(query, (value, name) => {
			// no identifiers allowed on query
			if (!this.__builderInstance__.isOperator(name)) { // name.startsWith('$')) {
				throw new Error ('Execute Query ' + JSON.stringify(query) + ' Identifier with Name "' + name + '" detected. Please check your query.');
			}

			if (!this.__registeredHelpers__[name]){
				throw new Error ('Execute Query ' + JSON.stringify(query) + ' the Helper with the Name "' + name + '" is not permitted by Syntax.');
			}
		});

		// now iterate each helper in front, because the order of the helpers is
		// relevant for the current syntax to get the correct order later
		// on building the SQL-String.
		_.forEach(this.__registeredHelpers__, (helper, helperName) => {
			//let helper = this.__registeredHelpers__[helperName];

			// check if helper is available/used on query
			if (typeof query[helperName] == typeof undefined) {
				if (helper.required) {
					throw new Error (`Execute Query ${JSON.stringify(query)} required helper or operator with the Name '${helper.name}' missing. Please refer the Syntax.`);
				}
				return;
			}

			// okay, the helper exists and we can execute him
			//let helperResult = this.__builderInstance__[helperName](query[helperName], key);
			let helperResult = this.__callHelper__(helperName, query[helperName], key);

			if (helperResult == '') return;
			if (helperResult.startsWith('-->Accepted->Return:')) {
				helperResult = helperResult.substring('-->Accepted->Return:'.length);
			}

			if (helper.subSyntax) {
				let rplSubSyntax = helper.subSyntax.replace(helper.token, helperResult);
				result = result.replace(helper.token, rplSubSyntax);
			} else {
				result = result.replace(helper.token, helperResult);
			}
		});

		// replace all remaining helpers and operators with ''
		// because not all of the optional helpers may be used
		result = result.replace(/(>->->[0-9]+<-<-<)/g, '');

		// maybe we use helpers and fixed <key-ident>, <value>, etc...
		// so we have to call the Standard-Replace function at the end too
		result = this.__replaceSyntaxWithValues__(result, {
			key: key,
			value: query
		});

		return result;
	}

	__buildUnknown__(query, identifier, preIdentifier) {
		let results = [];
		// on building a unknown query the query-type must always be
		// an object! The Object will be iterated and executed with any operator
		// or helper as is given. There is no syntactical order. The order is given
		// by the order of the objects props.
		_.forEach(query, (value, key) => {
			// check if we have an identifier or operator
			// if we got an identifier we have to check the next level
			// and pass the identifier with the next-levels query
			let unknownResult, result;
			if (this.__builderInstance__.isOperator(key)) {
				if (!this.__builderInstance__._helperExists(key)) {
					throw new Error(`Execute query '${JSON.stringify(query)}' using Operator '${this.__helperInstance__.__name__}': The Helper or Operator with the name '${key}' is not defined.`);
				}

				unknownResult = this.__callHelper__(key, value, identifier);
				result = this.__replaceSyntaxWithValues__(this.__compiledSyntax__, {
					// the key will be a Helper or Operator, so try to get an identifier
					key: _.isString(identifier) ? identifier : key,
					value: unknownResult,
					identifier: identifier
				});
				// add the result only if it has a value
				// because on joining the total result at the end with ' ' or ', '
				// it will end in ', ,' if we got no result
				if (result != '') {
					results.push(result);
				}
			} else {
				// we have an identifier like:
				// first_name: { $eq:'Doe' }
				// so get the next level
				unknownResult = this.__builderInstance__._queryUnknown(value, key);
				result = this.__replaceSyntaxWithValues__(this.__compiledSyntax__, {
					key: key,
					value: unknownResult,
					identifier: identifier
				});
				// add the result only if it has a value
				// because on joining the total result at the end with ' ' or ', '
				// it will end in ', ,' if we got no result
				if (result != '') {
					results.push(result);
				}
			}
		});

		return results.join(this.__joinedWith__ || '');
	}

	_buildWithHelpers(query, identifier) {
		return this.__replaceSyntaxByHelpers__(query, identifier);
	}

	_buildWithValues(query, identifier, preIdentifier){
		return this.__replaceSyntaxWithValues__(this.__compiledSyntax__, {
			identifier: preIdentifier,
			key: identifier,
			value: query
		});
	}

	__build__(query, identifier, preIdentifier) {
		// at the early first call the preBuildHook if exists
		if (_.isFunction(this.__preBuildHook__)){
			query = this.__preBuildHook__.call(this.__builderInstance__, query, identifier, preIdentifier);
		}
		// then check if we have registered helpers to call.
		// If we got no helpers we can only replace the current
		// syntax with the given key and value
		if (this.__registeredHelpers__) {
			// "Shrek": Nobody moves! I've got helpers and I'm not afraid to use them ;-)
			return this._buildWithHelpers(query, identifier, preIdentifier);
		}

		if (_.isPlainObject(query)){
			return this.__buildUnknown__(query, identifier, preIdentifier);
		} else {
			return this._buildWithValues(query, identifier, preIdentifier);
		}
	}
}
