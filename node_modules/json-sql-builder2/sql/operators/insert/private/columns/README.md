# columns Helper
Specifies the `$columns` Helper for the `INSERT INTO` Statement

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html)
- [SQLite](https://sqlite.org/lang_insert.html)
- [Oracle](https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `columns` as **Object** is restricted to childs have the following Type:

- Boolean
- Number

## as Object :arrow_right: Boolean:

The Usage of `columns` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": true [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>[ , ... ]
```

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
## as Object :arrow_right: Boolean with value `false`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": false [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: false,
            age: false
        },
        $values: ['John']
    });
}

// SQL output
INSERT INTO
    people (first_name)
VALUES
    ($1)

// Values
{
    "$1": "John"
}
```
## as Object :arrow_right: Number:

The Usage of `columns` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": 0 [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: {
            first_name: 1,
            last_name: 0,
            age: 0
        },
        $values: ['John']
    });
}

// SQL output
INSERT INTO
    people (first_name)
VALUES
    ($1)

// Values
{
    "$1": "John"
}
```
## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": 1 [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: {
            first_name: 1,
            last_name: 1,
            age: 1
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
## as Array:

The Usage of `columns` as **Array** is restricted to childs have the following Type:

- String

## as Array :arrow_right: String:

Usage of `columns` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$columns: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: ['first_name', 'last_name', 'age'],
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
