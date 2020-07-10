# primary Helper
Specifies the `PRIMARY KEY` clause for a single Column or Constraint.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/constraints.html)
- [MariaDB](https://mariadb.com/kb/en/library/constraint/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [SQLite](https://sqlite.org/lang_createtable.html#constraints)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql)

# Allowed Types and Usage

## as Boolean:

The usage of `primary` as **Boolean** is restricted to the following values:
- true
- false

#### as Boolean with value **true**:
**Syntax:**

```javascript
$primary: true
```

**SQL-Definition:**
```javascript
PRIMARY KEY
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $notNull: true, $primary: true } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
)

// Values
{}
```
#### as Boolean with value **false**:
**Syntax:**

```javascript
$primary: false
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
            people_id: { $column: { $type: 'INT', $notNull: true, $primary: false } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
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

Usage of `primary` as **Object** with the following Syntax:

**Syntax:**

```javascript
$primary: { ... }
```

**SQL-Definition:**
```javascript
PRIMARY KEY (<$columns>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[columns](../../../../helpers/ddl/columns/)|:heavy_check_mark:|:heavy_check_mark:||

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $temp: true,
        $table: 'my_temp_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $default: 0 } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } },

            pk_people: { $constraint: { $primary: { $columns: 'people_id' } } }
        }
    });
}

// SQL output
CREATE TEMPORARY TABLE my_temp_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT,
    CONSTRAINT pk_people PRIMARY KEY (people_id)
)

// Values
{
    "$1": 0
}
```

