# define Helper
Specifies the Definition of columns and constraints for the `$createTable` Operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table.html)
- [MariaDB](https://mariadb.com/kb/en/library/create-table/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-createtable.html)
- [SQLite](https://sqlite.org/lang_createtable.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_7002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `define` as **Object** is restricted to childs have the following Type:

- Object
- Function

## as Object :arrow_right: Object:

Usage of `define` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$define: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript

[$column]
[$constraint]

[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[column](../../../../helpers/ddl/column/)|*optional*|:heavy_check_mark:||
[constraint](../../../../helpers/ddl/constraint/)|*optional*|:heavy_check_mark:||

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
    CONSTRAINT pk_people PRIMARY KEY (people_id)
)

// Values
{
    "$1": 0
}
```
## as Object :arrow_right: Function:

Usage of `define` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$define: {
    "<identifier | $Helper | $operator>": sql.<callee>([params])
}
```

**SQL-Definition:**
```javascript
<value>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: sql.column(sql.INTEGER, { $default: 0 }),
            first_name: sql.column(sql.VARCHAR, { $size: 50, $notNull: true }),
            last_name: sql.column(sql.VARCHAR, { $size: 50, $notNull: true }),
            bio: sql.column(sql.TEXT),

            pk_people: sql.constraint({
                $primary: true,
                $columns: 'people_id'
            })
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INTEGER DEFAULT $1,
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
