# coalesce Helper
Specifies the `COALESCE` function.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-conditional.html)

# Allowed Types and Usage

## as Array:

Usage of `coalesce` as **Array** with the following Syntax:

**Syntax:**

```javascript
$coalesce: [ ... ]
```

**SQL-Definition:**
```javascript
COALESCE(<value-param>[ , ... ])
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        description: { $coalesce: ['~~first_name', '~~last_name', 'Unknown'] },
        $from: 'people'
    });
}

// SQL output
SELECT
    COALESCE(first_name, last_name, $1) AS description
FROM
    people

// Values
{
    "$1": "Unknown"
}
```

## as Object:

The Usage of `coalesce` as **Object** is restricted to childs have the following Type:

- Primitive

## as Object :arrow_right: Primitive:

Usage of `coalesce` as **Object** with a child of Type **Primitive** :

**Syntax:**

```javascript
$coalesce: {
    "<identifier | $Helper | $operator>": <value: String | Number | Boolean> [, ... ]
}
```

**SQL-Definition:**
```javascript
COALESCE(<key-ident>, <value-param>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        people_name: { $coalesce: { last_name: 'Unknown' } },
        $from: 'people'
    });
}

// SQL output
SELECT
    COALESCE(last_name, $1) AS people_name
FROM
    people

// Values
{
    "$1": "Unknown"
}
```
## Further Examples

:bulb: **Usage with INLINE-SQL**
```javascript
function() {
    return sql.$select({
        description: { $coalesce: ["__:CONCAT(first_name, ' ', last_name)", '~~last_name', 'People without Name'] },
        $from: 'people'
    });
}

// SQL output
SELECT
    COALESCE(
        CONCAT(first_name, ' ', last_name),
        last_name,
        $1
    ) AS description
FROM
    people

// Values
{
    "$1": "People without Name"
}
```

:bulb: **Usage as Object with INLINE-SQL**
```javascript
function() {
    return sql.$select({
        people_name: { $coalesce: { "__:CONCAT(last_name, ' ', first_name)": 'Unknown' } },
        $from: 'people'
    });
}

// SQL output
SELECT
    COALESCE(CONCAT(last_name, ' ', first_name), $1) AS people_name
FROM
    people

// Values
{
    "$1": "Unknown"
}
```

