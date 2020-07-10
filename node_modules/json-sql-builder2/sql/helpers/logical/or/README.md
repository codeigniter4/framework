# or Helper
Specifies the logical `AND` Operator as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/logical-operators.html#operator_or)
- [MariaDB](https://mariadb.com/kb/en/library/or/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-logical.html)
- [SQLite](https://sqlite.org/lang_expr.html)
- [Oracle](https://docs.oracle.com/cd/B13789_01/server.101/b10759/conditions004.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/language-elements/or-transact-sql)

# Allowed Types and Usage

## as Array:

The Usage of `or` as **Array** is restricted to childs have the following Type:

- String
- Object
- Function

## as Array :arrow_right: String:

Usage of `or` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$or: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[  OR ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $or: [
                    "COALESCE(gender, 'male') = 'male'",
                    { last_name: { $eq: 'Doe' } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    COALESCE(gender, 'male') = 'male'
    OR last_name = $1

// Values
{
    "$1": "Doe"
}
```
## as Array :arrow_right: Object:

Usage of `or` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$or: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
<key-ident> <value>[  OR ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $or: [
                    { first_name: { $eq: 'Jane' } },
                    { last_name: { $eq: 'Doe' } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name = $1
    OR last_name = $2

// Values
{
    "$1": "Jane",
    "$2": "Doe"
}
```
## as Array :arrow_right: Function:

Usage of `or` as **Array** with a child of Type **Function** :

**Syntax:**

```javascript
$or: [
    sql.<callee>([params]) [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[  OR ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $or: [
                    sql.cmp('~~first_name', '=', 'Jane'),
                    { last_name: { $eq: 'Doe' } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name = $1
    OR last_name = $2

// Values
{
    "$1": "Jane",
    "$2": "Doe"
}
```
## Further Examples

:bulb: **Combine AND/OR**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    { people_id: 456725 },
                    {
                        $or: [
                            { first_name: { $eq: 'Jane' } },
                            { last_name: { $eq: 'Doe' } }
                        ]
                    }
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    people_id = $1
    AND (
        first_name = $2
        OR last_name = $3
    )

// Values
{
    "$1": 456725,
    "$2": "Jane",
    "$3": "Doe"
}
```

