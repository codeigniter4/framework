# lateral Helper
Specifies the `LATERAL` operator for the `JOIN` clause.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-table-expressions.html#QUERIES-LATERAL)

# Allowed Types and Usage

## as Object:

Usage of `lateral` as **Object** with the following Syntax:

**Syntax:**

```javascript
$lateral: { ... }
```

**SQL-Definition:**
```javascript

{CROSS JOIN LATERAL [$cross]}
{INNER JOIN LATERAL [$inner]}
{LEFT JOIN LATERAL [$left]}
{RIGHT JOIN LATERAL [$right]}
{FULL JOIN LATERAL [$full]}
  { ON [$on]}
  { USING ([$using])}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[cross](./private/cross/)|*optional*|*private*|CROSS JOIN LATERAL  [$cross]|
[inner](./private/inner/)|*optional*|*private*|INNER JOIN LATERAL  [$inner]|
[left](../../../../../../helpers/functions/string/left/)|*optional*|:heavy_check_mark:|LEFT JOIN LATERAL  [$left]|
[right](./private/right/)|*optional*|*private*|RIGHT JOIN LATERAL  [$right]|
[full](./private/full/)|*optional*|*private*|FULL JOIN LATERAL  [$full]|
[on](./private/on/)|*optional*|*private*| ON  [$on]|
[using](../../../../../../helpers/queries/using/)|*optional*|:heavy_check_mark:| USING ( [$using])|

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rating': true,
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $lateral: {
                        $inner: 'skills',
                        $on: {
                            'skills.people_id': { $eq: '~~people.people_id' }
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
    skills.rating
FROM
    people
    INNER JOIN LATERAL people_skills AS skills ON skills.people_id = people.people_id
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
                'skills.rating': true,
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $lateral: {
                        $inner: 'skills',
                        $on: {
                            'skills.people_id': { $eq: '~~people.people_id' }
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
    skills.rating
FROM
    people
    INNER JOIN LATERAL people_skills skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

