# now Helper
Specifies the `NOW` function.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_now)
- [MariaDB](https://mariadb.com/kb/en/library/now/)
- [PostgreSQL](https://www.postgresql.org/docs/11/functions-datetime.html)

# Allowed Types and Usage

## as Boolean:

The usage of `now` as **Boolean** is restricted to the following values:
- true

#### as Boolean with value **true**:
**Syntax:**

```javascript
$now: true
```

**SQL-Definition:**
```javascript
NOW()
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        foo: { $now: true }
    });
}

// SQL output
SELECT
    NOW() AS foo

// Values
{}
```
## as Number:

The usage of `now` as **Number** is restricted to the following values:
- 1

#### as Number with value **1**:
**Syntax:**

```javascript
$now: 1
```

**SQL-Definition:**
```javascript
NOW()
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        foo: { $now: 1 }
    });
}

// SQL output
SELECT
    NOW() AS foo

// Values
{}
```
## Further Examples

:bulb: **UPDATE using NOW() function**
```javascript
function() {
    return sql.$update({
        $table: 'my_table',
        $set: {
            foo: { $now: true }
        },
        $where: {
            id: 55
        }
    });
}

// SQL output
UPDATE
    my_table
SET
    foo = NOW()
WHERE
    id = $1

// Values
{
    "$1": 55
}
```

