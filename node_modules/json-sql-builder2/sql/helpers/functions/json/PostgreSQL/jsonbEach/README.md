# jsonbEach Operator
Specifies the PostgreSQL `jsonb_each` Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html)

# Allowed Types and Usage

## as String:

Usage of `jsonbEach` as **String** with the following Syntax:

**Syntax:**

```javascript
$jsonbEach: < String >
```

**SQL-Definition:**
```javascript
jsonb_each(<value-param>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        $from: {
            jsondata: {
                $jsonbEach: JSON.stringify({
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
    jsonb_each($1) AS jsondata

// Values
{
    "$1": "{\"a\":\"foo\",\"b\":\"bar\"}"
}
```

## as Object:

Usage of `jsonbEach` as **Object** with the following Syntax:

**Syntax:**

```javascript
$jsonbEach: { ... }
```

**SQL-Definition:**
```javascript
jsonb_each(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        $from: {
            jsondata: {
                $jsonbEach: {
                    $jsonbBuildObject: {
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
    jsonb_each(jsonb_build_object($1, $2, $3, $4)) AS jsondata

// Values
{
    "$1": "a",
    "$2": "foo",
    "$3": "b",
    "$4": 123
}
```

