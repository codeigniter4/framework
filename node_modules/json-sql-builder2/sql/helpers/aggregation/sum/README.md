# sum Helper
Specifies the aggregation function `SUM` as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_sum)
- [MariaDB](https://mariadb.com/kb/en/library/sum/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-aggregate.html)
- [SQLite](https://sqlite.org/lang_aggfunc.html#sum)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions087.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/functions/sum-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `sum` as **Object** with the following Syntax:

**Syntax:**

```javascript
$sum: { ... }
```

**SQL-Definition:**
```javascript
SUM({DISTINCT [$distinct]}<$expr>)
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
        sum_age: { $sum: { $expr: '~~age', $distinct: true } },
        $from: 'people'
    });

}

// SQL output
SELECT
    SUM(DISTINCT age) AS sum_age
FROM
    people

// Values
{}
```

## as String:

Usage of `sum` as **String** with the following Syntax:

**Syntax:**

```javascript
$sum: < String >
```

**SQL-Definition:**
```javascript
SUM(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        sum_age: { $sum: 'age' },
        $from: 'people'
    });
}

// SQL output
SELECT
    SUM(age) AS sum_age
FROM
    people

// Values
{}
```

## as Function:

Usage of `sum` as **Function** with the following Syntax:

**Syntax:**

```javascript
$sum: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
SUM(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        sum_age: { $sum: sql.isNull('~~age', 40) },
        $from: 'people'
    });

}

// SQL output
SELECT
    SUM(ISNULL(age, $1)) AS sum_age
FROM
    people

// Values
{
    "$1": 40
}
```

## Further Examples

:bulb: **Using sum callee with DISTINCT parameter**
```javascript
function() {
    return sql.$select({
        sum_age: sql.sum(sql.DISTINCT, 'age'),
        $from: 'people'
    });

}

// SQL output
SELECT
    SUM(DISTINCT age) AS sum_age
FROM
    people

// Values
{}
```

