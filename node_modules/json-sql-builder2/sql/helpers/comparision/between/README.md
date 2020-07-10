# between Helper
Specifies the comparision `BETWEEN` Operator as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/comparison-operators.html#operator_between)
- [MariaDB](https://mariadb.com/kb/en/library/between-and/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-comparison.html)
- [SQLite](https://sqlite.org/lang_expr.html#between)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/conditions011.htm#SQLRF52147)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/between-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `between` as **Object** with the following Syntax:

**Syntax:**

```javascript
$between: { ... }
```

**SQL-Definition:**
```javascript
BETWEEN <$min> AND <$max>
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[min](../../../helpers/aggregation/min/)|:heavy_check_mark:|:heavy_check_mark:||
[max](../../../helpers/aggregation/max/)|:heavy_check_mark:|:heavy_check_mark:||

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                age: { $between: { $min: 18, $max: 45 } }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    age BETWEEN $1
    AND $2

// Values
{
    "$1": 18,
    "$2": 45
}
```

## Further Examples

:bulb: **Usage as SQL-Function**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                age: sql.between(18, 45)
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    age BETWEEN $1
    AND $2

// Values
{
    "$1": 18,
    "$2": 45
}
```

