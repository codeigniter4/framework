# toTimestamp Helper
Specifies the `TO_TIMESTAMP` function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/10/functions-formatting.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions193.htm)

# Allowed Types and Usage

## as String:

Usage of `toTimestamp` as **String** with the following Syntax:

**Syntax:**

```javascript
$toTimestamp: < String >
```

**SQL-Definition:**
```javascript
TO_TIMESTAMP(<value-param>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        my_timestamp: { $toTimestamp: '~~foo.column' },
        $from: 'foo'
    });
}

// SQL output
SELECT
    TO_TIMESTAMP(foo.column) AS my_timestamp
FROM
    foo

// Values
{}
```

## as Object:

Usage of `toTimestamp` as **Object** with the following Syntax:

**Syntax:**

```javascript
$toTimestamp: { ... }
```

**SQL-Definition:**
```javascript
TO_TIMESTAMP(<$expr>, <$format>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[expr](./private/expr/)|:heavy_check_mark:|*private*||
[format](./private/format/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        my_timestamp: { $toTimestamp: { $expr: '2017-02-31 30:8:00', $format: 'YYYY-MM-DD HH24:MI:SS' } }
    });
}

// SQL output
SELECT
    TO_TIMESTAMP($1, $2) AS my_timestamp

// Values
{
    "$1": "2017-02-31 30:8:00",
    "$2": "YYYY-MM-DD HH24:MI:SS"
}
```

