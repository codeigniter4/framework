# insert Operator
Specifies the Operator for the `INSERT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html)
- [SQLite](https://sqlite.org/lang_insert.html)
- [Oracle](https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `insert` as **Object** with the following Syntax:

**Syntax:**

```javascript
$insert: { ... }
```

**SQL-Definition:**
```javascript
INSERT INTO{ <$table>}
  { ([$columns])}
    { VALUES ([$values])}
    { VALUES [$records]}
    { [$select]}
  {[$documents]}

{ ON DUPLICATE KEY UPDATE [$onDuplicateKeyUpdate]}-->(MariaDB,MySQL)
{* ON CONFLICT [$onConflict] *}-->(PostgreSQL)
{ RETURNING [$returning]}-->(PostgreSQL,Oracle,MariaDB)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[table](./private/table/)|:heavy_check_mark:|*private*|  <$table>|
[columns](../../helpers/ddl/columns/)|*optional*|:heavy_check_mark:| ( [$columns])|
[values](./private/values/)|*optional*|*private*| VALUES ( [$values])|
[records](./private/records/)|*optional*|*private*| VALUES  [$records]|
[select](../../operators/select/)|*optional*|:heavy_check_mark:|  [$select]|
[documents](./private/documents/)|*optional*|*private*| [$documents]|
[onDuplicateKeyUpdate](./private/onDuplicateKeyUpdate/)|*optional*|*private*| ON DUPLICATE KEY UPDATE  [$onDuplicateKeyUpdate]|`MariaDB` `MySQL` 
[onConflict](./private/onConflict/)|*optional*|*private*||`PostgreSQL` 
[returning](../../helpers/queries/returning/)|*optional*|:heavy_check_mark:| RETURNING  [$returning]|`PostgreSQL` `Oracle` `MariaDB` 

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true,
            age: true
        },
        $values: ['John', 'Doe', 40]
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```

## Further Examples

:bulb: **Using $documents as shotcut for $columns, $values**
```javascript
function() {
    return sql.$insert({
        $table: 'people_history',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        }
    });
}

// SQL output
INSERT INTO
    people_history (first_name, last_name, age)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```

:bulb: **Using Keyword DEFAULT**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: sql.DEFAULT
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, DEFAULT)

// Values
{
    "$1": "John",
    "$2": "Doe"
}
```

:bulb: **Using INSERT INTO SELECT**
```javascript
function() {
    return sql.$insert({
        $table: 'people_history',
        $columns: {
            first_name: true,
            last_name: true,
            age: true
        },
        $select: {
            first_name: true,
            last_name: true,
            age: true,
            $from: 'people',
            $where: {
                age: { $gte: 40 }
            }
        }
    });
}

// SQL output
INSERT INTO
    people_history (first_name, last_name, age)
SELECT
    first_name,
    last_name,
    age
FROM
    people
WHERE
    age >= $1

// Values
{
    "$1": 40
}
```

