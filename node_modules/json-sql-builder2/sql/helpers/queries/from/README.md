# from Helper
Specifies the `FROM` clause for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `from` as **Object** is restricted to childs have the following Type:

- Boolean
- Number
- String
- Object
- Function
- Array

## as Object :arrow_right: Boolean:

The Usage of `from` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$from: {
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
    return sql.build({
        $select: {
            $from: {
                people: true,
                people_skills: true
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people,
    people_skills

// Values
{}
```
## as Object :arrow_right: Boolean with value `false`:
**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": false [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                people: true,
                people_skills: false
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people

// Values
{}
```
## as Object :arrow_right: Number:

The Usage of `from` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": 0 [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: { people: 1, people_skills: 0 }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people

// Values
{}
```
## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$from: {
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
    return sql.build({
        $select: {
            $from: { people: 1, people_skills: 1 }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people,
    people_skills

// Values
{}
```
## as Object :arrow_right: String:

Usage of `from` as **Object** with a child of Type **String** :

**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": <String> [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> AS <value-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: { people: 'p' }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people AS p

// Values
{}
```
## as Object :arrow_right: Object:

Usage of `from` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
<value> AS <identifier>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                people: 'p',
                skills: {
                    $select: { $from: 'people_skills' }
                }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people AS p,
    (
        SELECT
            *
        FROM
            people_skills
    ) AS skills

// Values
{}
```
## as Object :arrow_right: Function:

Usage of `from` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": sql.<callee>([params])
}
```

**SQL-Definition:**
```javascript
<value> AS <key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                p: sql.select('*', { $from: 'people' })
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    (
        SELECT
            *
        FROM
            people
    ) AS p

// Values
{}
```
## as Object :arrow_right: Array:

Usage of `from` as **Object** with a child of Type **Array** :

**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": [ ... ] [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>(<value-param>[ , ... ])
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                my_table_valued_function: ['Param1', 2, 'Param3', 4]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    my_table_valued_function($1, $2, $3, $4)

// Values
{
    "$1": "Param1",
    "$2": 2,
    "$3": "Param3",
    "$4": 4
}
```
## as String:

Usage of `from` as **String** with the following Syntax:

**Syntax:**

```javascript
$from: < String >
```

**SQL-Definition:**
```javascript
<value-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    *
FROM
    people

// Values
{}
```

## as Function:

Usage of `from` as **Function** with the following Syntax:

**Syntax:**

```javascript
$from: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: sql.tableFunction('my_table_valued_function', { $args: ['Param1', 2, 'Param3', 4] })
        }
    });
}

// SQL output
SELECT
    *
FROM
    my_table_valued_function($1, $2, $3, $4)

// Values
{
    "$1": "Param1",
    "$2": 2,
    "$3": "Param3",
    "$4": 4
}
```

## Further Examples

:bulb: **Oracle Basic Usage with aliases**
```javascript
function() {
    return sql.build({
        $select: {
            $from: { people: 'p' }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people p

// Values
{}
```

:bulb: **Cross Joined Tables**
```javascript
function() {
    return sql.build({
        $select: {
            $from: { people: 'p', people_skills: 'ps' }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people AS p,
    people_skills AS ps

// Values
{}
```

:bulb: **Oracle Cross Joined Tables with aliases**
```javascript
function() {
    return sql.build({
        $select: {
            $from: { people: 'p', people_skills: 'ps' }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people p,
    people_skills ps

// Values
{}
```

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                people: 'p',
                skills: {
                    $select: { $from: 'people_skills' }
                }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people p,
    (
        SELECT
            *
        FROM
            people_skills
    ) skills

// Values
{}
```

:bulb: **Oracle Basic Usage with alias**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                p: sql.select('*', { $from: 'people' })
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    (
        SELECT
            *
        FROM
            people
    ) p

// Values
{}
```

