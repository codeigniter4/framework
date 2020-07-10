# all Helper
Specifies the `UNION ALL` Operator.

#### Supported by
- [MariaDB](https://mariadb.com/kb/en/library/intersect/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-union.html)
- [SQLite](https://sqlite.org/syntax/compound-select-stmt.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/queries004.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql)

# Allowed Types and Usage

## as Array:

The Usage of `all` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `all` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$all: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript

[$select]
	{[$union]}
	{[$intersect]}
	{[$except]}
[  INTERSECT ALL ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[select](../../../../operators/select/)|*optional*|:heavy_check_mark:||
[union](../../../../operators/union/)|*optional*|:heavy_check_mark:| [$union]|
[intersect](../../../../operators/intersect/)|*optional*|:heavy_check_mark:| [$intersect]|
[except](../../../../operators/except/)|*optional*|:heavy_check_mark:| [$except]|

:bulb: **Example:**
```javascript
function() {
    return sql.$union({
        $all: [
            { $select: { first_name: true, $from: 'people' } },
            { $select: { last_name: true, $from: 'people' } }
        ]
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
    UNION ALL
        (
            SELECT
                last_name
            FROM
                people
        )
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
                $all: [
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

// Values
{
    "$1": "K%",
    "$2": "A%"
}
```

