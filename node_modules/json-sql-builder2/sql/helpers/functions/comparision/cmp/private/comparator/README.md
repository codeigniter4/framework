# comparator Helper
Specifies the comparision Operator to use with `cmp` as Helper.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as String:

The usage of `comparator` as **String** is restricted to the following values:
- =
- !=
- >
- <
- >=
- <=

#### as String with value **=**:
**Syntax:**

```javascript
$comparator: '='
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~first_name', '=', 'Jane'),
                ]
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
    first_name = $1

// Values
{
    "$1": "Jane"
}
```
#### as String with value **!=**:
**Syntax:**

```javascript
$comparator: '!='
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~first_name', '!=', 'Jane'),
                ]
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
    first_name != $1

// Values
{
    "$1": "Jane"
}
```
#### as String with value **>**:
**Syntax:**

```javascript
$comparator: '>'
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~age', '>', 40),
                ]
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
    age > $1

// Values
{
    "$1": 40
}
```
#### as String with value **<**:
**Syntax:**

```javascript
$comparator: '<'
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~age', '<', 40),
                ]
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
    age < $1

// Values
{
    "$1": 40
}
```
#### as String with value **>=**:
**Syntax:**

```javascript
$comparator: '>='
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~age', '>=', 40),
                ]
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
    age >= $1

// Values
{
    "$1": 40
}
```
#### as String with value **<=**:
**Syntax:**

```javascript
$comparator: '<='
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~age', '<=', 40),
                ]
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
    age <= $1

// Values
{
    "$1": 40
}
```
