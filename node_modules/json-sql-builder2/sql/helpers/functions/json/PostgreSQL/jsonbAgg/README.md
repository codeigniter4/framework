# jsonbAgg Operator
Specifies the PostgreSQL `jsonb_agg` aggregation Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/10/static/functions-aggregate.html)

# Allowed Types and Usage

## as String:

Usage of `jsonbAgg` as **String** with the following Syntax:

**Syntax:**

```javascript
$jsonbAgg: < String >
```

**SQL-Definition:**
```javascript
jsonb_agg(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        people_id: 1,
        emails: { $jsonbAgg: 'address' },
        $from: 'people_emails',
        $groupBy: 'people_id'
    });
}

// SQL output
SELECT
    people_id,
    jsonb_agg(address) AS emails
FROM
    people_emails
GROUP BY
    people_id

// Values
{}
```

## as Object:

Usage of `jsonbAgg` as **Object** with the following Syntax:

**Syntax:**

```javascript
$jsonbAgg: { ... }
```

**SQL-Definition:**
```javascript
jsonb_agg(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        emails: {
            $select: {
                emails: {
                    $jsonbAgg: {
                        $jsonbBuildObject: {
                            address: '~~people_emails.address'
                        }
                    }
                },
                $from: 'people_emails',
                $where: {
                    'people.id': '~~people_emails.people_id'
                }
            }
        },
        $from: 'people'
    });
}

// SQL output
SELECT
    (
        SELECT
            jsonb_agg(jsonb_build_object($1, people_emails.address)) AS emails
        FROM
            people_emails
        WHERE
            people.id = people_emails.people_id
    ) AS emails
FROM
    people

// Values
{
    "$1": "address"
}
```

