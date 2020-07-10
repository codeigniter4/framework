# createView Operator
Specifies the `CREATE VIEW` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-view.html)
- [MariaDB](https://mariadb.com/kb/en/library/create-view/)
- [PostgreSQL](https://www.postgresql.org/docs/9.4/static/sql-createview.html)
- [SQLite](https://sqlite.org/lang_createview.html)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/statements_8004.htm#SQLRF01504)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `createView` as **Object** with the following Syntax:

**Syntax:**

```javascript
$createView: { ... }
```

**SQL-Definition:**
```javascript
CREATE
  { OR REPLACE[$orReplace]}-->(PostgreSQL,MariaDB,MySQL,SQLite,Oracle)
  { OR ALTER[$orAlter]}-->(SQLServer)
  { TEMPORARY[$temp]}-->(PostgreSQL,SQLite)
  { RECURSIVE[$recursive]}-->(PostgreSQL)
 VIEW {IF NOT EXISTS[$ine] }-->(MariaDB,SQLite) <$view> { ([$columns])}
    { WITH (security_barrier)[$securityBarrier]}-->(PostgreSQL)
 AS {[$with]} | {[$select]} | {[$union]} | {[$intersect]} | {[$except]}
  {* WITH (CASCADED or LOCAL) CHECK OPTION [$checkOption] *}-->(PostgreSQL,MariaDB,MySQL,SQLServer,Oracle)

```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[orReplace](./private/orReplace/)|*optional*|*private*| OR REPLACE [$orReplace]|`PostgreSQL` `MariaDB` `MySQL` `SQLite` `Oracle` 
[orAlter](./private/orAlter/)|*optional*|*private*| OR ALTER [$orAlter]|`SQLServer` 
[temp](./private/temp/)|*optional*|*private*| TEMPORARY [$temp]|`PostgreSQL` `SQLite` 
[recursive](./private/recursive/)|*optional*|*private*| RECURSIVE [$recursive]|`PostgreSQL` 
[ine](./private/ine/)|*optional*|*private*|IF NOT EXISTS [$ine] |`MariaDB` `SQLite` 
[view](./private/view/)|:heavy_check_mark:|*private*||
[columns](../../helpers/ddl/columns/)|*optional*|:heavy_check_mark:| ( [$columns])|
[securityBarrier](./private/securityBarrier/)|*optional*|*private*| WITH (security_barrier) [$securityBarrier]|`PostgreSQL` 
[with](../../operators/with/)|*optional*|:heavy_check_mark:| [$with]|
[select](../../operators/select/)|*optional*|:heavy_check_mark:| [$select]|
[union](../../operators/union/)|*optional*|:heavy_check_mark:| [$union]|
[intersect](../../operators/intersect/)|*optional*|:heavy_check_mark:| [$intersect]|
[except](../../operators/except/)|*optional*|:heavy_check_mark:| [$except]|
[checkOption](./private/checkOption/)|*optional*|*private*||`PostgreSQL` `MariaDB` `MySQL` `SQLServer` `Oracle` 

:bulb: **Example:**
```javascript
function() {
    return sql.$createView({
        $view: 'my_people_view',
        $select: {
            people_id: true,
            people_name: sql.concat('~~last_name', ' ', '~~first_name'),
            $from: 'people'
        }
    });
}

// SQL output
CREATE VIEW my_people_view AS
SELECT
    people_id,
    CONCAT(last_name, $1, first_name) AS people_name
FROM
    people

// Values
{
    "$1": " "
}
```

## Further Examples

:bulb: **Test $ine (IF NOT EXISTS)**
```javascript
function() {
    return sql.$createView({
        $view: 'my_people_view',
        $ine: true,
        $select: {
            people_id: true,
            people_name: sql.concat('~~last_name', ' ', '~~first_name'),
            $from: 'people'
        }
    });
}

// SQL output
CREATE VIEW IF NOT EXISTS my_people_view AS
SELECT
    people_id,
    CONCAT(last_name, $1, first_name) AS people_name
FROM
    people

// Values
{
    "$1": " "
}
```

:bulb: **PostgreSQL usage of RECURSIVE VIEW**
```javascript
function() {
    return sql.$createView({
        $recursive: true,
        $view: 'nums1to100',
        $columns: 'n',
        $union: {
            $all: [{
                $select: {
                    n: { __: '1' }
                }
            }, {
                $select: {
                    n: { $add: 1 },
                    $from: 'nums1to100',
                    $where: {
                        n: { $lt: 100 }
                    }
                }
            }]
        }
    });
}

// SQL output
CREATE RECURSIVE VIEW nums1to100 (n) AS (
    (
        SELECT
            1 AS n
    )
    UNION ALL
        (
            SELECT
                n + 1 AS n
            FROM
                nums1to100
            WHERE
                n < 100
        )
)

// Values
{}
```

