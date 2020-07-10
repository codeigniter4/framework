# jsonbBuildObject Operator
Specifies the PostgreSQL `jsonb_build_object` Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html)

# Allowed Types and Usage

## as Object:

The Usage of `jsonbBuildObject` as **Object** is restricted to childs have the following Type:

- Primitive
- Object

## as Object :arrow_right: Primitive:

Usage of `jsonbBuildObject` as **Object** with a child of Type **Primitive** :

**Syntax:**

```javascript
$jsonbBuildObject: {
    "<identifier | $Helper | $operator>": <value: String | Number | Boolean> [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-param>, <value-param>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        emails: {
            $select: {
                emails: {
                    $jsonAgg: {
                        $jsonbBuildObject: {
                            address: '~~people_emails.address',
                            verified: { $i: 'people_emails.verified' },
                            checked: true
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
            json_agg(
                jsonb_build_object(
                    $1,
                    people_emails.address,
                    $2,
                    people_emails.verified,
                    $3,
                    $4
                )
            ) AS emails
        FROM
            people_emails
        WHERE
            people.id = people_emails.people_id
    ) AS emails
FROM
    people

// Values
{
    "$1": "address",
    "$2": "verified",
    "$3": "checked",
    "$4": true
}
```
## as Object :arrow_right: Object:

Usage of `jsonbBuildObject` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$jsonbBuildObject: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-param>, <value>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        emails: {
            $select: {
                emails: {
                    $jsonAgg: {
                        $jsonbBuildObject: {
                            address: '~~people_emails.address',
                            verified: { $i: 'people_emails.verified' },
                            checked: true
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
            json_agg(
                jsonb_build_object(
                    $1,
                    people_emails.address,
                    $2,
                    people_emails.verified,
                    $3,
                    $4
                )
            ) AS emails
        FROM
            people_emails
        WHERE
            people.id = people_emails.people_id
    ) AS emails
FROM
    people

// Values
{
    "$1": "address",
    "$2": "verified",
    "$3": "checked",
    "$4": true
}
```
