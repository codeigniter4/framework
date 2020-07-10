# cross Helper
Specifies the `CROSS JOIN` operator for the `FROM` clause.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `cross` as **String** with the following Syntax:

**Syntax:**

```javascript
$cross: < String >
```

**SQL-Definition:**
```javascript
<key-ident> AS <value-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                people_skills: { $cross: 'skills' }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }
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
    CROSS JOIN people_skills AS skills
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

## as Object:

Usage of `cross` as **Object** with the following Syntax:

**Syntax:**

```javascript
$cross: { ... }
```

**SQL-Definition:**
```javascript
<value> AS <identifier>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $cross: {
                        $select: {
                            $from: 'people_skills',
                            $where: {
                                is_skill: 1
                            }
                        }
                    }
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

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
    CROSS JOIN (
        SELECT
            *
        FROM
            people_skills
        WHERE
            is_skill = $1
    ) AS skills
WHERE
    skills.rate > $2

// Values
{
    "$1": 1,
    "$2": 50
}
```

## as Function:

Usage of `cross` as **Function** with the following Syntax:

**Syntax:**

```javascript
$cross: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
<value> AS <key-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $cross: sql.select('*', {
                        $from: 'people_skills',
                        $where: {
                            is_skill: 1
                        }
                    })
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

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
    CROSS JOIN (
        SELECT
            *
        FROM
            people_skills
        WHERE
            is_skill = $1
    ) AS skills
WHERE
    skills.rate > $2

// Values
{
    "$1": 1,
    "$2": 50
}
```

## Further Examples

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                people_skills: { $cross: 'skills' }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }
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
    CROSS JOIN people_skills skills
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
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $cross: {
                        $select: {
                            $from: 'people_skills',
                            $where: {
                                is_skill: 1
                            }
                        }
                    }
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

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
    CROSS JOIN (
        SELECT
            *
        FROM
            people_skills
        WHERE
            is_skill = $1
    ) skills
WHERE
    skills.rate > $2

// Values
{
    "$1": 1,
    "$2": 50
}
```

:bulb: **Oracle Basic Usage**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $cross: sql.select('*', {
                        $from: 'people_skills',
                        $where: {
                            is_skill: 1
                        }
                    })
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

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
    CROSS JOIN (
        SELECT
            *
        FROM
            people_skills
        WHERE
            is_skill = $1
    ) skills
WHERE
    skills.rate > $2

// Values
{
    "$1": 1,
    "$2": 50
}
```

