# jsonObjectAgg Operator
Specifies the PostgreSQL `json_object_agg` aggregation Function.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/10/static/functions-aggregate.html)

# Allowed Types and Usage

## as Object:

The Usage of `jsonObjectAgg` as **Object** is restricted to childs have the following Type:

- Primitive
- Object

## as Object :arrow_right: Primitive:

Usage of `jsonObjectAgg` as **Object** with a child of Type **Primitive** :

**Syntax:**

```javascript
$jsonObjectAgg: {
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
        services: { $jsonObjectAgg: { '~~servicedata.key': '~~servicedata.value' } },
        $from: {
            data: {
                $select: {
                    services: { $jsonBuildObject: { '~~users_loginservices.service_id': '~~users_loginservices.data' } },
                    $from: 'users_loginservices'
                }
            },
            servicedata: {
                $jsonEach: '~~data.services'
            }
        }
    });
}

// SQL output
SELECT
    json_object_agg(servicedata.key, servicedata.value) AS services
FROM
    (
        SELECT
            json_build_object(
                users_loginservices.service_id,
                users_loginservices.data
            ) AS services
        FROM
            users_loginservices
    ) AS data,
    json_each(data.services) AS servicedata

// Values
{}
```
## as Object :arrow_right: Object:

Usage of `jsonObjectAgg` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$jsonObjectAgg: {
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
        jobj: { $jsonObjectAgg: { '~~jsondata.key': '~~jsondata.value' } },
        $from: {
            jsondata: {
                $jsonEach: {
                    $jsonBuildObject: {
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
    json_object_agg(jsondata.key, jsondata.value) AS jobj
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
