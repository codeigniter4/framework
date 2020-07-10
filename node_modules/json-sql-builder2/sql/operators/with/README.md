# with Operator
Specifies the `WITH` Operator for a Common Table Expression (CTE).

#### Supported by
- [MariaDB](https://mariadb.com/kb/en/library/with/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-with.html)
- [SQLite](https://sqlite.org/syntax/with-clause.html)
- [Oracle](https://docs.oracle.com/database/121/SQLRF/statements_10002.htm#SQLRF01702)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `with` as **Object** with the following Syntax:

**Syntax:**

```javascript
$with: { ... }
```

**SQL-Definition:**
```javascript
WITH {RECURSIVE [$recursive]} <$cte>{ <$query>}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[recursive](./private/recursive/)|*optional*|*private*|RECURSIVE  [$recursive]|
[cte](./private/cte/)|:heavy_check_mark:|*private*||
[query](./private/query/)|:heavy_check_mark:|*private*|  <$query>|

:bulb: **Example:**
```javascript
function() {
    return sql.$with({
        peoples_after_1999: {
            $select: {
                $from: 'people',
                $where: {
                    date_of_birth: { $gte: '2000-01-01' }
                }
            }
        },
        $query: {
            $insert: {
                $table: 'peoples_after_1999_named_doe',
                $columns: ['people_id', 'first_name', 'last_name'],
                $select: {
                    $columns: ['people_id', 'first_name', 'last_name'],
                    $from: 'peoples_after_1999',
                    $where: {
                        last_name: 'Doe'
                    }
                }
            }
        }
    });
}

// SQL output
WITH peoples_after_1999 AS (
    SELECT
        *
    FROM
        people
    WHERE
        date_of_birth >= $1
)
INSERT INTO
    peoples_after_1999_named_doe (people_id, first_name, last_name)
SELECT
    people_id,
    first_name,
    last_name
FROM
    peoples_after_1999
WHERE
    last_name = $2

// Values
{
    "$1": "2000-01-01",
    "$2": "Doe"
}
```

## Further Examples

:bulb: **PostgreSQL Example using RETURNING**
```javascript
function() {
    return sql.$with({
        moved_rows: {
            $delete: {
                $from: 'products',
                $where: {
                    $and: [
                        { date: { $gte: '2010-10-01' } },
                        { date: { $lt: '2010-11-01' } }
                    ]
                },
                $returning: '*'
            }
        },
        $query: {
            $insert: {
                $table: 'products_log',
                $select: {
                    $from: 'moved_rows'
                }
            }
        }
    });
}

// SQL output
WITH moved_rows AS (
    DELETE FROM
        products
    WHERE
        date >= $1
        AND date < $2 RETURNING *
)
INSERT INTO
    products_log
SELECT
    *
FROM
    moved_rows

// Values
{
    "$1": "2010-10-01",
    "$2": "2010-11-01"
}
```

:bulb: **Using RECURSIVE**
```javascript
function() {
    return sql.$with({
        $recursive: true,
        $cte: {
            t: {
                $columns: {
                    n: true
                },
                $union: {
                    $all: [{
                        $select: {
                            1: 'n'
                        }
                    }, {
                        $select: {
                            n: { $add: ['n', 1] },
                            $from: 't'
                        }
                    }]
                }
            }
        },
        $query: {
            $select: {
                n: true,
                $from: 't',
                $limit: 10
            }
        }
    });
}

// SQL output
WITH RECURSIVE t(n) AS (
    (
        (
            SELECT
                1 AS n
        )
        UNION ALL
            (
                SELECT
                    n + $1 AS n
                FROM
                    t
            )
    )
)
SELECT
    n
FROM
    t
LIMIT
    $2

// Values
{
    "$1": 1,
    "$2": 10
}
```

