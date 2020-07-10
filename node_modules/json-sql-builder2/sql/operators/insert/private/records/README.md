# records Helper
Specifies the `VALUES` clause for the `INSERT INTO` Statement to insert multiple records at the same time.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html)
- [SQLite](https://sqlite.org/lang_insert.html)
- [Oracle](https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `records` as **Object** is restricted to childs have the following Type:

- Object

## as Object :arrow_right: Object:

Usage of `records` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$records: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
(<$values>)[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[values](./private/values/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: ['first_name', 'last_name', 'age'],
        $records: {
            1: { $values: ['John', 'Doe', 27] },
            2: { $values: ['Jane', 'Doe', 29] },
            3: { $values: ['Michael', 'Goodman', 65] },
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3),
    ($4, $5, $6),
    ($7, $8, $9)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 27,
    "$4": "Jane",
    "$5": "Doe",
    "$6": 29,
    "$7": "Michael",
    "$8": "Goodman",
    "$9": 65
}
```
## as Array:

The Usage of `records` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `records` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$records: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
(<$values>)[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[values](./private/values/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: ['first_name', 'last_name', 'age'],
        $records: [
            { $values: ['John', 'Doe', 27] },
            { $values: ['Jane', 'Doe', 29] },
            { $values: ['Michael', 'Goodman', 65] },
        ]
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3),
    ($4, $5, $6),
    ($7, $8, $9)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 27,
    "$4": "Jane",
    "$5": "Doe",
    "$6": 29,
    "$7": "Michael",
    "$8": "Goodman",
    "$9": 65
}
```
