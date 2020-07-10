# outfile Helper
Specifies the `OUTFILE` option for the `SELECT ... INTO` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select-into.html)
- [MariaDB](https://mariadb.com/kb/en/library/selectinto/)

# Allowed Types and Usage

## as String:

Usage of `outfile` as **String** with the following Syntax:

**Syntax:**

```javascript
$outfile: < String >
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
            $into: { $outfile: '/tmp/peopledata.txt' },
            $from: 'people',
            $limit: 1
        }
    });

    return query;
}

// SQL output
SELECT
    * INTO OUTFILE $1
FROM
    people
LIMIT
    $2

// Values
{
    "$1": "/tmp/peopledata.txt",
    "$2": 1
}
```

## as Object:

Usage of `outfile` as **Object** with the following Syntax:

**Syntax:**

```javascript
$outfile: { ... }
```

**SQL-Definition:**
```javascript
<$file>
  { FIELDS TERMINATED BY [$fieldTerminator]}
  { ENCLOSED BY [$enclosedBy]}
  { ESCAPED BY [$escapedBy]}
  { LINES TERMINATED BY [$lineTerminator]}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[file](./private/file/)|:heavy_check_mark:|*private*||
[fieldTerminator](./private/fieldTerminator/)|*optional*|*private*| FIELDS TERMINATED BY  [$fieldTerminator]|
[enclosedBy](./private/enclosedBy/)|*optional*|*private*| ENCLOSED BY  [$enclosedBy]|
[escapedBy](./private/escapedBy/)|*optional*|*private*| ESCAPED BY  [$escapedBy]|
[lineTerminator](./private/lineTerminator/)|*optional*|*private*| LINES TERMINATED BY  [$lineTerminator]|

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            people_id: 1,
            first_name: 1,
            last_name: 1,
            $into: {
                $outfile: {
                    $file: '/tmp/peopledata.csv',
                    $fieldTerminator: ',',
                    $enclosedBy: '"',
                    $lineTerminator: '\n'
                }
            },
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    people_id,
    first_name,
    last_name INTO OUTFILE $1 FIELDS TERMINATED BY $2 ENCLOSED BY $3 LINES TERMINATED BY $4
FROM
    people

// Values
{
    "$1": "/tmp/peopledata.csv",
    "$2": ",",
    "$3": "\"",
    "$4": "\n"
}
```

