# tableOptions Helper
Specifies the `WITH` clause of the `CREATE TABLE` Statement to place table Options.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-createtable.html)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `tableOptions` as **Object** is restricted to childs have the following Type:

- Boolean
- Number

## as Object :arrow_right: Boolean:

Usage of `tableOptions` as **Object** with a child of Type **Boolean** :

**Syntax:**

```javascript
$tableOptions: {
    "<identifier | $Helper | $operator>": true | false [, ... ]
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
        $tableOptions: {
            OIDS: true,
            fillfactor: 70,
            autovacuum_enabled: true,
            autovacuum_vacuum_threshold: 100
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
) WITH (
    OIDS = TRUE,
    fillfactor = 70,
    autovacuum_enabled = TRUE,
    autovacuum_vacuum_threshold = 100
)

// Values
{
    "$1": 0
}
```
## as Object :arrow_right: Number:

Usage of `tableOptions` as **Object** with a child of Type **Number** :

**Syntax:**

```javascript
$tableOptions: {
    "<identifier | $Helper | $operator>": <Number> [, ... ]
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
        $tableOptions: {
            fillfactor: 70,
            autovacuum_enabled: true,
            autovacuum_vacuum_threshold: 100
        }
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
) WITH (
    fillfactor = 70,
    autovacuum_enabled = TRUE,
    autovacuum_vacuum_threshold = 100
)

// Values
{
    "$1": 0
}
```
## as Array:

The Usage of `tableOptions` as **Array** is restricted to childs have the following Type:

- Object

## as Array :arrow_right: Object:

Usage of `tableOptions` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$tableOptions: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
{OIDS = [$oids]}-->(PostgreSQL)
{fillfactor = [$fillFactor]}-->(PostgreSQL)
{autovacuum_enabled = [$autovacuumEnabled]}-->(PostgreSQL)
{toast.autovacuum_enabled = [$toastAutovacuumEnabled]}-->(PostgreSQL)
{autovacuum_vacuum_threshold = [$autovacuumVacuumThreshold]}-->(PostgreSQL)
{toast.autovacuum_vacuum_threshold = [$toastAutovacuumVacuumThreshold]}-->(PostgreSQL)
{autovacuum_vacuum_scale_factor = [$autovacuumVacuumScaleFactor]}-->(PostgreSQL)
{toast.autovacuum_vacuum_scale_factor = [$toastAutovacuumVacuumScaleFactor]}-->(PostgreSQL)
{autovacuum_analyze_threshold = [$autovacuumAnalyzeThreshold]}-->(PostgreSQL)
{autovacuum_analyze_scale_factor = [$autovacuumAnalyzeScaleFactor]}-->(PostgreSQL)
{autovacuum_vacuum_cost_delay = [$autovacuumVacuumCostDelay]}-->(PostgreSQL)
{toast.autovacuum_vacuum_cost_delay = [$toastAutovacuumVacuumCostDelay]}-->(PostgreSQL)
{autovacuum_vacuum_cost_limit = [$autovacuumVacuumCostLimit]}-->(PostgreSQL)
{toast.autovacuum_vacuum_cost_limit = [$toastAutovacuumVacuumCostLimit]}-->(PostgreSQL)
{autovacuum_freeze_min_age = [$autovacuumFreezeMinAge]}-->(PostgreSQL)
{toast.autovacuum_freeze_min_age = [$toastAutovacuumFreezeMinAge]}-->(PostgreSQL)
{autovacuum_freeze_max_age = [$autovacuumFreezeMaxAge]}-->(PostgreSQL)
{toast.autovacuum_freeze_max_age = [$toastAutovacuumFreezeMaxAge]}-->(PostgreSQL)
{autovacuum_freeze_table_age = [$autovacuumFreezeTableAge]}-->(PostgreSQL)
{toast.autovacuum_freeze_table_age = [$toastAutovacuumFreezeTableAge]}-->(PostgreSQL)

[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[oids](./private/oids/)|*optional*|*private*|OIDS =  [$oids]|`PostgreSQL` 
[fillFactor](./private/fillFactor/)|*optional*|*private*|fillfactor =  [$fillFactor]|`PostgreSQL` 
[autovacuumEnabled](./private/autovacuumEnabled/)|*optional*|*private*|autovacuum_enabled =  [$autovacuumEnabled]|`PostgreSQL` 
[toastAutovacuumEnabled](./private/toastAutovacuumEnabled/)|*optional*|*private*|toast.autovacuum_enabled =  [$toastAutovacuumEnabled]|`PostgreSQL` 
[autovacuumVacuumThreshold](./private/autovacuumVacuumThreshold/)|*optional*|*private*|autovacuum_vacuum_threshold =  [$autovacuumVacuumThreshold]|`PostgreSQL` 
[toastAutovacuumVacuumThreshold](./private/toastAutovacuumVacuumThreshold/)|*optional*|*private*|toast.autovacuum_vacuum_threshold =  [$toastAutovacuumVacuumThreshold]|`PostgreSQL` 
[autovacuumVacuumScaleFactor](./private/autovacuumVacuumScaleFactor/)|*optional*|*private*|autovacuum_vacuum_scale_factor =  [$autovacuumVacuumScaleFactor]|`PostgreSQL` 
[toastAutovacuumVacuumScaleFactor](./private/toastAutovacuumVacuumScaleFactor/)|*optional*|*private*|toast.autovacuum_vacuum_scale_factor =  [$toastAutovacuumVacuumScaleFactor]|`PostgreSQL` 
[autovacuumAnalyzeThreshold](./private/autovacuumAnalyzeThreshold/)|*optional*|*private*|autovacuum_analyze_threshold =  [$autovacuumAnalyzeThreshold]|`PostgreSQL` 
[autovacuumAnalyzeScaleFactor](./private/autovacuumAnalyzeScaleFactor/)|*optional*|*private*|autovacuum_analyze_scale_factor =  [$autovacuumAnalyzeScaleFactor]|`PostgreSQL` 
[autovacuumVacuumCostDelay](./private/autovacuumVacuumCostDelay/)|*optional*|*private*|autovacuum_vacuum_cost_delay =  [$autovacuumVacuumCostDelay]|`PostgreSQL` 
[toastAutovacuumVacuumCostDelay](./private/toastAutovacuumVacuumCostDelay/)|*optional*|*private*|toast.autovacuum_vacuum_cost_delay =  [$toastAutovacuumVacuumCostDelay]|`PostgreSQL` 
[autovacuumVacuumCostLimit](./private/autovacuumVacuumCostLimit/)|*optional*|*private*|autovacuum_vacuum_cost_limit =  [$autovacuumVacuumCostLimit]|`PostgreSQL` 
[toastAutovacuumVacuumCostLimit](./private/toastAutovacuumVacuumCostLimit/)|*optional*|*private*|toast.autovacuum_vacuum_cost_limit =  [$toastAutovacuumVacuumCostLimit]|`PostgreSQL` 
[autovacuumFreezeMinAge](./private/autovacuumFreezeMinAge/)|*optional*|*private*|autovacuum_freeze_min_age =  [$autovacuumFreezeMinAge]|`PostgreSQL` 
[toastAutovacuumFreezeMinAge](./private/toastAutovacuumFreezeMinAge/)|*optional*|*private*|toast.autovacuum_freeze_min_age =  [$toastAutovacuumFreezeMinAge]|`PostgreSQL` 
[autovacuumFreezeMaxAge](./private/autovacuumFreezeMaxAge/)|*optional*|*private*|autovacuum_freeze_max_age =  [$autovacuumFreezeMaxAge]|`PostgreSQL` 
[toastAutovacuumFreezeMaxAge](./private/toastAutovacuumFreezeMaxAge/)|*optional*|*private*|toast.autovacuum_freeze_max_age =  [$toastAutovacuumFreezeMaxAge]|`PostgreSQL` 
[autovacuumFreezeTableAge](./private/autovacuumFreezeTableAge/)|*optional*|*private*|autovacuum_freeze_table_age =  [$autovacuumFreezeTableAge]|`PostgreSQL` 
[toastAutovacuumFreezeTableAge](./private/toastAutovacuumFreezeTableAge/)|*optional*|*private*|toast.autovacuum_freeze_table_age =  [$toastAutovacuumFreezeTableAge]|`PostgreSQL` 

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
        $tableOptions: [
            { $fillFactor: 70 },
            { $autovacuumEnabled: true },
            { $autovacuumVacuumThreshold: 100 }
        ]
    });
}

// SQL output
CREATE TABLE my_people_table (
    people_id INT DEFAULT $1,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
) WITH (
    fillfactor = 70,
    autovacuum_enabled = true,
    autovacuum_vacuum_threshold = 100
)

// Values
{
    "$1": 0
}
```
