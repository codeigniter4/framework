# groupBy Helper
Specifies the `GROUP BY` clause for the `SELECT` Statement.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `groupBy` as **Object** is restricted to childs have the following Type:

- Boolean
- Number
- Object

## as Object :arrow_right: Boolean:

The Usage of `groupBy` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$groupBy: {
    "<identifier | $Helper | $operator>": true [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: {
                city: true
            }
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city

// Values
{}
```
## as Object :arrow_right: Boolean with value `false`:
**Syntax:**

```javascript
$groupBy: {
    "<identifier | $Helper | $operator>": false [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: {
                city: true,
                state: false
            }
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city

// Values
{}
```
## as Object :arrow_right: Number:

The Usage of `groupBy` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$groupBy: {
    "<identifier | $Helper | $operator>": 0 [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: {
                city: 1,
                state: 0
            }
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city

// Values
{}
```
## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$groupBy: {
    "<identifier | $Helper | $operator>": 1 [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: {
                city: 1
            }
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city

// Values
{}
```
## as Object :arrow_right: Object:

Usage of `groupBy` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$groupBy: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
{ROLLUP ([$rollup])}{CUBE ([$cube])}{GROUPING SETS ([$groupingSets])}[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[rollup](./private/rollup/)|*optional*|*private*|ROLLUP ( [$rollup])|
[cube](./private/cube/)|*optional*|*private*|CUBE ( [$cube])|
[groupingSets](./private/groupingSets/)|*optional*|*private*|GROUPING SETS ( [$groupingSets])|

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            state: 1,
            city: 1,
            total_sales: sql.sum('sales'),

            $from: 'sales_pipline',
            $groupBy: {
                myRollupGroup: {
                    $rollup: {
                        state: 1,
                        city: 1
                    }
                }
            }
        }
    });
}

// SQL output
SELECT
    state,
    city,
    SUM(sales) AS total_sales
FROM
    sales_pipline
GROUP BY
    ROLLUP (state, city)

// Values
{}
```
## as Array:

The Usage of `groupBy` as **Array** is restricted to childs have the following Type:

- String

## as Array :arrow_right: String:

Usage of `groupBy` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$groupBy: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            state: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: ['city', 'state']
        }
    });
}

// SQL output
SELECT
    city,
    state,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city,
    state

// Values
{}
```
## as String:

Usage of `groupBy` as **String** with the following Syntax:

**Syntax:**

```javascript
$groupBy: < String >
```

**SQL-Definition:**
```javascript
<value-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: 'city'
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city

// Values
{}
```

