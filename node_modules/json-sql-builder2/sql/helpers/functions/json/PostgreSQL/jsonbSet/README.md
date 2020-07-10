# jsonbSet Operator
Specifies the `jsonb_set` function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html#FUNCTIONS-JSON-PROCESSING-TABLE)

# Allowed Types and Usage

## as Object:

Usage of `jsonbSet` as **Object** with the following Syntax:

**Syntax:**

```javascript
$jsonbSet: { ... }
```

**SQL-Definition:**
```javascript
jsonb_set(<$target>, <$path>, <$value>{, [$createMissing]})
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[target](./private/target/)|:heavy_check_mark:|*private*||
[path](./private/path/)|:heavy_check_mark:|*private*||
[value](./private/value/)|:heavy_check_mark:|*private*||
[createMissing](./private/createMissing/)|*optional*|*private*|,  [$createMissing]|

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

