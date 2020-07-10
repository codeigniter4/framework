# into Helper
Specifies the `INTO` clause to use with `RETURNING` clause.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/dml-returning.html)
- Oracle
- MariaDB

# Allowed Types and Usage

## as Object:

The Usage of `into` as **Object** is restricted to childs have the following Type:

- Boolean
- Number

## as Object :arrow_right: Boolean:

The Usage of `into` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$into: {
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
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true,
            $into: {
                myid: true
            }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id INTO myid

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
$into: {
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
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true,
            first_name: false,
            last_name: false,
            age: false,
            $into: {
                var_people_id: true,
                var_first_name: false,
                var_last_name: false,
                var_age: false
            }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id INTO var_people_id

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Object :arrow_right: Number:

The Usage of `into` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$into: {
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
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: 1,
            first_name: 0,
            last_name: 0,
            age: 0,
            $into: {
                var_people_id: 1,
                var_first_name: 0
            }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id INTO var_people_id

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$into: {
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
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: 1,
            first_name: 1,
            last_name: 1,
            age: 1,
            $into: {
                var_people_id: 1,
                var_first_name: 1,
                var_last_name: 1,
                var_age: 1
            }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    first_name,
    last_name,
    age INTO var_people_id,
    var_first_name,
    var_last_name,
    var_age

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Array:

The Usage of `into` as **Array** is restricted to childs have the following Type:

- String

## as Array :arrow_right: String:

Usage of `into` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$into: [
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
        $returning: {
            $columns: ['people_id', 'first_name', 'last_name'],
            $into: ['var_people_id', 'var_first_name', 'var_last_name']
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    first_name,
    last_name INTO var_people_id,
    var_first_name,
    var_last_name

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as String:

Usage of `into` as **String** with the following Syntax:

**Syntax:**

```javascript
$into: < String >
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
        $returning: { people_id: 1, $into: 'myid' }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id INTO myid

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```

