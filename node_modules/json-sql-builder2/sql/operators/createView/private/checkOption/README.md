# checkOption Helper
Specifies the `CHECK OPTION` clause for the `CREATE VIEW` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-view.html)
- [MariaDB](https://mariadb.com/kb/en/library/create-view/)
- [PostgreSQL](https://www.postgresql.org/docs/9.4/static/sql-createview.html)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/statements_8004.htm#SQLRF01504)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql)

# Allowed Types and Usage

## as Boolean:

The usage of `checkOption` as **Boolean** is restricted to the following values:
- true
- false

#### as Boolean with value **true**:
**Syntax:**

```javascript
$checkOption: true
```

**SQL-Definition:**
```javascript
 WITH CHECK OPTION
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createView({
        $view: 'my_people_view',
        $select: {
            people_id: true,
            people_name: sql.concat('~~last_name', ' ', '~~first_name'),
            $from: 'people'
        },
        $checkOption: true
    });
}

// SQL output
CREATE VIEW my_people_view AS
SELECT
    people_id,
    CONCAT(last_name, $1, first_name) AS people_name
FROM
    people WITH CHECK OPTION

// Values
{
    "$1": " "
}
```
#### as Boolean with value **false**:
**Syntax:**

```javascript
$checkOption: false
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$createView({
        $view: 'my_people_view',
        $select: {
            people_id: true,
            people_name: sql.concat('~~last_name', ' ', '~~first_name'),
            $from: 'people'
        },
        $checkOption: false
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
## as String:

The usage of `checkOption` as **String** is restricted to the following values:
- CASCADED
- LOCAL

#### as String with value **CASCADED**:
**Syntax:**

```javascript
$checkOption: 'CASCADED'
```

**SQL-Definition:**
```javascript
 WITH CASCADED CHECK OPTION
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createView({
        $view: 'my_people_view',
        $select: {
            people_id: true,
            people_name: sql.concat('~~last_name', ' ', '~~first_name'),
            $from: 'people'
        },
        $checkOption: 'CASCADED' // or better using Keywords $checkOption: sql.CASCADED
    });
}

// SQL output
CREATE VIEW my_people_view AS
SELECT
    people_id,
    CONCAT(last_name, $1, first_name) AS people_name
FROM
    people WITH CASCADED CHECK OPTION

// Values
{
    "$1": " "
}
```
#### as String with value **LOCAL**:
**Syntax:**

```javascript
$checkOption: 'LOCAL'
```

**SQL-Definition:**
```javascript
 WITH LOCAL CHECK OPTION
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createView({
        $view: 'my_people_view',
        $select: {
            people_id: true,
            people_name: sql.concat('~~last_name', ' ', '~~first_name'),
            $from: 'people'
        },
        $checkOption: 'LOCAL' // or better using Keywords $checkOption: sql.LOCAL
    });
}

// SQL output
CREATE VIEW my_people_view AS
SELECT
    people_id,
    CONCAT(last_name, $1, first_name) AS people_name
FROM
    people WITH LOCAL CHECK OPTION

// Values
{
    "$1": " "
}
```
