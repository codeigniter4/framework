# jsonAgg Operator
Specifies the PostgreSQL `json_agg` aggregation Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/10/static/functions-aggregate.html)

# Allowed Types and Usage

## as String:

Usage of `jsonAgg` as **String** with the following Syntax:

**Syntax:**

```javascript
$jsonAgg: < String >
```

**SQL-Definition:**
```javascript
json_agg(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        people_id: 1,
        emails: { $jsonAgg: 'address' },
        $from: 'people_emails',
        $groupBy: 'people_id'
    });
}

// SQL output
SELECT
    people_id,
    json_agg(address) AS emails
FROM
    people_emails
GROUP BY
    people_id

// Values
{}
```

## as Object:

Usage of `jsonAgg` as **Object** with the following Syntax:

**Syntax:**

```javascript
$jsonAgg: { ... }
```

**SQL-Definition:**
```javascript
json_agg(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        emails: {
            $select: {
                emails: {
                    $jsonAgg: {
                        $jsonBuildObject: {
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
            json_agg(json_build_object($1, people_emails.address)) AS emails
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

