# on Helper
Specifies the `ON` clause for the `JOIN` operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `on` as **Object** with the following Syntax:

**Syntax:**

```javascript
$on: { ... }
```

**SQL-Definition:**
```javascript
{* AND [$and] *} {* OR [$or] *}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[and](../../../../../../helpers/logical/and/)|*optional*|:heavy_check_mark:||
[or](../../../../../../helpers/logical/or/)|*optional*|:heavy_check_mark:||

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
                people_skills: {
                    $left: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
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
    LEFT JOIN people_skills AS skills ON skills.people_id = people.people_id
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
                people_skills: {
                    $left: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
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
    LEFT JOIN people_skills skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

