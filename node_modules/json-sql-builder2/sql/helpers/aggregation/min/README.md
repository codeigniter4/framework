# min Helper
Specifies the aggregation function `MIN` as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_min)
- [MariaDB](https://mariadb.com/kb/en/library/min/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-aggregate.html)
- [SQLite](https://sqlite.org/lang_aggfunc.html#min)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions087.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/functions/min-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `min` as **Object** with the following Syntax:

**Syntax:**

```javascript
$min: { ... }
```

**SQL-Definition:**
```javascript
MIN({DISTINCT [$distinct]}<$expr>)
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
        min_age: { $min: { $expr: '~~age', $distinct: true } },
        $from: 'people'
    });

}

// SQL output
SELECT
    MIN(DISTINCT age) AS min_age
FROM
    people

// Values
{}
```

## as String:

Usage of `min` as **String** with the following Syntax:

**Syntax:**

```javascript
$min: < String >
```

**SQL-Definition:**
```javascript
MIN(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        min_age: { $min: 'age' },
        $from: 'people'
    });
}

// SQL output
SELECT
    MIN(age) AS min_age
FROM
    people

// Values
{}
```

## as Function:

Usage of `min` as **Function** with the following Syntax:

**Syntax:**

```javascript
$min: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
MIN(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        min_age: { $min: sql.isNull('~~age', 40) },
        $from: 'people'
    });

}

// SQL output
SELECT
    MIN(ISNULL(age, $1)) AS min_age
FROM
    people

// Values
{
    "$1": 40
}
```

## Further Examples

:bulb: **Using min callee with DISTINCT parameter**
```javascript
function() {
    return sql.$select({
        min_age: sql.min(sql.DISTINCT, 'age'),
        $from: 'people'
    });

}

// SQL output
SELECT
    MIN(DISTINCT age) AS min_age
FROM
    people

// Values
{}
```

