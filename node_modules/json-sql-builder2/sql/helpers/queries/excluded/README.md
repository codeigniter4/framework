# excluded Helper
Specifies the special `EXCLUDED` table for the `ON CONFLICT ... DO UPDATE` clause.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html#SQL-ON-CONFLICT)

# Allowed Types and Usage

## as String:

Usage of `excluded` as **String** with the following Syntax:

**Syntax:**

```javascript
$excluded: < String >
```

**SQL-Definition:**
```javascript
EXCLUDED.<value-ident>
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
        $onConflict: {
            $onConstraint: 'pk_people',
            $doUpdateSet: {
                staff_no: sql.select({ new_stuff_no: { $: { $max: 'staff_no', $add: 1 } } }, {
                    $from: 'people'
                }),
                first_name: { $excluded: 'first_name' },
                last_name: sql.excluded('last_name')
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

