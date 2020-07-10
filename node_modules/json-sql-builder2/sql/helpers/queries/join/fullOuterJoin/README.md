# fullOuterJoin Helper
Specifies the `FULL OUTER JOIN` operator for the `FROM` clause.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `fullOuterJoin` as **Object** with the following Syntax:

**Syntax:**

```javascript
$fullOuterJoin: { ... }
```

**SQL-Definition:**
```javascript
FULL JOIN{ LATERAL[$lateral]}-->(PostgreSQL){ [$table]}{ [$select]} AS <key-ident>{ ON [$on]}{ USING [$using]}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[lateral](./private/lateral/)|*optional*|*private*| LATERAL [$lateral]|`PostgreSQL` 
[table](./private/table/)|*optional*|*private*|  [$table]|
[select](../../../../operators/select/)|*optional*|:heavy_check_mark:|  [$select]|
[on](./private/on/)|*optional*|*private*| ON  [$on]|
[using](../../../../helpers/queries/using/)|*optional*|:heavy_check_mark:| USING  [$using]|

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
                    $fullOuterJoin: {
                        $table: 'people_skills',
                        $on: { 'skills.people_id': { $eq: '~~people.people_id' } },
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
    people FULL
    JOIN people_skills AS skills ON skills.people_id = people.people_id
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
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $fullOuterJoin: {
                        $table: 'people_skills',
                        $on: { 'skills.people_id': { $eq: '~~people.people_id' } },
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
    people FULL
    JOIN people_skills skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Usage as Function**
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
                skills: sql.fullOuterJoin('people_skills', {
                    $on: { 'skills.people_id': { $eq: '~~people.people_id' } }
                })
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
    people FULL
    JOIN people_skills AS skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

:bulb: **Oracle Usage as Function**
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
                skills: sql.fullOuterJoin('people_skills', {
                    $on: { 'skills.people_id': { $eq: '~~people.people_id' } }
                })
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
    people FULL
    JOIN people_skills skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

