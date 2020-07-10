# not Helper
Specifies the logical `NOT` Operator as Helper.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as Object:

Usage of `not` as **Object** with the following Syntax:

**Syntax:**

```javascript
$not: { ... }
```

**SQL-Definition:**
```javascript
NOT <value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $not: { $startsWith: 'D' } }
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
    first_name NOT LIKE $1

// Values
{
    "$1": "D%"
}
```

