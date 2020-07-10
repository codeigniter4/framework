# isNull Helper
Specifies the `ISNULL` function to use with SQLServer. Further it defines the `IS NULL` and `IS NOT NULL` comparision Operators used by any SQL-Dialect.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as Boolean:

The usage of `isNull` as **Boolean** is restricted to the following values:
- true
- false

#### as Boolean with value **true**:
**Syntax:**

```javascript
$isNull: true
```

**SQL-Definition:**
```javascript
IS NULL
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $isNull: true }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name IS NULL

// Values
{}
```
#### as Boolean with value **false**:
**Syntax:**

```javascript
$isNull: false
```

**SQL-Definition:**
```javascript
IS NOT NULL
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $isNull: false }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name IS NOT NULL

// Values
{}
```
## as Object:

Usage of `isNull` as **Object** with the following Syntax:

**Syntax:**

```javascript
$isNull: { ... }
```

**SQL-Definition:**
```javascript
ISNULL(<$expr>, <$replacement>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[expr](./private/expr/)|:heavy_check_mark:|*private*||
[replacement](./private/replacement/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $eq: { $isNull: { $expr: '~~nick_name', $replacement: '~~first_name' } } }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name = ISNULL(nick_name, first_name)

// Values
{}
```

## Further Examples

:bulb: **Usage as Function**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $eq: sql.isNull('~~nick_name', '~~first_name') }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name = ISNULL(nick_name, first_name)

// Values
{}
```

