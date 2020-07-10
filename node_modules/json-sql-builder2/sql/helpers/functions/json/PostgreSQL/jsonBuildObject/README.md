# jsonBuildObject Operator
Specifies the PostgreSQL `json_build_object` Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-json.html)

# Allowed Types and Usage

## as Object:

The Usage of `jsonBuildObject` as **Object** is restricted to childs have the following Type:

- Primitive
- Object

## as Object :arrow_right: Primitive:

Usage of `jsonBuildObject` as **Object** with a child of Type **Primitive** :

**Syntax:**

```javascript
$jsonBuildObject: {
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
                        $jsonBuildObject: {
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
                json_build_object(
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

Usage of `jsonBuildObject` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$jsonBuildObject: {
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
                        $jsonBuildObject: {
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
                json_build_object(
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
