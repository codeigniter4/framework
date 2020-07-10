# storageParameters Helper
Specifies the `WITH` clause of the `CREATE INDEX` Statement to place the storage Parameters and additional Options.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-createtable.html)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql)

# Allowed Types and Usage

## as Array:

The Usage of `storageParameters` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `storageParameters` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$storageParameters: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript

{fillfactor = [$fillFactor]}-->(PostgreSQL,SQLServer)
{buffering = [$buffering]}-->(PostgreSQL)
{fastupdate = [$fastupdate]}-->(PostgreSQL)
{gin_pending_list_limit = [$ginPendingListLimit]}-->(PostgreSQL)
{pages_per_range = [$pagesPerRange]}-->(PostgreSQL)

{PAD_INDEX = [$padIndex]}-->(SQLServer)
{SORT_IN_TEMPDB = [$sortInTempDB]}-->(SQLServer)
{IGNORE_DUP_KEY = [$ignoreDupKey]}-->(SQLServer)
{STATISTICS_NORECOMPUTE = [$statisticsNoreCompute]}-->(SQLServer)
{STATISTICS_INCREMENTAL = [$statisticsIncremental]}-->(SQLServer)
{DROP_EXISTING = [$dropExisting]}-->(SQLServer)
{ONLINE = [$online]}-->(SQLServer)
{ALLOW_ROW_LOCKS = [$allowRowLocks]}-->(SQLServer)
{ALLOW_PAGE_LOCKS = [$allowPageLocks]}-->(SQLServer)
{MAXDOP = [$maxdop]}-->(SQLServer)

[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[fillFactor](./private/fillFactor/)|*optional*|*private*|fillfactor =  [$fillFactor]|`PostgreSQL` `SQLServer` 
[buffering](./private/buffering/)|*optional*|*private*|buffering =  [$buffering]|`PostgreSQL` 
[fastupdate](./private/fastupdate/)|*optional*|*private*|fastupdate =  [$fastupdate]|`PostgreSQL` 
[ginPendingListLimit](./private/ginPendingListLimit/)|*optional*|*private*|gin_pending_list_limit =  [$ginPendingListLimit]|`PostgreSQL` 
[pagesPerRange](./private/pagesPerRange/)|*optional*|*private*|pages_per_range =  [$pagesPerRange]|`PostgreSQL` 
[padIndex](./private/padIndex/)|*optional*|*private*|PAD_INDEX =  [$padIndex]|`SQLServer` 
[sortInTempDB](./private/sortInTempDB/)|*optional*|*private*|SORT_IN_TEMPDB =  [$sortInTempDB]|`SQLServer` 
[ignoreDupKey](./private/ignoreDupKey/)|*optional*|*private*|IGNORE_DUP_KEY =  [$ignoreDupKey]|`SQLServer` 
[statisticsNoreCompute](./private/statisticsNoreCompute/)|*optional*|*private*|STATISTICS_NORECOMPUTE =  [$statisticsNoreCompute]|`SQLServer` 
[statisticsIncremental](./private/statisticsIncremental/)|*optional*|*private*|STATISTICS_INCREMENTAL =  [$statisticsIncremental]|`SQLServer` 
[dropExisting](./private/dropExisting/)|*optional*|*private*|DROP_EXISTING =  [$dropExisting]|`SQLServer` 
[online](./private/online/)|*optional*|*private*|ONLINE =  [$online]|`SQLServer` 
[allowRowLocks](./private/allowRowLocks/)|*optional*|*private*|ALLOW_ROW_LOCKS =  [$allowRowLocks]|`SQLServer` 
[allowPageLocks](./private/allowPageLocks/)|*optional*|*private*|ALLOW_PAGE_LOCKS =  [$allowPageLocks]|`SQLServer` 
[maxdop](./private/maxdop/)|*optional*|*private*|MAXDOP =  [$maxdop]|`SQLServer` 

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $name: 'idx_people_name',
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $storageParameters: [
            { $fillFactor: 70 },
            { $fastupdate: sql.OFF }
        ]
    });
}

// SQL output
CREATE INDEX idx_people_name ON people (first_name ASC, last_name ASC) WITH (fillfactor = 70, fastupdate = OFF)

// Values
{}
```
## Further Examples

:bulb: **Shortcut using an Object to define parameters**
```javascript
function() {
    return sql.$createIndex({
        $name: 'idx_people_name',
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $storageParameters: {
            fillFactor: 70,
            fastupdate: sql.OFF
        }
    });
}

// SQL output
CREATE INDEX idx_people_name ON people (first_name ASC, last_name ASC) WITH (fillfactor = 70, fastupdate = OFF)

// Values
{}
```

:bulb: **Usage for SQLServer**
```javascript
function() {
    return sql.$createIndex({
        $name: 'idx_people_name',
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $storageParameters: {
            dropExisting: true,
            padIndex: sql.ON
        }
    });
}

// SQL output
CREATE INDEX idx_people_name ON people (first_name ASC, last_name ASC) WITH (DROP_EXISTING = ON, PAD_INDEX = ON)

// Values
{}
```

