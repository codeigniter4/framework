# onDuplicateKeyUpdate Helper
Specifies the Helper for the `ON DUPLICATE KEY UPDATE` clause used by the `INSERT INTO` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)

# Allowed Types and Usage

## as Object:

The Usage of `onDuplicateKeyUpdate` as **Object** is restricted to childs have the following Type:

- Primitive
- Object
- Function

## as Object :arrow_right: Primitive:

Usage of `onDuplicateKeyUpdate` as **Object** with a child of Type **Primitive** :

**Syntax:**

```javascript
$onDuplicateKeyUpdate: {
    "<identifier | $Helper | $operator>": <value: String | Number | Boolean> [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> = <value-param>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            staff_no: 1,
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $onDuplicateKeyUpdate: {
            first_name: 'John',
            last_name: 'Doe',
            age: 99
        }
    });
}

// SQL output
INSERT INTO
    people (staff_no, first_name, last_name, age)
VALUES
    ($1, $2, $3, $4) ON DUPLICATE KEY
UPDATE
    first_name = $5,
    last_name = $6,
    age = $7

// Values
{
    "$1": 1,
    "$2": "John",
    "$3": "Doe",
    "$4": 40,
    "$5": "John",
    "$6": "Doe",
    "$7": 99
}
```
## as Object :arrow_right: Object:

Usage of `onDuplicateKeyUpdate` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$onDuplicateKeyUpdate: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> = [$values][$select][ , ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[values](./private/values/)|*optional*|*private*||
[select](../../../../operators/select/)|*optional*|:heavy_check_mark:||

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            staff_no: 1,
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $onDuplicateKeyUpdate: {
            first_name: { $values: 'first_name' },
            last_name: { $values: 'last_name' },
            age: { $values: 'age' }
        }
    });
}

// SQL output
INSERT INTO
    people (staff_no, first_name, last_name, age)
VALUES
    ($1, $2, $3, $4) ON DUPLICATE KEY
UPDATE
    first_name =
VALUES(first_name),
    last_name =
VALUES(last_name),
    age =
VALUES(age)

// Values
{
    "$1": 1,
    "$2": "John",
    "$3": "Doe",
    "$4": 40
}
```
## as Object :arrow_right: Function:

Usage of `onDuplicateKeyUpdate` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$onDuplicateKeyUpdate: {
    "<identifier | $Helper | $operator>": sql.<callee>([params])
}
```

**SQL-Definition:**
```javascript
<key-ident> = <value>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            staff_no: 1,
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $onDuplicateKeyUpdate: {
            staff_no: sql.select({ new_stuff_no: { $: { $max: 'staff_no', $add: 1 } } }, {
                $from: 'people'
            }),
            first_name: { $values: { $coalesce: { first_name: '"Unknown"' } } },
            last_name: { $values: 'last_name' },
        }
    });
}

// SQL output
INSERT INTO
    people (staff_no, first_name, last_name, age)
VALUES
    ($1, $2, $3, $4) ON DUPLICATE KEY
UPDATE
    staff_no = (
        SELECT
            MAX(staff_no) + $5 AS new_stuff_no
        FROM
            people
    ),
    first_name =
VALUES(COALESCE(first_name, $6)),
    last_name =
VALUES(last_name)

// Values
{
    "$1": 1,
    "$2": "John",
    "$3": "Doe",
    "$4": 40,
    "$5": 1,
    "$6": "\"Unknown\""
}
```
