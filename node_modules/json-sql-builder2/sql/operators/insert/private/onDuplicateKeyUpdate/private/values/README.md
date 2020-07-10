# values Helper
Specifies the `VALUES` function for the `ON DUPLICATE KEY UPDATE` clause.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/insert.html)
- [MariaDB](https://mariadb.com/kb/en/library/insert/)

# Allowed Types and Usage

## as String:

Usage of `values` as **String** with the following Syntax:

**Syntax:**

```javascript
$values: < String >
```

**SQL-Definition:**
```javascript
VALUES(<value-ident>)
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

## as Object:

Usage of `values` as **Object** with the following Syntax:

**Syntax:**

```javascript
$values: { ... }
```

**SQL-Definition:**
```javascript
VALUES(<value>)
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

## as Function:

Usage of `values` as **Function** with the following Syntax:

**Syntax:**

```javascript
$values: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
VALUES(<value>)
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
            staff_no: {
                $select: {
                    new_stuff_no: { $: { $max: 'staff_no', $add: 1 } },
                    $from: 'people'
                }
            },
            first_name: { $values: sql.coalesce('~~first_name', '"Unknown"') },
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

