# returning Helper
Specifies the `RETURNING` clause to use with any `INSERT`, `UPDATE` or `DELETE` Statement.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/dml-returning.html)
- MariaDB
- Oracle

# Allowed Types and Usage

## as Object:

Usage of `returning` as **Object** with the following Syntax:

**Syntax:**

```javascript
$returning: { ... }
```

**SQL-Definition:**
```javascript
<$columns>{ INTO [$into]}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[columns](../../../helpers/ddl/columns/)|:heavy_check_mark:|:heavy_check_mark:||
[into](./private/into/)|*optional*|*private*| INTO  [$into]|

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true,
            total_likes: sql.coalesce('~~total_likes', 0)
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    COALESCE(total_likes, $4) AS total_likes

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": 0
}
```

## as Array:

The Usage of `returning` as **Array** is restricted to childs have the following Type:

- String
- Object

## as Array :arrow_right: String:

Usage of `returning` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$returning: [
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
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: ['people_id', 'first_name', 'last_name']
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    first_name,
    last_name

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Array :arrow_right: Object:

Usage of `returning` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$returning: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
<value> AS <key-ident>[ , ... ]
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
        },
        $returning: [
            { people_id: { $coalesce: ['~~people_id', 0] } },
            { total_likes: { $coalesce: ['~~total_likes', 0] } },
        ]
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING COALESCE(people_id, $4) AS people_id,
    COALESCE(total_likes, $5) AS total_likes

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": 0,
    "$5": 0
}
```
## as String:

Usage of `returning` as **String** with the following Syntax:

**Syntax:**

```javascript
$returning: < String >
```

**SQL-Definition:**
```javascript
<value-ident>
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
        },
        $returning: '*'
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING *

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```

## Further Examples

:bulb: **Using optional INTO clause**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true,
            total_likes: { $coalesce: ['~~total_likes', 0] },
            $into: {
                myid_var: 1,
                mytotal_likes_var: 1
            }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    COALESCE(total_likes, $4) AS total_likes INTO myid_var,
    mytotal_likes_var

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": 0
}
```

