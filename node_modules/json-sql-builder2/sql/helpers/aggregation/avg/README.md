# avg Helper
Specifies the aggregation function `AVG` as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_avg)
- [MariaDB](https://mariadb.com/kb/en/library/avg/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-aggregate.html)
- [SQLite](https://sqlite.org/lang_aggfunc.html#avg)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions011.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/functions/avg-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `avg` as **Object** with the following Syntax:

**Syntax:**

```javascript
$avg: { ... }
```

**SQL-Definition:**
```javascript
AVG({DISTINCT [$distinct]}<$expr>)
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
        average_age: { $avg: { $expr: '~~age', $distinct: true } },
        $from: 'people'
    });

}

// SQL output
SELECT
    AVG(DISTINCT age) AS average_age
FROM
    people

// Values
{}
```

## as String:

Usage of `avg` as **String** with the following Syntax:

**Syntax:**

```javascript
$avg: < String >
```

**SQL-Definition:**
```javascript
AVG(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        average_age: { $avg: 'age' },
        $from: 'people'
    });
}

// SQL output
SELECT
    AVG(age) AS average_age
FROM
    people

// Values
{}
```

## as Function:

Usage of `avg` as **Function** with the following Syntax:

**Syntax:**

```javascript
$avg: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
AVG(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        average_age: { $avg: sql.isNull('~~age', 40) },
        $from: 'people'
    });

}

// SQL output
SELECT
    AVG(ISNULL(age, $1)) AS average_age
FROM
    people

// Values
{
    "$1": 40
}
```

## Further Examples

:bulb: **Using avg callee with DISTINCT parameter**
```javascript
function() {
    return sql.$select({
        average_age: sql.avg(sql.DISTINCT, 'age'),
        $from: 'people'
    });

}

// SQL output
SELECT
    AVG(DISTINCT age) AS average_age
FROM
    people

// Values
{}
```

