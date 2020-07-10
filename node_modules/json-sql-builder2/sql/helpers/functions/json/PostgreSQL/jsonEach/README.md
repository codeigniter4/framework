# jsonEach Operator
Specifies the PostgreSQL `json_each` Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html)

# Allowed Types and Usage

## as String:

Usage of `jsonEach` as **String** with the following Syntax:

**Syntax:**

```javascript
$jsonEach: < String >
```

**SQL-Definition:**
```javascript
json_each(<value-param>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        $from: {
            jsondata: {
                $jsonEach: JSON.stringify({
                    a: 'foo',
                    b: 'bar'
                })
            }
        },
    });
}

// SQL output
SELECT
    *
FROM
    json_each($1) AS jsondata

// Values
{
    "$1": "{\"a\":\"foo\",\"b\":\"bar\"}"
}
```

## as Object:

Usage of `jsonEach` as **Object** with the following Syntax:

**Syntax:**

```javascript
$jsonEach: { ... }
```

**SQL-Definition:**
```javascript
json_each(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        $from: {
            jsondata: {
                $jsonEach: {
                    $jsonBuildObject: {
                        a: 'foo',
                        b: 123
                    }
                }
            }
        },
    });
}

// SQL output
SELECT
    *
FROM
    json_each(json_build_object($1, $2, $3, $4)) AS jsondata

// Values
{
    "$1": "a",
    "$2": "foo",
    "$3": "b",
    "$4": 123
}
```

