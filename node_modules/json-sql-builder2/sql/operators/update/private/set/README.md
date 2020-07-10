# set Operator
Specifies the `SET` clause for the `UPDATE` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/update.html)
- [MariaDB](https://mariadb.com/kb/en/library/update/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-update.html)
- [SQLite](https://sqlite.org/lang_update.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10007.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/queries/update-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `set` as **Object** is restricted to childs have the following Type:

- String
- Number
- Boolean
- Object
- Function

## as Object :arrow_right: String:

Usage of `set` as **Object** with a child of Type **String** :

**Syntax:**

```javascript
$set: {
    "<identifier | $Helper | $operator>": <String> [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> = <value-param>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            first_name: 'John',
            last_name: 'Doe'
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    first_name = $1,
    last_name = $2
WHERE
    people_id = $3

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 456
}
```
## as Object :arrow_right: Number:

Usage of `set` as **Object** with a child of Type **Number** :

**Syntax:**

```javascript
$set: {
    "<identifier | $Helper | $operator>": <Number> [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> = <value-param>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    first_name = $1,
    last_name = $2,
    age = $3
WHERE
    people_id = $4

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": 456
}
```
## as Object :arrow_right: Boolean:

Usage of `set` as **Object** with a child of Type **Boolean** :

**Syntax:**

```javascript
$set: {
    "<identifier | $Helper | $operator>": true | false [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> = <value-param>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            first_name: 'John',
            last_name: 'Doe',
            is_adult: true
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    first_name = $1,
    last_name = $2,
    is_adult = $3
WHERE
    people_id = $4

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": true,
    "$4": 456
}
```
## as Object :arrow_right: Object:

Usage of `set` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$set: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
<identifier> = <value>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            first_name: 'John',
            last_name: 'Doe',
            total_likes: {
                $select: {
                    total_likes: { $count: '*' },
                    $from: 'people_likes',
                    $where: {
                        people_id: 456
                    }
                }
            }
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    first_name = $1,
    last_name = $2,
    total_likes = (
        SELECT
            COUNT(*) AS total_likes
        FROM
            people_likes
        WHERE
            people_id = $3
    )
WHERE
    people_id = $4

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 456,
    "$4": 456
}
```
## as Object :arrow_right: Function:

Usage of `set` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$set: {
    "<identifier | $Helper | $operator>": sql.<callee>([params])
}
```

**SQL-Definition:**
```javascript
<key-ident> = <value>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            first_name: 'John',
            last_name: 'Doe',
            total_likes: sql.select({ total_likes: { $count: '*' } }, {
                $from: 'people_likes',
                $where: {
                    people_id: 456
                }
            })
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    first_name = $1,
    last_name = $2,
    total_likes = (
        SELECT
            COUNT(*) AS total_likes
        FROM
            people_likes
        WHERE
            people_id = $3
    )
WHERE
    people_id = $4

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 456,
    "$4": 456
}
```
## Further Examples

:bulb: **Advanced PostgreSQL json-Usage**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            'data->profile->firstName': 'John',
            'data->profile->lastName': 'Doe'
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    data = jsonb_set(jsonb_set(data, $1, $2), $3, $4)
WHERE
    people_id = $5

// Values
{
    "$1": "{profile,firstName}",
    "$2": "\"John\"",
    "$3": "{profile,lastName}",
    "$4": "\"Doe\"",
    "$5": 456
}
```

