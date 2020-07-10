'use strict';

const fs 			= require('fs');
const path 			= require('path');
const colors 		= require('colors/safe');
const _				= require('lodash');
const Mocha 		= require('mocha');

const tools 		= require('./tools');
const Syntax 		= require('./syntax');
const SQLBuilder	= require('../index');

class TestLogger {
	constructor() {
		this.messages = [];
		this.errors = [];
		this.fatal = false;
		this.isSuccessful = true;
	}

	error(path, language, message, fatal, errStack){
		this.isSuccessful = false;
		this.messages.push({ path: path, language:language, message:message, fatal: fatal, errStack: errStack });
		if (fatal) {
			this.fatal = true;
		}
		if (errStack) {
			this.errors.push(errStack);
		}
	}

	hasErrors(){
		return this.errors.length > 0;
	}

	successful(){
		return this.isSuccessful;
	}

	depth(depth) {
		if (depth == 1) return '    ';

		return (' '.repeat(depth*2) + '  ');
	}

	headLine(modulePath) {
		let moduleNames = modulePath.split('/');
		let moduleName = moduleNames[moduleNames.length - 1];
		let message = ' ' + moduleName + '  ' + colors.grey(modulePath);
		this.messages.push(message);
		console.log(message);
	}

	print(depth, message){
		console.log(this.depth(depth) + message);
	}

	success(depth, message, greyColored){
		console.log(this.depth(depth) + colors.green('\u2714 '/*checkmark*/) + (greyColored ? colors.grey(message) : message));
	}

	failed(depth, path, language, message, fatal, errStack){
		if (message) {
			this.error(path, language, message, fatal, errStack);
		}

		console.log(this.depth(depth) + colors.red('!! ') + colors.red.bold(fatal ? 'FATAL-ERROR: ':'') + colors.red( (fatal ? '':'ERROR: ') + (message || '') ) );

		return this;
	}

	info(depth, message, language, additionalGreyMessage){
		if (language) {
			console.log(colors.cyan(this.depth(depth) + message) + colors.grey(additionalGreyMessage || '') + ' ' + colors.yellow(language || ''));
		} else {
			console.log(colors.cyan(this.depth(depth) + message) + colors.grey(additionalGreyMessage || ''));
		}

		return this;
	}

	newLine(){
		console.log('')
	}
}


class Test {
	constructor(){
		let modules = tools.walk(path.join(__dirname, '../sql/'));

		this.modules = modules.filter(function(module){
			return module.endsWith('.js') && module.indexOf('_private') == -1 && !path.basename(module).startsWith('.');
		});

		this.resultsByModule = {};
	}

	getModuleName(modulePath) {
		let moduleNames = modulePath.split(path.sep);
		let moduleName = moduleNames[moduleNames.length - 1];
		return moduleName.replace('.js', '');
	}

	getModulePath(modulePath){
		let moduleNames = modulePath.split(`${path.sep}sql`);
		return path.join('/sql/', moduleNames[1]);
	}

	/**
	 * validateModule
	 *
	 * Check if all primary Properties are exported for the
	 * given module.
	 *
	 * @param module		{Object}	Specifies the sql/node-js module
	 * @param testResults	{Object}	Specifies the Testobject for the current module
	 *
	 * @return true/false regarding the validation
	 */
	validateModule(module, testResult){
		// check if we have a description
		if (!_.isString(module.description)) {
			testResult.log.failed(1, testResult.name, null, 'No description provided.');
		}

		if (!_.isObject(module.definition)) {
			testResult.log.failed(1, testResult.name, null, 'No definition provided.');
		}

		if (!_.isObject(module.supportedBy)) {
			testResult.log.failed(1, testResult.name, null, 'No supportedBy provided.');
		}
		// check for unknown language in supportedBy
		_.forEach(module.supportedBy, (http, supportedLang) =>{
			if (SQLBuilder.supportedLanguages.indexOf(supportedLang) == -1){
				testResult.log.failed(1, testResult.name, null, `Unknown language '${supportedLang}' detected in supportedBy.`);
			}
		})

		if (!_.isObject(module.examples)) {
			testResult.log.failed(1, testResult.name, null, 'No examples and tests provided.');
		}

		return testResult.log.successful();
	}

	depth(depth) {
		if (depth == 1) return '    ';

		return (' '.repeat(depth*2) + '  ');
	}

	compareTestResult(depth, path, language, testName, testCase, result, log) {
		let success = true;

		// check the result sql - if we got an valid object
		if (!_.isPlainObject(result)) {
			log.failed(depth, path, language, 'Result is not an Object!', true);
			return false;
		}

		if (!_.isString(result.sql)) {
			log.failed(depth, path, language, 'result.sql is not a String!', true);
			return false;
		}

		if (!_.isArray(result.values)) {
			log.failed(depth, path, language, 'result.values is not an Array!', true);
			return false;
		}

		// check for Results explictly for the current language
		// because PostgreSQL does not support parameterized queries on CREATE TABLE
		// so we need to define a separte result for each language
		// if there is are no results defined for the current language we take the standard expectedResults
		let expectedResults = testCase.expectedResults[language] ? testCase.expectedResults[language] : testCase.expectedResults;
		if (result.sql !== expectedResults.sql) {
			if (success) log.failed(depth, path, language, testName);
			log.error(path, language, ' '); // newLine
			log.error(path, language, '  ' + colors.yellow(language + ': ') + colors.red('SQL Statement failed') + '\n');
			log.error(path, language, '  ' + colors.yellow('  -|' + result.sql + '|'));
			log.error(path, language, '  ' + colors.green('  +|' + expectedResults.sql + '|'));
			success = false;
		}

		// check length of values equals expected
		let expectedValues = expectedResults.values || {};
		let arrExpectedValues = Object.keys(expectedValues);

		if (arrExpectedValues.length !== result.values.length) {
			if (success) log.failed(depth, path, language, testName);
			log.error(path, language, ' '); // newLine
			log.error(path, language, '  ' + colors.yellow(language + ': ') + colors.red('Count of Parameters failed') + '\n');
			log.error(path, language, '  ' + colors.yellow('  -' + result.values.length) + colors.green('   +' + arrExpectedValues.length));
			success = false;
		}

		let max = arrExpectedValues.length;
		if (result.values && result.values.length > max) max = result.values.length;
		for (let i=0; i<max; i++) {
			let actualValue = result.values[i];
			let expectedValue = expectedValues['$' + (i + 1)];

			if (actualValue !== expectedValue){
				if (success) log.failed(depth, path, language, testName);
				log.error(path, language, ' '); // newLine
				log.error(path, language, '  ' + colors.yellow(language + ': ') + colors.red('Parameter ' + (i + 1) + ' does not match'));

				log.error(path, language, ' '); // newLine
				log.error(path, language,
					'  '
					+ colors.yellow('  $' + (i + 1) + ':   -')
					+ (typeof actualValue === typeof undefined ? colors.grey(actualValue+'') : colors.yellow(actualValue+''))
				);
				log.error(path, language,
					'  '
					+ colors.green('  $' + (i + 1) + ':   +')
					+ (typeof expectedValue === typeof undefined ? colors.grey(expectedValue+'') : colors.green(expectedValue+''))
				);

				success = false;
			}
		}

		if (!success) {
			log.error(path, language, ' '); // newLine
		}

		return success;
	}

	doTests(depth, path, language, tests, testResult, sql) {
		_.forEach(tests, (testFunction, testName) => {
			// skip all test if we have a fatal error
			if (testResult.log.fatal) return;

			// get test-case with test and the expected results
			let testCase;
			if (_.isFunction(testFunction)) {
				try {
					testCase = testFunction(sql);
				} catch(err) {
					testResult.log.failed(depth, path, language, `Unexpected Error get TestCase '${testName}' > ${err.message}.`, true, err.stack);
					return;
				}
			} else {
				testResult.log.failed(depth, path, language, `Unexpected declaration for '${testName}'. Expected function(sql) { ... }`, true);
				return;
			}

			if (testCase.supportedBy && !testCase.supportedBy[language]) {
				testResult.log.info(depth, '\u2714 skipped: ', null /*language*/, testName);
				return;
			}

			// check if test and expectedResults still returned
			if (testCase &&
				_.isFunction(testCase.test) &&
				_.isPlainObject(testCase.expectedResults) &&
				_.isString(testCase.expectedResults.sql) &&
				_.isPlainObject(testCase.expectedResults.values)
			) {
				// okay
				let result;
				try {
					result = testCase.test();
				} catch(err) {
					testResult.log.failed(depth, path, language, `Unexpected Error execute Test '${testName}' > ${err.message}.`, true, err.stack);
					return;
				}

				// compare result with expected Results
				// ...
				if (this.compareTestResult(depth, path, language, testName, testCase, result, testResult.log)) {
					testResult.log.success(depth, testName, true/*grey color*/);
				} else {
					testResult.log.error(depth, path, ''); // newLine
				}
			} else {
				// error
				testResult.log.failed(depth, path, language, `Unexpected Test declaration for '${testName}'.`, true);
			}
		});
	}

	run(testForSpecificLang, testForSpecificModule){
		console.log('Running SQL-Tests:\n');

		_.forEach(this.modules, (moduleName) => {
			if (testForSpecificModule && testForSpecificModule !== moduleName.split(`${path.sep}sql`)[1]) return;

			let module = require(moduleName);

			// init the results object for each module
			this.resultsByModule[moduleName] = {
				name: moduleName.split(`${path.sep}sql`)[1],
				log: new TestLogger()
			}

			let testResult = this.resultsByModule[moduleName];
			testResult.log.headLine(testResult.name.replace('.js', ''));

			// at first check the export signature for this module
			if (!this.validateModule(module, testResult)){
				testResult.log.newLine();
				return;
			}
			testResult.log.success(1, 'Module Export');
			testResult.log.newLine();

			let supportedLanguages = testForSpecificLang ? [testForSpecificLang] : SQLBuilder.supportedLanguages; // ['PostgreSQL'] //
			_.forEach(supportedLanguages, (language) => {
				if (testResult.log.fatal) return;

				testResult.log.print(1, language);

				// check if the current language is supported by this helper
				if (!(_.isString(module.supportedBy[language]) || _.isArray(module.supportedBy[language]))) {
					testResult.log.info(2, 'skipped, not supported.');
					testResult.log.newLine();
					return;
				}

				let sql;
				try {
					sql = new SQLBuilder(language);

					// reset quoting and unify parameter-placeholders
					sql.setQuoteChar('');
					sql.placeholder = function(){
						return '$' + sql._values.length;
					}
					sql.transformValueResult = function(values){
						return values;
					}

				} catch (err) {
					testResult.log.failed(2, 'Instancing SQLBuilder', language, `Error on instancing SQLBuilder. ` + err.message, true/*fatal*/, err.stack);
					return;
				}
				// get a new instance of the test candidate(helper or operator)
				let instance
				try {
					// get the instance from the public helper or operator
					// !!! don't use the public helpers or operators -->
					// !!! because several helpers got the same name like "columns" and there is one public and the others are private
					// !!! instance = sql._operators['$' + module.definition.name];

					// the helper or oparator was'nt public we dont got it!
					// so instance it now
					if (instance === undefined){
						// we are currently in the lib - directory
						// from here - the relative path to the current module
						// is ../sql/.....
						sql.currentModulePath = path.dirname(path.join('../sql', moduleName.split(`${path.sep}sql`)[1]));
						instance = new module.definition(sql);
					}
				} catch (err) {
					testResult.log.failed(2, 'Instancing Module', language, `Error on instancing Helper or Operator. ` + err.message, true/*fatal*/, err.stack);
					return;
				}
				testResult.log.success(2, 'Instancing');

				testResult.log.newLine();

				// begin real tests on examples
				// check if all tests exists for each syntax declared with this.Types
				// and run them
				_.forEach(instance.__allowedTypes__, (typeDef, type) => {
					let path = 'as ' + type;
					testResult.log.print(2, path);
					// check for eachItemOf
					if (_.isPlainObject(typeDef.eachItemOf)) {
						// okay iterate eachItemOf type
						_.forEach(typeDef.eachItemOf, (itemTypeDef, itemType) => {
							let itemPath = path + ' with an item of ' + itemType;
							testResult.log.print(3, 'with an item of ' + itemType);
							// check for value-based Syntax
							if (itemTypeDef.syntax instanceof Syntax) {
								// eachItemOf with value-based Syntax
								// check if at least one test exists
								if (module.examples[type] &&
									module.examples[type].eachItemOf &&
									module.examples[type].eachItemOf[itemType] &&
									_.isFunction(module.examples[type].eachItemOf[itemType]['Basic Usage'])
								) {
									this.doTests(4, itemPath, language, module.examples[type].eachItemOf[itemType], testResult, sql);
								} else {
									testResult.log.failed(4, itemPath, language, 'Basic Usage - Testcase missing.', true);
								}
								return;
							}

							if (!_.isPlainObject(itemTypeDef.syntax)) {
								testResult.log.failed(4, itemPath, language, 'Wrong Type/Syntax-Definition Constructor detected.');
								return;
							}
							// value-based
							_.forEach(itemTypeDef.syntax, (valuedSyntax, value) => {
								let itemValuePath = itemPath + ' and value is ' + value;
								testResult.log.print(4, 'and value is ' + value);
								if (module.examples[type] &&
									module.examples[type].eachItemOf &&
									module.examples[type].eachItemOf[itemType] &&
									module.examples[type].eachItemOf[itemType][value] &&
									_.isFunction(module.examples[type].eachItemOf[itemType][value]['Basic Usage'])
								) {
									this.doTests(5, itemValuePath, language, module.examples[type].eachItemOf[itemType][value], testResult, sql);
								} else {
									testResult.log.failed(5, itemValuePath, language, 'Basic Usage - Testcase missing.', true);
								}
							});
						});
						return;
					}

					if (typeDef.syntax instanceof Syntax) {
						if (module.examples[type] &&
							_.isFunction(module.examples[type]['Basic Usage'])
						) {
							this.doTests(3, path, language, module.examples[type], testResult, sql);
						} else {
							testResult.log.failed(3, path, language, 'Basic Usage - Testcase missing.', true);
						}
						return;
					}

					// check for valuebased syntax
					if (!_.isPlainObject(typeDef.syntax)) {
						testResult.log.failed(3, path, language, 'Wrong Type/Syntax-Definition in Constructor detected.');
						return;
					}

					// value-based
					_.forEach(typeDef.syntax, (valuedSyntax, value) => {
						let valuePath = path + ' with value ' + value;
						testResult.log.print(3, 'with value ' + value);

						if (module.examples[type] &&
							module.examples[type][value] &&
							_.isFunction(module.examples[type][value]['Basic Usage'])
						) {
							this.doTests(4, valuePath, language, module.examples[type][value], testResult, sql);
						} else {
							testResult.log.failed(4, valuePath, language, 'Basic Usage - Testcase missing.', true);
						}
					});
				});
				testResult.log.newLine();
			});

			testResult.log.newLine();
			testResult.log.newLine();
		});

		return this.summary();
	}

	summary(){
		// evaluat test results;
		let passed = 0;
		let failed = 0;

		_.forEach(this.resultsByModule, (t, moduleName) => {
			if (t.log.successful()) {
				passed++
			} else {
				failed++;
				if (failed == 1) {
					console.log(colors.bold('\n\n\nFailed Tests:\n'));
				}

				console.log('  ' + failed + ')  ' + this.getModuleName(t.name) + ' ' + colors.grey(this.getModulePath(moduleName)));
				let oldPath = ''
				_.forEach(t.log.messages, (msg) => {
					if (!msg.message) {
						// it's a newLine
						//console.log();
						return;
					}
					if (oldPath != msg.path) {
						console.log('\n        ' + msg.path);
						oldPath = msg.path;
					}
					console.log(colors.red('          ' + msg.message));
					if (msg.fatal && msg.errStack) {
						console.log('\n' + colors.grey('          ' + msg.errStack.split('\n').join('\n          ')));
					}
				});

				console.log(colors.green('\n          + expected') + colors.yellow('   - actual') + '\n');
			}
		});

		console.log('\n\n ' + ' Summary: \n');
		console.log(colors.green('    ' + (passed + ' ' + (passed == 1 ? 'Test':'Tests') + ' passing')));
		if (failed) {
			console.log(colors.red('    ' + (failed + ' ' + (failed == 1 ? 'Test':'Tests') + ' failed')));
		}
		console.log();

		// return success true or false
		return failed == 0;
	}
}

// Instantiate a Mocha instance.
var mocha = new Mocha();
var testDir = path.join(__dirname, '../tests');

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';
}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});

console.log('Running internal API-Tests:')
// First Run the internal tests.
mocha.run(function(failures){
	if (failures) {
		console.log('Internal Tests stopped with failures. ' + failures);
		process.exit(failures);
	}

	var test = new Test();

	// check for a specific language to test for
	let testForSpecificLang = null;
	process.argv.forEach((val, index) => {
		if (val == '--language' || val == '--dialect'){
			if (process.argv.length > index && SQLBuilder.supportedLanguages.indexOf(process.argv[index+1]) > -1) {
				testForSpecificLang = process.argv[index+1];
			}
		}
	});

	let testForSpecificModule = null;
	process.argv.forEach((val, index) => {
		if (val == '--helper' || val == '--operator'){
			if (process.argv.length > index) {
				testForSpecificModule = process.argv[index+1];
			}
		}
	});

	if (test.run(testForSpecificLang, testForSpecificModule)){
		// only rebuid the docs if the total test was successful
		if (!testForSpecificLang && !testForSpecificModule) {
			// test was successful, so rebuild the docs
			console.log('Rebuild docs...');
			const docs = require('./docs');
			console.log('finished.');
		}
	} else {
		// sql - tests got failures
		process.exit(3);
	}

	process.exit(0);
});
