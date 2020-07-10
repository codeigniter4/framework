# cmp Helper
Specifies a global comparision function `cmp` as Helper.

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as Object:

Usage of `cmp` as **Object** with the following Syntax:

**Syntax:**

```javascript
$cmp: { ... }
```

**SQL-Definition:**
```javascript
{<$value> }<$comparator>{ <$other>}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[value](./private/value/)|:heavy_check_mark:|*private*| <$value> |
[comparator](./private/comparator/)|:heavy_check_mark:|*private*||
[other](./private/other/)|:heavy_check_mark:|*private*|  <$other>|

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                $and: [
                    sql.cmp('~~first_name', '=', 'Jane'),
                    sql.cmp('~~last_name', '=', 'Doe'),
                ]
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name = $1
    AND last_name = $2

// Values
{
    "$1": "Jane",
    "$2": "Doe"
}
```

