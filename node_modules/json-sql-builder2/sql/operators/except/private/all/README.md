# all Helper
Specifies the `EXCEPT ALL` Operator.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/union.html)
- [MariaDB](https://mariadb.com/kb/en/library/union)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/queries-union.html)
- [SQLite](https://sqlite.org/syntax/compound-select-stmt.html)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-union-transact-sql)

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
[  EXCEPT ALL ... ]
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
    return sql.$except({
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
    EXCEPT
        ALL (
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
            $except: {
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

// Values
{
    "$1": "K%",
    "$2": "A%"
}
```

