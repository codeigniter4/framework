# value Operator
Specifies the `value` Parameter for the `jsonb_set` function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html#FUNCTIONS-JSON-PROCESSING-TABLE)

# Allowed Types and Usage

## as Primitive:

Usage of `value` as **Primitive** with the following Syntax:

**Syntax:**

```javascript
$value: < String | Number | Boolean >
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            data: {
                $jsonbSet: {
                    $target: '~~data',
                    $path: '{profile,firstName}',
                    $value: 'John'
                }
            }
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    data = jsonb_set(data, $1, $2)
WHERE
    people_id = $3

// Values
{
    "$1": "{profile,firstName}",
    "$2": "\"John\"",
    "$3": 456
}
```

## as Object:

Usage of `value` as **Object** with the following Syntax:

**Syntax:**

```javascript
$value: { ... }
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            data: {
                $jsonbSet: {
                    $target: '~~data',
                    $path: '{profile}',
                    $value: {
                        firstName: 'John',
                        lastName: 'Doe'
                    }
                }
            }
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    data = jsonb_set(data, $1, $2)
WHERE
    people_id = $3

// Values
{
    "$1": "{profile}",
    "$2": "{\"firstName\":\"John\",\"lastName\":\"Doe\"}",
    "$3": 456
}
```

## as Function:

Usage of `value` as **Function** with the following Syntax:

**Syntax:**

```javascript
$value: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
<value>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$update({
        $table: 'people',
        $set: {
            data: {
                $jsonbSet: {
                    $target: '~~data',
                    $path: '{profile}',
                    $value: sql.jsonbSet('~~data', '{profile,firstName}', 'John')
                }
            }
        },
        $where: {
            people_id: 456
        }
    });
}

// SQL output
UPDATE
    people
SET
    data = jsonb_set(data, $1, jsonb_set(data, $2, $3))
WHERE
    people_id = $4

// Values
{
    "$1": "{profile}",
    "$2": "{profile,firstName}",
    "$3": "\"John\"",
    "$4": 456
}
```

