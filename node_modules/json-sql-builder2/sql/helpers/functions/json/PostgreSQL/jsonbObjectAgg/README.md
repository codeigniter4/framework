# jsonbObjectAgg Operator
Specifies the PostgreSQL `jsonb_object_agg` aggregation Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/10/static/functions-aggregate.html)

# Allowed Types and Usage

## as Object:

The Usage of `jsonbObjectAgg` as **Object** is restricted to childs have the following Type:

- Primitive
- Object

## as Object :arrow_right: Primitive:

Usage of `jsonbObjectAgg` as **Object** with a child of Type **Primitive** :

**Syntax:**

```javascript
$jsonbObjectAgg: {
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
        services: { $jsonbObjectAgg: { '~~servicedata.key': '~~servicedata.value' } },
        $from: {
            data: {
                $select: {
                    services: { $jsonbBuildObject: { '~~users_loginservices.service_id': '~~users_loginservices.data' } },
                    $from: 'users_loginservices'
                }
            },
            servicedata: {
                $jsonbEach: '~~data.services'
            }
        }
    });
}

// SQL output
SELECT
    jsonb_object_agg(servicedata.key, servicedata.value) AS services
FROM
    (
        SELECT
            jsonb_build_object(
                users_loginservices.service_id,
                users_loginservices.data
            ) AS services
        FROM
            users_loginservices
    ) AS data,
    jsonb_each(data.services) AS servicedata

// Values
{}
```
## as Object :arrow_right: Object:

Usage of `jsonbObjectAgg` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$jsonbObjectAgg: {
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
        jobj: { $jsonbObjectAgg: { '~~jsondata.key': '~~jsondata.value' } },
        $from: {
            jsondata: {
                $jsonbEach: {
                    $jsonbBuildObject: {
                        a: 'foo',
                        b: 123
                    }
                }
            }
        }
    });
}

// SQL output
SELECT
    jsonb_object_agg(jsondata.key, jsondata.value) AS jobj
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
