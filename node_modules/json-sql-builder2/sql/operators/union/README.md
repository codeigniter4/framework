# union Operator
Specifies the `UNION` Operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/union.html)
- [MariaDB](https://mariadb.com/kb/en/library/union)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-union.html)
- [SQLite](https://sqlite.org/syntax/compound-select-stmt.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/queries004.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-union-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `union` as **Object** with the following Syntax:

**Syntax:**

```javascript
$union: { ... }
```

**SQL-Definition:**
```javascript

{*UNION [$distinct]*}
{*UNION ALL [$all]*}
  { ORDER BY [$orderBy]}
  { LIMIT [$limit]}
  { OFFSET [$offset]}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[distinct](./private/distinct/)|*optional*|*private*||
[all](./private/all/)|*optional*|*private*||
[orderBy](../../helpers/queries/orderBy/)|*optional*|:heavy_check_mark:| ORDER BY  [$orderBy]|
[limit](../../helpers/queries/limit/)|*optional*|:heavy_check_mark:| LIMIT  [$limit]|
[offset](../../helpers/queries/offset/)|*optional*|:heavy_check_mark:| OFFSET  [$offset]|

:bulb: **Example:**
```javascript
function() {
    return sql.$union({
        $distinct: [
            { $select: { first_name: true, $from: 'people' } },
            {
                $union: {
                    $all: [
                        { $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('K') } } },
                        { $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('A') } } }
                    ]
                }
            },
        ],
        $orderBy: 'first_name'
    });
}

// SQL output
(
    (
        SELECT
            first_name
        FROM
            people
    )
    UNION
        (
            (
                SELECT
                    last_name
                FROM
                    people
                WHERE
                    last_name LIKE $1
            )
            UNION ALL
                (
                    SELECT
                        last_name
                    FROM
                        people
                    WHERE
                        last_name LIKE $2
                )
        )
)
ORDER BY
    first_name ASC

// Values
{
    "$1": "K%",
    "$2": "A%"
}
```

## as Array:

The Usage of `union` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `union` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$union: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript

[$select]
	{[$union]}
	{[$intersect]}
	{[$except]}
[  UNION ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[select](../../operators/select/)|*optional*|:heavy_check_mark:||
[union](../../operators/union/)|*optional*|:heavy_check_mark:| [$union]|
[intersect](../../operators/intersect/)|*optional*|:heavy_check_mark:| [$intersect]|
[except](../../operators/except/)|*optional*|:heavy_check_mark:| [$except]|

:bulb: **Example:**
```javascript
function() {
    return sql.$union([
        { $select: { first_name: true, $from: 'people' } },
        { $select: { last_name: true, $from: 'people' } }
    ]);
}

// SQL output
(
    SELECT
        first_name
    FROM
        people
)
UNION
    (
        SELECT
            last_name
        FROM
            people
    )

// Values
{}
```
## Further Examples

:bulb: **Nested unions**
```javascript
function() {
    return sql.$union([
        { $select: { first_name: true, $from: 'people' } },
        {
            $union: {
                $distinct: [
                    { $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('K') } } },
                    { $select: { last_name: true, $from: 'people', $where: { last_name: sql.startsWith('A') } } }
                ]
            }
        }
    ]);
}

// SQL output
(
    SELECT
        first_name
    FROM
        people
)
UNION
    (
        (
            SELECT
                last_name
            FROM
                people
            WHERE
                last_name LIKE $1
        )
        UNION
            (
                SELECT
                    last_name
                FROM
                    people
                WHERE
                    last_name LIKE $2
            )
    )

// Values
{
    "$1": "K%",
    "$2": "A%"
}
```

