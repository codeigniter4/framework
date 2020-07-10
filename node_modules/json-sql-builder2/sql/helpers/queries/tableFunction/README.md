# tableFunction Helper
Specifies a helper to call a table-valued-function from inside the `FROM` clause.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/11/sql-createfunction.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/sql/linq/how-to-use-table-valued-user-defined-functions)

# Allowed Types and Usage

## as Object:

Usage of `tableFunction` as **Object** with the following Syntax:

**Syntax:**

```javascript
$tableFunction: { ... }
```

**SQL-Definition:**
```javascript
<$name>([$args])
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[name](./private/name/)|:heavy_check_mark:|*private*||
[args](./private/args/)|*optional*|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                test: {
                    $tableFunction: { $name: 'my_table_valued_function', $args: ['Param1', 2, 'Param3', 4] }
                }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    my_table_valued_function($1, $2, $3, $4) AS test

// Values
{
    "$1": "Param1",
    "$2": 2,
    "$3": "Param3",
    "$4": 4
}
```

## as String:

Usage of `tableFunction` as **String** with the following Syntax:

**Syntax:**

```javascript
$tableFunction: < String >
```

**SQL-Definition:**
```javascript
<value-ident>()
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                test: { $tableFunction: 'my_table_valued_function' }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    my_table_valued_function() AS test

// Values
{}
```

## Further Examples

:bulb: **Usage as Function without args**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                test: sql.tableFunction('my_table_valued_function')
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    my_table_valued_function() AS test

// Values
{}
```

:bulb: **Usage as Function with args**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                test: sql.tableFunction('my_table_valued_function', { $args: ['Param1', 2, 'Param3', 4] })
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    my_table_valued_function($1, $2, $3, $4) AS test

// Values
{
    "$1": "Param1",
    "$2": 2,
    "$3": "Param3",
    "$4": 4
}
```

