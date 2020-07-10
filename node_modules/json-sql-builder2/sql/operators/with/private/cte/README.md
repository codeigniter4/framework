# cte Operator
Specifies the `WITH` Operator for a Common Table Expression (CTE).

#### Supported by
- [MariaDB](https://mariadb.com/kb/en/library/with/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-with.html)
- [SQLite](https://sqlite.org/syntax/with-clause.html)
- [Oracle](https://docs.oracle.com/database/121/SQLRF/statements_10002.htm#SQLRF01702)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `cte` as **Object** is restricted to childs have the following Type:

- Object

## as Object :arrow_right: Object:

Usage of `cte` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$cte: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>{([$columns])}  AS (
	[$union]
	[$intersect]
	[$expect]
	[$select]
	[$insert]
	[$update]
	[$delete]
)[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[columns](../../../../helpers/ddl/columns/)|*optional*|:heavy_check_mark:|( [$columns])|
[union](../../../../operators/union/)|*optional*|:heavy_check_mark:||
[intersect](../../../../operators/intersect/)|*optional*|:heavy_check_mark:||
[expect](./private/expect/)|*optional*|*private*||
[select](../../../../operators/select/)|*optional*|:heavy_check_mark:||
[insert](../../../../operators/insert/)|*optional*|:heavy_check_mark:||
[update](../../../../operators/update/)|*optional*|:heavy_check_mark:||
[delete](../../../../operators/delete/)|*optional*|:heavy_check_mark:||

:bulb: **Example:**
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
