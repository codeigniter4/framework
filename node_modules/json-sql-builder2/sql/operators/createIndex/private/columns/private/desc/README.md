# desc Helper
Specifies the `DESC` option for the `ORDER BY` clause on each column.

#### Supported by
- [MariaDB](https://mariadb.com/kb/en/library/order-by/)
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [Oracle](https://docs.oracle.com/javadb/10.8.3.0/ref/rrefsqlj13658.html)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql)

# Allowed Types and Usage

## as Boolean:

The usage of `desc` as **Boolean** is restricted to the following values:
- true

#### as Boolean with value **true**:
**Syntax:**

```javascript
$desc: true
```

**SQL-Definition:**
```javascript
-->Accepted->Return:
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: true,
                first_name: { $asc: true },
                age: { $desc: true }
            }
        }
    });

    return query;
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    first_name ASC,
    age DESC

// Values
{}
```
