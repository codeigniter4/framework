# json Operator
Specifies a generic JSON Helper that will stringify the current value assigned.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as Primitive:

Usage of `json` as **Primitive** with the following Syntax:

**Syntax:**

```javascript
$json: < String | Number | Boolean >
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            json_str: { $json: 'Stringvalue' },
            json_bool: { $json: true },
            json_num: { $json: 88 }
        }
    });
}

// SQL output
INSERT INTO
    people (
        first_name,
        last_name,
        json_str,
        json_bool,
        json_num
    )
VALUES
    ($1, $2, $3, $4, $5)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": "\"Stringvalue\"",
    "$4": "true",
    "$5": "88"
}
```

## as Array:

Usage of `json` as **Array** with the following Syntax:

**Syntax:**

```javascript
$json: [ ... ]
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            hobbies: { $json: ['football', 'basketball'] }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, hobbies)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": "[\"football\",\"basketball\"]"
}
```

## as Object:

Usage of `json` as **Object** with the following Syntax:

**Syntax:**

```javascript
$json: { ... }
```

**SQL-Definition:**
```javascript
<value-param>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            hobbies: {
                $json: {
                    football: 'beginner',
                    basketball: 'good',
                    swimming: false
                }
            }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, hobbies)
VALUES
    ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": "{\"football\":\"beginner\",\"basketball\":\"good\",\"swimming\":false}"
}
```

