# documents Helper
Specifies the special Helper for the `columns` and `VALUES` clause for the `INSERT INTO` Statement.

**Note** This Helper turns each document to $columns and $values properties inside the query.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html)
- [SQLite](https://sqlite.org/lang_insert.html)
- [Oracle](https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `documents` as **Object** with the following Syntax:

**Syntax:**

```javascript
$documents: { ... }
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        }
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

The Usage of `documents` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `documents` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$documents: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: [{
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        }, {
            first_name: 'Jane',
            last_name: 'Dan',
            age: 35
        }]
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3),
    ($4, $5, $6)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": "Jane",
    "$5": "Dan",
    "$6": 35
}
```
## Further Examples

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

:bulb: **Using a NULL value and Date**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: null,
            created_at: createdAt
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age, created_at)
VALUES
    ($1, $2, $3, $4)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": null,
    "$4": "2019-10-07T13:52:41.959Z"
}
```

