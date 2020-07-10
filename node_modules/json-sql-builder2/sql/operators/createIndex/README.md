# createIndex Operator
Specifies the `CREATE INDEX` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-index.html)
- [MariaDB](https://mariadb.com/kb/en/library/create-index/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-createindex.html)
- [SQLite](https://sqlite.org/lang_createview.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_5010.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-index-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `createIndex` as **Object** with the following Syntax:

**Syntax:**

```javascript
$createIndex: { ... }
```

**SQL-Definition:**
```javascript
CREATE{ UNIQUE[$unique]} INDEX
  { CONCURRENTLY[$concurrently]}-->(PostgreSQL)
  { IF NOT EXISTS [$ine] | [$ifNotExists]}
  { [$name]} ON <$table>
  { USING [$using]}-->(PostgreSQL,MariaDB,MySQL)
   (<$columns>)
  { WITH ([$storageParameters])}
  { TABLESPACE [$tablespace]}-->(PostgreSQL)
  { WHERE [$where]}

```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[unique](../../helpers/ddl/constraint/unique/)|*optional*|:heavy_check_mark:| UNIQUE [$unique]|
[concurrently](./private/concurrently/)|*optional*|*private*| CONCURRENTLY [$concurrently]|`PostgreSQL` 
[ine](./private/ine/)|*optional*|*private*| IF NOT EXISTS  [$ine]|
[ifNotExists](./private/ifNotExists/)|*optional*|*private*| IF NOT EXISTS  [$ifNotExists]|
[name](./private/name/)|*optional*|*private*|  [$name]|
[table](./private/table/)|:heavy_check_mark:|*private*||
[using](../../helpers/queries/using/)|*optional*|:heavy_check_mark:| USING  [$using]|`PostgreSQL` `MariaDB` `MySQL` 
[columns](../../helpers/ddl/columns/)|:heavy_check_mark:|:heavy_check_mark:||
[storageParameters](./private/storageParameters/)|*optional*|*private*| WITH ( [$storageParameters])|
[tablespace](./private/tablespace/)|*optional*|*private*| TABLESPACE  [$tablespace]|`PostgreSQL` 
[where](../../helpers/queries/where/)|*optional*|:heavy_check_mark:| WHERE  [$where]|

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $unique: true,
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        }
    });
}

// SQL output
CREATE UNIQUE INDEX ON people (first_name ASC, last_name ASC)

// Values
{}
```

