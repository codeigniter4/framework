# delete Operator
Specifies the Operator for the `DELETE` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/delete.html)
- [MariaDB](https://mariadb.com/kb/en/library/delete/)
- [PostgreSQL](https://www.postgresql.org/docs/10/static/sql-delete.html)
- [SQLite](https://sqlite.org/lang_insert.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_8005.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/delete-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `delete` as **Object** with the following Syntax:

**Syntax:**

```javascript
$delete: { ... }
```

**SQL-Definition:**
```javascript
DELETE{ [$table]}-->(MariaDB,MySQL,SQLServer)
  { FROM <$from>}
  { [$join]}-->(MariaDB,MySQL,SQLServer)
  { USING [$using]}-->(PostgreSQL)
  { WHERE [$where]}
{ ORDER BY [$orderBy]}-->(MariaDB,MySQL,SQLite)
{ LIMIT [$limit]}-->(MariaDB,MySQL,SQLite)
{ OFFSET [$offset]}-->(MariaDB,MySQL,SQLite)
{ RETURNING [$returning]}-->(Oracle,PostgreSQL,MariaDB)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[table](./private/table/)|*optional*|*private*|  [$table]|`MariaDB` `MySQL` `SQLServer` 
[from](../../helpers/queries/from/)|:heavy_check_mark:|:heavy_check_mark:| FROM  <$from>|
[join](../../helpers/queries/join/)|*optional*|:heavy_check_mark:|  [$join]|`MariaDB` `MySQL` `SQLServer` 
[using](../../helpers/queries/using/)|*optional*|:heavy_check_mark:| USING  [$using]|`PostgreSQL` 
[where](../../helpers/queries/where/)|*optional*|:heavy_check_mark:| WHERE  [$where]|
[orderBy](../../helpers/queries/orderBy/)|*optional*|:heavy_check_mark:| ORDER BY  [$orderBy]|`MariaDB` `MySQL` `SQLite` 
[limit](../../helpers/queries/limit/)|*optional*|:heavy_check_mark:| LIMIT  [$limit]|`MariaDB` `MySQL` `SQLite` 
[offset](../../helpers/queries/offset/)|*optional*|:heavy_check_mark:| OFFSET  [$offset]|`MariaDB` `MySQL` `SQLite` 
[returning](../../helpers/queries/returning/)|*optional*|:heavy_check_mark:| RETURNING  [$returning]|`Oracle` `PostgreSQL` `MariaDB` 

:bulb: **Example:**
```javascript
function() {
    return sql.$delete({
        $from: 'people',
        $where: {
            people_id: 234
        }
    });
}

// SQL output
DELETE FROM
    people
WHERE
    people_id = $1

// Values
{
    "$1": 234
}
```

## Further Examples

:bulb: **JOIN tables on DELETE Statement**
```javascript
function() {
    return sql.$delete({
        $table: 'hobbies',
        $from: 'people',
        $join: {
            hobbies: { $innerJoin: { $table: 'people_hobbies', $on: { 'people.id': '~~hobbies.people_id' } } }
        },
        $where: {
            'hobbies.hobby': 'Football'
        }
    });
}

// SQL output
DELETE hobbies
FROM
    people
    INNER JOIN people_hobbies AS hobbies ON people.id = hobbies.people_id
WHERE
    hobbies.hobby = $1

// Values
{
    "$1": "Football"
}
```

:bulb: **Using ORDER BY, LIMIT on DELETE Statement**
```javascript
function() {
    return sql.$delete({
        $from: 'people',
        $where: {
            'last_name': sql.startsWith('K')
        },
        $orderBy: ['last_name', 'first_name'],
        $limit: 1
    });
}

// SQL output
DELETE FROM
    people
WHERE
    last_name LIKE $1
ORDER BY
    last_name ASC,
    first_name ASC
LIMIT
    $2

// Values
{
    "$1": "K%",
    "$2": 1
}
```

:bulb: **Using RETURNING clause on DELETE Statement**
```javascript
function() {
    return sql.$delete({
        $from: 'people',
        $where: {
            'last_name': sql.startsWith('K')
        },
        $returning: '*'
    });
}

// SQL output
DELETE FROM
    people
WHERE
    last_name LIKE $1 RETURNING *

// Values
{
    "$1": "K%"
}
```

:bulb: **Using USING clause on DELETE Statement**
```javascript
function() {
    return sql.$delete({
        $from: 'films',
        $using: 'producers',
        $where: {
            'producer_id': '~~producers.id',
            'producers.name': 'foo'
        }
    });
}

// SQL output
DELETE FROM
    films USING producers
WHERE
    producer_id = producers.id
    AND producers.name = $1

// Values
{
    "$1": "foo"
}
```

