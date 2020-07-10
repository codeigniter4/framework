# into Helper
Specifies the `INTO` clause for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select-into.html)
- [MariaDB](https://mariadb.com/kb/en/library/selectinto/)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-into-clause-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `into` as **String** with the following Syntax:

**Syntax:**

```javascript
$into: < String >
```

**SQL-Definition:**
```javascript
INTO <value-ident>
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            people_id: 1,
            $into: '@people_id',
            $from: 'people',
            $limit: 1
        }
    });

    return query;
}

// SQL output
SELECT
    people_id INTO @people_id
FROM
    people
LIMIT
    $1

// Values
{
    "$1": 1
}
```

## as Array:

Usage of `into` as **Array** with the following Syntax:

**Syntax:**

```javascript
$into: [ ... ]
```

**SQL-Definition:**
```javascript
INTO <value-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $columns: ['people_id', 'first_name', 'last_name'],
            $into: ['@people_id', '@first_name', '@last_name'],
            $from: 'people',
            $limit: 1
        }
    });

    return query;
}

// SQL output
SELECT
    people_id,
    first_name,
    last_name INTO @people_id,
    @first_name,
    @last_name
FROM
    people
LIMIT
    $1

// Values
{
    "$1": 1
}
```

## as Object:

Usage of `into` as **Object** with the following Syntax:

**Syntax:**

```javascript
$into: { ... }
```

**SQL-Definition:**
```javascript
INTO{ OUTFILE [$outfile]}{ DUMPFILE [$dumpfile]}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[outfile](./private/outfile/)|*optional*|*private*| OUTFILE  [$outfile]|
[dumpfile](./private/dumpfile/)|*optional*|*private*| DUMPFILE  [$dumpfile]|

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            people_id: 1,
            first_name: 1,
            last_name: 1,
            $into: { $outfile: '/tmp/peopledata.csv' },
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    people_id,
    first_name,
    last_name INTO OUTFILE $1
FROM
    people

// Values
{
    "$1": "/tmp/peopledata.csv"
}
```

## Further Examples

:bulb: **Basic Usage for SQLServer**
```javascript
function() {
    let query = sql.build({
        $select: {
            $into: 'tmp_people_table',
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    * INTO tmp_people_table
FROM
    people

// Values
{}
```

