# eq Helper
Specifies the comparision **equal to** `=` Operator as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/func-op-summary-ref.html)
- [MariaDB](https://mariadb.com/kb/en/library/equal/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-comparison.html)
- [SQLite](https://sqlite.org/lang_expr.html)
- [Oracle](https://docs.oracle.com/html/A95915_01/sqopr.htm#sthref149)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/language-elements/equals-transact-sql)

# Allowed Types and Usage

## as Primitive:

Usage of `eq` as **Primitive** with the following Syntax:

**Syntax:**

```javascript
$eq: < String | Number | Boolean >
```

**SQL-Definition:**
```javascript
= <value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $eq: 'John' },
                last_name: { $eq: 'Doe' }
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
    AND last_name = $2

// Values
{
    "$1": "John",
    "$2": "Doe"
}
```

## as Object:

Usage of `eq` as **Object** with the following Syntax:

**Syntax:**

```javascript
$eq: { ... }
```

**SQL-Definition:**
```javascript
= <value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: {
                    $eq: {
                        $select: {
                            first_name: 1,
                            $from: 'people',
                            $where: {
                                age: 100
                            },
                            $limit: 1
                        }
                    }
                },
                last_name: { $eq: 'Doe' }
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
    first_name = (
        SELECT
            first_name
        FROM
            people
        WHERE
            age = $1
        LIMIT
            $2
    )
    AND last_name = $3

// Values
{
    "$1": 100,
    "$2": 1,
    "$3": "Doe"
}
```

## as Function:

Usage of `eq` as **Function** with the following Syntax:

**Syntax:**

```javascript
$eq: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
= <value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: {
                    $eq: sql.select({ first_name: 1 }, {
                        $from: 'people',
                        $where: {
                            age: 100
                        },
                        $limit: 1
                    })
                },
                last_name: { $eq: 'Doe' }
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
    first_name = (
        SELECT
            first_name
        FROM
            people
        WHERE
            age = $1
        LIMIT
            $2
    )
    AND last_name = $3

// Values
{
    "$1": 100,
    "$2": 1,
    "$3": "Doe"
}
```

