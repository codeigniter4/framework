# except Operator
Specifies the `EXCEPT` Operator.

#### Supported by
- [MariaDB](https://mariadb.com/kb/en/library/except/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-union.html)
- [SQLite](https://sqlite.org/syntax/compound-select-stmt.html)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `except` as **Object** with the following Syntax:

**Syntax:**

```javascript
$except: { ... }
```

**SQL-Definition:**
```javascript

{*EXCEPT [$distinct]*}
{*EXCEPT ALL [$all]*}
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
                $except: {
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
            EXCEPT
                ALL (
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

The Usage of `except` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `except` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$except: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript

[$select]
	{[$union]}
	{[$intersect]}
	{[$except]}
[  EXCEPT ... ]
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
    return sql.$except([
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
EXCEPT
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
            $except: {
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
        EXCEPT
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

