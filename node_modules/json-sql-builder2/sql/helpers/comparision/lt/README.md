# lt Helper
Specifies the comparision **less than** `<` Operator as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/func-op-summary-ref.html)
- [MariaDB](https://mariadb.com/kb/en/library/less-than/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-comparison.html)
- [SQLite](https://sqlite.org/lang_expr.html)
- [Oracle](https://docs.oracle.com/html/A95915_01/sqopr.htm#sthref149)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/language-elements/less-than-transact-sql)

# Allowed Types and Usage

## as Primitive:

Usage of `lt` as **Primitive** with the following Syntax:

**Syntax:**

```javascript
$lt: < String | Number | Boolean >
```

**SQL-Definition:**
```javascript
< <value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                age: { $lt: 18 }
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
    age < $1

// Values
{
    "$1": 18
}
```

## as Object:

Usage of `lt` as **Object** with the following Syntax:

**Syntax:**

```javascript
$lt: { ... }
```

**SQL-Definition:**
```javascript
< <value>
```

:bulb: **Example:**
```javascript
function() {
    let avgerageAge = {
        $select: {
            age: { $avg: 'age' },
            $from: 'people'
        }
    };

    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                age: { $lt: avgerageAge }
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
    age < (
        SELECT
            AVG(age) AS age
        FROM
            people
    )

// Values
{}
```

## as Function:

Usage of `lt` as **Function** with the following Syntax:

**Syntax:**

```javascript
$lt: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
< <value>
```

:bulb: **Example:**
```javascript
function() {
    let myAvarageAgeFunction = sql.select({ age: { $avg: 'age' } }, {
        $from: 'people'
    });

    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                age: { $lt: myAvarageAgeFunction }
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
    age < (
        SELECT
            AVG(age) AS age
        FROM
            people
    )

// Values
{}
```

## Further Examples

:bulb: **Usage as SQL-Function**
```javascript
function() {
    let averageAge = 45;

    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                age: sql.lt(averageAge)
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
    age < $1

// Values
{
    "$1": 45
}
```

