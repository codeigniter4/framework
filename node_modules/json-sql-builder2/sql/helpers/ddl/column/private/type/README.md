# type Helper
Specifies the Data Type of a single Column to use on `$define` with `$createTable` Operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/data-types.html)
- [MariaDB](https://mariadb.com/kb/en/library/data-types/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/datatype.html)
- [SQLite](https://www.sqlite.org/datatype3.html)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28318/datatype.htm#CNCPT012)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `type` as **String** with the following Syntax:

**Syntax:**

```javascript
$type: < String >
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $default: 0 } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: sql.VARCHAR, $size: 50, $notNull: true } },
            bio: { $column: { $type: sql.TEXT } },
            weight: { $column: { $type: sql.NUMERIC, $size: { $precision: 3, $scale: 2 } } },

            pk_people: { $constraint: { $primary: true, $columns: 'people_id' } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT,
    weight NUMERIC(3, 2),
    CONSTRAINT pk_people PRIMARY KEY (people_id)
)

// Values
{
    "$1": 0
}
```

