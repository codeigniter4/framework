# max Helper
Specifies the aggregation function `MAX` as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_max)
- [MariaDB](https://mariadb.com/kb/en/library/max/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-aggregate.html)
- [SQLite](https://sqlite.org/lang_aggfunc.html#max)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions087.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/functions/max-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `max` as **Object** with the following Syntax:

**Syntax:**

```javascript
$max: { ... }
```

**SQL-Definition:**
```javascript
MAX({DISTINCT [$distinct]}<$expr>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[distinct](./private/distinct/)|*optional*|*private*|DISTINCT  [$distinct]|
[expr](./private/expr/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        max_age: { $max: { $expr: '~~age', $distinct: true } },
        $from: 'people'
    });

}

// SQL output
SELECT
    MAX(DISTINCT age) AS max_age
FROM
    people

// Values
{}
```

## as String:

Usage of `max` as **String** with the following Syntax:

**Syntax:**

```javascript
$max: < String >
```

**SQL-Definition:**
```javascript
MAX(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        max_age: { $max: 'age' },
        $from: 'people'
    });
}

// SQL output
SELECT
    MAX(age) AS max_age
FROM
    people

// Values
{}
```

## as Function:

Usage of `max` as **Function** with the following Syntax:

**Syntax:**

```javascript
$max: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
MAX(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        max_age: { $max: sql.isNull('~~age', 40) },
        $from: 'people'
    });

}

// SQL output
SELECT
    MAX(ISNULL(age, $1)) AS max_age
FROM
    people

// Values
{
    "$1": 40
}
```

## Further Examples

:bulb: **Using max callee with DISTINCT parameter**
```javascript
function() {
    return sql.$select({
        max_age: sql.max(sql.DISTINCT, 'age'),
        $from: 'people'
    });

}

// SQL output
SELECT
    MAX(DISTINCT age) AS max_age
FROM
    people

// Values
{}
```

