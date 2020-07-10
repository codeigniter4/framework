# limit Helper
Specifies the `LIMIT` clause for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/limit/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html#SQL-LIMIT)
- [SQLite](https://sqlite.org/lang_select.html#limitoffset)

# Allowed Types and Usage

## as Number:

Usage of `limit` as **Number** with the following Syntax:

**Syntax:**

```javascript
$limit: < Number >
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $limit: 10
        }
    });

    return query;
}

// SQL output
SELECT
    *
FROM
    people
LIMIT
    $1

// Values
{
    "$1": 10
}
```

## as String:

The usage of `limit` as **String** is restricted to the following values:
- ALL

#### as String with value **ALL**:
**Syntax:**

```javascript
$limit: 'ALL'
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $limit: 'ALL'
        }
    });
    return query;
}

// SQL output
SELECT
    *
FROM
    people
LIMIT
    ALL

// Values
{}
```
## Further Examples

:bulb: **MySQL turns $limit: 'ALL' to LIMIT 9007199254740991**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $limit: 'ALL'
        }
    });
    return query;
}

// SQL output
SELECT
    *
FROM
    people
LIMIT
    9007199254740991

// Values
{}
```

:bulb: **SQLite turns $limit: 'ALL' to LIMIT -1**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $limit: 'ALL'
        }
    });
    return query;
}

// SQL output
SELECT
    *
FROM
    people
LIMIT
    -1

// Values
{}
```

