# contains Helper
Specifies the comparision `LIKE` Operator as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html#operator_like)
- [MariaDB](https://mariadb.com/kb/en/library/like/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-matching.html)
- [SQLite](https://sqlite.org/lang_expr.html#like)
- [Oracle](https://docs.oracle.com/cd/B13789_01/server.101/b10759/conditions016.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/language-elements/like-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `contains` as **String** with the following Syntax:

**Syntax:**

```javascript
$contains: < String >
```

**SQL-Definition:**
```javascript
LIKE <value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $contains: 'oe' }
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
    first_name LIKE $1

// Values
{
    "$1": "%oe%"
}
```

## Further Examples

:bulb: **Usage as SQL-Function**
```javascript
function() {
    let averageAge = 45;

    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: sql.contains('oe')
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
    first_name LIKE $1

// Values
{
    "$1": "%oe%"
}
```

