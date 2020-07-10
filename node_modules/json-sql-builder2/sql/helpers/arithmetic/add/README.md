# add Helper
Specifies the addition `+` Operator as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/arithmetic-functions.html#operator_plus)
- [MariaDB](https://mariadb.com/kb/en/library/addition-operator/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-math.html)
- [SQLite](https://sqlite.org/lang_expr.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/operators002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/arithmetic-operators-transact-sql)

# Allowed Types and Usage

## as Number:

Usage of `add` as **Number** with the following Syntax:

**Syntax:**

```javascript
$add: < Number >
```

**SQL-Definition:**
```javascript
+ <value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        test: { $: { __: '(5 + 2)', $add: 2 } }
    });
}

// SQL output
SELECT
    (5 + 2) + $1 AS test

// Values
{
    "$1": 2
}
```

## as String:

Usage of `add` as **String** with the following Syntax:

**Syntax:**

```javascript
$add: < String >
```

**SQL-Definition:**
```javascript
+ <value-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        age_test: { $: { $max: 'age', $add: 'age' } },
        $from: 'people'
    });
}

// SQL output
SELECT
    MAX(age) + age AS age_test
FROM
    people

// Values
{}
```

## as Object:

Usage of `add` as **Object** with the following Syntax:

**Syntax:**

```javascript
$add: { ... }
```

**SQL-Definition:**
```javascript
+ <value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: { $add: { $select: { bonus: true, $from: 'bonus_terms', $where: { year: 2018 } } } }
        },
        $where: {
            salary: { $lt: 2000 }
        }
    });
}

// SQL output
UPDATE
    people
SET
    salary = salary + (
        SELECT
            bonus
        FROM
            bonus_terms
        WHERE
            year = $1
    )
WHERE
    salary < $2

// Values
{
    "$1": 2018,
    "$2": 2000
}
```

## as Function:

Usage of `add` as **Function** with the following Syntax:

**Syntax:**

```javascript
$add: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
+ <value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: { $add: sql.coalesce('~~bonus', 1.02) }
        },
        $where: {
            salary: { $lt: 2000 }
        }
    });
}

// SQL output
UPDATE
    people
SET
    salary = salary + COALESCE(bonus, $1)
WHERE
    salary < $2

// Values
{
    "$1": 1.02,
    "$2": 2000
}
```

## as Array:

The Usage of `add` as **Array** is restricted to childs have the following Type:

- Number
- String
- Object
- Function

## as Array :arrow_right: Number:

Usage of `add` as **Array** with a child of Type **Number** :

**Syntax:**

```javascript
$add: [
    <Number> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-param>[  + ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: { $add: ['salary', 1.1] }
        },
        $where: {
            salary: { $lt: 2000 }
        }
    });
}

// SQL output
UPDATE
    people
SET
    salary = salary + $1
WHERE
    salary < $2

// Values
{
    "$1": 1.1,
    "$2": 2000
}
```
## as Array :arrow_right: String:

Usage of `add` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$add: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-ident>[  + ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: { $add: ['salary', 'bonus'] }
        },
        $where: {
            salary: { $lt: 2000 }
        }
    });
}

// SQL output
UPDATE
    people
SET
    salary = salary + bonus
WHERE
    salary < $1

// Values
{
    "$1": 2000
}
```
## as Array :arrow_right: Object:

Usage of `add` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$add: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[  + ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: {
                $add: [
                    'salary',
                    {
                        $select: {
                            bonus: { $avg: 'bonus' },
                            $from: 'people_bonus',
                            $where: {
                                'people_bonus.people_id': '~~people.people_id'
                            }
                        }
                    }
                ]
            }
        },
        $where: {
            salary: { $lt: 2000 }
        }
    });
}

// SQL output
UPDATE
    people
SET
    salary = salary + (
        SELECT
            AVG(bonus) AS bonus
        FROM
            people_bonus
        WHERE
            people_bonus.people_id = people.people_id
    )
WHERE
    salary < $1

// Values
{
    "$1": 2000
}
```
## as Array :arrow_right: Function:

Usage of `add` as **Array** with a child of Type **Function** :

**Syntax:**

```javascript
$add: [
    sql.<callee>([params]) [, ... ]
]
```

**SQL-Definition:**
```javascript
<value>[  + ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: { $add: ['salary', sql.coalesce('~~bonus', 1.02)] }
        },
        $where: {
            salary: { $lt: 2000 }
        }
    });
}

// SQL output
UPDATE
    people
SET
    salary = salary + COALESCE(bonus, $1)
WHERE
    salary < $2

// Values
{
    "$1": 1.02,
    "$2": 2000
}
```
