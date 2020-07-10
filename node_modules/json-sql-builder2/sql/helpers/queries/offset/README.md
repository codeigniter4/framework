# offset Helper
Specifies the `OFFSET` clause for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/limit/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html#SQL-LIMIT)
- [SQLite](https://sqlite.org/lang_select.html#limitoffset)

# Allowed Types and Usage

## as Number:

Usage of `offset` as **Number** with the following Syntax:

**Syntax:**

```javascript
$offset: < Number >
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $limit: 10,
            $offset: 100
        }
    });

    return query;
}

// SQL output
SELECT
    *
FROM
    people
LIMIT
    $1 OFFSET $2

// Values
{
    "$1": 10,
    "$2": 100
}
```

