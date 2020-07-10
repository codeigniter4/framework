# columns Helper
Specifies the `$columns` Helper for the `CREATE INDEX` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `columns` as **Object** is restricted to childs have the following Type:

- Boolean
- Number
- String
- Object

## as Object :arrow_right: Boolean:

The Usage of `columns` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": true [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> ASC[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: true,
                age: false
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    age DESC

// Values
{}
```
## as Object :arrow_right: Boolean with value `false`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": false [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> DESC[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: true,
                age: false
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    age DESC

// Values
{}
```
## as Object :arrow_right: Number:

The Usage of `columns` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1
- -1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": 0 [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: 1,
                age: 0
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC

// Values
{}
```
## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": 1 [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> ASC[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: 1,
                age: -1
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    age DESC

// Values
{}
```
## as Object :arrow_right: Number with value `-1`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": -1 [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> DESC[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: 1,
                age: -1
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    age DESC

// Values
{}
```
## as Object :arrow_right: String:

The Usage of `columns` as **Object** with a child of Type **String** is restricted to the following values:

- ASC
- DESC

## as Object :arrow_right: String with value `ASC`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": 'ASC' [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> ASC[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: 'ASC',
                age: 'DESC'
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    age DESC

// Values
{}
```
## as Object :arrow_right: String with value `DESC`:
**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": 'DESC' [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> DESC[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: 'ASC',
                age: 'DESC'
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    age DESC

// Values
{}
```
## as Object :arrow_right: Object:

Usage of `columns` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$columns: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>{ ASC[$asc]}{ DESC[$desc]}
	{ NULLS [$nullsFirst]}-->(Oracle,PostgreSQL)
	{ NULLS [$nullsLast]}-->(Oracle,PostgreSQL)
	[ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[asc](./private/asc/)|*optional*|*private*| ASC [$asc]|
[desc](./private/desc/)|*optional*|*private*| DESC [$desc]|
[nullsFirst](./private/nullsFirst/)|*optional*|*private*| NULLS  [$nullsFirst]|`Oracle` `PostgreSQL` 
[nullsLast](./private/nullsLast/)|*optional*|*private*| NULLS  [$nullsLast]|`Oracle` `PostgreSQL` 

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $from: 'people',
            $orderBy: {
                last_name: true,
                first_name: { $asc: true, $nullsFirst: true },
                age: { $desc: true, $nullsLast: true }
            }
        }
    });

    return query;
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    first_name ASC NULLS FIRST,
    age DESC NULLS LAST

// Values
{}
```
## as Array:

The Usage of `columns` as **Array** is restricted to childs have the following Type:

- String

## as Array :arrow_right: String:

Usage of `columns` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$columns: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-ident> ASC[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: ['last_name', 'first_name']
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC,
    first_name ASC

// Values
{}
```
## as String:

Usage of `columns` as **String** with the following Syntax:

**Syntax:**

```javascript
$columns: < String >
```

**SQL-Definition:**
```javascript
<value-ident> ASC
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $orderBy: 'last_name'
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
ORDER BY
    last_name ASC

// Values
{}
```

