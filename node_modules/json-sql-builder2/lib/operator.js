'use strict';

const path		= require('path');
const _ 		= require('lodash');
const Syntax 	= require('./syntax');

const TYPES_ALL = ['String', 'Boolean', 'Number', 'Object', 'Function', 'Array'];

class SQLOperator {
	constructor(sqlBuilderInstance) {
		if (!sqlBuilderInstance) {
			throw new Error('Create new instance of SQLOperator without passing a instance of SQLBuilder as first arg.');
		}
		this.__is__ = 'operator';
		this.__builderInstance__ = sqlBuilderInstance;
		this.__name__ = (this.constructor.name.startsWith('$') ? '':'$') + this.constructor.name;
	}

	get isHelper() {
		return this.__is__ === 'helper';
	}

	get isOperator() {
		return this.__is__ === 'operator';
	}

	// link
	//
	// Empty function body for linking an Operator.
	// Should be overwritten by specific Helper or Operator
	// to do some stuff on linking if neccessary.
	//
	link(){

	}

	// validate
	//
	// Empty function body for validating the query.
	// Should be overwritten by specific Helper or Operator
	// to do some extra validation.
	//
	// @return undefined = okay; string=Error-Message
	validate(query){

	}

	// preBuild
	//
	// Will be called before building the query.
	//
	// @param	{Any}		query 			Specifies the query or value to build
	// @param	{String}	[identifier] 	Specifies the identifier from the step/build before
	//
	preBuild(query, identifier){
		return query;
	}

	// postBuild
	//
	// will be called after building the query
	//
	// @param	{String}	result 	Specifies the result from the build-method
	//
	// @return	{String}	Always return the result string!
	//
	postBuild(result, type, itemType){
		return result;
	}

	Types(allowedTypes) {
		this.__allowedTypes__ = allowedTypes;
	}

	Syntax(syntax, createCallee, preBuildHook) {
		let __createCallee__ = createCallee,
			__preBuildHook__ = preBuildHook;

		if (_.isFunction(createCallee)){
			__createCallee__ = null;
			__preBuildHook__ = createCallee;
		}
		return new Syntax(this.__builderInstance__, this, syntax, __createCallee__, __preBuildHook__);
	}

	/**
	 * @summary Registers a new private Helper
	 *
	 * @param helperName {String}	Specifies the Name of the helper to register
	 * @return New instance of the private Helper to use on the Operator
	 */
	registerPrivateHelper(helperName, pathCorrectionUsingHelpers) {
		let hn = '$' + helperName,
			moduleFile,
			modulePath,
			privateHelper,
			oldModulePath = this.__builderInstance__.currentModulePath;

		// build the path for the operator or helper
		modulePath = path.join(this.__builderInstance__.currentModulePath, pathCorrectionUsingHelpers ? pathCorrectionUsingHelpers:'./');
		// ORI modulePath = path.join(this.__builderInstance__.currentModulePath, `./private/${helperName}/`);
		modulePath = path.join(modulePath, `./private/${helperName}/`);
		moduleFile = path.join(modulePath, `./${helperName}.js`);

		try {
			privateHelper = require(moduleFile).definition;
		} catch (err) {
			throw new Error(`Can't register private Helper '${helperName}' for Helper or Operator '${this.__name__}' because: ${err.message} \nError-Stack:${err.stack}`);
		}

		this.__builderInstance__.currentModulePath = modulePath;
		this[hn] = new privateHelper(this.__builderInstance__);
		this.__builderInstance__.currentModulePath = oldModulePath;
	}

	// Keyword
	//
	// Creates the given keyword as unique Symbol on
	// the current instance of the sqlBuilder.
	//
	// If the Keyword already exists, this will not be overwritten.
	//
	// @param keyword {String}	Specifies the unique Keyword.
	// @param [description] {String}	Optional: Specifies a short description of the Keyword.
	//
	Keyword(keyword, description) {
		this.__builderInstance__.defineKeyword(keyword, this.__builderInstance__.currentModulePath.split(`${path.sep}sql${path.sep}`)[1], description);
	}

	// __callHelper__
	//
	// Calls a declared private operator or Helper if exists.
	// On fallback if the asked Helper does not exists we try
	// to call the Helper or Operator from the current builderInstance.
	//
	// @param operator		{String}	Specifies the Name of the Operator or Helper
	// @param query			{Any}		Specifies the value or query object to build
	// 									from the calling Helper
	// @param [identifier]	{String}	**Optional** Identifier from the last Helper
	//
	// @return {String}	SQL-String result from the called Helper
	//
	__callHelper__(operator, query, identifier){
		// check if there is a private instance of the asked Helper
		if (this[operator]) {
			this.__builderInstance__._helperChain.push(operator);
			let result = this[operator].__build__(query, identifier);
			this.__builderInstance__._helperChain.pop();
			return result;
		}
		// no private instance, so try to call the Helper from the
		// current builderInstance
		return this.__builderInstance__._callHelper(operator, query, identifier);
	}

	// __getTypeBasedSyntax__
	//
	// returns the Type-Base Syntax for the given type
	//
	__getTypeBasedSyntax__(type) {
		if (this.__allowedTypes__[type] &&
			this.__allowedTypes__[type].syntax instanceof Syntax) {
			return this.__allowedTypes__[type].syntax;
		}
	}

	// __getChildTypeBasedSyntax__
	//
	// Returns the Child-Type-Based Syntax for the given type and it's childType
	//
	__getChildTypeBasedSyntax__(type, childType) {
		if (this.__allowedTypes__[type].eachItemOf[childType] &&
			this.__allowedTypes__[type].eachItemOf[childType].syntax instanceof Syntax) {
			return this.__allowedTypes__[type].eachItemOf[childType].syntax;
		}
	}

	// __getTypeValueBasedSyntax__
	//
	// Returns te Type-Value-Based Syntax for the given
	// type and Value. If there is no syntax allowed for that
	// it returns null
	//
	__getTypeValueBasedSyntax__(type, value) {
		if (this.__allowedTypes__[type].syntax && this.__allowedTypes__[type].syntax[value] instanceof Syntax) {
			return this.__allowedTypes__[type].syntax[value];
		}
	}

	// __getChildTypeValueBasedSyntax__
	//
	// Returns the Child-Type-Value-Based Syntax for the given type and it's childType and value
	//
	__getChildTypeValueBasedSyntax__(type, childType, value) {
		if (this.__allowedTypes__[type].eachItemOf[childType].syntax &&
			this.__allowedTypes__[type].eachItemOf[childType].syntax[value] instanceof Syntax) {
			return this.__allowedTypes__[type].eachItemOf[childType].syntax[value];
		}
	}

	// __getQueryType__
	//
	// Evaluates the type of the given query an returns it as String
	// if it is allowed to use for this Operator. Otherwise
	// the function will throw an Error.
	//
	// @param	query					{Any}		Specifies the query from any Type and Expression itself
	// @param	allowedTypes			{Object}	Specifies the allowedTypes Object to check on
	// @param	eachItemOfParentType	{String}	Specifies the Parent-Type used by eachItemOf
	//
	// @return	{String}	Valid typename as String
	//
	__checkQueryType__(query, allowedTypes, eachItemOfParentType) {
		let validType, invalidType;

		_.forEach(allowedTypes, (value, key) => {
			let validateFunction = 'is' + key.replace('Object', 'PlainObject');
			if (!validType && (this.__builderInstance__[validateFunction](query) || query === null)) {
				validType = key;
			}
		});

		if (!validType && _.isDate(query)) {
			validType = 'String';
		}

		if (!validType) {
			_.forEach(TYPES_ALL, (type) => {
				let validateFunction = 'is' + type.replace('Object', 'PlainObject');
				if (_[validateFunction](query)) {
					invalidType = type;
				}
			});
			if (eachItemOfParentType){
				throw new Error(`Using Helper '${this.__name__}' must be type of '${eachItemOfParentType}->${Object.keys(allowedTypes).join(', ')}', but got '${invalidType}' with value '${(_.isPlainObject(query) ? JSON.stringify(query):query)}'`);
			} else {
				throw new Error(`Using Helper '${this.__name__}' must be type of '${Object.keys(allowedTypes).join(', ')}', but got Type '${invalidType}' with value '${JSON.stringify(query)}'`);
			}
		}
		return validType;
	}

	linkOperators(query, registeredHelpers, identifier) {
		_.forEach(registeredHelpers, (helper, helperName) => {
			// check for private or public helper/operator
			let operator = this[helperName] || this.__builderInstance__._operators[helperName];
			if (operator) {
				let validationErrMessage = operator.validate.call(this.__builderInstance__, query, identifier);
				if (validationErrMessage) {
					throw new Error(validationErrMessage);
				}

				operator.link.call(this.__builderInstance__, query, identifier);
			}
		});
	}

	// __build__
	//
	// Taking the query and iterate it for any Operator to build details
	// and return the SQL-String as result of the build-process
	//
	// @param query		{Any}	Specifies the query to build, which can be any type
	// 							belongs to the __allowedTypes__ for the current
	// 							Operator, Helper or Function
	//
	// @return {String}			SQL-String
	//
	__build__(query, identifier) {
		query = this.preBuild.call(this.__builderInstance__, query, identifier);

		let type = this.__checkQueryType__(query, this.__allowedTypes__);

		let syntax = this.__getTypeBasedSyntax__(type);

		if (!syntax) {
			// maybe we have a value-based syntax
			syntax = this.__getTypeValueBasedSyntax__(type, query);
		}

		if (syntax) {
			this.linkOperators(query, syntax.__registeredHelpers__, identifier);

			let result = syntax.__build__(query, identifier);
			return this.postBuild.call(this.__builderInstance__, result, type, null/*itemType*/);
		}

		if (!syntax) {
			// hm, still no syntax
			// maybe it's an iterable such as Array or Object
			let eachItemOf = this.__allowedTypes__[type].eachItemOf;
			if (!eachItemOf) {
				throw new Error(`Error using '${this.__name__}'. Type '${type}' is not allowed by syntax. Please refer the Syntax.`);
			}

			if (type == 'Array' || type == 'Object'){
				let resultsOnIterate = '';
				_.forEach(query, (value, key) => {
					let itemType = this.__checkQueryType__(value, eachItemOf, type);

					let syntax = this.__getChildTypeBasedSyntax__(type, itemType);

					if (!syntax) {
						// maybe we have a value-based syntax
						syntax = this.__getChildTypeValueBasedSyntax__(type, itemType, value);
					}

					if (!syntax){
						throw new Error(`Error using '${this.__name__}'. Type '${type}->${itemType}' is not allowed by syntax. Please refer the Syntax.`);
					}

					// don't pass the query, because that is the whole query
					this.linkOperators(/*query*/ value, syntax.__registeredHelpers__);

					let result = syntax.__build__(value, key, identifier);

					if (result) {
						resultsOnIterate += (resultsOnIterate == '' ? '' : syntax.__joinedWith__);
						resultsOnIterate += result;
					}
				});
				return this.postBuild.call(this.__builderInstance__, resultsOnIterate, type);
			}
		}
	}
}

SQLOperator.CALLEE = true;

module.exports = SQLOperator;
