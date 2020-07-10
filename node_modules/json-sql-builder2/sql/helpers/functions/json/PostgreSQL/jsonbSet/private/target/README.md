# target Operator
Specifies the `target` Parameter for the `jsonb_set` function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html#FUNCTIONS-JSON-PROCESSING-TABLE)

# Allowed Types and Usage

## as Primitive:

Usage of `target` as **Primitive** with the following Syntax:

**Syntax:**

```javascript
$target: < String | Number | Boolean >
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

Usage of `target` as **Object** with the following Syntax:

**Syntax:**

```javascript
$target: { ... }
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
                    $target: {
                        profile: {}
                    },
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
    data = jsonb_set($1, $2, $3)
WHERE
    people_id = $4

// Values
{
    "$1": "{\"profile\":{}}",
    "$2": "{profile}",
    "$3": "{\"firstName\":\"John\",\"lastName\":\"Doe\"}",
    "$4": 456
}
```

## as Function:

Usage of `target` as **Function** with the following Syntax:

**Syntax:**

```javascript
$target: sql.<callee>([params])
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

