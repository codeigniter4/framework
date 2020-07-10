# i Helper
Specifies an Identifier for a Table, Column, Index, etc. as Helper where normally a String value was expected.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as String:

Usage of `i` as **String** with the following Syntax:

**Syntax:**

```javascript
$i: < String >
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
            $from: 'people',
            $where: {
                first_name: { $eq: { $i: 'last_name' } }
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
    first_name = last_name

// Values
{}
```

