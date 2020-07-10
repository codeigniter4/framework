# rowToJson Operator
Specifies the PostgreSQL `row_to_json` Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html)

# Allowed Types and Usage

## as String:

Usage of `rowToJson` as **String** with the following Syntax:

**Syntax:**

```javascript
$rowToJson: < String >
```

**SQL-Definition:**
```javascript
row_to_json(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        profile: { $rowToJson: 'people' },
        $from: 'people'
    });
}

// SQL output
SELECT
    row_to_json(people) AS profile
FROM
    people

// Values
{}
```

