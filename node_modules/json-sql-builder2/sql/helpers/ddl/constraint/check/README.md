# check Helper
Specifies the `CHECK` clause for a single Column or Constraint.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/constraints.html)
- [MariaDB](https://mariadb.com/kb/en/library/constraint/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [SQLite](https://sqlite.org/lang_createtable.html#constraints)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `check` as **Object** with the following Syntax:

**Syntax:**

```javascript
$check: { ... }
```

**SQL-Definition:**
```javascript
CHECK ({* AND [$and] *} {* OR [$or] *})
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[and](../../../../helpers/logical/and/)|*optional*|:heavy_check_mark:||
[or](../../../../helpers/logical/or/)|*optional*|:heavy_check_mark:||

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT' } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            age: {
                $column: {
                    $type: sql.INTEGER,
                    $check: { age: sql.between(0, 150) },
                }
            },

            uk_people: { $constraint: { $unique: { $columns: ['first_name', 'last_name'] } } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INTEGER CHECK (
        age BETWEEN $1
        AND $2
    ),
    CONSTRAINT uk_people UNIQUE (first_name, last_name)
)

// Values
{
    "$1": 0,
    "$2": 150
}
```

## Further Examples

:bulb: **Usage as Function**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT' } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            age: { $column: { $type: sql.INTEGER } },

            uk_people: { $constraint: { $unique: { $columns: ['first_name', 'last_name'] } } },
            check_age: {
                $constraint: sql.check({
                    $and: [
                        { age: sql.gt(0) },
                        { age: sql.lt(150) }
                    ]
                })
            }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INTEGER,
    CONSTRAINT uk_people UNIQUE (first_name, last_name),
    CONSTRAINT check_age CHECK (
        age > $1
        AND age < $2
    )
)

// Values
{
    "$1": 0,
    "$2": 150
}
```

