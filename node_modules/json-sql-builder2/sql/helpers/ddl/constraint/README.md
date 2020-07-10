# constraint Helper
Specifies a single Column-Definition to use on `$define` with `$createTable` Operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/constraints.html)
- [MariaDB](https://mariadb.com/kb/en/library/constraint/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [SQLite](https://sqlite.org/lang_createtable.html#constraints)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `constraint` as **Object** with the following Syntax:

**Syntax:**

```javascript
$constraint: { ... }
```

**SQL-Definition:**
```javascript

CONSTRAINT <key-ident> 
  {* PRIMARY KEY [$primary] *}
  {* UNIQUE [$unique] *}
  {* FOREIGN KEY [$foreignKey] *}
  {* CHECK [$check] *}
  { ([$columns])}
  { [$references]}

```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[primary](../../../helpers/ddl/constraint/primary/)|*optional*|:heavy_check_mark:||
[unique](../../../helpers/ddl/constraint/unique/)|*optional*|:heavy_check_mark:||
[foreignKey](../../../helpers/ddl/constraint/foreignKey/)|*optional*|:heavy_check_mark:||
[check](../../../helpers/ddl/constraint/check/)|*optional*|:heavy_check_mark:||
[columns](../../../helpers/ddl/columns/)|*optional*|:heavy_check_mark:| ( [$columns])|
[references](../../../helpers/ddl/constraint/references/)|*optional*|:heavy_check_mark:|  [$references]|

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

            pk_people: { $constraint: { $primary: true, $columns: 'people_id' } }
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

## as Function:

Usage of `constraint` as **Function** with the following Syntax:

**Syntax:**

```javascript
$constraint: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
CONSTRAINT <key-ident> <value>
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

            pk_people: { $constraint: sql.primary('people_id') },
            uk_people: { $constraint: sql.unique(['first_name', 'last_name']) }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT,
    CONSTRAINT pk_people PRIMARY KEY (people_id),
    CONSTRAINT uk_people UNIQUE (first_name, last_name)
)

// Values
{
    "$1": 0
}
```

