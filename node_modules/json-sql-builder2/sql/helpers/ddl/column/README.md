# column Helper
Specifies a single Column-Definition to use on `$define` with `$createTable` Operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table.html)
- [MariaDB](https://mariadb.com/kb/en/library/create-table/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-createtable.html)
- [SQLite](https://sqlite.org/lang_createtable.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_7002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `column` as **Object** with the following Syntax:

**Syntax:**

```javascript
$column: { ... }
```

**SQL-Definition:**
```javascript

<key-ident> <$type>{([$size])}
  { NOT NULL[$notNull]}
  { DEFAULT [$default]}
  { AUTO_INCREMENT[$autoInc]}-->(MySQL,MariaDB)
  { [$primary]}
  { [$unique]}
  { [$check]}
  { COMMENT [$comment]}-->(MySQL,MariaDB)
  { [$references]}

```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[type](./private/type/)|:heavy_check_mark:|*private*||
[size](./private/size/)|*optional*|*private*|( [$size])|
[notNull](./private/notNull/)|*optional*|*private*| NOT NULL [$notNull]|
[default](./private/default/)|*optional*|*private*| DEFAULT  [$default]|
[autoInc](./private/autoInc/)|*optional*|*private*| AUTO_INCREMENT [$autoInc]|`MySQL` `MariaDB` 
[primary](../../../helpers/ddl/constraint/primary/)|*optional*|:heavy_check_mark:|  [$primary]|
[unique](../../../helpers/ddl/constraint/unique/)|*optional*|:heavy_check_mark:|  [$unique]|
[check](../../../helpers/ddl/constraint/check/)|*optional*|:heavy_check_mark:|  [$check]|
[comment](./private/comment/)|*optional*|*private*| COMMENT  [$comment]|`MySQL` `MariaDB` 
[references](../../../helpers/ddl/constraint/references/)|*optional*|:heavy_check_mark:|  [$references]|

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $default: 0 } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } }
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

## Further Examples

:bulb: **Usage of AUTO_INCREMENT**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $autoInc: true, $primary: true } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } }
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
)

// Values
{}
```

