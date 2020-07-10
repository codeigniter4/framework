# values Helper
Specifies the `VALUES` clause for the `INSERT INTO` Statement

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html)
- [SQLite](https://sqlite.org/lang_insert.html)
- [Oracle](https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql)

# Allowed Types and Usage

## as Array:

The Usage of `values` as **Array** is restricted to childs have the following Type:

- Primitive
- Object
- Function

## as Array :arrow_right: Primitive:

Usage of `values` as **Array** with a child of Type **Primitive** :

**Syntax:**

```javascript
$values: [
    <value: String | Number | Boolean> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-param>[ , ... ]
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
## as Array :arrow_right: Object:

Usage of `values` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$values: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            hobbies: { $json: ['football', 'basketball'] }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, hobbies)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": "[\"football\",\"basketball\"]"
}
```
## as Array :arrow_right: Function:

Usage of `values` as **Array** with a child of Type **Function** :

**Syntax:**

```javascript
$values: [
    sql.<callee>([params]) [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            foo: sql.concat('Hello ', 'John!')
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, foo)
VALUES
    ($1, $2, CONCAT($3, $4))

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": "Hello ",
    "$4": "John!"
}
```
## Further Examples

:bulb: **Using Keyword DEFAULT**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $columns: ['first_name', 'last_name', 'age'],
        $values: ['John', 'Doe', sql.DEFAULT]
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

