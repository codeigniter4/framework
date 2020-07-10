# columns Helper
Specifies a collection of Columns for the `$constraint` Helper.

#### Supported by
- PostgreSQL
- MySQL
- MariaDB
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as Object:

The Usage of `columns` as **Object** is restricted to childs have the following Type:

- Boolean
- Number

## as Object :arrow_right: Boolean:

The Usage of `columns` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$columns: {
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
$columns: {
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

The Usage of `columns` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$columns: {
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
$columns: {
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
## as Array:

The Usage of `columns` as **Array** is restricted to childs have the following Type:

- String

## as Array :arrow_right: String:

Usage of `columns` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$columns: [
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

Usage of `columns` as **String** with the following Syntax:

**Syntax:**

```javascript
$columns: < String >
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

