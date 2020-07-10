# select Operator
Specifies the Operator for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `select` as **Object** with the following Syntax:

**Syntax:**

```javascript
$select: { ... }
```

**SQL-Definition:**
```javascript
SELECT
  { [$top]}-->(SQLServer)  { DISTINCT[$distinct]}
  { SQL_CALC_FOUND_ROWS[$calcFoundRows]}-->(MySQL,MariaDB)

  { <$columns>}
    { [$into]}-->(MySQL,MariaDB,SQLServer)

  { FROM [$from]}  { [$join]}
  { WHERE [$where]}
  { GROUP BY [$groupBy]}
    { WITH ROLLUP[$withRollup]}-->(MariaDB,MySQL)
  { HAVING [$having]}
  { ORDER BY [$orderBy]}
  { LIMIT [$limit]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
  { OFFSET [$offset]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[top](../../helpers/queries/top/)|*optional*|:heavy_check_mark:|  [$top]|`SQLServer` 
[distinct](./private/distinct/)|*optional*|*private*| DISTINCT [$distinct]|
[calcFoundRows](./private/calcFoundRows/)|*optional*|*private*| SQL_CALC_FOUND_ROWS [$calcFoundRows]|`MySQL` `MariaDB` 
[columns](../../helpers/ddl/columns/)|:heavy_check_mark:|:heavy_check_mark:|  <$columns>|
[into](./private/into/)|*optional*|*private*|  [$into]|`MySQL` `MariaDB` `SQLServer` 
[from](../../helpers/queries/from/)|*optional*|:heavy_check_mark:| FROM  [$from]|
[join](../../helpers/queries/join/)|*optional*|:heavy_check_mark:|  [$join]|
[where](../../helpers/queries/where/)|*optional*|:heavy_check_mark:| WHERE  [$where]|
[groupBy](./private/groupBy/)|*optional*|*private*| GROUP BY  [$groupBy]|
[withRollup](./private/withRollup/)|*optional*|*private*| WITH ROLLUP [$withRollup]|`MariaDB` `MySQL` 
[having](./private/having/)|*optional*|*private*| HAVING  [$having]|
[orderBy](../../helpers/queries/orderBy/)|*optional*|:heavy_check_mark:| ORDER BY  [$orderBy]|
[limit](../../helpers/queries/limit/)|*optional*|:heavy_check_mark:| LIMIT  [$limit]|`MariaDB` `MySQL` `PostgreSQL` `SQLite` 
[offset](../../helpers/queries/offset/)|*optional*|:heavy_check_mark:| OFFSET  [$offset]|`MariaDB` `MySQL` `PostgreSQL` `SQLite` 

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    *
FROM
    people

// Values
{}
```

## Further Examples

:bulb: **Usage as Operator-Function**
```javascript
function() {
    return sql.$select({
        $from: 'people',
        $where: {
            last_name: 'Doe'
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    last_name = $1

// Values
{
    "$1": "Doe"
}
```

:bulb: **Usage as Function**
```javascript
function() {
    let peopleLikes = sql.select({ total_likes: sql.count('*') }, {
        $from: 'people_likes',
        $where: {
            'people_likes.people_id': { $eq: '~~people.people_id' }
        }
    });

    return sql.$select({
        first_name: 1,
        last_name: 1,
        total_likes: peopleLikes,
        $from: 'people'
    });
}

// SQL output
SELECT
    first_name,
    last_name,
    (
        SELECT
            COUNT(*) AS total_likes
        FROM
            people_likes
        WHERE
            people_likes.people_id = people.people_id
    ) AS total_likes
FROM
    people

// Values
{}
```

:bulb: **Usage as inline-Function**
```javascript
function() {
    return sql.$select({
        first_name: 1,
        last_name: 1,
        total_likes: sql.select({ total_likes: { $count: '*' } }, {
            $from: 'people_likes',
            $where: {
                'people_likes.people_id': '~~people.people_id'
            }
        }),
        $from: 'people'
    });
}

// SQL output
SELECT
    first_name,
    last_name,
    (
        SELECT
            COUNT(*) AS total_likes
        FROM
            people_likes
        WHERE
            people_likes.people_id = people.people_id
    ) AS total_likes
FROM
    people

// Values
{}
```

:bulb: **Usage with DISTINCT**
```javascript
function() {
    return sql.$select({
        $distinct: true,
        job_title: true,
        $from: 'people'
    });
}

// SQL output
SELECT
    DISTINCT job_title
FROM
    people

// Values
{}
```

:bulb: **Usage for SQL_CALC_FOUND_ROWS**
```javascript
function() {
    return sql.$select({
        $calcFoundRows: true,
        $from: 'people',
        $where: {
            people_id: { $gt: 100 }
        },
        $limit: 10
    });
}

// SQL output
SELECT
    SQL_CALC_FOUND_ROWS *
FROM
    people
WHERE
    people_id > $1
LIMIT
    $2

// Values
{
    "$1": 100,
    "$2": 10
}
```

:bulb: **Usage WITH ROLLUP option**
```javascript
function() {
    return sql.$select({
        state: true,
        city: true,
        total_sales: { $sum: 'sales' },
        $from: 'sales_pipline',
        $groupBy: {
            state: true,
            city: true
        },
        $withRollup: true
    });
}

// SQL output
SELECT
    state,
    city,
    SUM(sales) AS total_sales
FROM
    sales_pipline
GROUP BY
    state,
    city WITH ROLLUP

// Values
{}
```

