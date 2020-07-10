# nullsFirst Helper
Specifies the `NULLS FIRST` option for the `ORDER BY` clause on each column.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [Oracle](https://docs.oracle.com/javadb/10.8.3.0/ref/rrefsqlj13658.html)

# Allowed Types and Usage

## as Boolean:

The usage of `nullsFirst` as **Boolean** is restricted to the following values:
- true

#### as Boolean with value **true**:
**Syntax:**

```javascript
$nullsFirst: true
```

**SQL-Definition:**
```javascript
FIRST
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: true,
                first_name: { $asc: true, $nullsFirst: true },
                age: { $desc: true, $nullsLast: true }
            }
        }
    });

    return query;
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    first_name ASC NULLS FIRST,
    age DESC NULLS LAST

// Values
{}
```
