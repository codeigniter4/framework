# using Helper
Specifies the `USING` clause for the `JOIN` operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `using` as **String** with the following Syntax:

**Syntax:**

```javascript
$using: < String >
```

**SQL-Definition:**
```javascript
<value-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: { $left: 'skills', $using: 'people_id' }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills AS skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

## as Array:

The Usage of `using` as **Array** is restricted to childs have the following Type:

- String

## as Array :arrow_right: String:

Usage of `using` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$using: [
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
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: { $left: 'skills', $using: ['people_id', 'skill_id'] }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills AS skills USING (people_id, skill_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```
## as Object:

The Usage of `using` as **Object** is restricted to childs have the following Type:

- Boolean
- Number

## as Object :arrow_right: Boolean:

The Usage of `using` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$using: {
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
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: true,
                    skill_id: false
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills AS skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```
## as Object :arrow_right: Boolean with value `false`:
**Syntax:**

```javascript
$using: {
    "<identifier | $Helper | $operator>": false [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: true,
                    skill_id: false
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills AS skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```
## as Object :arrow_right: Number:

The Usage of `using` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$using: {
    "<identifier | $Helper | $operator>": 0 [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: 1,
                    skill_id: 0
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills AS skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```
## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$using: {
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
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: 1,
                    skill_id: 0
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills AS skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```
## Further Examples

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: { $left: 'skills', $using: 'people_id' }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: { $left: 'skills', $using: ['people_id', 'skill_id'] }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills skills USING (people_id, skill_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: true,
                    skill_id: false
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: true,
                    skill_id: false
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: 1,
                    skill_id: 0
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.$select({
        $columns: {
            'people.first_name': true,
            'people.last_name': true,
            'skills.description': true,
            'skills.rate': true
        },
        $from: 'people',
        $join: {
            people_skills: {
                $left: 'skills',
                $using: {
                    people_id: 1,
                    skill_id: 0
                }
            }
        },
        $where: {
            'skills.rate': { $gt: 50 }
        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    LEFT JOIN people_skills skills USING (people_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

