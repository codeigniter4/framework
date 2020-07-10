# dumpfile Helper
Specifies the `DUMPFILE` option for the `SELECT ... INTO` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select-into-dumpfile/)

# Allowed Types and Usage

## as String:

Usage of `dumpfile` as **String** with the following Syntax:

**Syntax:**

```javascript
$dumpfile: < String >
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
            photo: 1,
            $into: { $dumpfile: '/tmp/peoplephoto.jpg' },
            $from: 'people',
            $limit: 1
        }
    });

    return query;
}

// SQL output
SELECT
    photo INTO DUMPFILE $1
FROM
    people
LIMIT
    $2

// Values
{
    "$1": "/tmp/peoplephoto.jpg",
    "$2": 1
}
```

