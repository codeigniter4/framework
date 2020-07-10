# options Helper
Specifies the `options` of the `CREATE TABLE` Statement to place table Options.

#### Supported by
- [MariaDB](https://mariadb.com/kb/en/library/create-table/#table-options)
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table.html)

# Allowed Types and Usage

## as Object:

The Usage of `options` as **Object** is restricted to childs have the following Type:

- Primitive

## as Object :arrow_right: Primitive:

Usage of `options` as **Object** with a child of Type **Primitive** :

**Syntax:**

```javascript
$options: {
    "<identifier | $Helper | $operator>": <value: String | Number | Boolean> [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> = <value-param>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $default: 0 } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } }
        },
        $options: {
            AUTO_INCREMENT: 100,
            ENGINE: 'InnoDb',
            MAX_ROWS: 1000,
            TABLESPACE: 'ts1'
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
) AUTO_INCREMENT = $2,
ENGINE = $3,
MAX_ROWS = $4,
TABLESPACE = $5

// Values
{
    "$1": 0,
    "$2": 100,
    "$3": "InnoDb",
    "$4": 1000,
    "$5": "ts1"
}
```
## as Array:

The Usage of `options` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `options` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$options: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
{AUTO_INCREMENT = [$autoInc]}
{AVG_ROW_LENGTH = [$avgRowLength]}
{CHARACTER SET = [$characterSet]}
{CHECKSUM = [$checksum]}
{COLLATE = [$collation]}
{COMMENT = [$comment]}
{COMPRESSION = [$compression]}
{CONNECTION = [$connection]}
{DATA DIRECTORY = [$dataDirectory]}
{INDEX DIRECTORY = [$indexDirectory]}
{DELAY_KEY_WRITE = [$delayKeyWrite]}
{ENCRYPTION = [$encryption]}
{ENGINE = [$engine]}
{INSERT_METHOD = [$insetMethod]}
{KEY_BLOCK_SIZE = [$keyBlockSize]}
{MAX_ROWS = [$maxRows]}
{MIN_ROWS = [$minRows]}
{PACK_KEYS = [$packKeys]}
{PASSWORD = [$password]}
{ROW_FORMAT = [$rowFormat]}
{STATS_AUTO_RECALC = [$statsAutoRecalc]}
{STATS_PERSISTENT = [$statsPersistent]}
{STATS_SAMPLE_PAGES = [$statsSamplePages]}
{TABLESPACE = [$tablespace]}
{STORAGE = [$storage]}

[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[autoInc](./private/autoInc/)|*optional*|*private*|AUTO_INCREMENT =  [$autoInc]|
[avgRowLength](./private/avgRowLength/)|*optional*|*private*|AVG_ROW_LENGTH =  [$avgRowLength]|
[characterSet](./private/characterSet/)|*optional*|*private*|CHARACTER SET =  [$characterSet]|
[checksum](./private/checksum/)|*optional*|*private*|CHECKSUM =  [$checksum]|
[collation](./private/collation/)|*optional*|*private*|COLLATE =  [$collation]|
[comment](./private/comment/)|*optional*|*private*|COMMENT =  [$comment]|
[compression](./private/compression/)|*optional*|*private*|COMPRESSION =  [$compression]|
[connection](./private/connection/)|*optional*|*private*|CONNECTION =  [$connection]|
[dataDirectory](./private/dataDirectory/)|*optional*|*private*|DATA DIRECTORY =  [$dataDirectory]|
[indexDirectory](./private/indexDirectory/)|*optional*|*private*|INDEX DIRECTORY =  [$indexDirectory]|
[delayKeyWrite](./private/delayKeyWrite/)|*optional*|*private*|DELAY_KEY_WRITE =  [$delayKeyWrite]|
[encryption](./private/encryption/)|*optional*|*private*|ENCRYPTION =  [$encryption]|
[engine](./private/engine/)|*optional*|*private*|ENGINE =  [$engine]|
[insetMethod](./private/insetMethod/)|*optional*|*private*|INSERT_METHOD =  [$insetMethod]|
[keyBlockSize](./private/keyBlockSize/)|*optional*|*private*|KEY_BLOCK_SIZE =  [$keyBlockSize]|
[maxRows](./private/maxRows/)|*optional*|*private*|MAX_ROWS =  [$maxRows]|
[minRows](./private/minRows/)|*optional*|*private*|MIN_ROWS =  [$minRows]|
[packKeys](./private/packKeys/)|*optional*|*private*|PACK_KEYS =  [$packKeys]|
[password](./private/password/)|*optional*|*private*|PASSWORD =  [$password]|
[rowFormat](./private/rowFormat/)|*optional*|*private*|ROW_FORMAT =  [$rowFormat]|
[statsAutoRecalc](./private/statsAutoRecalc/)|*optional*|*private*|STATS_AUTO_RECALC =  [$statsAutoRecalc]|
[statsPersistent](./private/statsPersistent/)|*optional*|*private*|STATS_PERSISTENT =  [$statsPersistent]|
[statsSamplePages](./private/statsSamplePages/)|*optional*|*private*|STATS_SAMPLE_PAGES =  [$statsSamplePages]|
[tablespace](./private/tablespace/)|*optional*|*private*|TABLESPACE =  [$tablespace]|
[storage](./private/storage/)|*optional*|*private*|STORAGE =  [$storage]|

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'my_people_table',
        $define: {
            people_id: { $column: { $type: 'INT', $default: 0 } },
            first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
            bio: { $column: { $type: 'TEXT' } }
        },
        $options: [
            { $autoInc: 100 },
            { $engine: 'InnoDb' },
            { $maxRows: 1000 },
            { $tablespace: 'ts1' }
        ]
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
) AUTO_INCREMENT = 100,
ENGINE = $2,
MAX_ROWS = 1000,
TABLESPACE = $3

// Values
{
    "$1": 0,
    "$2": "InnoDb",
    "$3": "ts1"
}
```
