# json-sql-builder2

Levelup your Queries with `json-sql-builder2`.

# Table of Content

- [Why to use json-sql-builder2](#why-to-use-json-sql-builder2)
- [Supported SQL-Dialects](#supported-sql-dialects)
- [Documentation](#documentation)
- [Getting Started](#getting-started)
  - [Install](#install)
  - [First Example](#first-example)
  - [Setup SQLBuilder](#setup-sqlbuilder)
  - [Support different Data Types](#support-different-data-types)
  - [Using Keywords](#using-keywords)
  - [More Examples](#more-examples)
  - [Working with SQL-Functions](#working-with-sql-functions)
- [Writing new Helpers and Operators](#writing-new-helpers-and-operators)
  - [What are the differences between Operators and Helpers?](#what-are-the-differences-between-operators-and-helpers)
  - [Using a Template](#using-a-template)
    - [Example writing LEFT-Function Helper](#example-writing-left-function-helper)
    - [Understanding, Writing the Syntax](#understanding-writing-the-syntax)
      - [Sub-Syntaxing](#sub-syntaxing)
    - [Native js Function support - using SQLBuiler.CALLEE](#native-js-function-support---using-sqlbuilercallee)
    - [Dialect-Specific SQL-Parts](#dialect-specific-sql-parts)
  - [Concating iterateable Informations](#concating-iterateable-informations)
  - [BuiltIn Parameters](#builtin-parameters)
  - [More Examples writing new stuff](#more-examples-writing-new-stuff)
- [Tests](#tests)
- [Generating docs](#generating-docs)
- [License](#license)

# Why to use json-sql-builder2

You are working with javascript and got the power of json, so why do you concat string by string or worry about query parameters.
When you need to write dynamic queries defined by the user it is also much easier to use JSON instead of generating a string-based query.

Another point is that in most cases the readability and structuring the query is much better than using strings.

Working with the JSON DataType is also much easier (see JSON-Example below).

# Supported SQL-Dialects

By default `json-sql-builder2` supports the follwing languages.
- [x] MySQL
- [x] MariaDB
- [x] PostgreSQL
- [x] SQLite
- [x] Oracle
- [x] Microsoft SQL Server

# Documentation
Each Operator and Helper is well documented. And you've got a lot of examples for each.

For further details on each Helper or Operators have a look at the complete
documentation at [https://github.com/planetarydev/json-sql-builder2/tree/master/sql](https://github.com/planetarydev/json-sql-builder2/tree/master/sql) and search or browse through the directories.

# Getting Started

## Install

```sh
npm install json-sql-builder2 --save
```

## First Example

```javascript
const SQLBuilder = require('json-sql-builder2');
// create a new instance of the SQLBuilder and load the language extension for mysql
var sql = new SQLBuilder('MySQL');

// lets start some query fun
var totalSalary = sql.$select({
    job_title: true,
    total_salary: { $sum: 'salary' }
    $from: 'people',
    $where: {
        job_title: { $in: ['Sales Manager', 'Account Manager'] },
        age: { $gte: 18 },
        country_code: 'US',
    },
    $groupBy: 'job_title',
});

```

**Result**
```javascript
// totalSalary.sql
SELECT
    `job_title`,
    SUM(`salary`) AS `total_salary`
FROM
    `people`
WHERE
    `job_title` IN (?, ?)
AND `age` >= ?
AND `country_code` = ?
GROUP BY
    `job_title`

// totalSalary.values
['Sales Manager', 'Account Manager', 18, 'US']

```


## Setup SQLBuilder

By default you will create a new Instance of SQLBuilder by passing the language-dialect as String you would like to work with.

```javascript
const SQLBuilder = require('json-sql-builder2');
// Syntax:
// SQLBuilder(<dialect>[, options]);
//
// dialect: String | Function
// options: Object

// Setup a new instance for MySQL
var sql = new SQLBuilder('MySQL');

// Setup a new instance for MariaDB
var sql = new SQLBuilder('MariaDB');

// Setup a new instance for PostgreSQL
var sql = new SQLBuilder('PostgreSQL');

// Setup a new instance for SQLite
var sql = new SQLBuilder('SQLite');

// Setup a new instance for Oracle
var sql = new SQLBuilder('Oracle');

// Setup a new instance for SQLServer
var sql = new SQLBuilder('SQLServer');


// Passing a function as dialect param to setup your individual needs
var sql = new SQLBuilder(function(sql) {
    // set the name to one of the supported language-dialects
    sql.setLanguage('SQLServer');

    // set the left and right handed quoting character
    sql.setQuoteChar('[', ']');
    // if there the character is the same for left and right
    sql.setQuoteChar('`');

    // setup the placholder for each value pushed to the value-stack
    sql.placeholder = function() {
        return '@param' + sql._values.length;
    }

    // if neccessary turn the array of values to a object
    sql.transformValueResult = function(valuesAsArray) {
        let resultAsObj = {}
        sql.forEach(valuesAsArray, (value, index) => {
            resultAsObj['param' + index] = value
        });
        return resultAsObj;
    }
});
```


### Options

- `quoteIdentifiers` true | false (Default=false)

If this option is `true` each identifier will be quoted. If this option is set to `false` only invalid, unsafe identifiers will be quoted.

- `attachGlobal` true | false (Default=false)

This Option will attach each Operator like `$select` in uppercase `SELECT`, each callee like `left` in lowercase `$left` and each Keyword in uppercase letters to the `globals` Object, so you could write your code like:

```javascript
var sql = new SQLBuilder('SQLServer', {
    attachGlobal: true
});

let myQuery = SELECT({
    people_name: $concat($left($i('people.first_name'), 1), '. ', $i('people.last_name')),
    $from: 'people',
    $where: {
        job_title: $in(['Sales Manager', 'Account Manager']),
        last_name: $eq('Doe')
    }
});

// Results
// myQuery.sql
SELECT
    CONCAT(LEFT([people].[first_name], @param1), @param2, [people].[last_name]) AS [people_name]
FROM
    [people]
WHERE
    [job_title] IN (@param3, @param4)
AND [last_name] = @param5

// myQuery.values
{
    param1: 1,
    param2: '. ',
    param3: 'Sales Manager',
    param4: 'Account Manager',
    param5: 'Doe'
}

```

- `useOuterKeywordOnJoin` true | false

Have a look at the source of [/sql/helpers/queries/join/.joinhelper.js](./sql/helpers/queries/join/.joinhelper.js)



## Support different Data Types

Each Operator and Helper can be used with different Data Types, so it is easy to take the Type that fits your needs.
Have a look at the README.md for the Helpers, Operator you like to use. Each of them are well documented and the file
is located directly beside the source-code.

```javascript
myQuery = sql.$insert({
    $table: 'people',
    $columns: {
        first_name: true,
        last_name: true,
        age: true
    },
    $values: ['John', 'Doe', 40]
});

// is the same as:
myQuery = sql.$insert({
    $table: 'people',
    $columns: ['first_name', 'last_name', 'age'],
    $values: ['John', 'Doe', 40]
});

// is the same as:
myQuery = sql.$insert({
    $table: 'people',
    $documents: {
        first_name: 'John',
        last_name: 'Doe',
        age: 40
    }
});

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```


### Using Keywords

A complete List of all Keywords you will find at [./sql/keywords/](./sql/keywords/).

:bulb: **Exmple using Keyword DEFAULT**
```javascript
myQuery = sql.$insert({
    $table: 'people',
    $documents: {
        first_name: 'John',
        last_name: 'Doe',
        age: sql.DEFAULT
    }
});

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, DEFAULT)

// Values
{
    "$1": "John",
    "$2": "Doe"
}
```

## More Examples

## Working with SQL-Functions

```javascript
myQuery = sql.$select({
    people_name: { $concat: ['~~first_name', ' ', '~~last_name'] },
    $from: 'people'
});

// instead using $concat helper as js-function is also possible
myQuery = sql.$select({
    people_name: sql.concat('~~first_name', ' ', '~~last_name'),
    $from: 'people'
});

// SQL output
SELECT
    CONCAT(first_name, $1, last_name) AS people_name
FROM
    people

// Values
{
    "$1": " "
}
```

:bulb: **PostgreSQL update jsonb column**
```javascript
myQuery = sql.$update({
    $table: 'people',
    $set: {
        'data->profile->firstName': 'John',
        'data->profile->lastName': 'Doe'
    },
    $where: {
        people_id: 456
    }
});

// SQL output
UPDATE
    "people"
SET
    "data" = jsonb_set(jsonb_set("data", $1, $2), $3, $4)
WHERE
    "people_id" = $5

// Values
{
    "$1": "{profile,firstName}",
    "$2": "\"John\"",
    "$3": "{profile,lastName}",
    "$4": "\"Doe\"",
    "$5": 456
}
```

# Writing new Helpers and Operators

## What are the differences between Operators and Helpers?
Any Operator can build a valid SQL result by it's own without additional stuff.
So each operator will be directly attached as `$<operator-name>` to the SQLBuilder instance.
That means you can directly call each Operator like:

```javascript

// standard build-call
let myQuery = sql.build({
    // using '$select'-Operator
    $select: {
        $from: 'people'
        // ...
    }
});

// '$select' is an Operator and so you can use this directly
let myQuery = sql.$select({
    $from: 'people'
});

// instead $from is a Helper
// and this could'nt be directly called like sql.$from({...})

```
## Using a Template

**A Template for writing new Helpers and Operators:**

Each Operator should be located in `/sql/operators/<operator-name/`.

Use the following template to create a new Operator.

```javascript
class <operator-name> extends SQLBuilder.[SQLOperator | SQLHelper] {
    constructor(sql){
        super(sql);

        // definition of allowed types and it's SQL Syntax
        // more details on writing your Syntax (see 'Define a new Syntax' below)
        this.Types({
            // simple Type-based Syntax
            // where Type is String, Number, Boolean, Primitive, Object, Array, Function
            [type]: { syntax: this.Syntax(...) },

            // simple type-based Syntax as iterateable with defined sub/item-types
            // type can be Object or Array
            [type]: {
                eachItemOf: {
                    // type can be String, Number, Boolean, Primitive, Object, Array, Function
                    <type>: { syntax: this.Syntax(...) }
                }
            }

            // type-value-based definitions:
            // type can be String, Number, Boolean
            [type]: {
                syntax: {
                    // List all values that are valid to use
                    // with the current Helper or Operator
                    [<value-1>: this.Syntax(...) [,<value-n>: ...]]
                }
            }

            // type-based, iterateable and value-ased restricted Syntax
            // type can be Object or Array
            [type]: {
                eachItemOf: {
                    // type can be String, Number, Boolean, Primitive, Object, Array, Function
                    <type>: {
                        syntax: {
                            // List all values that are valid to use
                            // with the current Helper or Operator
                            [<value-1>: this.Syntax(...) [,<value-n>: ...]]
                        }
                    }
                }
            }

        });

        // optional declaration of Keywords
        this.Keyword('<keyword>');

        // optional registration of private Helpers that are used inside the
        // Syntax declared above with this.Types({...})
        this.registerPrivateHelper('<helper-name>'); // the helper must be located in "./private/<helper-name>/<helper-name>.js"
        // or register your private helper by your own
        this.$<helper-name> = new <helperClass>(sql);
    }

    // optional function callee definition if the standard
    // callee - generated by Syntax - doesn't fit
    callee(/*args*/, identifier){
        // ...
        return sqlResultString;
    }

    // optional linker-method
    link(query, identifier){
        // ...
    }

    // optional preBuild-method
    preBuild(query, identifier) {
        // ...
        return query;
    }

    // optional postBuild-method
    postBuild(result, type, itemType){
        // ...
        return result;
    }
}

module.exports = {
    definition: <class-definition>,
    description: <String: a short description of the new Helper or Operator>,
    supportedBy: {
        // list all SQL-dialects that support this new Helper or Operator
        // SQL-dialect can be: MySQL, MariaDB, PostgreSQL, SQLite, Oracle, SQLServer
        <SQL-dialect>: <'' | url to official docs>
        [, <another SQL-dialect>: <'' | url to official docs>]
    },
    examples: {
        // write at minimum one Test "Basic Usage" for each Type of Syntax defined above
        // using the same structure as used by this.Types({...}) in the class constructor.
        // Additional Tests and Examples allways wellcome!

        // Example of a Test-Case for the Type "Object":
        Object: {
            "Basic Usage": function(sql) {
                return {
                    // if the test is restricted to special SQL dialects
                    [supportedBy: {
                        // list all dialects (MySQL, MariaDB, PostgreSQL, SQLite, Oracle, SQLServer)
                        // the Test is valid for
                        <SQL-dialect>: true
                    },]
                    test: function() {
                        return sql.build({
                            $select: {
                                $from: 'people'
                            }
                        });
                    },
                    expectedResults: {
                        sql: 'SELECT * FROM people',
                        values: {}

                        // List any SQL-dialect if the Result on Test is different to the generell Result
                        [,<SQL-dialect>: {
                            sql: <Result-String if there are different using a special SQL-dialect>
                            values: {
                                $1: ...
                                $2: ...
                            }
                        }]
                    }
                }
            }
            [, "<name of another Test>": function(sql){
                // ...
            }]
        }
    }
}
```

### Example writing LEFT-Function Helper

If there is something missing you can easily extend all your required stuff.

**If you will create a new Helper or Operator I would be glad if you will
contribute and share your magic stuff.**

The only thing you have to do is browse to the right place inside the `/sql/` directory
and create a new folder and file named with the Helper or Operator.

In our Example we will create the `LEFT()` SQL-Function.

This file will be located at `/sql/helpers/functions/string/`:
- create a new Folder `left`
- create a new File `left/left.js`

Here is the code you need to write for `left.js` using the Template:

```javascript
'use strict';

// give the new Class the name of the Helper or Operator
class left extends SQLBuilder.SQLHelper {
    constructor(sql){
        // always call the construtor of SQLHelper first
        super(sql);

        // declare the possible types that can be used
        this.Types({
            Number: { syntax: this.Syntax('LEFT(<key-ident>, <value-param>)') },
            Object: { syntax: this.Syntax('LEFT(<$str>, <$len>)', SQLBuilder.CALLEE) },
        });

        // add each Helper defined in the Syntax as private, predefined Helper
        this.$str = new SQLBuilder.SQLPredefined.StringValueParam(sql);
        this.$len = new SQLBuilder.SQLPredefined.NumberValueParam(sql);
    }
}

// export the new $left Helper
module.exports = {
    // exports the class-definition (this is used by SQLBuilder to setup the new Helper)
    definition: left,

    // add some description for the auto-generation of the docs README.MD
    description: `Specifies the \`LEFT\` function.`,

    // define the SQL-dialects that support this new Helper
    // Each dialect listed by supported by can use this Helper. If you pass a string
    // that starts with 'http://' or 'https://' inside the docs it automatically creates a link
    // to the official docs
    supportedBy: {
        MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_left',
        MariaDB: 'https://mariadb.com/kb/en/library/left/',
        PostgreSQL: 'https://www.postgresql.org/docs/9.1/static/functions-string.html',
        // SQLite did not support the left() function at this time
        // Oracle did not support the left() function at this time --> instead we can use SUBSTR( string, start_position [, length ] ) defined as new SQLHelper
        SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/functions/left-transact-sql'
    },

    // Always add at least "Basic Usage" as test and example for each type you
    // have declared by the new class using this.Types()
    examples: {
        Number: {
            // Basic Usage is the Name of the Test and must always declared as function(sql)
            // Parameter sql will be passed as instance of the SQLBuilder
            "Basic Usage": function(sql) {
                // the function always returns an Object {test: function() {}, expectedResults: {} [, supportedBy: { PostgreSQL: true, MySQL: true, ... }] }
                return {
                    // write your test and return always the result
                    test: function(){
                        return sql.$select({
                            firstname: { $left: 1 }
                        });
                    },
                    // define the expected results of the test with
                    // sql as String and values as Object. If there are no values expected, so define an empty Object like values: {}
                    expectedResults: {
                        sql: 'SELECT LEFT(first_name, $1) AS first_name',
                        values: {
                            $1: 1
                        }
                    }
                }
            }
        },
        Object: {
            // Basic Usage is the Name of the Test and must always declared as function(sql)
            // where sql is the instance of the SQLBuilder
            "Basic Usage": function(sql) {
                // the function always returns an Object {test: function() {}, expectedResults: {} [, supportedBy: { PostgreSQL: true, MySQL: true, ... }] }
                return {
                    // write your test and return always the result
                    test: function(){
                        return sql.$select({
                            test: { $left: { $str: 'Hello World', $len: 5 } }
                        });
                    },
                    // define the expected results of the test with
                    // sql as String and values as Object. If there are no values generated, so define an empty Object values: {}
                    expectedResults: {
                        sql: 'SELECT LEFT($1, $2) AS test',
                        values: {
                            $1: 'Hello World',
                            $2: 5
                        }
                    }
                }
            },
            // Optionally add some more Tests and Examples with a different name:
            "Usage of LEFT as Function": function(sql) {
                return {
                    test: function(){
                        return sql.$select({
                            // The helper can directly used as native js-function because
                            // we setup the Syntax for Type "Object" with SQLBuilder.CALLEE parameter as second (see above)
                            test: sql.left('Hello World', 5)
                        });
                    },
                    expectedResults: {
                        sql: 'SELECT LEFT($1, $2) AS test',
                        values:{
                            $1: 'Hello World',
                            $2: 5
                        }
                    }
                }
            }
        }
    }
}
```

### Understanding, Writing the Syntax

Every Helper or Operator will be defined by a Type, iterateable sub-Type and optionally value restrictions.
For each of this situation you have to support a valid Syntax, that will generate the
SQL-Result-String for the Helper or Operator.

**Example of SUBSTR-Syntax for Type Object**

```javascript
class substr extends SQLBuilder.SQLHelper {
    constructor() {
        ...
        this.Types({
            Object: { syntax: this.Syntax('SUBSTR(<$str> FROM <$start>{ FOR [$len]})', SQLBuilder.CALLEE) }
        }
        ...
    }
}
```

Okay, lets explain the *magic* stuff we have declared above.

By defining only the Type `Object` you can only use the `$substr` Helper like `first_name: { $substr: {...} }`.
If you try to use it with a Number-Value like `first_name: { $substr: 5 }` the SQLBuilder will throw an Error like `Type Number is not allowed by Syntax`.

In our case we define two required Parameters (or better say Helpers). The first one is `<$str>` and the second one is `<$start>`.
The third `[$len]` Helper is optional. With this informations we could write the following examples:

```javascript
let myQuery = sql.$select({
    test: { $substr: { $str: 'Hello World', $start: 3 } }
});

// SQL-Output
SELECT
    SUBSTR($1 FROM $2) AS test
```

#### Sub-Syntaxing

In most cases of SQL there are optional parts that also include keywords. In our Example of the SUBSTR Function it's the `FOR` option
that specifies the length of the substring. So we need a *Sub-Syntax* that will only be generated when the Helper inside is supported.
The *Sub-Syntax* is defined by using curly braces like `{ FOR [$len]}`.


### Native js Function support - using SQLBuiler.CALLEE

What the hell is that?

Sometimes it's quite usefull to use a Helper as native js-Function like `test: sql.substr('Hello World', 3)`, so
you can specifiy one Syntax per Helper or Operator as callee by adding an optional parameter to the Syntax-Function `SQLBuiler.CALLEE`.
This option will automatically turn the Syntax into a native js-function located on the current instance of the SQLBuilder.
In our case the Syntax of the Function will be: `sql.substr(<str>, <start> [, options])` where **options** is an Object that could take all
optional Helpers defined by the Syntax.

**Example**
```javascript
let myQuery = sql.$select({
    test: sql.substr('Hello World', 3, {
        $len: 5
    })
});

// SQL-Output
SELECT
    SUBSTR($1 FROM $2 FOR $3) AS test
```

### Write an individual callee**

Sometimes the auto generated callee does not fit our rules, so you can easily write your own callee by adding a method named `callee` to the new Helper class.
In this case you could define each Function-Parameter by your own and add code to build the SQL-Result.
Just a small Example how the substr-callee can look like.

**Example**
```javascript
class substr extends SQLBuilder.SQLHelper {
    constructor() {
        ...
        this.Types({
            Object: { syntax: this.Syntax('SUBSTR(<$str> FROM <$start>{ FOR [$len]})') } // remove this param: , SQLBuilder.CALLEE) }
        }
        ...
    }

    // add our own callee method
    callee(str, start, len, identifier /*identifier will always be injected by SQLBuilder as last argument*/) {
        // the callee-method will be executed
        // in the context (this) of the current SQLBuilder instance
        // !!! **this** is NOT the context of this class-Object
        // so you have access to all useful methods of the SQlBuilder like:
        // - isString(), isNumber() ...
        // - isMySQL(), isPostgreSQL(), ...
        // - quote(), addValue(), isCurrent(), isPreviousHelper(), ...
        let sqlResult = 'SUBSTR(';

        // check types
        if (!this.isString(str) || !this.isNumber(start) || (len && !this.isNumber(len))) {
            throw new Error('Using sql.substr failed because of wrong parameter type. Syntax is: sql.substr(str, start[,len])');
        }

        sqlResult += this.addValue(str) + ' FROM ' + start // we dont add start as parameter and put it directly into the SQL string //this.addValue(start);
        if (len) {
            sqlResult += ' FOR ' + len;
        }
        sqlResult += ')'

        return sqlResult;
    }
}

...

// Using our new selfmade CALLEE
let myQuery = sql.$select({
    test: sql.substr('Hello World', 3, 5)
});

// SQL-Output
SELECT
    SUBSTR($1 FROM 3 FOR 5) AS test
```



### Dialect-Specific SQL-Parts

About 70% or 80% of all SQL comply with the ANSI SQL-Standard. So you can write code for each Helper and Operator for each SQL-dialect or
you can add your specific Helper-Syntax as dialect-specific expression.

**Example**

```javascript
SELECT
    { [$top]}-->(SQLServer)
    { DISTINCT[$distinct]}
    { SQL_CALC_FOUND_ROWS[$calcFoundRows]}-->(MySQL,MariaDB)

    { <$columns>}
        { [$into]}-->(MySQL,MariaDB,SQLServer)

    { FROM [$from]}    { [$join]}
    { WHERE [$where]}
    { GROUP BY [$groupBy]}
        { WITH ROLLUP[$withRollup]}-->(MariaDB,MySQL)
    { HAVING [$having]}
    { ORDER BY [$orderBy]}
    { LIMIT [$limit]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
    { OFFSET [$offset]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
```

The Example shows the current Syntax of the `SELECT` Statement. Here you can see some
dialect-specific Helpers marked with `-->(<sql-dialect>[,<sql-dialect>,...])`.

So, if you are running SQLBuilder with PostgreSQL the `$info` Helper for the ` INTO ` clause
is only supported by MySQL, MariaDB and SQLServer. If you write `$select: { $from: 'people', $into: ... }`
the SQLBuilder will throw an Error that `$into Helper is not permitted by Syntax`.



### Concating iterateable Informations

Sometimes you need to define an Array of columns or an Object with column-identifiers and they all need to
concatenated by comma with the previouse one. To archive this you can specifiy a concatination-String or Joiner.

Let's build a part of the `$columns` Helper from the `$select` Operator.

```javascript
let myQuery = sql.$select({
    $columns: {
        first_name: true,
        last_name: true,
        ...
    }
})

// SQL-Output
SELECT
    first_name,
    last_name,
    ...

// This is the definition of the $columns Helper.
// Have a look at the joiner "[ , ... ]" inside the Syntax.
class columns extends SQLBuilder.SQLHelper {
    constructor(sql){
        super(sql);

        this.Types({
            Object: {
                // Here we have a iterateable...
                eachItemOf: {
                    // ...where each value should have one of the
                    // following types listed:
                    Boolean: {
                        syntax: {
                            true: this.Syntax('<key-ident>[ , ... ]'),
                            false: this.Syntax('')
                        }
                    },
                    Number: {
                        syntax: {
                            1: this.Syntax('<key-ident>[ , ... ]'),
                            0: this.Syntax('')
                        }
                    },
                    String: { syntax: this.Syntax('<key-ident> AS <value-ident>[ , ... ]') },
                    Object: { syntax: this.Syntax('<value> AS <identifier>[ , ... ]') },
                    Function: { syntax: this.Syntax('<value> AS <key-ident>[ , ... ]') }
                }
            },
            Array: {
                eachItemOf: {
                    String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
                    Object: { syntax: this.Syntax('<value> AS <key-ident>[ , ... ]') }
                }
            },
            String: { syntax: this.Syntax('<value-ident>') }
        });
    }
}

// Joiner [ , ... ] explained:
// Each joiner has this style: "[ <joiner-def>... ]"
// ! note of the space chars >---^---------------^
```

Every time the Syntax includes such a declaration the SQLBuilder extracts the joiner-definition and concatenates each item with this string-definition.

Another Example of a joiner-Definition you will find at `/sql/helpers/locical/and/and.js` which is a Helper that is used by the $where Helper.
The joiner is defined as `[  AND ... ]`.

### BuiltIn Parameters

Each Syntax can take - so called BuiltIn-Params - to interact with the JSON-Data. For this
you have to following parameter definitions you could use inside each Syntax:

- `<key>`, `<key-ident>` or `<key-param>`
- `<value>`, `<value-ident>` or `<value-param>`
- `<identifier>`

`<key>`, `<value>`:

Native replacement for the Objects Key (or Index when using an Array) and replacement for the value of an Item.
```javascript
class columns extends... {
    ...
    this.Types({
        Object: {
            eachItemOf: {
                String: { syntax: this.Syntax('<key> AS <value>') }
            }
        }
    });
    ...
}

let myQuery = sql.$select({
    $columns: {
        my_key: 'my_string_value'
    }
})

//SQL-Output
SELECT
    my_key AS my_string_value
```


`<key-ident>`, `<value-ident>`:

Safely quoted replacement for the Objects Key (or Index when using an Array - does not really make sense :-) ) and replacement for the value of an Item.
```javascript
class columns extends... {
    constructor(){
        ...
        this.Types({
            Object: {
                eachItemOf: {
                    String: { syntax: this.Syntax('<key-ident> AS <value-ident>') }
                }
            }
        });
        ...
    }
}

let myQuery = sql.$select({
    $columns: {
        my_key: 'my_string_value',
        'my_schema.my_table.my_col': 'my_test_alias'
    }
})

//SQL-Output for PostgreSQL
SELECT
    "my_key" AS "my_string_value",
    "my_schema"."my_table"."my_col" AS "my_test_alias"

//SQL-Output for MySQL
SELECT
    `my_key` AS `my_string_value`,
    `my_schema`.`my_table`.`my_col` AS `my_test_alias`

//SQL-Output for SQLServer
SELECT
    [my_key] AS [my_string_value],
    [my_schema].[my_table].[my_col] AS [my_test_alias]
```


`<key-param>`, `<value-param>`

Parameterized Key and Value replacement where the value itself is pushed to the value-stack.

```javascript
class left extends... {
    constructor(){
        ...
        this.Types({
            Number: { syntax: this.Syntax('<key-ident> AS <value-param>')
        });
        ...
    }
}

let myQuery = sql.$select({
    $columns: {
        first_name: { $left: 1 }
    }
})

//SQL-Output for PostgreSQL
SELECT
    LEFT("first_name", $1) AS "first_name"

//SQL-Output for MySQL
SELECT
    LEFT(`first_name`, ?) AS `first_name`

//SQL-Output for SQLServer
SELECT
    LEFT([first_name], @param1) AS [first_name]

```

## More Examples writing new stuff

**For more informations browse through the `/sql/operator` or `/sql/helper` directories. There are a lot
of Helpers and Operators and they all give you the best examples to write your own magic stuff.**

# Tests

After changing an existing Helper, Operator or maybe creating some new stuff you should run the Test.
For this use always:

```sh
npm test
```

If you like to Test only a specific language dialect or specific helper or operator you could pass arguments for that:

```sh
npm test -- [ --language|dialect <MySQL|MariaDB|PostgreSQL|SQLite|Oracle|SQLServer> ] [ --helper|operator <path of helper located in ./sql> ]

# Test only the $left-helper for language-dialect MySQL
npm test -- --helper /helpers/functions/string/left/left.js --language MySQL
```


## Generating docs

The documentation will automatically rebuild with every successful Test run.
Please note that a successful Test will only be archived by running a complete Tests without a specific language, helper or operator.

# License

MIT License

Copyright (c) 2017-2018 planetarydev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
