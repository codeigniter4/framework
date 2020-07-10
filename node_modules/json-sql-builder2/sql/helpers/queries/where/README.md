# where Helper
Specifies the `WHERE` clause for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `where` as **Object** with the following Syntax:

**Syntax:**

```javascript
$where: { ... }
```

**SQL-Definition:**
```javascript
{* AND [$and] *} {* OR [$or] *}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[and](../../../helpers/logical/and/)|*optional*|:heavy_check_mark:||
[or](../../../helpers/logical/or/)|*optional*|:heavy_check_mark:||

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: 'John'
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
    first_name = $1

// Values
{
    "$1": "John"
}
```

