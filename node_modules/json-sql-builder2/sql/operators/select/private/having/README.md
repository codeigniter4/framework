# having Helper
Specifies the `HAVING` clause for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-having-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `having` as **Object** with the following Syntax:

**Syntax:**

```javascript
$having: { ... }
```

**SQL-Definition:**
```javascript
<value>[  ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: 'city',
            $having: {
                $sum: 'salary',
                $gt: 450000
            }
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city
HAVING
    SUM(salary) > $1

// Values
{
    "$1": 450000
}
```

## Further Examples

:bulb: **Usage with $and**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: 'city',
            $having: {
                $and: [
                    { $anyExpr: { $sum: 'salary', $gt: 450000 } },
                    { $anyExpr: { $sum: 'salary', $lt: 990000 } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city
HAVING
    SUM(salary) > $1
    AND SUM(salary) < $2

// Values
{
    "$1": 450000,
    "$2": 990000
}
```

