# onConflict Helper
Specifies the `ON CONFLICT` clause used by the `INSERT INTO` Statement.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html#SQL-ON-CONFLICT)

# Allowed Types and Usage

## as Object:

Usage of `onConflict` as **Object** with the following Syntax:

**Syntax:**

```javascript
$onConflict: { ... }
```

**SQL-Definition:**
```javascript
 ON CONFLICT{ ([$columns])}
  { ON CONSTRAINT [$onConstraint]}
    { DO NOTHING[$doNothing]}
    { DO UPDATE SET [$doUpdateSet]}

```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[columns](../../../../helpers/ddl/columns/)|*optional*|:heavy_check_mark:| ( [$columns])|
[onConstraint](./private/onConstraint/)|*optional*|*private*| ON CONSTRAINT  [$onConstraint]|
[doNothing](./private/doNothing/)|*optional*|*private*| DO NOTHING [$doNothing]|
[doUpdateSet](./private/doUpdateSet/)|*optional*|*private*| DO UPDATE SET  [$doUpdateSet]|

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
        $onConflict: {
            $columns: ['staff_no'],
            $doNothing: true
        }
    });
}

// SQL output
INSERT INTO
    people (staff_no, first_name, last_name, age)
VALUES
    ($1, $2, $3, $4) ON CONFLICT (staff_no) DO NOTHING

// Values
{
    "$1": 1,
    "$2": "John",
    "$3": "Doe",
    "$4": 40
}
```

## Further Examples

:bulb: **Basic Usage with ON CONSTRAINT**
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
        $onConflict: {
            $onConstraint: 'pk_people',
            $doNothing: true
        }
    });
}

// SQL output
INSERT INTO
    people (staff_no, first_name, last_name, age)
VALUES
    ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT pk_people DO NOTHING

// Values
{
    "$1": 1,
    "$2": "John",
    "$3": "Doe",
    "$4": 40
}
```

:bulb: **Basic Usage with DO UPDATE SET**
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
        $onConflict: {
            $onConstraint: 'pk_people',
            $doUpdateSet: {
                staff_no: sql.select({ new_stuff_no: { $: { $max: 'staff_no', $add: 1 } } }, {
                    $from: 'people'
                }),
                first_name: { $excluded: 'first_name' },
                last_name: { $excluded: 'last_name' }
            }
        }
    });
}

// SQL output
INSERT INTO
    people (staff_no, first_name, last_name, age)
VALUES
    ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT pk_people DO
UPDATE
SET
    staff_no = (
        SELECT
            MAX(staff_no) + $5 AS new_stuff_no
        FROM
            people
    ),
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name

// Values
{
    "$1": 1,
    "$2": "John",
    "$3": "Doe",
    "$4": 40,
    "$5": 1
}
```

