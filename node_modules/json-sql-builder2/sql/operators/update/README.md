# update Operator
Specifies the Operator for the `UPDATE` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/update.html)
- [MariaDB](https://mariadb.com/kb/en/library/update/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-update.html)
- [SQLite](https://sqlite.org/lang_update.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10007.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/queries/update-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `update` as **Object** with the following Syntax:

**Syntax:**

```javascript
$update: { ... }
```

**SQL-Definition:**
```javascript
UPDATE  { [$top]}-->(SQLServer){ <$table>}
  { SET [$set]}
  { FROM [$from]}  { [$join]}
  { WHERE [$where]}
  { ORDER BY [$orderBy]}-->(MariaDB,MySQL,SQLite)
  { LIMIT [$limit]}-->(MariaDB,MySQL,SQLite)
  { OFFSET [$offset]}-->(MariaDB,MySQL,SQLite)
  { RETURNING [$returning]}-->(PostgreSQL,Oracle,MariaDB)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[top](../../helpers/queries/top/)|*optional*|:heavy_check_mark:|  [$top]|`SQLServer` 
[table](./private/table/)|:heavy_check_mark:|*private*|  <$table>|
[set](./private/set/)|*optional*|*private*| SET  [$set]|
[from](../../helpers/queries/from/)|*optional*|:heavy_check_mark:| FROM  [$from]|
[join](../../helpers/queries/join/)|*optional*|:heavy_check_mark:|  [$join]|
[where](../../helpers/queries/where/)|*optional*|:heavy_check_mark:| WHERE  [$where]|
[orderBy](../../helpers/queries/orderBy/)|*optional*|:heavy_check_mark:| ORDER BY  [$orderBy]|`MariaDB` `MySQL` `SQLite` 
[limit](../../helpers/queries/limit/)|*optional*|:heavy_check_mark:| LIMIT  [$limit]|`MariaDB` `MySQL` `SQLite` 
[offset](../../helpers/queries/offset/)|*optional*|:heavy_check_mark:| OFFSET  [$offset]|`MariaDB` `MySQL` `SQLite` 
[returning](../../helpers/queries/returning/)|*optional*|:heavy_check_mark:| RETURNING  [$returning]|`PostgreSQL` `Oracle` `MariaDB` 

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            first_name: 'John',
            last_name: 'Doe'
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    first_name = $1,
    last_name = $2
WHERE
    people_id = $3

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 456
}
```

## Further Examples

:bulb: **Using ORDER BY and LIMIT**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: 6000
        },
        $where: {
            first_name: 'John'
        },
        $orderBy: 'last_name',
        $limit: 1
    });
}

// SQL output
UPDATE
    people
SET
    salary = $1
WHERE
    first_name = $2
ORDER BY
    last_name ASC
LIMIT
    $3

// Values
{
    "$1": 6000,
    "$2": "John",
    "$3": 1
}
```

:bulb: **Using RETURNING**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            salary: { $mul: 1.1 }
        },
        $returning: {
            people_id: 1,
            salary: 'new_salary'
        }
    });
}

// SQL output
UPDATE
    people
SET
    salary = salary * $1 RETURNING people_id,
    salary AS new_salary

// Values
{
    "$1": 1.1
}
```

