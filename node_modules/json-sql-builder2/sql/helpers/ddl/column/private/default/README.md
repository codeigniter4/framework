# default Helper
Specifies the Default Value of a single Column to use on `$define` with `$createTable` Operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table.html)
- [MariaDB](https://mariadb.com/kb/en/library/create-table/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-createtable.html)
- [SQLite](https://sqlite.org/lang_createtable.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_7002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `default` as **String** with the following Syntax:

**Syntax:**

```javascript
$default: < String >
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT' } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $default: 'Unknown' } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT,
    first_name VARCHAR(50) NOT NULL DEFAULT $1,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
)

// Values
{
    "$1": "Unknown"
}
```

## as Number:

Usage of `default` as **Number** with the following Syntax:

**Syntax:**

```javascript
$default: < Number >
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $default: 0 } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } },
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
)

// Values
{
    "$1": 0
}
```

