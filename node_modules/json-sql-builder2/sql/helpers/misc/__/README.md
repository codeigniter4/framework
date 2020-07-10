# __ Helper
Specifies an Operator for writing INLINE-SQL.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as String:

Usage of `__` as **String** with the following Syntax:

**Syntax:**

```javascript
__: < String >
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        max_age: { __: 'MAX(age) + 1' },
        $from: 'people'
    });
}

// SQL output
SELECT
    MAX(age) + 1 AS max_age
FROM
    people

// Values
{}
```

## Further Examples

:bulb: **Only INLINE-SQL test**
```javascript
function() {
    return sql.build({
        __: 'SELECT MAX(age) FROM people'
    });
}

// SQL output
SELECT
    MAX(age)
FROM
    people

// Values
{}
```

