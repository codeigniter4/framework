# unique Helper
Specifies the `UNIQUE` clause for a single Column or Constraint.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/constraints.html)
- [MariaDB](https://mariadb.com/kb/en/library/constraint/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [SQLite](https://sqlite.org/lang_createtable.html#constraints)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql)

# Allowed Types and Usage

## as Boolean:

The usage of `unique` as **Boolean** is restricted to the following values:
- true
- false

#### as Boolean with value **true**:
**Syntax:**

```javascript
$unique: true
```

**SQL-Definition:**
```javascript
UNIQUE
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $notNull: true, $primary: true } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: true } },
            bio: { $column: { $type: 'TEXT' } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL UNIQUE,
    last_name VARCHAR(50) NOT NULL UNIQUE,
    bio TEXT
)

// Values
{}
```
#### as Boolean with value **false**:
**Syntax:**

```javascript
$unique: false
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $notNull: true } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: false } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true, $unique: false } },
            bio: { $column: { $type: 'TEXT' } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
)

// Values
{}
```
## as Object:

Usage of `unique` as **Object** with the following Syntax:

**Syntax:**

```javascript
$unique: { ... }
```

**SQL-Definition:**
```javascript
UNIQUE (<$columns>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[columns](../../../../helpers/ddl/columns/)|:heavy_check_mark:|:heavy_check_mark:||

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

            uk_people: { $constraint: { $unique: { $columns: ['first_name', 'last_name'] } } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT,
    CONSTRAINT uk_people UNIQUE (first_name, last_name)
)

// Values
{
    "$1": 0
}
```

