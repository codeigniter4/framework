# join Helper
Specifies the `JOIN` operator for the `FROM` clause.

> **NOTE**
>
> The keyword `OUTER` is an optional keyword for most SQL-dialects. By default it is deactivated. If you need, you can activate this using the option `useOuterKeywordOnJoin`.
>
> ```javascript
> var sql = new SQLBuilder('PostgreSQL', {
>     useOuterKeywordOnJoin: true
> });
> ```
>

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `join` as **Object** is restricted to childs have the following Type:

- Object
- Function

## as Object :arrow_right: Object:

Usage of `join` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$join: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript

{*INNER JOIN [$innerJoin]*}
{*LEFT JOIN [$leftJoin]*}
{*RIGHT JOIN [$rightJoin]*}
{*FULL JOIN [$fullOuterJoin]*}
{*CROSS JOIN [$crossJoin]*}
{CROSS APPLY [$crossApply]}-->(SQLServer)
{*INNER|LEFT|RIGHT|FULL JOIN LATERAL [$lateral]*}-->(PostgreSQL)
{CROSS JOIN [$cross]}
{INNER JOIN [$inner]}
{LEFT JOIN [$left]}
{RIGHT JOIN [$right]}
{FULL JOIN [$full]}
	{ ON [$on]}
	{ USING ([$using])}

[  ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[innerJoin](../../../../helpers/queries/join/innerJoin/)|*optional*|:heavy_check_mark:||
[leftJoin](../../../../helpers/queries/join/leftJoin/)|*optional*|:heavy_check_mark:||
[rightJoin](../../../../helpers/queries/join/rightJoin/)|*optional*|:heavy_check_mark:||
[fullOuterJoin](../../../../helpers/queries/join/fullOuterJoin/)|*optional*|:heavy_check_mark:||
[crossJoin](../../../../helpers/queries/join/crossJoin/)|*optional*|:heavy_check_mark:||
[crossApply](./private/crossApply/)|*optional*|*private*|CROSS APPLY  [$crossApply]|`SQLServer` 
[lateral](./private/lateral/)|*optional*|*private*||`PostgreSQL` 
[cross](./private/cross/)|*optional*|*private*|CROSS JOIN  [$cross]|
[inner](./private/inner/)|*optional*|*private*|INNER JOIN  [$inner]|
[left](../../../../helpers/functions/string/left/)|*optional*|:heavy_check_mark:|LEFT JOIN  [$left]|
[right](./private/right/)|*optional*|*private*|RIGHT JOIN  [$right]|
[full](./private/full/)|*optional*|*private*|FULL JOIN  [$full]|
[on](./private/on/)|*optional*|*private*| ON  [$on]|
[using](../../../../helpers/queries/using/)|*optional*|:heavy_check_mark:| USING ( [$using])|

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'ratings.description': true
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $inner: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                },
                ratings: {
                    $leftJoin: {
                        $table: 'skill_ratings',
                        $on: { 'skills.rate_id': '~~ratings.rate_id' }
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
    ratings.description
FROM
    people
    INNER JOIN people_skills AS skills ON skills.people_id = people.people_id
    LEFT JOIN skill_ratings AS ratings ON skills.rate_id = ratings.rate_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```
## as Object :arrow_right: Function:

Usage of `join` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$join: {
    "<identifier | $Helper | $operator>": sql.<callee>([params])
}
```

**SQL-Definition:**
```javascript
<value>[  ... ]
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
                'ratings.description': true
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $inner: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                },
                ratings: sql.leftJoin('skill_ratings', { $on: { 'skills.rate_id': '~~ratings.rate_id' } })
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
    ratings.description
FROM
    people
    INNER JOIN people_skills AS skills ON skills.people_id = people.people_id
    LEFT JOIN skill_ratings AS ratings ON skills.rate_id = ratings.rate_id
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
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'ratings.description': true
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $inner: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                },
                ratings: {
                    $leftJoin: {
                        $table: 'skill_ratings',
                        $on: { 'skills.rate_id': '~~ratings.rate_id' }
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
    ratings.description
FROM
    people
    INNER JOIN people_skills skills ON skills.people_id = people.people_id
    LEFT JOIN skill_ratings ratings ON skills.rate_id = ratings.rate_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Join using sub-selects**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'ratings.description': true
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $inner: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                },
                ratings: {
                    $leftJoin: {
                        $select: {
                            $from: 'skill_ratings',
                            $where: {
                                'is_people_skill': 1
                            }
                        },
                        $on: { 'skills.rate_id': '~~ratings.rate_id' }
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
    ratings.description
FROM
    people
    INNER JOIN people_skills AS skills ON skills.people_id = people.people_id
    LEFT JOIN (
        SELECT
            *
        FROM
            skill_ratings
        WHERE
            is_people_skill = $1
    ) AS ratings ON skills.rate_id = ratings.rate_id
WHERE
    skills.rate > $2

// Values
{
    "$1": 1,
    "$2": 50
}
```

:bulb: **Oracle Join using sub-selects**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'ratings.description': true
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $inner: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                },
                ratings: {
                    $leftJoin: {
                        $select: {
                            $from: 'skill_ratings',
                            $where: {
                                'is_people_skill': 1
                            }
                        },
                        $on: { 'skills.rate_id': '~~ratings.rate_id' }
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
    ratings.description
FROM
    people
    INNER JOIN people_skills skills ON skills.people_id = people.people_id
    LEFT JOIN (
        SELECT
            *
        FROM
            skill_ratings
        WHERE
            is_people_skill = $1
    ) ratings ON skills.rate_id = ratings.rate_id
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
                'ratings.description': true
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $inner: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                },
                ratings: sql.leftJoin('skill_ratings', { $on: { 'skills.rate_id': '~~ratings.rate_id' } })
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
    ratings.description
FROM
    people
    INNER JOIN people_skills skills ON skills.people_id = people.people_id
    LEFT JOIN skill_ratings ratings ON skills.rate_id = ratings.rate_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

