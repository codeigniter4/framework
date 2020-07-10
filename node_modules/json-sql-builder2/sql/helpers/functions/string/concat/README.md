# concat Helper
Specifies the `CONCAT` function.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as Array:

Usage of `concat` as **Array** with the following Syntax:

**Syntax:**

```javascript
$concat: [ ... ]
```

**SQL-Definition:**
```javascript
CONCAT(<value-param>[ , ... ])
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        people_name: { $concat: ['~~first_name', ' ', '~~last_name'] },
        $from: 'people'
    });
}

// SQL output
SELECT
    CONCAT(first_name, $1, last_name) AS people_name
FROM
    people

// Values
{
    "$1": " "
}
```

## Further Examples

:bulb: **Usage of CONCAT as Function**
```javascript
function() {
    return sql.$select({
        people_name: sql.concat('~~first_name', ' ', '~~last_name'),
        $from: 'people'
    });
}

// SQL output
SELECT
    CONCAT(first_name, $1, last_name) AS people_name
FROM
    people

// Values
{
    "$1": " "
}
```

:bulb: **Usage with INLINE-SQL**
```javascript
function() {
    return sql.$select({
        people_name: { $concat: ["__:COALESCE(first_name, '')", ' ', '~~last_name'] },
        $from: 'people'
    });
}

// SQL output
SELECT
    CONCAT(COALESCE(first_name, ''), $1, last_name) AS people_name
FROM
    people

// Values
{
    "$1": " "
}
```

:bulb: **Support for SQLLite**
```javascript
function() {
    return sql.$select({
        greeting: { $concat: ['Hello', ' ', '~~first_name'] },
        $from: 'people'
    });
}

// SQL output
SELECT
    $1 || $2 || first_name AS greeting
FROM
    people

// Values
{
    "$1": "Hello",
    "$2": " "
}
```

