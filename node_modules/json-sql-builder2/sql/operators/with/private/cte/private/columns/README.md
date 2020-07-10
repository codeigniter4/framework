# columns Helper
Specifies the `$columns` Helper for the `CTE, WITH` clause.

> :bulb: **Shortcut**
>
> Another way to define your column-list is to write all column-identifiers directly inside the `$cte: { ... }` Helper like:
>
> ```javascript
> $cte: {
>     my_col_1: 1,
>     my_col_2: 1,
>     $into: ['myvar1', 'myvar2'],
>     ...
> }
> ```
>


#### Supported by
- [MariaDB](https://mariadb.com/kb/en/library/with/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-with.html)
- [SQLite](https://sqlite.org/syntax/with-clause.html)
- [Oracle](https://docs.oracle.com/database/121/SQLRF/statements_10002.htm#SQLRF01702)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `columns` as **Object** is restricted to childs have the following Type:

- Boolean
- Number
- String
- Object
- Function

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
    return sql.build({
        $select: {
            $columns: {
                first_name: true,
                last_name: true
            },
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    first_name,
    last_name
FROM
    people

// Values
{}
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
    return sql.build({
        $select: {
            $columns: {
                people_id: true,
                first_name: false,
                last_name: false
            },
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    people_id
FROM
    people

// Values
{}
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
    return sql.build({
        $select: {
            $columns: {
                first_name: 1,
                last_name: 1
            },
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    first_name,
    last_name
FROM
    people

// Values
{}
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
    return sql.build({
        $select: {
            $columns: {
                people_id: 1,
                first_name: 0,
                last_name: 0
            },
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    people_id
FROM
    people

// Values
{}
```
## as Object :arrow_right: String:

Usage of `columns` as **Object** with a child of Type **String** :

**Syntax:**

```javascript
$columns: {
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
            $columns: {
                first_name: 'fn',
                last_name: 'ln'
            },
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    first_name AS fn,
    last_name AS ln
FROM
    people

// Values
{}
```
## as Object :arrow_right: Object:

Usage of `columns` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$columns: {
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
            $columns: {
                first_name: true,
                last_name: true,
                top_skill: {
                    $select: {
                        skill: 'top_skill',
                        $from: 'people_skills',
                        $where: {
                            'people.people_id': '~~people_skills.people_id',
                            'people_skills.is_top': 1
                        }
                    }
                }
            },
            $from: 'people',
            $where: {
                age: { $gte: 18 }
            }
        }
    });
}

// SQL output
SELECT
    first_name,
    last_name,
    (
        SELECT
            skill AS top_skill
        FROM
            people_skills
        WHERE
            people.people_id = people_skills.people_id
            AND people_skills.is_top = $1
    ) AS top_skill
FROM
    people
WHERE
    age >= $2

// Values
{
    "$1": 1,
    "$2": 18
}
```
## as Object :arrow_right: Function:

Usage of `columns` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$columns: {
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
            $columns: {
                first_name: true,
                last_name: true,
                total_skills: sql.select({ total: { $count: 'skillname' } }, {
                    $from: 'people_skills',
                    $where: {
                        'people.people_id': '~~people_skills.people_id'
                    }
                })
            },
            $from: 'people',
            $where: {
                age: { $gte: 18 }
            }
        }
    });
}

// SQL output
SELECT
    first_name,
    last_name,
    (
        SELECT
            COUNT(skillname) AS total
        FROM
            people_skills
        WHERE
            people.people_id = people_skills.people_id
    ) AS total_skills
FROM
    people
WHERE
    age >= $1

// Values
{
    "$1": 18
}
```
## as Array:

The Usage of `columns` as **Array** is restricted to childs have the following Type:

- String
- Object

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
    return sql.build({
        $select: {
            $columns: ['first_name', 'last_name'],
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    first_name,
    last_name
FROM
    people

// Values
{}
```
## as Array :arrow_right: Object:

Usage of `columns` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$columns: [
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
    return sql.build({
        $select: {
            $columns: [
                { total_people: { $count: '*' } },
            ],
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    COUNT(*) AS total_people
FROM
    people

// Values
{}
```
## as String:

Usage of `columns` as **String** with the following Syntax:

**Syntax:**

```javascript
$columns: < String >
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
            $columns: 'id',
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    id
FROM
    people

// Values
{}
```

